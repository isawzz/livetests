
//#region rumor
function ari_open_rumors(stage = 28) {
	let [fen, deck] = [Z.fen, UI.deck_rumors];
	//console.log('*** RUMOR TOP OPENS!!! ***')

	DA.qanim = [];
	fen.stage = Z.stage = stage;
	let n = Math.min(2, fen.deck_rumors.length);

	let cards = arrTake(fen.deck_rumors, n);
	let uicards = cards.map(x => ari_get_card(x));
	//console.log('deck', deck, 'n', n, 'cards', uicards);
	//output_arr_short(fen.deck_rumors);

	let dest = UI.rumor_top = ui_type_market([], deck.container.parentNode, { maleft: 12 }, `rumor_top`, 'rumor_top', ari_get_card);
	mMagnifyOnHoverControlPopup(dest.cardcontainer);

	for (let i = 0; i < n; i++) {
		DA.qanim.push([qanim_flip_topmost, [deck]]);
		DA.qanim.push([qanim_move_topmost, [deck, dest]]);
		DA.qanim.push([q_move_topmost, [deck, dest]]);
	}
	DA.qanim.push([q_mirror_fen, ['deck_rumors', 'rumor_top']]);
	DA.qanim.push([ari_pre_action, []]);
	qanim();
}
function building_is_correct(b) {
	let key = b.keycard.key;
	let list = b.list;
	//return true if all list elements have the same first letter as key
	for (let i = 0; i < list.length; i++) { if (list[i][0] != key[0]) return false; }
	return true;
}
function output_arr_short(arr) {
	console.log('output_arr_short', getFunctionsNameThatCalledThisFunction());
	console.log('deck top 3', jsCopy(arrTake(arr, 3))); console.log('deck bottom 3', jsCopy(arrTakeLast(arr, 3)));

}
function post_rumor_both() {
	let [stage, A, fen, uplayer] = [Z.stage, Z.A, Z.fen, Z.uplayer];
	let item = A.items[A.selected[0]];
	let non_selected = A.items.filter(x => x.index != A.selected[0])[0];
	let rumor = item.key;
	let rumor_other = non_selected.key;

	//console.log('post_buy_rumor', A.selected);
	//console.log('deck top 3', jsCopy(arrTake(fen.deck_rumors, 3))); console.log('deck bottom 3', jsCopy(arrTakeLast(fen.deck_rumors, 3)));

	//add non_selected to deck bottom
	//add rumor to uplayer rumors
	fen.players[uplayer].rumors.push(rumor);
	fen.players[A.owner].rumors.push(rumor_other);

	//console.log('deck top 3', jsCopy(arrTake(fen.deck_rumors, 3))); console.log('deck bottom 3', jsCopy(arrTakeLast(fen.deck_rumors, 3)));

	ari_history_list([`${uplayer} got a rumor, ${A.owner} got one too`], 'rumor');
	ari_next_action();

}
function post_inspect() {
	let [stage, A, fen, uplayer] = [Z.stage, Z.A, Z.fen, Z.uplayer];
	let item = A.items[A.selected[0]];

	//console.log('building to inspect:', item.o);
	//lead is item.o.keycard
	//if the building has a schwein, and schwein is open, uplayer gets a rumor
	let building = item.o;

	if (isdef(building.schwein)) {
		//uplayer gets a rumor from rumor deck
		//output_arr_short(fen.deck_rumors);
		let rumor = fen.deck_rumors[0]; fen.deck_rumors.shift();
		fen.players[uplayer].rumors.push(rumor);
		//console.log('...got rumor', rumor);
		//output_arr_short(fen.deck_rumors);
		ari_next_action();
	} else if (building_is_correct(building)) {
		//uplayer need to chose a rumor card to discard!
		//console.log('')
		Z.stage = 29;
		ari_pre_action();
	} else {
		//building is not correct: turn schwein up, both players get a rumor
		//console.log('building is not correct')
		//console.log('building', building);
		A.owner = stringAfter(building.path, '.');
		A.owner = stringBefore(A.owner, '.');
		turn_schwein_up(building);
	}

	// if the building has a schwein, and schwein is closed, _ari_open_rumors, followed by stage: inspect_schwein_beide
	// if the building has no schwein, uplayer needs to select one of his rumors to pay
}
function post_buy_rumor() {

	let [stage, A, fen, uplayer] = [Z.stage, Z.A, Z.fen, Z.uplayer];
	let item = A.items[A.selected[0]];
	let non_selected = A.items.filter(x => x.index != A.selected[0]);
	let rumor = item.key;

	//console.log('post_buy_rumor', A.selected);
	//console.log('deck top 3', jsCopy(arrTake(fen.deck_rumors, 3))); console.log('deck bottom 3', jsCopy(arrTakeLast(fen.deck_rumors, 3)));

	//add non_selected to deck bottom
	for (const item of non_selected) { fen.deck_rumors.push(item.key); }
	//add rumor to uplayer rumors
	fen.players[uplayer].rumors.push(rumor);
	//pay w/ coin
	fen.players[uplayer].coins -= 1;

	//console.log('deck top 3', jsCopy(arrTake(fen.deck_rumors, 3))); console.log('deck bottom 3', jsCopy(arrTakeLast(fen.deck_rumors, 3)));

	ari_history_list([`${uplayer} bought a rumor`], 'rumor');
	ari_next_action();

}
function process_rumor() {
	process_payment();
	let [fen, A, uplayer] = [Z.fen, Z.A, Z.uplayer];

	//assert that exactly 2 items are selected one of which is a building and one a rumor card
	let items = A.selected.map(x => A.items[x]);
	let building = firstCond(items, x => x.path.includes('building'));
	let fenbuilding = lookup(fen, building.path.split('.'));
	let rumor = firstCond(items, x => !x.path.includes('building'));
	if (nundef(building) || nundef(rumor)) {
		select_error('you must select exactly one building and one rumor card!');
		return;
	}

	//console.log('building', building, 'rumor', rumor, '\nfenbuilding', fenbuilding);
	//the buildings gets rumor added
	lookupAddToList(fenbuilding, ['rumors'], rumor.key);
	removeInPlace(fen.players[uplayer].rumors, rumor.key);
	ari_history_list([`${uplayer} added rumor to ${ari_get_building_type(fenbuilding)}`,], 'rumor');

	ari_next_action(fen, uplayer);

}
function process_rumor_discard() {
	let [stage, A, fen, uplayer] = [Z.stage, Z.A, Z.fen, Z.uplayer];
	let item = A.items[A.selected[0]];

	//console.log('items',A.items,A.selected,item); return;

	let rumor = item.key;
	removeInPlace(fen.players[uplayer].rumors, rumor);

	ari_history_list([`building is correct! ${uplayer} had to discard rumor (${rumor})`], 'rumor');
	ari_next_action();
}
function turn_schwein_up(b) {
	let key = b.keycard.key;
	let list = b.list;
	//return true if all list elements have the same first letter as key
	let schwein = firstCond(list, x => x[0] != key[0]);
	assertion(isdef(schwein), 'WAS DA IST GARKEIN SCHWEIN!!!!!!!!!!', b);
	let ui = firstCond(b.items, x => x.key == schwein);
	//console.log('schwein card is',ui)
	face_up(ui);

	let obuilding = lookup(Z.fen, b.path.split('.'));
	b.schwein = obuilding.schwein = schwein;
	ari_open_rumors(32);
}
function ui_get_card_items(cards) {
	let items = [], i = 0;
	for (const o of cards) {
		let item = { o: o, a: o.key, key: o.key, friendly: o.short, path: ``, index: i };
		i++;
		items.push(item);
	}
	return items;
}
function ui_get_top_rumors() {
	let items = [], i = 0;
	for (const o of UI.rumor_top.items) {
		let item = { o: o, a: o.key, key: o.key, friendly: o.short, path: `rumor_top`, index: i };
		i++;
		items.push(item);
	}
	return items;
}
function ui_get_other_buildings_and_rumors(uplayer) {
	let items = ui_get_other_buildings(uplayer);
	items = items.concat(ui_get_rumors_items(uplayer));

	reindex_items(items);
	return items;
}
function ui_type_building(b, dParent, styles = {}, path = 'farm', title = '', get_card_func = ari_get_card) {

	//console.log('hallo!!!!!!!!!!!!!')
	let cont = ui_make_container(dParent, get_container_styles(styles));
	let cardcont = mDiv(cont);

	let list = b.list;
	//console.log('list', list)
	//let n = list.length;
	let d = mDiv(dParent);
	let items = list.map(x => get_card_func(x));
	// let cont = ui_make_hand_container(items, d, { maleft: 12, padding: 4 });

	let schwein = null;
	for (let i = 1; i < items.length; i++) {
		let item = items[i];
		if (b.schwein != item.key) face_down(item); else schwein = item;
	}

	let d_harvest = null;
	if (isdef(b.h)) {
		let keycard = items[0];
		let d = iDiv(keycard);
		mStyle(d, { position: 'relative' });
		d_harvest = mDiv(d, { position: 'absolute', w: 20, h: 20, bg: 'orange', opacity: .5, fg: 'black', top: '45%', left: -10, rounding: '50%', align: 'center' }, null, 'H');
	}

	let d_rumors = null, rumorItems = [];
	//console.log('b',b)
	if (!isEmpty(b.rumors)) {
		//console.log('ja, hat rumors!!!!!!!!!!!!!!')
		let d = cont;
		mStyle(d, { position: 'relative' });
		d_rumors = mDiv(d, { display: 'flex', gap: 2, position: 'absolute', h: 30, bottom: 0, right: 0 }); //,bg:'green'});
		for (const rumor of b.rumors) {
			let dr = mDiv(d_rumors, { h: 24, w: 16, vmargin: 3, align: 'center', bg: 'dimgray', rounding: 2 }, null, 'R');
			rumorItems.push({ div: dr, key: rumor });
		}
	}

	let card = isEmpty(items) ? { w: 1, h: 100, ov: 0 } : items[0];
	//console.log('card',card)
	mContainerSplay(cardcont, 2, card.w, card.h, items.length, card.ov * card.w);
	ui_add_cards_to_hand_container(cardcont, items, list);

	ui_add_container_title(title, cont, items);

	// if (isdef(title) && !isEmpty(items)) { mText(title, d); }

	return {
		ctype: 'hand',
		list: list,
		path: path,
		container: cont,
		cardcontainer: cardcont,
		items: items,
		schwein: schwein,
		harvest: d_harvest,
		rumors: rumorItems,
		keycard: items[0],

	};
}

//#endregion

















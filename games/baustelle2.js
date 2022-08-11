
function ui_type_building(b, dParent, styles = {}, path = 'farm', title = '', get_card_func = ari_get_card, separate_lead = false, ishidden = false) {
	let cont = ui_make_container(dParent, get_container_styles(styles));
	let cardcont = mDiv(cont);
	let list = b.list;
	let d = mDiv(dParent);
	let items = list.map(x => get_card_func(x));
	reindex_items(items);

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
	let [ov, splay] = separate_lead ? [card.ov * 1.5, 5] : [card.ov, 2];
	mContainerSplay(cardcont, 5, card.w, card.h, items.length, card.ov * 1.5 * card.w);
	ui_add_cards_to_hand_container(cardcont, items, list);

	ui_add_container_title(title, cont, items);

	let uischweine = [];
	//console.log('b', b);
	for (let i = 1; i < items.length; i++) {

		let item = items[i];
		//console.log('item',item)
		if (ishidden && !b.schweine.includes(i)) face_down(item);
		else if (b.schweine.includes(i)) {
			uischweine.push(item);
			mStyle(iDiv(item), { transform: 'scale(1.05)', origin: 'bottom left' });
		}
	}

	return {
		ctype: 'hand',
		list: list,
		path: path,
		container: cont,
		cardcontainer: cardcont,
		items: items,
		schweine: uischweine,
		harvest: d_harvest,
		rumors: rumorItems,
		keycard: items[0],

	};
}

function post_inspect() {
	let [stage, A, fen, uplayer] = [Z.stage, Z.A, Z.fen, Z.uplayer];
	let item = A.items[A.selected[0]];
	let cards = item.o.items;
	reveal_animation(cards, weiter_post_inspect);
}

function weiter_post_inspect() {
	TO.main = setTimeout(weiter_post_inspect2,2000);
}
function weiter_post_inspect2() {

	console.log('weiter_post_inspect2'); return;
	let [stage, A, fen, uplayer] = [Z.stage, Z.A, Z.fen, Z.uplayer];
	let item = A.items[A.selected[0]];

	let uibuilding = item.o;
	let fenbuilding = lookup(fen, uibuilding.path.split('.'));
	let key = uibuilding.keycard.key;
	let cards = uibuilding.items;
	let newschwein = A.newschwein;

	if (isdef(uibuilding.schweine)) {
		//uplayer gets a rumor from rumor deck
		//output_arr_short(fen.deck_rumors);
		let rumor = fen.deck_rumors[0]; fen.deck_rumors.shift();
		fen.players[uplayer].rumors.push(rumor);
		//console.log('...got rumor', rumor);
		//output_arr_short(fen.deck_rumors);
		ari_history_list([`${uplayer} inspects a schweine!`], 'inspect');

		ari_next_action();
	} else if (building_is_correct(uibuilding)) {
		//uplayer need to chose a rumor card to discard!
		//console.log('')
		Z.stage = 29;
		ari_history_list([`${uplayer} inspects a correct building`], 'inspect');
		ari_pre_action();
	} else {
		//building is not correct: turn _schwein up, both players get a rumor
		//console.log('building is not correct')
		//console.log('building', building);
		A.owner = stringAfter(uibuilding.path, '.');
		A.owner = stringBefore(A.owner, '.');
		ari_history_list([`${uplayer} reveals a schweine!`], 'inspect');
		turn_new_schwein_up(uibuilding);
	}

	// if the building has a schweine, and schweine is closed, _ari_open_rumors, followed by stage: inspect_schwein_beide
	// if the building has no schweine, uplayer needs to select one of his rumors to pay
}



function turn_new_schwein_up(uibuilding) {
	//b is uibuilding
	let key = uibuilding.keycard.key;
	let list = uibuilding.list;

	let schweine = firstCond(list, x => x[0] != key[0]);
	assertion(isdef(schweine), 'WAS DA IST GARKEIN SCHWEIN!!!!!!!!!!', uibuilding);
	let ui = firstCond(uibuilding.items, x => x.key == schweine);
	//console.log('schweine card is',ui)
	face_up(ui);

	let fenbuilding = lookup(Z.fen, uibuilding.path.split('.'));
	uibuilding.schweine = fenbuilding.schweine = schweine;
	ari_open_rumors(32);
}






function post_exchange() {
	let [fen, A, uplayer] = [Z.fen, Z.A, Z.uplayer];
	//there should be exactly 2 selected actions and they should be in different groups
	//the 2 actions correspond to the 2 legal cards to trade!
	if (A.selected.length != 2) {
		select_error('please, select exactly 2 cards!');
		return;
	}
	let i0 = A.items[A.selected[0]];
	let i1 = A.items[A.selected[1]];
	//one of the cards has to be from a building
	let [p0, p1] = [i0.path, i1.path];
	if (p0.includes('build') == p1.includes('build')) {
		select_error('select exactly one building card and one of your hand or stall cards!');
		return;
	}

	exchange_items_in_fen(fen, i0, i1); //replace cards in otree
	//the repaired building loses its _schwein if any!
	//console.log('exchange items', i0, i1);

	let ibuilding = p0.includes('build') ? i0 : i1;
	let fenbuilding = lookup(fen, ibuilding.path.split('.')); //stringBeforeLast(ibuilding.path, '.').split('.'));
	//console.log('fenbuilding', fenbuilding);

	//NEW!!!!
	if (isdef(fenbuilding.schweine) && fenbuilding.schweine.includes(ibuilding.key)) {
		removeInPlace(fenbuilding.schweine, ibuilding.key);
		if (fenbuilding.schweine.length == 0) delete fenbuilding.schweine;
	}
	//fenbuilding.schweine = null; //STIMMT NICHT!!!! KOENNTEN MEHRERE SCHWEINE SEIN!

	ari_history_list([`${uplayer} exchanges card in ${ari_get_building_type(fenbuilding)}`], 'exchange');
	ari_next_action();
}
function process_visit() {
	process_payment();
	let [fen, A, uplayer] = [Z.fen, Z.A, Z.uplayer];
	let item = A.items[A.selected[0]];
	let obuilding = lookup(fen, item.path.split('.'));
	let parts = item.path.split('.');
	let owner = parts[1];

	if (isdef(obuilding.schweine)) {

		Z.stage = 46;
		A.building = item;
		A.obuilding = obuilding;
		A.buildingowner = owner;
		ari_pre_action();
		return;

	} else {

		//this building is revealed
		let cards = item.o.items;
		let key = cards[0].rank;
		//let schweine = false;
		//let schweine = null;
		for (const c of cards) {
			if (c.rank != key) { schweine = true; schweine = c.key; face_up(c); break; }
		}
		if (schweine) {
			if (fen.players[owner].coins > 0) {
				fen.players[owner].coins--;
				fen.players[uplayer].coins++;
			}
			let b = lookup(fen, item.path.split('.'));
			b.schweine = schweine;
		}

		ari_history_list([
			`${uplayer} visited ${ari_get_building_type(obuilding)} of ${owner} resulting in ${schweine ? 'schweine' : 'ok'} ${ari_get_building_type(obuilding)}`,
		], 'visit');

		reveal_animation(cards, () => ari_next_action(fen, uplayer));

		//ari_next_action(fen, uplayer);
	}


}













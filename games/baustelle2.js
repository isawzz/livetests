
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
			add_ui_schwein(item, uischweine);
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
	TO.main = setTimeout(weiter_post_inspect2, 2000);
}
function weiter_post_inspect2() {
	let [stage, A, fen, uplayer] = [Z.stage, Z.A, Z.fen, Z.uplayer];
	let item = A.items[A.selected[0]];
	let uibuilding = item.o;
	let fenbuilding = lookup(fen, uibuilding.path.split('.'));
	let key = uibuilding.keycard.key;
	let cards = uibuilding.items;

	//find candidates for new schwein
	let schweine_cand = [];
	for (let i = 1; i < cards.length; i++) {

		if (fenbuilding.schweine.includes(i)) continue; //if index i is already in schweine, skip this card

		//if card key == key, skip this card
		let card = cards[i];
		if (card.key == key) continue;

		assertion(i == card.index, 'wrong card index!!!!')
		schweine_cand.push(i); //add this card to schweine_cand
	}

	//if candidates have been found
	if (schweine_cand.length > 1) {
		//need to go to another step of selecting the new schwein
		Z.stage = 38;
		A.schweine_cand = schweine_cand;
	} else if (schweine_cand.length == 1) {
		//unique new schwein
		//if this is the first schwein, both players get a rumor!
		let is_first_schwein = isEmpty(fenbuilding.schweine);

		add_schwein(schweine_cand[0], fenbuilding, uibuilding);
		ari_history_list([`${uplayer} reveals a schwein!`], 'inspect');

		if (is_first_schwein) {
			let owner = stringAfter(uibuilding.path, '.');
			owner = stringBefore(owner, '.');
			console.log('owner', owner, 'uplayer', uplayer);
			A.owner = owner;
			ari_open_rumors(32);
		} else {
			let rumor = fen.deck_rumors[0]; fen.deck_rumors.shift();
			fen.players[uplayer].rumors.push(rumor);
			ari_history_list([`${uplayer} inspects a schweine building!`], 'inspect');
			ari_next_action();
		}
	} else if (isEmpty(fenbuilding.schweine)) {
		//this building is completely correct! inspector does NOT get a rumor
		Z.stage = 29;
		ari_history_list([`${uplayer} inspects a correct building`], 'inspect');
		ari_pre_action();
	} else {
		// no new schweine candidate available: do nothing
		// but there are already schweine in this building
		// uplayer gets a rumor but owner does not
		let rumor = fen.deck_rumors[0]; fen.deck_rumors.shift();
		fen.players[uplayer].rumors.push(rumor);
		ari_history_list([`${uplayer} inspects a schweine!`], 'inspect');
		ari_next_action();
	}
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













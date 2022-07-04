
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
		d_rumors = mDiv(d,{display:'flex',gap:2,position:'absolute',h:30,bottom:0,right:0}); //,bg:'green'});
		for(const rumor of b.rumors) {
		 let dr = mDiv(d_rumors, { h:24,w:16,vmargin:3,align:'center',bg:'dimgray',rounding:2 }, null, 'R');
		 rumorItems.push({div:dr,key:rumor});
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


function ui_get_other_buildings_and_rumors(uplayer){
	let items = ui_get_other_buildings(uplayer);
	items = items.concat(ui_get_rumors_items(uplayer));

	reindex_items(items);
	return items;
}













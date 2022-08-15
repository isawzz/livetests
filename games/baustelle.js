

function post_build() {
	let [fen, A, uplayer] = [Z.fen, Z.A, Z.uplayer];
	if (A.selected.length < 4 || A.selected.length > 6) {
		select_error('select 4, 5, or 6 cards to build!');
		return;
	}
	let building_items = A.selected.map(x => A.items[x]); 
	let building_type = building_items.length == 4 ? 'farm' : building_items.length == '5' ? 'estate' : 'chateau';

	//add the building to the fen
	fen.players[uplayer].buildings[building_type].push({ list: building_items.map(x => x.key), h: null, schweine: [], lead: building_items[0].key });

	//remove building_items from hand/stall
	for (const item of building_items) {
		let source = lookup(fen, item.path.split('.'));
		//console.log('item.path', item.path);
		//console.log('source', source);
		removeInPlace(source, item.key);
	}

	ari_history_list([`${uplayer} builds a ${building_type}`], 'build');

	let is_coin_pay = process_payment();

	let ms = 1800;
	if (is_coin_pay) animcoin(Z.uplayer, 1000);
	//animate_build_action(building_items.map(x=>x.o), is_coin_pay, null); //ari_next_action);

	//geht das: einfach presenten?
	remove_ui_items(building_items);

	//find index of new building in fen.players[uplayer].buildings[building_type]
	//make a list of all fen buildings
	let pl = fen.players[uplayer];
	let nfarms=pl.buildings.farm.length;
	let nestates=pl.buildings.estate.length;
	let nchateaus=pl.buildings.chateau.length;
	let index=building_type == 'farm' ? nfarms-1 : building_type == 'estate' ? nfarms+nestates-1 : nfarms+nestates+nchateaus-1;

	console.log('index of new building is', index);
	let ifinal = UI.players[uplayer].indexOfFirstBuilding+index;

	console.log('ifinal', ifinal);


	let dpl = iDiv(UI.players[uplayer]);
	let akku = [];
	while(dpl.children.length > ifinal) {akku.push(dpl.lastChild); dpl.removeChild(dpl.lastChild);}

	let fenbuilding = arrLast(fen.players[uplayer].buildings[building_type]);
	// let d=iDiv(UI.players[uplayer]);
	//ui_type_building(b, d, { maleft: 8 }, `players.${plname}.buildings.${k}.${i}`, type, ari_get_card, true, ishidden);
	let newbuilding = ui_type_building(fenbuilding,dpl,{maleft:8},`players.${uplayer}.buildings.${building_type}.${index}`,building_type,ari_get_card,true,false);
	animbuilding(newbuilding,ms,ari_next_action);

	akku.map(x=>mAppend(dpl,x));

}





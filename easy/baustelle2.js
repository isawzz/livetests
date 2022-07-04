
//#region rumor
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
	lookupAddToList(fenbuilding,['rumors'],rumor.key);
	removeInPlace(fen.players[uplayer].rumors,rumor.key);
	ari_history_list([`${uplayer} added rumor to ${ari_get_building_type(fenbuilding)}`,], 'rumor');

	ari_next_action(fen, uplayer);

}

//#endregion

















function ui_get_rumors_and_players_items(uplayer) {
	//console.log('uplayer',uplayer,UI.players[uplayer])
	let items = [], i = 0;
	let comm = UI.players[uplayer].rumors;
	for (const o of comm.items) {
		let item = { o: o, a: o.key, key: o.key, friendly: o.short, path: comm.path, index: i };
		i++;
		items.push(item);
	}

	let players = [];
	let received = valf(Z.fen.rumor_setup_receivers,[]);
	for(const plname in UI.players) {
		if (plname == uplayer || received.includes(plname)) continue;
		players.push(plname);
	}
	items = items.concat(ui_get_string_items(players));

	assertion(comm.items.length == players.length,'irgendwas stimmt nicht mit rumors verteilung!!!!',players,comm)

	reindex_items(items);
	return items;
}









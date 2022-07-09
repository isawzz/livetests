
function process_rumors_setup() {

	let [fen, A, uplayer, plorder] = [Z.fen, Z.A, Z.uplayer, Z.plorder];

	let items = A.selected.map(x => A.items[x]);
	let receiver = firstCond(items, x => plorder.includes(x.key)).key;
	let rumor = firstCond(items, x => !plorder.includes(x.key));
	if (nundef(receiver) || nundef(rumor)) {
		select_error('you must select exactly one player and one rumor card!');
		return;
	}

	//receiver gets that rumor, aber die verteilung ist erst wenn alle rumors verteilt sind!
	let remaining = fen.players[uplayer].rumors = arrMinus(fen.players[uplayer].rumors, rumor.key);
	lookupAddToList(fen, ['rumor_setup_di', receiver], rumor.key);
	lookupAddToList(fen, ['rumor_setup_receivers'], receiver);
	//console.log('di', fen.rumor_setup_di)

	let next = get_next_player(Z, uplayer);
	if (isEmpty(remaining) && next == plorder[0]) {
		//rumor distrib is complete, goto next stage
		for (const plname of plorder) {
			//if (plname == uplayer) continue;
			let pl = fen.players[plname];
			assertion(isdef(fen.rumor_setup_di[plname]), 'no rumors for ' + plname);
			pl.rumors = fen.rumor_setup_di[plname];
		}
		delete fen.rumor_setup_di;
		delete fen.rumor_setup_receivers;
		[Z.stage, Z.turn] = set_journey_or_stall_stage(fen, Z.options, fen.phase);
	} else if (isEmpty(remaining)) {
		//next rumor round starts
		delete fen.rumor_setup_receivers;
		Z.turn = [next];
	}
	turn_send_move_update();
}
















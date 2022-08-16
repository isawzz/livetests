
function post_comm_setup_stage() {

	//erst uebertrage alle cards from pldata.state.keys to pldata.state.receiver
	let [fen, A, uplayer, plorder, pl] = [Z.fen, Z.A, Z.uplayer, Z.plorder, Z.pl];
	// console.log('OK 3: resolving__________________',uplayer);
	
	// console.log('playerdata',jsCopy(Z.playerdata));
	let achtungHack=false;
	let new_playerdata=[];
	for (const data of Z.playerdata) {
		let o=data;
		if (is_stringified(data)){
			console.log('achtungHack: data is stringified');
			o=JSON.parse(data);
			achtungHack=true;
		}else if (is_stringified(data.state)){
			console.log('achtungHack: data.state is stringified');
			o.state = JSON.parse(data.state);
			achtungHack = true;
		}
		new_playerdata.push(o);
		//if (!isDict(data)) data
		let state = o.state;
		//console.log('state', state)
		let giver = state.giver;
		let receiver = state.receiver;
		let keys = state.keys;
		// console.log('giver', giver, fen.players[giver].commissions)
		// console.log('receiver', receiver, fen.players[receiver].commissions);
		// console.log('state.keys', keys);

		keys.map(x => elem_from_to(x, fen.players[giver].commissions, fen.players[receiver].commissions));
		//fen.players[giver].commissions = arrMinus(fen.players[giver].commissions, keys);
		//fen.players[receiver].commissions = fen.players[receiver].commissions.concat(keys); //arrPlus(fen.players[receiver].commissions, keys);
		//fen.players[receiver].commissions = arrPlus(fen.players[receiver].commissions, keys);
	}
	if (achtungHack) {Z.playerdata = new_playerdata;}

	fen.comm_setup_num -= 1;

	//console.log('OK 4',fen.comm_setup_num);
	// console.log('mimi commissions',pl.commissions);
	// console.log('felix commissions',fen.players.felix.commissions);
	//assertion(fen.comm_setup_num > 1, "fen.comm_setup_num must be > 1");


	//return;

	if (fen.comm_setup_num <= 0) {
		delete fen.comm_setup_di;
		delete fen.comm_setup_num;
		delete fen.keeppolling;
		ari_history_list([`commission trading ends`], 'commissions');

		if (exp_rumors && plorder.length > 2) {
			[Z.stage, Z.turn] = [24, Z.options.mode == 'hotseat' ? [fen.plorder[0]] : fen.plorder]; //fen.keeppolling = true; //[plorder[0]]];
			ari_history_list([`gossiping starts`], 'rumors');

		} else { [Z.stage, Z.turn] = set_journey_or_stall_stage(fen, Z.options, fen.phase); }
	} else {

		//muss auf jeden fen clear aufrufen!
		//mach dasselbe wie beim ersten mal!
		[Z.stage, Z.turn] = [23, Z.options.mode == 'hotseat' ? [fen.plorder[0]] : fen.plorder];
		//
	}

	//DA.hallo=true;
	take_turn_fen_clear();
	//if fen.comm_setup_num is 1, then go to next stage 
	//console.log('fen', fen);
}





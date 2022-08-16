function process_comm_setup() {

	let [fen, A, uplayer, plorder,pl] = [Z.fen, Z.A, Z.uplayer, Z.plorder,Z.pl];
	assertion(fen.keeppolling == true, "keeppolling must be true for process_comm_setup!!!");
	//console.log('OK 1');

	if (DA.hallo) {
		console.log('process_comm_setup:', Z.playerdata, Z.stage,uplayer,pl);
		return;
	}

	//get keys of selected cards
	let items = A.selected.map(x => A.items[x]);
	let next = get_next_player(Z, uplayer);
	let receiver = next;
	let giver = uplayer;
	let keys = items.map(x => x.key);

	//must write to pldata (=Z.state) {giver, receiver, keys}
	Z.state = { giver:giver, receiver:receiver, keys:keys };


	//console.log('uplayer',uplayer,'commissions',pl.commissions);
	//console.log('other player',receiver,'commissions',fen.players[receiver].commissions);

	//console.log('setting playerdata for', giver, 'to', receiver, keys);
	//console.log('Z.state', Z.state);

	assertion(isdef(Z.playerdata), "Z.playerdata must be defined for process_comm_setup!!!");
	let data = firstCond(Z.playerdata, x => x.name == uplayer);
	assertion(isdef(data), `MISSING: playerdata for ${uplayer}`);
	data.state = Z.state;

	//console.log('OK 2');

	//check if playerdata set for all players
	let can_resolve = check_resolve();
	//console.log('can_resolve', can_resolve);
	//if (uplayer == 'felix') return; //************************TEST TEST TEST*************** */
	if (can_resolve) {
		Z.turn = [Z.host];
		Z.stage = 104; //'next_comm_setup_stage';
		take_turn_fen_write();
	} else {
		if (Z.mode == 'hotseat') { Z.turn = [get_next_player(Z, uplayer)]; take_turn_fen_write(); }
		else take_turn_multi();
	}
}
function check_resolve(){
	let can_resolve = true;
	for (const plname of Z.plorder) {
		let data1 = firstCond(Z.playerdata, x => x.name == plname && !isEmpty(x.state));
		if (nundef(data1)) { can_resolve = false; break; }
	}
	return can_resolve;
}
















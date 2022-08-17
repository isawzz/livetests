
const GT = {}; //tables

function db_clear_players(friendly) {
	assertion(isdef(GT[friendly]), `table ${friendly} does NOT exist!!!!`);
	let t = GT[friendly]; //for now only 1 copy!
	//TODO: timestamp are currently NOT SET
	for (const pldata of t.playerdata) { pldata.state = null; pldata.player_status = null; }
	return t.playerdata;
}
function db_write_player(friendly, uname, state, player_status) {
	assertion(isdef(GT[friendly]), `table ${friendly} does NOT exist!!!!`);
	let t = GT[friendly];
	let pldata = firstCond(t.playerdata, x => x.name == uname);
	pldata.state = state;
	pldata.player_status = player_status;
	return t.playerdata;
}
function db_read_playerdata(friendly) {
	assertion(isdef(GT[friendly]), `table ${friendly} does NOT exist!!!!`);
	return GT[friendly].playerdata;
}
function db_write_fen(friendly, fen, scoring=null) {
	assertion(isdef(GT[friendly]), `table ${friendly} does NOT exist!!!!`);
	let t = GT[friendly];
	let table = t.table;
	table.fen = fen; table.scoring = scoring; table.phase = isdef(scoring)? 'over':'';
	return table;
}
function db_read_table(friendly) {
	assertion(isdef(GT[friendly]), `table ${friendly} does NOT exist!!!!`);
	return GT[friendly].table;
}
function db_new_table(friendly, game, host, players, fen, options) {
	let table = { friendly, game, host, players, fen, options };
	//console.log('new table',table)
	//console.log('******************* THE END ********************');
	let playerdata = [];
	//console.log('players', players); //is a list!
	for (const plname of players) {
		playerdata.push({ name: `${plname}`, state: null, player_status: null });
	}
	let res = { table, playerdata };

	GT[friendly] = res;
	return res;
}
function db_table_exists(friendly){ return isdef(GT[friendly]); }
function data_from_client(raw) {
	assertion(is_stringified(raw), 'data should be stringified json!!!!!!!!!!!!!!!', raw);
	let js = JSON.parse(raw);
	return js;
}
function get_now() { return new Date(); }
function apiphp(o,saveFromZ=false) {
	let [data, cmd] = [o.data, o.cmd];
	let result = {}, friendly, uname, state, player_status, fen;
	//console.log('data', data, 'cmd', cmd);

	if (saveFromZ && isdef(data.friendly) && !db_table_exists(data.friendly)) {

		//create such a table and save it from Z data
		// da muss ich sowas aehnliches machen wie in startgame aber halt von Z die daten pullen!
		let res = db_new_table(data.friendly, Z.game, Z.host, jsCopy(Z.playernames), jsCopy(Z.fen), jsCopy(Z.options));
		if (isdef(Z.playerdata)) res.playerdata = jsCopy(Z.playerdata);
		console.log('created table from Z',res);
	}

	if (cmd == 'table') {
		//result.data = data;
		if (isdef(data.auto)) result.auto = data.auto;
		friendly = data.friendly;
		uname = data.uname;
		result.status = "table";
		if (isdef(data.clear_players)) {
			modified = get_now();
			result.playerdata = db_clear_players(friendly);
			result.status = "clear_players";
		} else if (isdef(data.write_player) && isdef(data.state)) {
			//state = json_encode(data.state);
			player_status = isdef(data.player_status) ? data.player_status : '';
			modified = get_now();
			result.playerdata = db_write_player(friendly, uname, data.state, player_status);
			result.status = "write_player";
		} else {
			result.playerdata = db_read_playerdata(friendly);
		}

		if (isdef(data.write_fen)) {
			// fen = json_encode(data.fen);
			// modified = get_now();
			result.table = db_write_fen(friendly, data.fen);
			result.status += " write_fen";
		} else {
			result.table = db_read_table(friendly);
		}

	} else if (cmd == 'startgame') {
		let res = db_new_table(data.friendly, data.game, data.host, data.players, data.fen, data.options);
		result.table = res.table;
		result.playerdata = res.playerdata;
		result.status = `startgame ${data.friendly}`;
	} else if (cmd == 'tables') {
		//console.log('GT', GT);
		result.tables = dict2list(GT, 'friendly').map(x => x.table);
		result.status = "tables";
	} else if (cmd == 'gameover'){
		result.table = db_write_fen(data.friendly, data.fen, data.scoring);
		result.status = `scored table ${data.friendly}`; 
	}
	return result;
}
function sendSIMSIM(o, exclusive = false, saveFromZ=false) {
	o = data_from_client(o);

	//console.log('sending', o);

	let result = apiphp(o,saveFromZ);
	//console.log('result', result);

	let res = JSON.stringify(result);
	if (exclusive) {

		if (isdef(result.table)) {
			//hier sollte der automatische switch von uname passieren!!!
			let turn = lookup(result, ['table', 'fen', 'turn']);
			assertion(isdef(turn), 'turn is NOT defined (_sendSIMSIM) !!!!');
			console.log('turn', turn, 'res', result)
			let uname = turn.length == 1 ? turn[0] : get_next_in_list(U.name, turn);
			if (uname != U.name) switch_uname(uname);
		}

		handle_result(res, o.cmd);

	}

	//if so, can actually just copy and save
	//also, Z.state has to be pasted into playerdata for sender

}






















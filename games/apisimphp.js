
const GT = {}; //tables

function db_clear_players(friendly) {
	assertion(isdef(GT[friendly]), `table ${friendly} does NOT exist!!!!`);
	let t = GT[friendly]; //for now only 1 copy!
	//TODO: timestamp are currently NOT SET
	for (const pldata of t.playerdata) { pldata.state = null; pldata.player_status = null; }
	return t.playerdata;
}
function db_write_player(friendly,uname,state,player_status){
	assertion(isdef(GT[friendly]), `table ${friendly} does NOT exist!!!!`);
	let t = GT[friendly]; 
	let pldata = firstCond(t.playerdata, x => x.name == uname);
	pldata.state = state;
	pldata.player_status = player_status;
	return t.playerdata;
}
function db_read_playerdata(friendly){
	assertion(isdef(GT[friendly]), `table ${friendly} does NOT exist!!!!`);
	return GT[friendly].playerdata; 
}
function db_write_fen(friendly, fen) {
	assertion(isdef(GT[friendly]), `table ${friendly} does NOT exist!!!!`);
	let t = GT[friendly]; 
	let table = t.table;
	table.fen = fen;table.scoring = null;table.phase='';
	return table;
}
function db_read_table(friendly){
	assertion(isdef(GT[friendly]), `table ${friendly} does NOT exist!!!!`);
	return GT[friendly].table; 
}
function db_new_table(friendly,game,host,players,fen,options){
	let table = {friendly,game,host,players,fen,options};
	//console.log('new table',table)
	//console.log('******************* THE END ********************');
	let playerdata = [];
	//console.log('players', players); //is a list!
	for (const plname of players) {
		playerdata.push({name:`${plname}`,state:null,player_status:null});
	}
	let res = {table,playerdata};

	GT[friendly] = res;
	return res;
}

function data_from_client(raw) {
	assertion(is_stringified(raw), 'data should be stringified json!!!!!!!!!!!!!!!', raw);
	let js = JSON.parse(raw);
	return js;
}
function get_now() { return new Date(); }
function apiphp(o) {
	let [data, cmd] = [o.data, o.cmd];
	let result = {},friendly,uname,state,player_status,fen;
	//console.log('data', data, 'cmd', cmd);
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
			result.playerdata = db_write_player(friendly,uname,data.state,player_status);
			result.status = "write_player";
		} else {
			result.playerdata = db_read_playerdata(friendly);
		}

		if (isdef(data.write_fen)) {
			// fen = json_encode(data.fen);
			modified = get_now();
			result.table = db_write_fen(friendly, data.fen);
			result.status += " write_fen";
		} else {
			result.table = db_read_table(friendly);
		}

	}else if (cmd == 'startgame'){
		let res = db_new_table(data.friendly,data.game,data.host,data.players,data.fen,data.options);
		result.table = res.table;
		result.playerdata = res.playerdata;
		result.status = `startgame ${data.friendly}`;
	}
	return result;
}
function sendSIMSIM(o,exclusive=false) {
	o = data_from_client(o);

	//console.log('sending', o);

	let result = apiphp(o);
	//console.log('result', result);

	let res = JSON.stringify(result);
	if (exclusive) handle_result(res,o.cmd);

	//if so, can actually just copy and save
	//also, Z.state has to be pasted into playerdata for sender

}






















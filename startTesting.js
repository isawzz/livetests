onload = start; var FirstLoad = true;
async function start() {

	//DB = await route_path_yaml_dict('./base/DB.yaml');	console.log('DB',DB);	return;

	Serverdata = await load_assets_fetch('./base/', './easy/');
	//console.log('Serverdata',Serverdata);
	let uname = localStorage.getItem('uname');
	//console.log('uname',uname);
	if (isdef(uname)) {
		U = firstCond(Serverdata.users, x => x.name == uname);
		if (!U) U = rChoose(Serverdata.users);
	}
	//console.log('U',U);
	show_home_logo();
	TESTING = true;
	if (nundef(U)) { show_users(); } else { show_username(); }

	start_with_assets();
}
function start_with_assets() { start_tests(); }

function phpPost(o, cmd) {
	//console.log('..????????????????????????.phpPost', arguments);

	clear_transaction();

	if (TESTING && cmd == 'startgame') {
		for (const func of DA.test.mods) func(o);
	}
	if (nundef(o.options) && isdef(Z)) {
		//console.log('_____________no options!!!', cmd, o, Z, '\nturn', 'o', o.turn, 'Z', Z.turn, 'fen', Z.fen.turn);
		o.turn = Z.turn;
		let fen = o.fen;
		let expected = {}; fen.turn.map(x => expected[x] = { stage: fen.stage, step: Z.step });

		o.expected = expected; //Z.expected;
		o.options = Z.options;
		o.game = Z.game;
	}
	switch (cmd) {
		case "gameover": //copyKeys(Z,o,{},['turn']);//show_tables(); break;
		case "move":
		case "table":
		case "startgame":
			let t = pack_table(o);
			//console.log('t', t);

			// let t1 = jsCopy(JSON.parse(t));
			// //console.log('t1', t1); //, 't1.fen.turn', t1.fen.turn);
			// if (isdef(t1.table.fen)) {
			// 	let fen = JSON.parse(t1.table.fen);
			// 	if (isdef(fen)) console.log('.......................\nfen.turn vor handle_result ist:', fen.turn);
			// 	else console.log('WTF!!!.......................\nfen.turn vor handle_result ist:', fen);

			// }else console.log('WTF2aaaaa!!!.......................\nfen.turn vor handle_result ist:', t1.fen);

			handle_result(t, cmd); break;
		default: break; //console.log('unknown command', cmd); break;
	}
}


//stubs & helpers
function get_texture(name) { return `url(/./base/assets/images/textures/${name}.png)`; }
function _poll() { return; }
//function clear_screen() { } //console.log('...clear_screen'); }
function stopgame() { console.log('...stopgame'); }


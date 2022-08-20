function feedback() {
	function setup(players, options) {
		let fen = { players: {}, plorder: jsCopy(players), turn: [players[0]], stage: 'init', phase: '' };
		for (const plname of players) {
			fen.players[plname] = {
				score: 0, name: plname, color: get_user_color(plname),
			};
		}
		fen.items = spotit_item_fen(options);
		if (nundef(options.mode)) options.mode = 'multi';

		//console.log('fen', fen)
		return fen;
	}
	function check_gameover() {
		for (const uname of Z.plorder) {
			let cond = get_player_score(uname) >= Z.options.winning_score;
			if (cond) { Z.fen.winners = [uname]; return Z.fen.winners; }
		}
		return false;
	}
	function state_info(dParent) { spotit_state(dParent); }
	function present(dParent) { spotit_present(dParent); }
	function stats(dParent) { spotit_stats(dParent); }
	function activate_ui() { spotit_activate(); }
	return { setup, activate_ui, check_gameover, present, state_info, stats };
}

function onclick_reset_progressbars() { for (const k in DA.bars) set_bar(k, W_init, 2); }
function onclick_plus(id, inc) { let bar = DA.bars[id]; set_bar(id, bar.w + inc, 1); }
function set_bar(id, val, speed) {
	let bar = DA.bars[id];
	//console.log('bar', bar);
	let goal = Math.min(100, Math.max(0, val));
	if (goal == bar.w) return;
	let i = goal > bar.w ? speed : -speed;

	clearInterval(bar.ti);
	bar.ti = setInterval(() => anim(bar, i, goal), 10);

	function anim(bar, i, goal) {
		if (i < 0 && bar.w <= goal || i > 0 && bar.w >= goal) {
			clearInterval(bar.ti);
		} else {
			bar.w += i;
			bar.div.style.width = bar.w + '%';
		}
	}
}
function feedback_present() {
	dTable = mBy('dTable');
	let dgreen = get_plus_progressbar(dTable, 'green');
	mLinebreak(dTable);
	let dred = get_plus_progressbar(dTable, 'red');
	mLinebreak(dTable);
	mButton('reset', onclick_reset_progressbars, dTable, {h:30,w:100});

	DA.bars = {
		green: dgreen,
		red: dred,
	};
	onclick_reset_progressbars();
	console.log('DA', DA);
}

function get_plus_progressbar(dParent, color, id) {
	//color has to be a word (web color)
	console.log('dParent', dParent);
	if (nundef(id)) id = getUID();
	let d = mDiv(dParent, { }, id, null,'grid_progressbar');
	let button=mButton('+', () => onclick_plus(color, 10),d);
	let d1=mDiv(d,{},null,null,'progressbar');
	let dbar=mDiv(d1,{bg:color},'b_' + color,null,'barstatus');
	return { w: W_init, cont: d, div:dbar, ti: null };
}


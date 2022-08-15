function landing() { if (!TESTING) return; if (isdef(DA.landing)) DA.landing(); } //onclick_by_rank(); } //show_strategy_popup(); } //onclick_random(); }//show_history_popup(); }
function start_tests() {
	//#region old tests
	//dTable = mBy('dTable'); mCenterFlex(dTable); mStyle(dTable, { hmin: 500 }); mClass(dTable, 'wood')
	//ltest6_bluff_skin();	//ltest11_ferro_discard(); //ltest10_ferro_sim();  //ltest5_jokerhtml(); 	//ltest4_sheriff(); 	//ltest0_card();
	//ltest31_ferro_rollback(); //ltest29_ferro_play(); //ltest28_ferro_jolly_complex(); //ltest27_ferro_commands(); //ltest26_ferro_endgame(); //ltest12_ferro_buy();
	//ltest21_spotit(); //ltest20_spotit_adaptive();	//	ltest23_aristo_building_downgrade();
	//test100_partial_sequences(); 
	//ltest44_ferro_7R(); //ltest37_ferro_4_players(); //ltest35_ferro_sequence_anlegen(); //ltest31_ferro_rollback();
	//test_ferro_is_set(); //
	//ltest43_fritz_discard_pile();
	//ltest52_aristo_church_empty(); //ltest23_aristo_building_downgrade(); //ltest50_aristo_church();
	//ltest55_fritz_set_with_same_suits(); //ltest54_fritz_outoftime();
	//ltest56_algo_overlapping_sets(); //
	//ltest55_fritz_set_with_same_suits();
	//console.log('arrFunc',arrFunc(4,rCard));	console.log('rCard',rCard('r'));
	//ltest59_arrTakeLast();
	//ltest65_stamp(); //ltest58_aristo_building_rumor_harvest();
	//ltest69_ferro_is_group(); //
	//ltest70_aristo_church(); //ltest57_aristo();
	//ltest82_ferro(); //ltest85_card_short_text(); //ltest83_svg();
	//ltest89_aristo_journey();
	//ltest93_bluff(); //ltest90_bluff(); //ltest90_bluff_ueberbiete();
	//#endregion
	ltest99_fritz(); //ltest108_animate_coin(); //ltest82_ferro(); //ltest38_ferro_end_of_round(); //ltest109_spotit(); //ltest93_bluff(); //ltest110_auction(); //ltest102_luxurycard(); //ltest101_commission(); //ltest100_auction();//ltest97_find_sequences(); //ltest96_aristo_visit(); //ltest95_aristo_rumor_action();
}

function ltest109_spotit() {
	TESTING = true; DA.testing = true; DA.test = { mods: [], iter: 0, maxiter: 200, running: false, step: true, suiteRunning: false, number: 0, list: [0] };
	DA.test.end = () => { }; 
	DA.auto_moves = [];
	let playernames = [U.name, 'felix'];
	startgame('spotit', playernames.map(x => ({ name: x, playmode: 'human' })), {  });
}
function ltest108_animate_coin() {
	TESTING = true; DA.testing = true; DA.test = { mods: [set_king_phase, give_players_schweine_variety], iter: 0, maxiter: 200, running: false, step: true, suiteRunning: false, number: 0, list: [0] };
	DA.test.end = () => { }; 
	DA.auto_moves = [];
	let playernames = [U.name, 'felix'];

	DA.landing = () => {
		// let d = iDiv(UI.player_stat_items[Z.uplayer]); //.dCoin;
		d=UI.player_stat_items[Z.uplayer].dCoin;
		anim1(d);
		// let els = document.getElementsByTagName('div');
		// //animate all els
		// for (let i = 0; i < els.length; i++) {
		// 	let x = els[i];
		// 	let svg=x.getElementsByTagName('svg')[0];
		// 	if (isdef(svg)) anim1(x);
		// 	//if (startsWith(x.id,'u_') && mGetStyle(x,'height') == 100) anim1(x); 
		// }
		//console.log('was',ui);
		//mPulse3(ui);
		//anipulse(UI.player_stat_items[Z.uplayer].dCoin,3000,()=>console.log('HA!'));		
	};

	startgame('aristo', playernames.map(x => ({ name: x, playmode: 'human' })), { mode: 'hotseat' });
}
function ltest107_aristo_build() {
	TESTING = true; DA.testing = true; DA.test = { mods: [set_king_phase, give_players_schweine_variety], iter: 0, maxiter: 200, running: false, step: true, suiteRunning: false, number: 0, list: [0] };
	DA.test.end = () => { }; //console.log('discard:',Z.fen.deck_discard);}
	DA.auto_moves = [];//[['random']];
	let playernames = [U.name, 'felix'];

	startgame('aristo', playernames.map(x => ({ name: x, playmode: 'human' })), { mode: 'hotseat' });
}
function ltest110_auction() {
	TESTING = true; DA.testing = true; DA.test = { mods: [set_auction_phase], iter: 0, maxiter: 200, running: false, step: true, suiteRunning: false, number: 0, list: [0] };
	DA.test.end = () => { }; //console.log('discard:',Z.fen.deck_discard);}
	DA.auto_moves = [];//[['random']];
	let playernames = [U.name, 'felix']; //, 'amanda', 'lauren'];

	startgame('aristo', playernames.map(x => ({ name: x, playmode: 'human' })), { mode: 'hotseat', commission: 'no', rumors: 'no' });
}
function ltest109_ferro() {
	//let x=length_of_each_array([[3,3,3],[4,4,4,4],[1,1],[5,5,5,5,5],[5,5,5,5,5]]);	console.log('x',x);
	TESTING = true; DA.testing = true; DA.test = { mods: [give_player_achieve_5], iter: 0, maxiter: 200, running: false, step: true, suiteRunning: false, number: 0, list: [0] };
	DA.test.end = () => { }; //console.log('discard:',Z.fen.deck_discard);}
	DA.auto_moves = [];
	let playernames = ['mimi', 'felix', 'gul'];//, 'amanda', 'lauren', 'valerie', 'guest', 'nimble', 'sheeba', 'sarah']; //, 'gul', 'amanda', 'lauren'];
	startgame('ferro', playernames.map(x => ({ name: x, playmode: 'human' })), { mode: 'hotseat' });
}
function ltest108_aristo_inspect_schwein() {
	//console.log('hallo');
	//return;
	TESTING = true; DA.testing = true; DA.test = { mods: [give_players_schweine_variety, set_queen_phase], iter: 0, maxiter: 200, running: false, step: true, suiteRunning: false, number: 0, list: [0] };
	//console.log('hallo!!!!!!!!!!!!!');
	DA.test.end = () => { };
	DA.auto_moves = [];
	let playernames = [U.name, 'felix'];

	startgame('aristo', playernames.map(x => ({ name: x, playmode: 'human' })), { mode: 'hotseat' });
}
function ltest107_aristo_inspect_schwein() {
	TESTING = true; DA.testing = true; DA.test = { mods: [give_players_schwein, set_queen_phase], iter: 0, maxiter: 200, running: false, step: true, suiteRunning: false, number: 0, list: [0] };
	DA.test.end = () => { };
	DA.auto_moves = [];
	let playernames = [U.name, 'felix'];

	startgame('aristo', playernames.map(x => ({ name: x, playmode: 'human' })), { mode: 'hotseat' });
}
function ltest106_aristo_build() {
	TESTING = true; DA.testing = true; DA.test = { mods: [set_king_phase, give_player_only_4_cards], iter: 0, maxiter: 200, running: false, step: true, suiteRunning: false, number: 0, list: [0] };
	DA.test.end = () => { }; //console.log('discard:',Z.fen.deck_discard);}
	DA.auto_moves = [];//[['random']];
	let playernames = [U.name, 'felix'];

	startgame('aristo', playernames.map(x => ({ name: x, playmode: 'human' })), { mode: 'hotseat' });
}
function ltest105_aristo_church() {
	TESTING = true; DA.testing = true;
	// DA.test = { mods: [give_players_stalls, make_church, set_player_tithes], iter: 0, maxiter: 200, running: false, step: true, suiteRunning: false, number: 0, list: [0] };
	DA.test = { mods: [give_players_stalls, make_church], iter: 0, maxiter: 200, running: false, step: true, suiteRunning: false, number: 0, list: [0] };
	DA.test.end = () => { }; //console.log('discard:',Z.fen.deck_discard);}
	DA.auto_moves = [];//[['random']];
	let playernames = [U.name, 'felix']; //, 'gul', 'amanda', 'lauren'];

	startgame('aristo', playernames.map(x => ({ name: x, playmode: 'human' })), { mode: 'hotseat' });
}
function ltest104_aristo() {
	TESTING = true; DA.testing = true; DA.test = { mods: [], iter: 0, maxiter: 200, running: false, step: true, suiteRunning: false, number: 0, list: [0] };
	DA.test.end = () => { }; //console.log('discard:',Z.fen.deck_discard);}
	DA.auto_moves = [];//[['random']];
	let playernames = [U.name, 'felix'];

	startgame('aristo', playernames.map(x => ({ name: x, playmode: 'human' })), { mode: 'hotseat' });
}
function ltest103_aristo_journey() {
	TESTING = true; DA.testing = true; DA.test = { mods: [give_player_luxury_cards], iter: 0, maxiter: 200, running: false, step: true, suiteRunning: false, number: 0, list: [0] };
	DA.test.end = () => { }; //console.log('discard:',Z.fen.deck_discard);}
	DA.auto_moves = [];//[['random']];
	let playernames = [U.name, 'felix']; //, 'amanda', 'lauren'];

	startgame('aristo', playernames.map(x => ({ name: x, playmode: 'human' })), { mode: 'hotseat', commission: 'no', rumors: 'no' });
}
function ltest102_luxurycard() {
	let dTable = mBy('dTable'); clearElement(dTable); mStyle(dTable, { hmin: 400 });
	drawcard('AHl', dTable, 300);
	drawcard('AHl', dTable, 200);
	drawcard('AHl', dTable, 100);
}
function ltest101_commission() {
	TESTING = true; DA.testing = true; DA.test = { mods: [set_queen_phase, give_player_multiple_commission_cards], iter: 0, maxiter: 200, running: false, step: true, suiteRunning: false, number: 0, list: [0] };
	DA.test.end = () => { }; //console.log('discard:',Z.fen.deck_discard);}
	DA.auto_moves = [];//[['random']];
	let playernames = [U.name, 'felix']; //, 'amanda', 'lauren'];

	startgame('aristo', playernames.map(x => ({ name: x, playmode: 'human' })), { mode: 'hotseat', commission: 'yes', rumors: 'no' });
}
function ltest100_auction() {
	TESTING = true; DA.testing = true; DA.test = { mods: [set_auction_phase], iter: 0, maxiter: 200, running: false, step: true, suiteRunning: false, number: 0, list: [0] };
	DA.test.end = () => { }; //console.log('discard:',Z.fen.deck_discard);}
	DA.auto_moves = [];//[['random']];
	let playernames = [U.name, 'felix']; //, 'amanda', 'lauren'];

	startgame('aristo', playernames.map(x => ({ name: x, playmode: 'human' })), { mode: 'hotseat', commission: 'no', rumors: 'no' });
}
function ltest99_fritz() {
	TESTING = true; DA.testing = true; DA.test = { mods: [], iter: 0, maxiter: 200, running: false, step: true, suiteRunning: false, number: 0, list: [0] };
	DA.test.end = () => { }; //console.log('discard:',Z.fen.deck_discard);}
	DA.auto_moves = [];//[['random']];
	let playernames = [U.name, 'felix']; //, 'amanda', 'lauren'];

	startgame('fritz', playernames.map(x => ({ name: x, playmode: 'human' })), { mode: 'hotseat', commission: 'no', rumors: 'no' });
}
function ltest98_weired_blatt_aendern() {
	TESTING = true; DA.testing = true; DA.test = { mods: [give_players_hand_A2], iter: 0, maxiter: 200, running: false, step: true, suiteRunning: false, number: 0, list: [0] };
	DA.test.end = () => { }; //console.log('discard:',Z.fen.deck_discard);}
	DA.auto_moves = [];//[['random']];
	let playernames = [U.name, 'felix']; //, 'amanda', 'lauren'];

	startgame('aristo', playernames.map(x => ({ name: x, playmode: 'human' })), { mode: 'hotseat', commission: 'no', rumors: 'no' });
}
function ltest97_find_sequences() {
	let x = follows_in_rank('ACn', '2Cn', 'A23456789TJQK');
	console.log('follows', x);
	x = find_sequences(['ACn', '2Cn', '3Hn', '5Hn', '7Hn', '7Sn', '7Cn', '7Dn'], 2, 'A23456789TJQK');
	console.log('follows', x);
}
function ltest96_aristo_visit() {
	TESTING = true; DA.testing = true; DA.test = { mods: [give_players_schwein, set_queen_phase, give_player_queen], iter: 0, maxiter: 200, running: false, step: true, suiteRunning: false, number: 0, list: [0] };
	DA.test.end = () => { }; //console.log('discard:',Z.fen.deck_discard);}
	DA.auto_moves = [];//[['random']];
	let playernames = [U.name, 'felix', 'amanda', 'lauren'];
	startgame('aristo', playernames.map(x => ({ name: x, playmode: 'human' })), { mode: 'hotseat', commission: 'no', rumors: 'no' });
}
function ltest95_aristo_rumor_action() {
	TESTING = true; DA.testing = true; DA.test = { mods: [give_players_buildings_plus, set_queen_phase, give_player_king], iter: 0, maxiter: 200, running: false, step: true, suiteRunning: false, number: 0, list: [0] };
	DA.test.end = () => { }; //console.log('discard:',Z.fen.deck_discard);}
	DA.auto_moves = [];//[['random']];
	let playernames = [U.name, 'felix', 'amanda', 'lauren'];
	startgame('aristo', playernames.map(x => ({ name: x, playmode: 'human' })), { mode: 'hotseat' });
}
function ltest94_aristo_journey() {
	TESTING = true; DA.testing = true; DA.test = { mods: [give_players_hand_journey], iter: 0, maxiter: 200, running: false, step: true, suiteRunning: false, number: 0, list: [0] };
	DA.test.end = () => { }; //console.log('discard:',Z.fen.deck_discard);}
	DA.auto_moves = [];//[['random']];
	let playernames = [U.name, 'felix']; //, 'amanda', 'lauren'];

	startgame('aristo', playernames.map(x => ({ name: x, playmode: 'human' })), { mode: 'hotseat', commission: 'no', rumors: 'no' });
}
function ltest93_bluff() {
	TESTING = true; DA.testing = true; DA.test = { mods: [], iter: 0, maxiter: 200, running: false, step: true, suiteRunning: false, number: 0, list: [0] };
	DA.test.end = () => { }; //console.log('discard:',Z.fen.deck_discard);}
	DA.auto_moves = [];//[['random']];
	let playernames = [U.name, 'felix', 'amanda', 'lauren'];

	startgame('bluff', playernames.map(x => ({ name: x, playmode: 'human' })), { mode: 'hotseat' });
}
function ltest92_bluff_bots() {
	TESTING = true; DA.testing = true; DA.test = { mods: [], iter: 0, maxiter: 200, running: false, step: true, suiteRunning: false, number: 0, list: [0] };
	DA.test.end = () => { }; //console.log('discard:',Z.fen.deck_discard);}
	DA.auto_moves = [];//[['random']];

	let playernames = ['mimi', 'lauren', 'felix'];
	let playmodes = ['bot', 'bot', 'bot'];
	let strategy = ['random', 'perfect', 'clairvoyant'];
	let i = 0; let players = playernames.map(x => ({ name: x, strategy: strategy[i], playmode: playmodes[i++] }));
	let options = { mode: 'hotseat' };
	startgame('bluff', players, options);
}
function ltest91_bluff_strategy() {
	TESTING = true; DA.testing = true; DA.test = { mods: [], iter: 0, maxiter: 200, running: false, step: true, suiteRunning: false, number: 0, list: [0] };
	DA.test.end = () => { }; //console.log('discard:',Z.fen.deck_discard);}
	DA.auto_moves = [];//[['random']];

	let playernames = ['mimi', 'lauren', 'felix'];
	let playmodes = ['human', 'bot', 'bot'];
	let strategy = ['', 'random', 'clairvoyant'];
	let i = 0; let players = playernames.map(x => ({ name: x, strategy: strategy[i], playmode: playmodes[i++] }));
	let options = { mode: 'hotseat' };
	startgame('bluff', players, options);
}
function ltest90_bluff_ueberbiete() {
	TESTING = true; DA.testing = true; DA.test = { mods: [bluff_start_bid], iter: 0, maxiter: 200, running: false, step: true, suiteRunning: false, number: 0, list: [0] };
	DA.test.end = () => { }; //console.log('discard:',Z.fen.deck_discard);}
	DA.auto_moves = [];//[['random']];
	let playernames = [U.name, 'felix', 'amanda', 'lauren'];

	startgame('bluff', playernames.map(x => ({ name: x, playmode: 'human' })), { mode: 'hotseat' });
}
function ltest90_bluff() {
	TESTING = true; DA.testing = true; DA.test = { mods: [], iter: 0, maxiter: 200, running: false, step: true, suiteRunning: false, number: 0, list: [0] };
	DA.test.end = () => { }; //console.log('discard:',Z.fen.deck_discard);}
	DA.auto_moves = [];//[['random']];
	let playernames = [U.name, 'felix', 'amanda', 'lauren'];

	startgame('bluff', playernames.map(x => ({ name: x, playmode: 'human' })), { mode: 'hotseat' });
}
function ltest89_aristo_journey() {
	TESTING = true; DA.testing = true; DA.test = { mods: [], iter: 0, maxiter: 200, running: false, step: true, suiteRunning: false, number: 0, list: [0] };
	DA.test.end = () => { }; //console.log('discard:',Z.fen.deck_discard);}
	DA.auto_moves = [];//[['random']];
	let playernames = [U.name, 'felix', 'amanda', 'lauren'];

	startgame('aristo', playernames.map(x => ({ name: x, playmode: 'human' })), { mode: 'hotseat', commission: 'no', rumors: 'no' });
}
function ltest88_aristo_market() {
	TESTING = true; DA.testing = true; DA.test = { mods: [give_players_stalls], iter: 0, maxiter: 200, running: false, step: true, suiteRunning: false, number: 0, list: [0] };
	DA.test.end = () => { }; //console.log('discard:',Z.fen.deck_discard);}
	DA.auto_moves = [];//[['random']];
	let playernames = [U.name, 'felix'];

	startgame('aristo', playernames.map(x => ({ name: x, playmode: 'human' })), { mode: 'hotseat' });
}
function ltest87_aristo() {
	TESTING = true; DA.testing = true; DA.test = { mods: [], iter: 0, maxiter: 200, running: false, step: true, suiteRunning: false, number: 0, list: [0] };
	DA.test.end = () => { }; //console.log('discard:',Z.fen.deck_discard);}
	DA.auto_moves = [];//[['random']];
	let playernames = [U.name, 'felix'];

	startgame('aristo', playernames.map(x => ({ name: x, playmode: 'human' })), { mode: 'hotseat' });
}
function ltest86_ferro() {
	TESTING = true; DA.testing = true; DA.test = { mods: [give_player_two_ferro_sets, make_long_history], iter: 0, maxiter: 200, running: false, step: true, suiteRunning: false, number: 0, list: [0] };
	DA.test.end = () => { }; //console.log('discard:',Z.fen.deck_discard);}
	DA.auto_moves = [];
	let playernames = ['mimi', 'felix', 'gul'];//, 'amanda', 'lauren', 'valerie', 'guest', 'nimble', 'sheeba', 'sarah']; //, 'gul', 'amanda', 'lauren'];
	startgame('ferro', playernames.map(x => ({ name: x, playmode: 'human' })), { mode: 'hotseat' });
}
function ltest85_card_short_text() {
	let dTable = mBy('dTable'); clearElement(dTable); mStyle(dTable, { hmin: 400 });

	// let [d,ckey,sz]=[mDiv(dTable,{},null,`hallo das ist ein <span style='color:green;font-size:20px'>&spadesuit;</span>K`),'KSn',25];
	let ckey = 'KCn';
	let sz = 20;
	//let d=mDiv(dTable,{},null,`hallo das ist ein ${mSuit(ckey,sz)}K`);
	let d = mDiv(dTable, {}, null, `hallo das ist ein ${mCardText(ckey)}.`);
	return;
	//let card = cBlank(dTable); let d = iDiv(card); let sz = card.h / 6;
	// let [d,ckey,sz]=[mDiv(dTable,{},null,'hallo das ist ein '),'KSn',25];
	// let s1 = mSuit(ckey, d, { w: sz, h: sz }); //console.log('s1', s1);
	// mStyle(s1,{display:'inline-block',matop:4});
	// d.innerHTML += 'K';
}
function ltest84_svg() {
	let dTable = mBy('dTable'); clearElement(dTable); mStyle(dTable, { hmin: 400 })
	let card = cBlank(dTable); let d = iDiv(card); let sz = card.h / 6;
	let i = 0;
	for (let suit of ['H', 'S', 'D', 'C']) {
		let s1 = mSuit(suit, d, { w: sz, h: sz }); //console.log('s1', s1);
		mPos(s1, sz * i, 0); i++;
	}
}
function ltest83_svg() {
	dTable = mBy('dTexture'); mCenterFlex(dTable); mStyle(dTable, { hmin: 500 }); mClass(dTable, 'wood');
	mStyle(dTable, { gap: 10 });
	let card;
	card = cBlankSvg(dTable);
	console.log('card', card); //mClass(iDiv(card),'hoverScale')
	let g = iG(card); //console.log('g', g);

	//1 produce
	let x = mgSuit('Pik'); //console.log('x', x);
	//2 attach
	//mAppend(iG(card),x); // braucht man nicht!
	//3 size
	mgSize(x, 40);
	//4 position
	mgPos(card, x); //,50,50);
}
function ltest83_ferro_multi() {
	TESTING = true; DA.testing = true; DA.test = { mods: [], iter: 0, maxiter: 200, running: false, step: true, suiteRunning: false, number: 0, list: [0] };
	DA.test.end = () => { }; //console.log('discard:',Z.fen.deck_discard);}
	DA.auto_moves = [];//[['random']];
	let playernames = ['mimi', 'felix']; //, 'gul', 'amanda']; //, 'lauren', 'valerie', 'guest', 'nimble', 'sheeba', 'sarah']; //, 'gul', 'amanda', 'lauren'];
	startgame('ferro', playernames.map(x => ({ name: x, playmode: 'human' })), { mode: 'multi' });
}
function ltest82_ferro() {
	TESTING = true; DA.testing = true; DA.test = { mods: [make_long_history], iter: 0, maxiter: 200, running: false, step: true, suiteRunning: false, number: 0, list: [0] };
	DA.test.end = () => { }; //console.log('discard:',Z.fen.deck_discard);}
	DA.auto_moves = [];
	let playernames = ['mimi', 'felix', 'gul'];//, 'amanda', 'lauren', 'valerie', 'guest', 'nimble', 'sheeba', 'sarah']; //, 'gul', 'amanda', 'lauren'];
	startgame('ferro', playernames.map(x => ({ name: x, playmode: 'human' })), { mode: 'hotseat' });
}
function ltest81_spotit_multi() {
	TESTING = true; DA.testing = true; DA.test = { mods: [make_long_history], iter: 0, maxiter: 200, running: false, step: true, suiteRunning: false, number: 0, list: [0] };
	DA.test.end = () => { }; //console.log('discard:',Z.fen.deck_discard);}
	DA.auto_moves = [];//[['random']];
	let playernames = ['mimi', 'felix']; //, 'gul', 'amanda', 'lauren'];
	startgame('spotit', playernames.map(x => ({ name: x, playmode: 'human' })), { mode: 'multi' });
}
function ltest80_fritz_multi() {
	TESTING = true; DA.testing = true; DA.test = { mods: [make_long_history], iter: 0, maxiter: 200, running: false, step: true, suiteRunning: false, number: 0, list: [0] };
	DA.test.end = () => { }; //console.log('discard:',Z.fen.deck_discard);}
	DA.auto_moves = [];//[['random']];
	let playernames = ['mimi', 'felix']; //, 'gul', 'amanda', 'lauren'];
	startgame('fritz', playernames.map(x => ({ name: x, playmode: 'human' })), { mode: 'multi' });
}
function ltest79_bluff_multi() {
	TESTING = true; DA.testing = true; DA.test = { mods: [make_long_history], iter: 0, maxiter: 200, running: false, step: true, suiteRunning: false, number: 0, list: [0] };
	DA.test.end = () => { }; //console.log('discard:',Z.fen.deck_discard);}
	DA.auto_moves = [];//[['random']];
	let playernames = ['mimi', 'felix']; //, 'gul', 'amanda', 'lauren'];
	startgame('bluff', playernames.map(x => ({ name: x, playmode: 'human' })), { mode: 'multi' });
}
function ltest78_aristo_church() {
	TESTING = true; DA.testing = true; DA.test = { mods: [give_players_stalls, make_church], iter: 0, maxiter: 200, running: false, step: true, suiteRunning: false, number: 0, list: [0] };
	DA.test.end = () => { }; //console.log('discard:',Z.fen.deck_discard);}
	DA.auto_moves = [['random'], ['random']];
	let playernames = [U.name, 'felix']; //, 'gul', 'amanda', 'lauren'];
	startgame('aristo', playernames.map(x => ({ name: x, playmode: 'human' })), { mode: 'hotseat' });
}
function ltest77_aristo_church() {
	TESTING = true; DA.testing = true; DA.test = { mods: [give_players_stalls, make_church], iter: 0, maxiter: 200, running: false, step: true, suiteRunning: false, number: 0, list: [0] };
	DA.test.end = () => { }; //console.log('discard:',Z.fen.deck_discard);}
	DA.auto_moves = [];//[['random']];
	let playernames = [U.name, 'felix', 'leo', 'gul']; //, 'gul', 'amanda', 'lauren'];
	startgame('aristo', playernames.map(x => ({ name: x, playmode: 'human' })), { mode: 'hotseat' });
}
function ltest76_aristo_multi() {
	TESTING = true; DA.testing = true; DA.test = { mods: [make_long_history], iter: 0, maxiter: 200, running: false, step: true, suiteRunning: false, number: 0, list: [0] };
	DA.test.end = () => { }; //console.log('discard:',Z.fen.deck_discard);}
	DA.auto_moves = [];//[['random']];
	let playernames = ['mimi', 'felix', 'gul'];
	startgame('aristo', playernames.map(x => ({ name: x, playmode: 'human' })), { mode: 'multi', rumors: 'no', commission: 'no', journey: 'no' });
}
function ltest75_ferro_multi() {
	TESTING = true; DA.testing = true; DA.test = { mods: [make_long_history], iter: 0, maxiter: 200, running: false, step: true, suiteRunning: false, number: 0, list: [0] };
	DA.test.end = () => { }; //console.log('discard:',Z.fen.deck_discard);}
	DA.auto_moves = [['random']];//[['random']];
	let playernames = ['mimi', 'felix', 'gul', 'amanda', 'lauren', 'valerie', 'guest', 'nimble', 'sheeba', 'sarah']; //, 'gul', 'amanda', 'lauren'];
	startgame('ferro', playernames.map(x => ({ name: x, playmode: 'human' })), { mode: 'multi' });
}
function ltest74_ferro_scroll_history() {
	TESTING = true; DA.testing = true; DA.test = { mods: [make_long_history], iter: 0, maxiter: 200, running: false, step: true, suiteRunning: false, number: 0, list: [0] };
	DA.test.end = () => { }; //console.log('discard:',Z.fen.deck_discard);}
	DA.auto_moves = [];//[['random']];
	let playernames = ['mimi', 'felix', 'gul', 'amanda', 'lauren', 'valerie', 'guest', 'nimble', 'sheeba', 'sarah']; //, 'gul', 'amanda', 'lauren'];
	startgame('ferro', playernames.map(x => ({ name: x, playmode: 'human' })), { mode: 'hotseat' });
}
function ltest73_ferro_deck_empty() {
	TESTING = true; DA.testing = true; DA.test = { mods: [make_deck_empty], iter: 0, maxiter: 200, running: false, step: true, suiteRunning: false, number: 0, list: [0] };
	DA.test.end = () => { }; //console.log('discard:',Z.fen.deck_discard);}
	DA.auto_moves = [];//[['random']];
	let playernames = [U.name, 'felix', 'gul', 'amanda', 'lauren', 'valerie', 'guest', 'nimble', 'sheeba', 'sarah']; //, 'gul', 'amanda', 'lauren'];
	startgame('ferro', playernames.map(x => ({ name: x, playmode: 'human' })), { mode: 'hotseat' });
}
function ltest72_ferro() {
	TESTING = true; DA.testing = true; DA.test = { mods: [], iter: 0, maxiter: 200, running: false, step: true, suiteRunning: false, number: 0, list: [0] };
	DA.test.end = () => { }; //console.log('discard:',Z.fen.deck_discard);}
	DA.auto_moves = [];//[['random']];
	let playernames = [U.name, 'felix', 'gul', 'amanda', 'lauren', 'valerie', 'guest', 'nimble', 'sheeba', 'sarah']; //, 'gul', 'amanda', 'lauren'];
	startgame('ferro', playernames.map(x => ({ name: x, playmode: 'human' })), { mode: 'hotseat' });
}
function ltest71_ferro() {
	TESTING = true; DA.testing = true; DA.test = { mods: [], iter: 0, maxiter: 200, running: false, step: true, suiteRunning: false, number: 0, list: [0] };
	DA.test.end = () => { }; //console.log('discard:',Z.fen.deck_discard);}
	DA.auto_moves = [];//[['random']];
	let playernames = [U.name, 'felix', 'leo', 'gul']; //, 'gul', 'amanda', 'lauren'];

	startgame('ferro', playernames.map(x => ({ name: x, playmode: 'human' })), { mode: 'hotseat' });
}
function ltest70_aristo_church() {
	TESTING = true; DA.testing = true; DA.test = { mods: [give_players_stalls, make_church], iter: 0, maxiter: 200, running: false, step: true, suiteRunning: false, number: 0, list: [0] };
	DA.test.end = () => { }; //console.log('discard:',Z.fen.deck_discard);}
	DA.auto_moves = [];//[['random']];
	let playernames = [U.name, 'felix', 'leo', 'gul']; //, 'gul', 'amanda', 'lauren'];
	startgame('aristo', playernames.map(x => ({ name: x, playmode: 'human' })), { mode: 'hotseat' });
}
function ltest69_ferro_is_group() {
	let j = ['*Hn', '8Dn', '8Hn'];
	let x = is_group(j);
	console.log('is_group', x);
	j = ['8Hn', '*Dn', '8Hn'];
	x = is_group(j);
	console.log('is_group', x);
}
function ltest68_aristo_blackmail_owner_defend() {
	TESTING = true; DA.testing = true; DA.test = { mods: [set_blackmail_owner_stage_defend], iter: 0, maxiter: 200, running: false, step: true, suiteRunning: false, number: 0, list: [0] };
	DA.test.end = () => { }; //console.log('discard:',Z.fen.deck_discard);}
	DA.auto_moves = [];//[['random']];
	startgame('aristo', [{ name: U.name, playmode: 'human' }, { name: 'amanda', playmode: 'human' }], { mode: 'hotseat' });
}
function ltest67_aristo_blackmail_owner() {
	TESTING = true; DA.testing = true; DA.test = { mods: [set_blackmail_owner_stage], iter: 0, maxiter: 200, running: false, step: true, suiteRunning: false, number: 0, list: [0] };
	DA.test.end = () => { }; //console.log('discard:',Z.fen.deck_discard);}
	DA.auto_moves = [];//[['random']];
	startgame('aristo', [{ name: U.name, playmode: 'human' }, { name: 'amanda', playmode: 'human' }], { mode: 'hotseat' });
}
function ltest66_stamp_style() {
	dTable = mBy('dTable'); mClass('dTexture', 'wood'); mCenterFlex(dTable);
	//let d=mDiv(dTable,{},null,'HALLO');
	let hand = ['2Hn', '3Hn', '4Hn', '5Hn', '6Hn', '7Hn', '8Hn', '9Hn', 'THn', 'JHn', 'QHn', 'KHn', 'AHn'];
	let ui = ui_type_hand(hand, dTable);
	mStamp(ui.container, 'blackmail');
}
function ltest65_stamp() {
	TESTING = true; DA.testing = true; DA.test = { mods: [], iter: 0, maxiter: 200, running: false, step: true, suiteRunning: false, number: 0, list: [0] };
	DA.test.end = () => { }; //console.log('discard:',Z.fen.deck_discard);}
	DA.auto_moves = [];//[['random']];
	startgame('aristo', [{ name: U.name, playmode: 'human' }, { name: 'amanda', playmode: 'human' }], { mode: 'hotseat' });
}
function ltest64_aristo_blackmailed_building() {
	TESTING = true; DA.testing = true; DA.test = { mods: [give_other_blackmailed_building], iter: 0, maxiter: 200, running: false, step: true, suiteRunning: false, number: 0, list: [0] };
	DA.test.end = () => { }; //console.log('discard:',Z.fen.deck_discard);}
	DA.auto_moves = [];//[['random']];
	startgame('aristo', [{ name: U.name, playmode: 'human' }, { name: 'amanda', playmode: 'human' }], { mode: 'hotseat' });
}
function ltest63_aristo_blackmail() {
	TESTING = true; DA.testing = true; DA.test = { mods: [give_other_various_buildings, set_queen_phase], iter: 0, maxiter: 200, running: false, step: true, suiteRunning: false, number: 0, list: [0] };
	DA.test.end = () => { }; //console.log('discard:',Z.fen.deck_discard);}
	DA.auto_moves = [];//[['random']];
	startgame('aristo', [{ name: U.name, playmode: 'human' }, { name: 'amanda', playmode: 'human' }], { mode: 'hotseat' });
}
function ltest62_aristo_inspect_closed_schwein() {
	TESTING = true; DA.testing = true; DA.test = { mods: [x => give_players_schwein(x, false), add_rumors_to_buildings], iter: 0, maxiter: 200, running: false, step: true, suiteRunning: false, number: 0, list: [0] };
	DA.test.end = () => { }; //console.log('discard:',Z.fen.deck_discard);}
	DA.auto_moves = [];//[['random']];
	startgame('aristo', [{ name: U.name, playmode: 'human' }, { name: 'amanda', playmode: 'human' }], { mode: 'hotseat' });
}
function ltest61_aristo_inspect_correct() {
	TESTING = true; DA.testing = true; DA.test = { mods: [give_players_buildings, add_rumors_to_buildings], iter: 0, maxiter: 200, running: false, step: true, suiteRunning: false, number: 0, list: [0] };
	DA.test.end = () => { }; //console.log('discard:',Z.fen.deck_discard);}
	DA.auto_moves = [];//[['random']];
	startgame('aristo', [{ name: U.name, playmode: 'human' }, { name: 'amanda', playmode: 'human' }], { mode: 'hotseat' });
}
function ltest60_aristo_inspect_schwein() {
	TESTING = true; DA.testing = true; DA.test = { mods: [give_players_schwein, add_rumors_to_buildings], iter: 0, maxiter: 200, running: false, step: true, suiteRunning: false, number: 0, list: [0] };
	DA.test.end = () => { }; //console.log('discard:',Z.fen.deck_discard);}
	DA.auto_moves = [];//[['random']];
	startgame('aristo', [{ name: U.name, playmode: 'human' }, { name: 'amanda', playmode: 'human' }], { mode: 'hotseat' });
}
function ltest59_arrTakeLast() {
	let x = arrTakeLast([0, 1, 2, 3, 4, 5], 3, 2); console.log('x', x);
	x = arrTakeLast({ blue: 1, red: 2, green: 3 }, 2, 2); console.log('x', x);
	x = arrTakeLast([0, 1, 2, 3, 4, 5], 10, 0); console.log('x', x);
}
function ltest58_aristo_building_rumor_harvest() {
	TESTING = true; DA.testing = true; DA.test = { mods: [give_players_buildings_plus, add_rumors_to_buildings, give_player_queen], iter: 0, maxiter: 200, running: false, step: true, suiteRunning: false, number: 0, list: [0] };
	DA.test.end = () => { }; //console.log('discard:',Z.fen.deck_discard);}
	DA.auto_moves = [];//[['random']];
	startgame('aristo', [{ name: U.name, playmode: 'human' }, { name: 'amanda', playmode: 'human' }], { mode: 'hotseat' });
}
function ltest57_aristo() {
	TESTING = true; DA.testing = true; DA.test = { mods: [], iter: 0, maxiter: 200, running: false, step: true, suiteRunning: false, number: 0, list: [0] };
	DA.test.end = () => { }; //console.log('discard:',Z.fen.deck_discard);}
	DA.auto_moves = [];//[['random']];
	let playernames = [U.name, 'felix'];

	startgame('aristo', playernames.map(x => ({ name: x, playmode: 'human' })), { mode: 'hotseat' });
}
function ltest56_algo_overlapping_sets() {
	// let cards = ['2Hn','3Hn','4Hn','5Hn','6Hn','7Hn','7Cn','7Dn','7Hn'].map(x=>({key:x,suit:x[0],rank:x[1]}));
	let cards = ['2Hn', '3Hn', '4Hn', '5Hn', '6Hn', '7Hn', '7Cn', '7Dn', '7Hn'].map(x => fritz_get_card(x));
	let res = is_overlapping_set(cards, 1, 3, false); //ok
	console.log('res:', res);

	res = is_overlapping_set(['2Hn', '3Hn', '4Hn', '3Hn', '2Hn'].map(x => fritz_get_card(x)), 1, 3, false); //ok
	console.log('res:', res);

	res = is_overlapping_set(['2Hn', '3Hn', '4Hn', '3Hn'].map(x => fritz_get_card(x)), 1, 3, false); //false ok
	console.log('res:', res);

	res = is_overlapping_set(['2Hn', '3Hn', '3Hn', '3Cn'].map(x => fritz_get_card(x)), 1, 3, false); //false ok
	console.log('res:', res);

	res = is_overlapping_set(['2Hn', '3Hn', '4Hn', '5Hn', '5Cn', '5Dn', '5Cn', '5Hn'].map(x => fritz_get_card(x)), 1, 3, false); //ok
	console.log('res:', res);

	res = is_overlapping_set(['2Hn', '3Hn', '4Hn', '5Hn', '5Cn', '5Cn', '5Cn', '5Hn', '6Hn', '7Hn'].map(x => fritz_get_card(x)), 1, 3, false); //false ok
	console.log('res:', res);

	res = is_overlapping_set(['2Hn', '*Hn', '2Cn', '3Hn', '4Cn'].map(x => fritz_get_card(x)), 1, 3, false);
	console.log('res:', res);

	res = is_overlapping_set(['2Hn', '*Hn', '2Cn', '3Cn', '4Cn'].map(x => fritz_get_card(x)), 1, 3, false);
	console.log('res:', res);

	res = is_overlapping_set(['4Hn', '3Hn', '2Hn', '2Cn', '2Sn', '3Sn', '4Sn'].map(x => fritz_get_card(x)), 1, 3, false); //ok
	console.log('res:', res);

	res = is_overlapping_set(['4Hn', '3Hn'].map(x => fritz_get_card(x)), 1, 3, false); //ok FEHLER!!!
	console.log('res:', res);

	res = is_overlapping_set(['4Hn'].map(x => fritz_get_card(x)), 1, 3, false); //ok FEHLER!!!
	console.log('res:', res);
}
function ltest55_fritz_set_with_same_suits() {
	DA.magnify_on_select = true;
	TESTING = true; DA.testing = true; DA.test = {
		mods: [give_player_hand_groups], iter: 0, maxiter: 200, running: false, step: true, suiteRunning: false, number: 0, list: [0]
	};
	DA.test.end = () => { };
	DA.auto_moves = [];
	startgame('fritz', [{ name: U.name, playmode: 'human' }, { name: 'amanda', playmode: 'human' }], { mode: 'hotseat' });

}
function ltest54_fritz_outoftime() {
	DA.magnify_on_select = true;
	TESTING = true; DA.testing = true; DA.test = {
		mods: [make_both_run_out_of_time], iter: 0, maxiter: 200, running: false, step: true, suiteRunning: false, number: 0, list: [0]
	};
	DA.test.end = () => { };
	DA.auto_moves = [];
	startgame('fritz', [{ name: U.name, playmode: 'human' }, { name: 'amanda', playmode: 'human' }], { mode: 'hotseat' });

}
function ltest53_fritz_endround() {
	DA.magnify_on_select = true;
	TESTING = true; DA.testing = true; DA.test = {
		mods: [o => { let pl = o.fen.players[o.fen.turn[0]].hand = ['4Hn']; }], iter: 0, maxiter: 200, running: false, step: true, suiteRunning: false, number: 0, list: [0]
	};
	DA.test.end = () => { };
	DA.auto_moves = [];
	startgame('fritz', [{ name: U.name, playmode: 'human' }, { name: 'amanda', playmode: 'human' }], { mode: 'hotseat' });

}
function ltest52_aristo_church_empty() {
	TESTING = true; DA.testing = true; DA.test = {
		mods: [give_players_empty_stalls], iter: 0, maxiter: 200, running: false, step: true, suiteRunning: false, number: 0, list: [0]
	};
	DA.test.end = () => { }; //console.log('discard:',Z.fen.deck_discard);}
	DA.auto_moves = [];//[['random']];
	let playernames = [U.name, 'felix']; //, 'gul', 'amanda', 'lauren'];

	startgame('aristo', playernames.map(x => ({ name: x, playmode: 'human' })), { mode: 'hotseat' });
}
function ltest51_aristo_church_downgrade() {
	TESTING = true; DA.testing = true; DA.test = {
		mods: [give_players_stalls, prep_for_church_downgrade], iter: 0, maxiter: 200, running: false, step: true, suiteRunning: false, number: 0, list: [0]
	};
	DA.test.end = () => { }; //console.log('discard:',Z.fen.deck_discard);}
	DA.auto_moves = [];//[['random']];
	let playernames = [U.name, 'felix']; //, 'gul', 'amanda', 'lauren'];

	startgame('aristo', playernames.map(x => ({ name: x, playmode: 'human' })), { mode: 'hotseat' });
}
function ltest50_aristo_church() {
	TESTING = true; DA.testing = true; DA.test = {
		mods: [give_players_stalls, make_church], iter: 0, maxiter: 200, running: false, step: true, suiteRunning: false, number: 0, list: [0]
	};
	DA.test.end = () => { }; //console.log('discard:',Z.fen.deck_discard);}
	DA.auto_moves = [];//[['random']];
	let playernames = [U.name, 'felix']; //, 'gul', 'amanda', 'lauren'];

	startgame('aristo', playernames.map(x => ({ name: x, playmode: 'human' })), { mode: 'hotseat' });
}
function ltest49_aristo_church() {
	TESTING = true; DA.testing = true; DA.test = {
		mods: [give_players_stalls, make_church, set_player_tithes], iter: 0, maxiter: 200, running: false, step: true, suiteRunning: false, number: 0, list: [0]
	};
	DA.test.end = () => { }; //console.log('discard:',Z.fen.deck_discard);}
	DA.auto_moves = [];//[['random']];
	let playernames = [U.name, 'felix']; //, 'gul', 'amanda', 'lauren'];

	startgame('aristo', playernames.map(x => ({ name: x, playmode: 'human' })), { mode: 'hotseat' });
}
function ltest48_aristo_church() {
	TESTING = true; DA.testing = true; DA.test = {
		mods: [give_players_stalls], iter: 0, maxiter: 200, running: false, step: true, suiteRunning: false, number: 0, list: [0]
	};
	DA.test.end = () => { }; //console.log('discard:',Z.fen.deck_discard);}
	DA.auto_moves = [];//[['random']];
	let playernames = [U.name, 'felix', 'gul', 'amanda', 'lauren'];

	startgame('aristo', playernames.map(x => ({ name: x, playmode: 'human' })), { mode: 'hotseat' });
}
function ltest47_aristo() {
	TESTING = true; DA.testing = true; DA.test = { mods: [], iter: 0, maxiter: 200, running: false, step: true, suiteRunning: false, number: 0, list: [0] };
	DA.test.end = () => { }; //console.log('discard:',Z.fen.deck_discard);}
	DA.auto_moves = [];//[['random']];
	let playernames = [U.name, 'felix', 'gul', 'amanda', 'lauren'];

	startgame('aristo', playernames.map(x => ({ name: x, playmode: 'human' })), { mode: 'hotseat' });
}
function ltest46_fritz_endgame() {
	DA.magnify_on_select = true;
	TESTING = true; DA.testing = true; DA.test = {
		mods: [o => { let pl = o.fen.players[o.fen.turn[0]].hand = ['4Hn', '2Cn', '3Cn']; }], iter: 0, maxiter: 200, running: false, step: true, suiteRunning: false, number: 0, list: [0]
	};
	DA.test.end = () => { };
	DA.auto_moves = [];
	startgame('fritz', [{ name: U.name, playmode: 'human' }, { name: 'amanda', playmode: 'human' }], { mode: 'hotseat' });

}
function ltest45_fritz() {
	DA.magnify_on_select = true;
	TESTING = true; DA.testing = true; DA.test = { mods: [], iter: 0, maxiter: 200, running: false, step: true, suiteRunning: false, number: 0, list: [0] };
	DA.test.end = () => { };
	DA.auto_moves = [];
	startgame('fritz', [{ name: U.name, playmode: 'human' }, { name: 'amanda', playmode: 'human' }], { mode: 'hotseat' });

}
function ltest44_ferro_7R() {
	DA.magnify_on_select = true;
	TESTING = true; DA.testing = true; DA.test = { mods: [give_player_7R], iter: 0, maxiter: 200, running: false, step: true, suiteRunning: false, number: 0, list: [0] };
	DA.test.end = () => { };
	DA.auto_moves = []; //[0, 1, 2, 3, 4, 5, 6]];
	startgame('ferro', [{ name: U.name, playmode: 'human' }, { name: 'amanda', playmode: 'human' }, { name: 'felix', playmode: 'human' }, { name: 'gul', playmode: 'human' }], { mode: 'hotseat' });
}
function test_ferro_is_set() {
	//wie  mach ich auf einfachste art ein Z?
	//startgame('fritz', [{ name: U.name, playmode: 'human' }, { name: 'amanda', playmode: 'human' }], { mode: 'hotseat' });
	//Z = { options: { jokers_per_group: 1 } };
	let cards = ['9Sn', '7Sn', '8Sn', '9Sn'].map(x => fritz_get_card(x));
	let set = ferro_is_set(cards, 1, 3);
	console.log(set);
}
function ltest43_fritz_discard_pile() {
	DA.magnify_on_select = true;
	TESTING = true; DA.testing = true; DA.test = { mods: [make_deck_discard], iter: 0, maxiter: 200, running: false, step: true, suiteRunning: false, number: 0, list: [0] };
	DA.test.end = () => { };
	DA.auto_moves = [];
	startgame('fritz', [{ name: U.name, playmode: 'human' }, { name: 'amanda', playmode: 'human' }], { mode: 'hotseat' });

}
function ltest42_aristo() {
	DA.magnify_on_select = true;
	TESTING = true; DA.testing = true; DA.test = { mods: [], iter: 0, maxiter: 200, running: false, step: true, suiteRunning: false, number: 0, list: [0] };
	DA.test.end = () => { };
	DA.auto_moves = [];
	startgame('aristo', [{ name: U.name, playmode: 'human' }, { name: 'amanda', playmode: 'human' }], { mode: 'hotseat' });
}
function ltest41_frenzy_DD() {
	DA.magnify_on_select = true;
	TESTING = true; DA.testing = true; DA.test = { mods: [], iter: 0, maxiter: 200, running: false, step: true, suiteRunning: false, number: 0, list: [0] };
	DA.test.end = () => { };
	DA.auto_moves = [];
	startgame('fritz', [{ name: U.name, playmode: 'human' }, { name: 'amanda', playmode: 'human' }], { mode: 'hotseat' });

}
function ltest40_ferro_7R_anlegen() {
	DA.magnify_on_select = true;
	TESTING = true; DA.testing = true; DA.test = { mods: [give_player_7R], iter: 0, maxiter: 200, running: false, step: true, suiteRunning: false, number: 0, list: [0] };
	DA.test.end = () => { };
	DA.auto_moves = [[0, 1, 2, 3, 4, 5, 6, 7]];
	startgame('ferro', [{ name: U.name, playmode: 'human' }, { name: 'amanda', playmode: 'human' }, { name: 'felix', playmode: 'human' }, { name: 'gul', playmode: 'human' }], { mode: 'hotseat' });
}
function ltest39_ferro_7R() {
	DA.magnify_on_select = true;
	TESTING = true; DA.testing = true; DA.test = { mods: [give_player_7R], iter: 0, maxiter: 200, running: false, step: true, suiteRunning: false, number: 0, list: [0] };
	DA.test.end = () => { };
	DA.auto_moves = [[0, 1, 2, 3, 4, 5, 6, 7]];
	startgame('ferro', [{ name: U.name, playmode: 'human' }, { name: 'amanda', playmode: 'human' }, { name: 'felix', playmode: 'human' }, { name: 'gul', playmode: 'human' }], { mode: 'hotseat' });
}
function ltest38_ferro_end_of_round() {
	DA.magnify_on_select = true;
	TESTING = true; DA.testing = true; DA.test = { mods: [give_player_group, give_player_only_one_card], iter: 0, maxiter: 200, running: false, step: true, suiteRunning: false, number: 0, list: [0] };
	DA.test.end = () => { };
	DA.auto_moves = [];
	startgame('ferro', [{ name: U.name, playmode: 'human' }, { name: 'nasi', playmode: 'human' }, { name: 'felix', playmode: 'human' }, { name: 'gul', playmode: 'human' }], { mode: 'hotseat' });
}
function ltest37_ferro_4_players() {
	DA.magnify_on_select = true;
	TESTING = true; DA.testing = true; DA.test = { mods: [], iter: 0, maxiter: 200, running: false, step: true, suiteRunning: false, number: 0, list: [0] };
	DA.test.end = () => { };
	DA.auto_moves = [];
	startgame('ferro', [{ name: U.name, playmode: 'human' }, { name: 'amanda', playmode: 'human' }, { name: 'felix', playmode: 'human' }, { name: 'gul', playmode: 'human' }], { mode: 'hotseat' });
}
function ltest36_ferro_two_sequence() {
	DA.magnify_on_select = true;
	TESTING = true; DA.testing = true; DA.test = { mods: [give_player_jolly_sequence, give_player_sequence, o => o.round = 1], iter: 0, maxiter: 200, running: false, step: true, suiteRunning: false, number: 0, list: [0] };
	DA.test.end = () => { };
	DA.auto_moves = [[0, 1, 2, 3, 4, 5, 6, 7, 8]];
	startgame('ferro', [{ name: U.name, playmode: 'human' }, { name: 'amanda', playmode: 'human' }], { mode: 'hotseat' });
}
function ltest35_ferro_sequence_anlegen() {
	DA.magnify_on_select = true;
	TESTING = true; DA.testing = true; DA.test = { mods: [give_other_jolly_sequence, o => o.round = 1], iter: 0, maxiter: 200, running: false, step: true, suiteRunning: false, number: 0, list: [0] };
	DA.test.end = () => { };
	DA.auto_moves = [];
	startgame('ferro', [{ name: U.name, playmode: 'human' }, { name: 'amanda', playmode: 'human' }], { mode: 'hotseat' });
}
function ltest34_ferro_anlegen() {
	DA.magnify_on_select = true;
	TESTING = true; DA.testing = true; DA.test = { mods: [give_other_jolly_group, o => o.round = 1], iter: 0, maxiter: 200, running: false, step: true, suiteRunning: false, number: 0, list: [0] };
	DA.test.end = () => { };
	DA.auto_moves = [[0, 14]];
	startgame('ferro', [{ name: U.name, playmode: 'human' }, { name: 'amanda', playmode: 'human' }], { mode: 'hotseat' });
}
function ltest33_ferro_sequence() {
	DA.magnify_on_select = true;
	TESTING = true; DA.testing = true; DA.test = { mods: [give_player_sequence, give_other_jolly_group, o => o.round = 1], iter: 0, maxiter: 200, running: false, step: true, suiteRunning: false, number: 0, list: [0] };
	DA.test.end = () => { };
	DA.auto_moves = [[2, 3, 6, 9, 10, 11, 12]];
	startgame('ferro', [{ name: U.name, playmode: 'human' }, { name: 'amanda', playmode: 'human' }], { mode: 'hotseat' });
}
function ltest32_select_error() {

	let di = {
		'3': 'one set of 3',
		'33': 'two sets of 3',
		'4': 'one set of 4',
		'44': 'two sets of 4',
		'5': 'one set of 5',
		'55': 'two sets of 5',
		'7R': 'a sequence of 7',
	};



	DA.magnify_on_select = true; // *** NEW! ***
	TESTING = true; DA.testing = true; DA.test = { mods: [small_hands, give_other_jolly_group, o => o.round = 4], iter: 0, maxiter: 200, running: false, step: true, suiteRunning: false, number: 0, list: [0] };
	DA.test.end = () => ferro_transaction_error(['44', '5', '55', '7R'], ['jolly', 'anlegen'], 'take_turn_single');
	// DA.test.end = () => {

	// 	let goals = DA.min_goals = ['44', '5', '55', '7R'];

	// 	let alternatives =[];
	// 	let singles = goals.filter(x=>x.length == 1).sort();
	// 	let doubles = goals.filter(x=>x!='7R' && x.length == 2).sort();
	// 	let s7 = goals.filter(x=>x == '7R');

	// 	if (!isEmpty(singles)) alternatives.push(di[singles[0]]);
	// 	if (!isEmpty(doubles) && (isEmpty(singles) || Number(singles[0][0]) > Number(doubles[0][0]))) alternatives.push(di[doubles[0]]);
	// 	if (!isEmpty(s7)) alternatives.push(di[s7[0]]);

	// 	// let min_els = find_minimum_by_func(DA.min_goals,x=>x[0]);
	// 	// let min_numsets = (min_els.length == 2)?find_minimum_by_func(DA.min_goals,x=>length[x]):1;
	// 	// let can_do_7R = DA.min_goals.includes('7R');

	// 	//lowestNumber = DA.min_goals.find(x=>)
	// 	let msg_min_req = `You need to fulfill the minimum requirement of ${alternatives.join(' or ')}!`;
	// 	let l = ['jolly']; // DA.transactionlist;
	// 	let [jolly, auflegen, anlegen] = [l.includes('jolly'), l.includes('auflegen'), l.includes('anlegen')];
	// 	let msg_action = anlegen ? 'Anlegen requires auflegen von minimum first!' :
	// 		'jolly' ? 'To exchange a jolly you need to be able to auflegen!' :
	// 			'Your sets are not good enough!';

	// 	dError.innerHTML = `<h2>Impossible Transaction!</h2><p>${msg_min_req}</p><p>${msg_action}</p><div style="text-align:center">...performing rollback...</div>`;
	// 	dError.innerHTML += '<div style="text-align:center"><button class="donebutton" onclick="continue_after_error()">CLICK TO CONTINUE</button></div>';

	// }; //console.log('discard:',Z.fen.deck_discard);}
	DA.auto_moves = [];//[['random']];
	startgame('ferro', [{ name: U.name, playmode: 'human' }, { name: 'amanda', playmode: 'human' }], { mode: 'hotseat' });

}
function ltest31_ferro_rollback() {
	DA.magnify_on_select = true; // *** NEW! ***
	TESTING = true; DA.testing = true; DA.test = { mods: [small_hands, give_other_jolly_group, o => o.round = 1], iter: 0, maxiter: 200, running: false, step: true, suiteRunning: false, number: 0, list: [0] };
	DA.test.end = () => { }; //console.log('discard:',Z.fen.deck_discard);}
	DA.auto_moves = [];//[['random']];
	startgame('ferro', [{ name: U.name, playmode: 'human' }, { name: 'amanda', playmode: 'human' }], { mode: 'hotseat' });
}
function ltest30_ferro_jolly_jolly() {
	DA.magnify_on_select = true; // *** NEW! ***
	TESTING = true; DA.testing = true; DA.test = { mods: [give_each_jolly_group, give_player_jolly], iter: 0, maxiter: 200, running: false, step: true, suiteRunning: false, number: 0, list: [0] };
	DA.test.end = () => { }; //console.log('discard:',Z.fen.deck_discard);}
	DA.auto_moves = [];//[['random']];
	startgame('ferro', [{ name: U.name, playmode: 'human' }, { name: 'amanda', playmode: 'human' }], { mode: 'hotseat' });
}
function ltest29_ferro_play() {
	DA.magnify_on_select = true; // *** NEW! ***
	TESTING = true; DA.testing = true; DA.test = { mods: [give_player_hand_group, o => o.round = 2], iter: 0, maxiter: 200, running: false, step: true, suiteRunning: false, number: 0, list: [0] };
	DA.test.end = () => { }; //console.log('discard:',Z.fen.deck_discard);}
	DA.auto_moves = [[0, 1, 2], [1]];//[['random']];
	startgame('ferro', [{ name: U.name, playmode: 'human' }, { name: 'amanda', playmode: 'human' }], { mode: 'hotseat' });
}
function ltest28_ferro_jolly_complex() {
	DA.magnify_on_select = true; // *** NEW! ***
	TESTING = true; DA.testing = true; DA.test = { mods: [give_other_jolly_group], iter: 0, maxiter: 200, running: false, step: true, suiteRunning: false, number: 0, list: [0] };
	DA.test.end = () => { }; //console.log('discard:',Z.fen.deck_discard);}
	DA.auto_moves = [];//[['random']];
	startgame('ferro', [{ name: U.name, playmode: 'human' }, { name: 'amanda', playmode: 'human' }], { mode: 'hotseat' });
}
function ltest27_ferro_commands() {
	DA.magnify_on_select = true; // *** NEW! ***
	TESTING = true; DA.testing = true; DA.test = { mods: [], iter: 0, maxiter: 200, running: false, step: true, suiteRunning: false, number: 0, list: [0] };
	DA.test.end = () => { }; //console.log('discard:',Z.fen.deck_discard);}
	DA.auto_moves = [['random']];//[['random']];
	startgame('ferro', [{ name: U.name, playmode: 'human' }, { name: 'amanda', playmode: 'human' }], { mode: 'hotseat' });
}
function ltest26_ferro_endgame() {
	DA.magnify_on_select = true; // *** NEW! ***
	TESTING = true; DA.testing = true; DA.test = { mods: [each_hand_of_one], iter: 0, maxiter: 200, running: false, step: true, suiteRunning: false, number: 0, list: [0] };
	DA.test.end = () => { }; //console.log('discard:',Z.fen.deck_discard);}
	DA.auto_moves = [];//[['random']];
	startgame('ferro', [{ name: U.name, playmode: 'human' }, { name: 'amanda', playmode: 'human' }], { mode: 'hotseat' });
}
function ltest25_ferro_jolly() {
	DA.magnify_on_select = true; // *** NEW! ***
	TESTING = true; DA.testing = true; DA.test = { mods: [give_each_jolly_group], iter: 0, maxiter: 200, running: false, step: true, suiteRunning: false, number: 0, list: [0] };
	DA.test.end = () => { }; //console.log('discard:',Z.fen.deck_discard);}
	DA.auto_moves = [];//[['random']];
	startgame('ferro', [{ name: U.name, playmode: 'human' }, { name: 'amanda', playmode: 'human' }], { mode: 'hotseat' });
}
function ltest24_ferro_jolly() {
	DA.magnify_on_select = true; // *** NEW! ***
	TESTING = true; DA.testing = true; DA.test = { mods: [give_other_jolly_group], iter: 0, maxiter: 200, running: false, step: true, suiteRunning: false, number: 0, list: [0] };
	DA.test.end = () => { }; //console.log('discard:',Z.fen.deck_discard);}
	DA.auto_moves = [];//[['random']];
	startgame('ferro', [{ name: U.name, playmode: 'human' }, { name: 'amanda', playmode: 'human' }], { mode: 'hotseat' });
}
function ltest23_aristo_building_downgrade() {
	TESTING = true; DA.testing = true; DA.test = { mods: [give_players_buildings], iter: 0, maxiter: 200, running: false, step: true, suiteRunning: false, number: 0, list: [0] };
	DA.test.end = () => { }; //console.log('discard:',Z.fen.deck_discard);}
	DA.auto_moves = [];//[['random']];
	startgame('aristo', [{ name: U.name, playmode: 'human' }, { name: 'amanda', playmode: 'human' }], { mode: 'hotseat' });
}
function ltest22_ferro_action1() {
	DA.magnify_on_select = true; // *** NEW! ***
	TESTING = true; DA.testing = true; DA.test = { mods: [], iter: 0, maxiter: 200, running: false, step: true, suiteRunning: false, number: 0, list: [0] };
	DA.test.end = () => { }; //console.log('discard:',Z.fen.deck_discard);}
	DA.auto_moves = [];//[['random']];
	startgame('ferro', [{ name: U.name, playmode: 'human' }, { name: 'amanda', playmode: 'human' }], { mode: 'hotseat' });
}
function ltest21_spotit() {
	TESTING = true; DA.testing = true; DA.test = { mods: [], iter: 0, maxiter: 200, running: false, step: true, suiteRunning: false, number: 0, list: [0] };
	DA.test.end = () => { console.log('discard:', Z.fen); }
	DA.auto_moves = [];
	startgame('spotit', [{ name: U.name, playmode: 'human' }, { name: 'amanda', playmode: 'human' }], { mode: 'hotseat', adaptive: false });
}
function ltest20_spotit_adaptive() {
	TESTING = true; DA.testing = true; DA.test = { mods: [], iter: 0, maxiter: 200, running: false, step: true, suiteRunning: false, number: 0, list: [0] };
	DA.test.end = () => { console.log('discard:', Z.fen); }
	DA.auto_moves = [];
	startgame('spotit', [{ name: U.name, playmode: 'human' }, { name: 'amanda', playmode: 'human' }], { mode: 'hotseat' });
}
function ltest12_ferro_buy() {
	TESTING = true; DA.testing = true; DA.test = { mods: [], iter: 0, maxiter: 200, running: false, step: true, suiteRunning: false, number: 0, list: [0] };
	DA.test.end = () => { console.log('discard:', Z.fen.deck_discard); }
	DA.auto_moves = [['random']];
	startgame('ferro', [{ name: U.name, playmode: 'human' }, { name: 'amanda', playmode: 'human' }], { mode: 'hotseat' });
}
function ltest11_ferro_discard() {
	TESTING = true; DA.testing = true; DA.test = { mods: [], iter: 0, maxiter: 200, running: false, step: true, suiteRunning: false, number: 0, list: [0] };
	DA.test.end = () => { console.log('discard:', Z.fen.deck_discard); }
	DA.auto_moves = [['random'], [1], [1], ['random']];
	startgame('ferro', [{ name: U.name, playmode: 'human' }, { name: 'amanda', playmode: 'human' }], { mode: 'hotseat' });
}
function ltest10_ferro_sim() {
	TESTING = true; DA.testing = true; DA.test = { mods: [give_one_player_0_coins], iter: 0, maxiter: 200, running: false, step: true, suiteRunning: false, number: 0, list: [0] };
	DA.auto_moves = [['random']];
	startgame('ferro', [{ name: U.name, playmode: 'human' }, { name: 'felix', playmode: 'human' }, { name: 'amanda', playmode: 'human' }], { mode: 'hotseat' });
}
function ltest9_ferro_sim() {
	TESTING = true; DA.testing = true; DA.test = { iter: 0, maxiter: 200, running: false, step: true, suiteRunning: false, number: 0, list: [0] };
	DA.auto_moves = [['random']];
	startgame('ferro', [{ name: U.name, playmode: 'human' }, { name: 'felix', playmode: 'human' }, { name: 'amanda', playmode: 'human' }], { mode: 'hotseat' });
}
function ltest8_ferro_sim() {
	TESTING = true; DA.testing = true; DA.test = { iter: 0, maxiter: 200, running: false, step: true, suiteRunning: false, number: 0, list: [0] };
	DA.auto_moves = [['last']];

	startgame('ferro', [{ name: U.name, playmode: 'human' }, { name: 'felix', playmode: 'human' }, { name: 'amanda', playmode: 'human' }], { mode: 'hotseat' });

}
function ltest7_ferro_skin() {
	startgame('ferro', [{ name: U.name, playmode: 'human' }, { name: 'felix', playmode: 'human' }, { name: 'amanda', playmode: 'human' }], { mode: 'hotseat' });

}
function ltest6_bluff_skin() {
	startgame('bluff', [{ name: 'valerie', playmode: 'human' }, { name: 'felix', playmode: 'human' }], { mode: 'hotseat' });
}
function ltest5_jokerhtml() {

	//let d=mDiv(dTable,{},null,'HALLO');return;

	let html = `
		<div style="position: absolute; top: 0px; left: 0px; width: 200px; height: 300px; background: blue">
			HALLLLLLLLLLLLLLLLLLLLOOOOOOOOOOOOOOOOOOO
			<!-- joker svg orig -->
			<svg
				xmlns="http://www.w3.org/2000/svg"
				xmlns:xlink="http://www.w3.org/1999/xlink"
				class="card"
				face="0J"
				height="100%"
				preserveAspectRatio="none"
				viewBox="-120 -168 240 336"
				width="100%"
			>
				<symbol id="J11" preserveAspectRatio="none" viewBox="0 0 1300 2000">
					<path fill="#FC4" d="M1095,1000A445,445 0 0 1 650,1445 445,445 0 0 1 205,1000 445,445 0 0 1 650,555 445,445 0 0 1 1095,1000Z"></path>
				</symbol>
				<symbol id="J12" preserveAspectRatio="none" viewBox="0 0 1300 2000">
					<path
						fill="red"
						d="M317.05664,1294.416 100,1620l220,-60 40,240 140,-200 160,200 40,-200 180,180 60,-220 260,60 -236.67969,-304.3027A445,445 0 0 1 650,1445 445,445 0 0 1 317.05664,1294.416ZM831.71484,249.10742C687.94378,262.65874 542.4812,256.33752 420,520 369.08062,331.38331 278.61481,370.61289 187.77148,412.01367a75,75 0 0 1 2.52344,19.12695 75,75 0 0 1 -16.78515,47.19532c66.827,55.25537 117.57478,127.8247 155.77539,213.90429A445,445 0 0 1 650,555 445,445 0 0 1 924.33984,650.26562c42.39917,-50.4556 91.60026,-93.34711 167.51176,-106.5332a75,75 0 0 1 -0.6524,-9.14258 75,75 0 0 1 14.6172,-44.3457C1026.3517,437.47479 931.12146,446.83238 840,440 761.98041,388.07638 804.10248,338.17898 853.51758,288.4043a75,75 0 0 1 -21.80274,-39.29688z"
					></path>
				</symbol>
				<symbol id="J13" preserveAspectRatio="none" viewBox="0 0 1300 2000">
					<path
						fill="#44F"
						d="M879.65521,937.6026a40,40 0 0 1 -40,40 40,40 0 0 1 -40,-40 40,40 0 0 1 40,-40 40,40 0 0 1 40,40zm-379.31039,0a40,40 0 0 1 -40,40 40,40 0 0 1 -40,-40 40,40 0 0 1 40,-40 40,40 0 0 1 40,40z"
					></path>
				</symbol>
				<symbol id="J14" preserveAspectRatio="none" viewBox="0 0 1300 2000">
					<path
						stroke="#44F"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="6"
						fill="none"
						d="M317.05664,1294.416 100,1620l220,-60 40,240 140,-200 160,200 40,-200 180,180 60,-220 260,60 -236.67969,-304.3027M1241.1987,534.58948a75,75 0 0 1 -75,75 75,75 0 0 1 -75,-75 75,75 0 0 1 75,-75 75,75 0 0 1 75,75zM980.11493,234.09686a75,75 0 0 1 -75,75 75,75 0 0 1 -75,-75 75,75 0 0 1 75,-75 75,75 0 0 1 75,75zM190.29556,431.1412a75,75 0 0 1 -75,75 75,75 0 0 1 -74.999997,-75 75,75 0 0 1 74.999997,-75 75,75 0 0 1 75,75zM924.3457,650.27148c42.40088,-50.45397 91.5936,-93.35356 167.5059,-106.53906 -0.4037,-3.03138 -0.6215,-6.0846 -0.6524,-9.14258 0.03,-15.96068 5.1503,-31.4957 14.6172,-44.3457C1026.3517,437.47479 931.12146,446.83238 840,440 761.98041,388.07638 804.10248,338.17898 853.51758,288.4043 842.40414,277.84182 834.79487,264.12701 831.71484,249.10742 687.94378,262.65874 542.4812,256.33752 420,520 369.08062,331.38331 278.61481,370.61289 187.77148,412.01367c1.66108,6.24042 2.50924,12.66925 2.52344,19.12695 -0.0209,17.1896 -5.94587,33.85038 -16.7832,47.19336 66.82714,55.25532 117.5686,127.8306 155.76953,213.91016M384.88867,1140c51.89013,98.343 153.91815,159.9189 265.11133,160 111.19809,-0.076 213.23257,-61.6527 265.125,-160M1095,1000A445,445 0 0 1 650,1445 445,445 0 0 1 205,1000 445,445 0 0 1 650,555 445,445 0 0 1 1095,1000Z"
					></path>
				</symbol>
				<rect width="239" height="335" x="-119.5" y="-167.5" rx="12" ry="12" fill="white" stroke="black"></rect>
				<text x="-110" y="-115" fill="red" stroke="red" style="font:bold 60px sans-serif">*</text>
				<use width="202.8" height="312" x="-101.4" y="-156" xlink:href="#J11"></use>
				<use width="202.8" height="312" x="-101.4" y="-156" xlink:href="#J12"></use>
				<use width="202.8" height="312" x="-101.4" y="-156" xlink:href="#J13"></use>
				<use width="202.8" height="312" x="-101.4" y="-156" xlink:href="#J14"></use>
			</svg>
		</div>
	`;
	document.body.appendChild(mCreateFrom(html));
}
function ltest4_sheriff() {
	let di = SHERIFF.cards;
	for (const name in di) { let c = sheriff_card(name); mAppend(dTable, iDiv(c)); }
}
function ltest3_card() {
	// let name, type, color, c;
	// [name, type, color] = ['cheese', 'legal', 'lightgoldenrodyellow'];
	// [name, type, color] = ['pretzel', 'legal', 'lightgoldenrodyellow']; c = sheriff_card(name, type, color); mAppend(dTable, iDiv(c));
	// [name, type, color] = ['pineapple', 'legal', 'lightgoldenrodyellow']; c = sheriff_card(name, type, color); mAppend(dTable, iDiv(c));
	// [name, type, color] = ['mead', 'contraband', 'lightgoldenrodyellow']; c = sheriff_card(name, type, color); mAppend(dTable, iDiv(c));
	// [name, type, color] = ['silk', 'contraband', 'lightgoldenrodyellow']; c = sheriff_card(name, type, color); mAppend(dTable, iDiv(c));
	// [name, type, color] = ['crossbow', 'contraband', 'lightgoldenrodyellow']; c = sheriff_card(name, type, color); mAppend(dTable, iDiv(c));
	// [name, type, color] = ['pepper', 'contraband', 'lightgoldenrodyellow']; c = sheriff_card(name, type, color); mAppend(dTable, iDiv(c));
	let di = SHERIFF.cards;
	for (const name in di) {

		// let c = sheriff_card(name, type, 'lightgoldenrodyellow'); mAppend(dTable, iDiv(c));
		// let color = rColor(88);
		// color = colorLight(SHERIFF.color[type],.7);
		//console.log('color',SHERIFF.color[type],color)
		let c = sheriff_card(name); //, color); 
		mAppend(dTable, iDiv(c));

	}
}
function ltest2_card() {
	let c = cPortrait(dTable, { margin: 12, border: 'solid 4px lime', bg: 'lightgreen' });
	let d = iDiv(c);
	console.log('d', d)
	let ds = mSym('red apple', d, { sz: 30 }, 'tl');
	ds = mSymText(2, d, { sz: 25, rounding: '50%', bg: 'gold', margin: 3 }, 'tr');
	ds = mText('APPLES', d, { family: 'Algerian', w: '100%', fz: 12, align: 'center', position: 'absolute', bottom: 0 });//mPlace(ds,'tc',0,8)
	ds = mSymText(2, d, { sz: 25, rounding: '50%', bg: 'crimson', margin: 3 }, 'br');
	ds = mSym('green apple', d, { sz: 70 }, 'cc');
	// ds = mText('penalty:',d,{fz:12,display:'inline'});mPlace(ds,'bc',0,8)
	//set_card_border(c,5,'lime')
}
function ltest1_card() { let c = cLandscape(dTable, { margin: 12 }); }
function ltest0_card() { let c = ari_get_card('QSn'); mAppend(dTable, iDiv(c)); }

//#region fen tests
function fentest7_gameover() {
	let [game, A, fen, uplayer] = [Z.game, Z.A, Z.fen, Z.uplayer];
	if (game == 'aristo') fentest6_endgame();
	else if (game == 'spotit') {
		for (const plname in fen.players) { fen.players[plname].score = Z.options.winning_score - 1; }
		take_turn_fen();
		//fen.players[uplayer].score = Z.options.winning_score - 1;
	} else if (game == 'bluff') {
		let pl = fen.players[uplayer];
		while (pl.handsize < Z.options.max_handsize) inc_handsize(fen, uplayer); //.handsize = Z.options.max_handsize; }
		deck_add(fen.deck, 1, pl.hand);
		take_turn_fen();
	}
}
function fentest6_endgame() {
	let [A, fen, uplayer] = [Z.A, Z.fen, Z.uplayer];
	fen.actionsCompleted = [];

	//erstmal: jeder bakommt ein chateau + 1 or 2 random buildings!
	for (const plname of fen.plorder) {
		add_a_correct_building_to(fen, plname, 'chateau');
		add_a_correct_building_to(fen, plname, rChoose(['farm', 'estate', 'chateau']));
		if (coin()) add_a_correct_building_to(fen, plname, rChoose(['farm', 'estate', 'chateau']));

		fen.actionsCompleted.push(plname);
	}

	fen.pl_gameover = [];
	for (const plname of fen.plorder) {
		let bcorrect = ari_get_correct_buildings(fen.players[plname].buildings);
		let can_end = ari_check_end_condition(bcorrect);
		//console.log('end cond met:', can_end ? 'yes' : 'no');
		if (can_end) fen.pl_gameover.push(plname);
	}

	if (isEmpty(fen.pl_gameover)) { console.log('try again!!!!!!!!!!!'); return; }
	//test_skip_to_actions();
	Z.stage = 10;
	Z.phase = 'king';
	take_turn_fen(true);

}
function fentest5_market_opens() {
	Z.stage = 3;
	Z.phase = 'king';
	take_turn_fen();

}
function fentest4_visit() {
	let [A, fen, uplayer] = [Z.A, Z.fen, Z.uplayer];
	fen.actionsCompleted = [];

	//erstmal: jeder bakommt ein chateau + 1 or 2 random buildings!
	for (const plname of fen.plorder) {
		add_a_schwein(fen, plname);
		//if (coin()) add_a_correct_building_to(fen, plname, rChoose(['farm', 'estate', 'chateau']));
	}

	//test_skip_to_actions();
	Z.stage = 5;
	Z.phase = 'queen';
	take_turn_fen();

}
function fentest2_build() {
	Z.stage = 5;
	Z.phase = 'king';
	ensure_stall(Z.fen, Z.uplayer, 4);
	ensure_actions(Z.fen);
	take_turn_fen();
}
function fentest1_auction() {
	Z.stage = 12;
	Z.phase = 'jack';
	ensure_market(Z.fen, 3);
	take_turn_fen();
}
function fentest0_min_items() {
	let [A, fen, uplayer] = [Z.A, Z.fen, Z.uplayer];
	let pl = fen.players[uplayer];
	[pl.hand, pl.stall, Z.stage, Z.phase] = [['JSn', '2Hn', '3Hn', '3Dn', '3Cn', '4Hn'], ['QSn', 'KHn'], 5, 'king'];

	ensure_actions(fen);

	take_turn_fen();

}
//#endregion

//#region misc tests
function test100_partial_sequences() {
	let hand = ['AHn', '2Hn', '3Hn', '4Hn', '5Hn', '6Hn', '7Hn', '8Hn']; //jollies needed=0
	hand = ['AHn', '2Hn', '3Hn', '4Hn', '5Hn', '7Hn', '8Hn'];//jollies needed=1
	hand = ['4Hn', '7Hn', 'AHn', '2Hn', '5Hn', '6Hn', '3Hn', '8Hn']; //jollies needed=0
	hand = ['4Hn', '7Hn', 'AHn', '2Hn', '3Hn', '8Hn']; //jollies needed=2
	hand = ['4Hn', '7Hn', 'AHn', '2Hn', '9Hn', 'THn', 'QHn', '3Hn', '8Hn']; //jollies needed=2
	hand = ['4Hn', '7Hn', 'AHn', '2Hn', 'THn', 'QHn', '3Hn', '8Hn']; //jollies needed=3
	let items = hand.map(x => ferro_get_card(x));
	console.log('items', items);

	sortCardItemsToSequence(items);
}
function test12_try_svg() {

	// let d = iDiv(item);

	// let svg = findDescendantOfType('svg', d);
	// let rect = findDescendantOfType('rect', svg);
	// let rs = Array.from(d.getElementsByTagName('rect'));
	// let rlast = arrLast(rs);
	// let rfirst = arrFirst(rs);

	// // rlast.setAttribute('fill', colorFrom(styles.bg));
	// // rlast.setAttribute('stroke', colorFrom(styles.fg)); //border vom auesseren rect

	// // //rfirst.setAttribute('fill', 'pink'); //das loescht den path aus! 
	// // rfirst.setAttribute('stroke', 'lime'); //border von innerem rect (bei Q)

	// svg.setAttribute('fill', colorFrom(styles.bg));
	// svg.setAttribute('stroke', colorFrom(styles.fg)); //border vom auesseren rect

	//fuer bg muss ich rect fill attribute setzen
	// svg.setAttribute('fill',colorFrom(styles.bg));




}
function test11_cardcoloring() {
	let dTable = mBy('dTable'); clearElement(dTable);
	let card = ari_get_card('KHn');
	mAppend(dTable, iDiv(card));
	let d = mDiv(dTable, {}, null, queen_html());
}
function test10_0() {



	lookupSet(DA, ['svgsym', suit, color], html);
	let color = 'orange';
	let treff = `
	<path	d="M30 150C35 385 85 400 130 500L-130 500C-85 400 -35 385 -30 150A10 10 0 0 0 -50 150A210 210 0 1 1 -124 -51A10 10 0 0 0 -110 -65A230 230 0 1 1 110 -65A10 10 0 0 0 124 -51A210 210 0 1 1 50 150A10 10 0 0 0 30 150Z"	fill="${color}"></path>
	`;

	let idsym = getUID('x');
	let sym = `
	<symbol id="Treff" viewBox="-600 -600 1200 1200" preserveAspectRatio="xMinYMid">
	`
}
function testKartePositionSuit() {
	//stress test: for (let i = 0; i < 100; i++) { testKartePositionSuit(); }

	let dTable = mBy('dTable'); clearElement(dTable); mStyle(dTable, { hmin: 400 })
	//mStyle(dTable, { gap: 10 }); 

	let card = cBlank(dTable); let d = iDiv(card); let sz = card.h / 6;
	//console.log('card', card);

	//alles auf einmal:
	//let sz = 30;
	let i = 0;
	for (let suit of ['H', 'S', 'D', 'C']) {
		let s1 = mSuit(suit, d, { w: sz, h: sz }); //console.log('s1', s1);
		mPos(s1, sz * i, 0); i++;
	}
	// let s2 = mSuit('Herz', d, { sz: sz }, 'cr'); //console.log('s2', s2);
	// let s3 = mSuit('Herz', d, { sz: sz }, 'bc'); //console.log('s3', s3);
	// let s4 = mSuit('Herz', d, { sz: sz }, 'cl'); //console.log('s4', s4);
	// let s5 = mSuit('Pik', d, { sz: sz * 2 }, 'cc'); //console.log('s5', s5);

	// s5 = mSuit('Treff', d, { sz: sz * 1.5 }, 'tl'); //console.log('s5', s5);
	// s5 = mSuit('Treff', d, { sz: sz * 1.5 }, 'tr'); //console.log('s5', s5);
	// s5 = mSuit('Treff', d, { sz: sz * 1.5 }, 'bl'); //console.log('s5', s5);
	// s5 = mSuit('Treff', d, { sz: sz * 1.5 }, 'br'); //console.log('s5', s5);

}
function test10_verrueckt() {
	//let item = ari_get_card('QSn',200);	mAppend(dTable,iDiv(item));
	let styles = { bg: 'yellow', fg: 'red', border: 'random', thickness: 20, shadow: 'green', rotate: 45, scale: 2 };


	let html = `
			<svg
			xmlns="http://www.w3.org/2000/svg"
			xmlns:xlink="http://www.w3.org/1999/xlink"
			class="card"
			face="QS"
			height="100%"
			preserveAspectRatio="none"
			viewBox="-120 -168 240 336"
			width="100%"
			fill="#ffff00"
			stroke="#ff0000"
			>
			<defs><rect id="XSQ" width="164.8" height="260.8" x="-82.4" y="-130.4"></rect></defs>
			<symbol id="VSQ" viewBox="-500 -500 1000 1000" preserveAspectRatio="xMinYMid">
				<path
					d="M-260 100C40 100 -40 460 260 460M-175 0L-175 -285A175 175 0 0 1 175 -285L175 285A175 175 0 0 1 -175 285Z"
					stroke="black"
					stroke-width="80"
					stroke-linecap="square"
					stroke-miterlimit="1.5"
					fill="none"
				></path>
			</symbol>
			<symbol id="SSQ" viewBox="-600 -600 1200 1200" preserveAspectRatio="xMinYMid">
				<path
					d="M0 -500C100 -250 355 -100 355 185A150 150 0 0 1 55 185A10 10 0 0 0 35 185C35 385 85 400 130 500L-130 500C-85 400 -35 385 -35 185A10 10 0 0 0 -55 185A150 150 0 0 1 -355 185C-355 -100 -100 -250 0 -500Z"
					fill="black"
				></path>
			</symbol>
			<symbol id="SQ1" preserveAspectRatio="none" viewBox="0 0 1300 2000">
				<path
					fill="#FC4"
					d="M635.39648,0 851.86719,312.33789C895.10685,299.11869 938.83136,290.34833 975,285 924.90197,188.22401 899.89439,94.153799 874.11133,0ZM295.52539,27.285156C246.27551,180.9799 142.75435,335.54042 209.25195,483.08398l-17.43359,13.44922c1.76531,151.10099 30.08527,286.57163 74.54102,398.60938 18.12594,21.287 38.56227,42.11564 61.47851,64.11523 3.61128,3.46683 7.28461,6.96262 11.33789,10.61914L901.47852,970l-0.41407,-0.51953c-0.12219,-0.138 -0.23745,-0.27418 -0.35937,-0.41211 15.27725,17.28278 32.6506,35.12574 52.3164,53.54294C1030.1434,1094.8366 1080,1150 1130,1250c52.9819,-70.6425 98.186,-110.0972 170,-152.7871v-37.6016c-68.6196,39.3343 -116.9422,76.6549 -164.5547,131.9668 -44.9491,-77.8482 -93.9175,-130.6069 -160.20897,-192.68943 -76.05982,-71.23062 -114.27421,-131.59148 -129.3711,-180.42578 -15.09688,-48.8343 -8.90849,-86.60287 7.94922,-120.96875 28.31708,-57.72677 91.51367,-102.35489 139.07032,-133.86328l-26.7793,-21.49024C896.53697,588.11019 793.22595,665.67487 806.10938,786.48828L699.86133,787.5 568.0625,939.89258 429.48438,939.86328C578.06034,763.29892 745.82856,594.02803 899.1875,455.09961l-9.56836,-10.99023c-28.86687,-3.02061 -55.64392,-10.37642 -80.51758,-21.42774 -1.77605,4.17261 -4.43372,8.02096 -7.94336,11.23438C665.11643,558.39566 525.46983,665.166 419.78906,829.43164L392.45703,811.84766C501.69344,642.05529 644.58723,533.12674 779.21875,409.9375l17.51367,6.86328c-17.74437,-8.98707 -34.48695,-19.8921 -50.29101,-32.48437 -124.71285,29.03155 -208.27492,36.48099 -267.26758,31.98242 0,0 -19.31641,14.60547 -29.31641,14.60547 -15,0 -25.58008,-5.64453 -30.58008,-5.64453 -5,0 -10,5 -25,5 -15,0 -30,-25 -40,-50 -1.51422,-2.01895 -3.01443,-4.07919 -4.23242,-5.79297l-39.21875,30.25586 10.50977,-0.54493c7.17244,138.45299 -1.25836,281.23598 43.02929,408.13477l-27.41796,17.66602c-1.32891,-2.13106 -2.43311,-4.45616 -3.26758,-6.95704C288.22851,692.7888 295.29422,552.70428 289.59766,421.09961l-69.70313,53.77344 20.20508,-16.59375C187.08454,297.85994 265.54029,182.85491 300.0957,58.960938ZM85,80c-55.000004,50 -100.000004,145 -35,145 9.343263,0 15.215964,-5.70961 19.599609,-15.58984l-0.05469,54.80664C63.116922,255.80043 55.218717,250 45,250c-34.999996,0 -39.999996,70 -5,70 24.46345,0 22.957588,-43.08208 10.8125,-44.93164 53.48157,5.0855 -15.809214,250.16385 -15.302734,296.2207 0.268193,24.38822 6.628431,48.73678 31.46289,56.20899C48.176742,632.49354 35,645.1697 35,660 35,674.30844 47.265656,686.61054 65.384766,692.25586 41.674751,699.57565 35,720.74035 35,740 35,776.24391 48.1356,836.13212 55.517578,866.33008 82.604368,846.54619 106.08392,825.42866 128.83984,800.21875 132.14826,778.91478 135,756.88968 135,740 135,720.60063 128.2285,699.26867 104.15234,691.95898 118.02756,686.75065 129.28173,676.58841 135,660c0,-14.83344 -13.18185,-27.51102 -30.78711,-32.89844 24.05654,-8.65812 30.01787,-32.21714 30.27734,-55.8125C134.99671,525.23221 65.705931,280.15386 119.1875,275.06836 107.04241,276.91792 105.53655,320 130,320c35,0 30,-70 -5,-70 -10.83425,0 -19.06007,6.52154 -25.074219,15.02148L100.25195,209.2793C104.49041,218.99863 110.42097,225 120,225 185,225 140,130 85,80Zm641.48047,287.83789c-86.62544,19.83455 -151.78802,28.17022 -200.80469,29.24219 -14.2248,6.27415 -30.07191,11.92239 -45.7793,18.95898 58.99266,4.49857 142.55438,-2.95118 267.19727,-32.03711 -7.7527,-5.20716 -14.38853,-10.76914 -20.61328,-16.16406zm-370.49024,88.29102c29.62693,11.74538 64.9141,21.55877 110.0293,25.15039 51.3028,4.08421 115.55629,0.48608 200.56445,-14.4043C568.01187,553.99998 468.15967,644.25595 384.25,765.71289 359.23837,670.90747 359.53927,564.67648 355.99023,456.12891ZM1182.5,473.75c-24.0403,0 -48.0562,17.34722 -29.8594,52.02344A45,42.5 0 0 1 1182.5,515a45,42.5 0 0 1 29.8652,10.76367C1230.552,491.09427 1206.538,473.75 1182.5,473.75Zm-54.6914,47.48047c-45.2477,0.77462 -37.6424,97.7377 22.793,66.2168A45,42.5 0 0 1 1137.5,557.5a45,42.5 0 0 1 13.1113,-29.94336c-8.6891,-4.53343 -16.2978,-6.43753 -22.8027,-6.32617zm109.3828,0c-6.5027,-0.11132 -14.1076,1.79222 -22.793,6.32226A45,42.5 0 0 1 1227.5,557.5a45,42.5 0 0 1 -13.1094,29.94336c60.4429,31.53409 68.0505,-65.43824 22.8008,-66.21289zm-24.8301,67.99414A45,42.5 0 0 1 1182.5,600 45,42.5 0 0 1 1152.6348,589.23633c-11.9875,22.85174 -5.6311,38.16959 6.9726,45.95898 -23.6821,34.46419 -48.941,66.02584 -74.9492,96.20703C1079.1653,675.69528 1058.4509,645.45798 1005,670c37.225,16.12754 38.5709,70.31699 75.9492,65.69727 -5.8664,6.76063 -11.768,13.45662 -17.6972,20.10156l15.207,1.88672c7.2551,-8.19076 14.4623,-16.46748 21.6113,-24.85352 5.1929,39.08146 35.0698,-7.57452 67.2129,-5.5 -16.4802,-41.743 -32.0495,-10.50502 -66.4785,4.63672 24.5708,-28.86629 48.4073,-59.08334 70.8027,-91.95508 26.5679,6.12811 61.7407,-10.79807 40.7539,-50.78906zM1255,655c-32.9633,38.74398 -63.8666,77.97963 -125,110 16.8191,30.21345 26.6544,60.2083 30,90 47.2312,18.32372 82.8871,51.83723 115,90 2.3419,-37.0436 -4.2974,-71.38724 -30,-100 23.3498,-4.99857 40.0029,-20.01884 50,-45 -14.5281,-24.40208 -35.9759,-32.69918 -60,-35 44.8752,-32.16719 30.2665,-71.33926 20,-110zM811.88477,817.78516c10.86486,41.66548 35.34229,88.00659 78.58593,139.42382 -4.92291,-5.82285 -9.66276,-11.58316 -14.2207,-17.2539l-286.46289,-0.0586 64.60547,-0.45703 75.1914,-86.93945 93.88282,-0.33984c-4.9028,-11.9067 -8.74345,-23.39087 -11.58203,-34.375zM377.5,842.5c4.42321,0 9.31831,2.00257 14.86719,9.24023C397.91606,858.97789 402.5,871.0223 402.5,885c0,13.9777 -4.58394,26.0221 -10.13281,33.25977C386.81831,925.49743 381.92321,927.5 377.5,927.5c-4.42321,0 -9.31831,-2.00257 -14.86719,-9.24023C357.08394,911.0221 352.5,898.9777 352.5,885c0,-13.9777 4.58394,-26.02211 10.13281,-33.25977C368.18169,844.50257 373.07679,842.5 377.5,842.5Z"
				></path>
			</symbol>
			<symbol id="SQ2" preserveAspectRatio="none" viewBox="0 0 1300 2000">
				<path
					fill="red"
					d="M557.51758,0 805.9668,330.45703 851.01367,311.99805 635.36719,0Zm78.02148,0 63.76563,90.75C709.99966,65.000167 725,65 725,65 716.50651,26.779299 728.31462,17.104416 733.20117,0ZM820,265 851.86719,312.33789C877.5079,304.49903 903.31958,298.22492 927.6543,293.26562 907.75762,290.72138 885.5191,284.6565 865,270c-10,5 -30,10 -45,-5zm99.12695,216.28711C764.14521,621.01648 595.55342,787.07572 470.35547,940.01172L525,940 685,755h120.41797l-0.0547,-0.41211c6.37431,-102.76161 97.50088,-170.65811 160.41211,-212.22851zm-727.41992,15.5625 -59.86133,46.34766 -0.39648,0.30468c1.93099,12.0459 3.10803,21.69313 3.04101,27.78711 -0.25947,23.59536 -6.2208,47.15438 -30.27734,55.8125C121.81815,632.48898 135,645.16656 135,660 129.28173,676.58841 118.02756,686.75065 104.15234,691.95898 128.2285,699.26867 135,720.60063 135,740c0,16.88968 -2.85174,38.91478 -6.16016,60.21875 -1.95154,2.162 -3.90854,4.29257 -5.87304,6.39453C138.56664,789.96704 153.92711,771.43051 170,750 200.25102,810.50205 230.44886,854.59181 266.85742,895.71484 221.90196,783.10482 193.58426,647.63449 191.70703,496.84961ZM44.53125,610.36133 0,644.61523V902.7832C30.797744,884.46615 56.707359,866.73637 80.427734,846.89844 72.427991,853.57027 64.158102,860.01913 55.517578,866.33008 48.1356,836.13212 35,776.24391 35,740 35,720.74035 41.674751,699.57565 65.384766,692.25586 47.265656,686.61054 35,674.30844 35,660 35,645.1697 48.176742,632.49354 66.972656,627.49805 56.528563,624.35562 49.361734,618.22105 44.53125,610.36133Zm1190.09765,68.79687 -1.1211,1.04688c-20.0542,23.0427 -41.8711,45.665 -71.7441,65.72265 27.117,39.37142 36.6532,80.37363 27.7441,123.12891 25.4392,14.76465 47.2329,33.87001 67.875,55.8418 -10.0896,-28.95393 -26.9566,-68.05217 -64.6191,-89.36328C1229.865,829.72137 1245.3631,819.51581 1260,800c-28.5778,-21.24841 -50.4759,-15.94491 -77.3027,-15.66992 39.149,-21.89578 49.9371,-64.78262 51.9316,-105.17188zM110.74609,819.23828c-0.7889,0.78628 -1.58065,1.56702 -2.37304,2.3457 0.792,-0.77791 1.58362,-1.55961 2.37304,-2.3457zm-5.15234,5.05078c-0.76819,0.74251 -1.53476,1.48679 -2.30664,2.22266 0.77112,-0.73534 1.53841,-1.48017 2.30664,-2.22266zm-5.26172,5.00586c-2.077449,1.94603 -4.165139,3.87648 -6.273436,5.7793 2.104356,-1.90192 4.194747,-3.83083 6.273436,-5.7793zm-6.539061,6.02149c-1.467973,1.32281 -2.945132,2.63598 -4.429688,3.93945 1.482456,-1.30407 2.961518,-2.61456 4.429688,-3.93945zM377.5,862.5a11,22.5 0 0 0 -11,22.5 11,22.5 0 0 0 11,22.5 11,22.5 0 0 0 11,-22.5 11,22.5 0 0 0 -11,-22.5zm225.17578,127.46484a10,10 0 0 0 -10,10 10,10 0 0 0 10,9.99996 10,10 0 0 0 10,-9.99996 10,10 0 0 0 -10,-10zM420,990a10,10 0 0 0 -10,10 10,10 0 0 0 10,10 10,10 0 0 0 10,-10 10,10 0 0 0 -10,-10zm91.13281,0.41016a10,10 0 0 0 -10,10.00004 10,10 0 0 0 10,10 10,10 0 0 0 10,-10 10,10 0 0 0 -10,-10.00004z"
				></path>
			</symbol>
			<symbol id="SQ3" preserveAspectRatio="none" viewBox="0 0 1300 2000">
				<path
					fill="#44F"
					d="M472.5,150a12.5,20 0 0 0 -12.5,20 12.5,20 0 0 0 12.5,20 12.5,20 0 0 0 12.5,-20 12.5,20 0 0 0 -12.5,-20zm-140,5a12.5,20 0 0 0 -12.5,20 12.5,20 0 0 0 12.5,20 12.5,20 0 0 0 12.5,-20 12.5,20 0 0 0 -12.5,-20zm23.49023,301.12891c3.54904,108.54757 3.24814,214.77856 28.25977,309.58398 83.90967,-121.45694 183.76187,-211.71291 282.33398,-298.83789 -85.00816,14.89038 -149.26165,18.48851 -200.56445,14.4043 -45.1152,-3.59162 -80.40237,-13.40501 -110.0293,-25.15039zm42.92579,22.92187c22.57573,0.10326 52.52779,2.34383 83.49804,6.2461 65.74558,8.28415 118.15335,21.65893 117.05469,29.87304 -1.09829,8.2139 -56.30922,5.07893 -122.05273,-3.20508 -65.73948,-8.28354 -117.1185,-18.57868 -116.02735,-26.79296 0.53448,-4.02047 14.07178,-6.22853 37.52735,-6.1211zM1117.5,492.5c2.4011,8.40385 4.2266,18.24941 5.4746,28.84375v0.36133c7.3876,-1.36391 16.4655,0.0837 27.2324,5.62304l-21.2675,-21.26757a1.50015,1.50015 0 0 1 1.0449,-2.57617 1.50015,1.50015 0 0 1 1.0761,0.45507l21.2676,21.26758c-5.5291,-10.74776 -6.9807,-19.81297 -5.6289,-27.19336 -10.7286,-1.24895 -20.7021,-3.08593 -29.1992,-5.51367zm130,0c-8.4251,2.40718 -18.2988,4.23414 -28.9238,5.48242h-0.2793c1.3613,7.38557 -0.087,16.46062 -5.6231,27.22266l21.2657,-21.26563a1.50015,1.50015 0 0 1 1.0312,-0.45312 1.50015,1.50015 0 0 1 1.0898,2.57422l-21.2675,21.26757c10.7565,-5.53399 19.8272,-6.98416 27.2109,-5.62695v-0.17187c1.2486,-10.6649 3.081,-20.57644 5.4961,-29.0293zm-853.59961,15.25781c20.38428,0.10329 47.42876,2.34386 75.39258,6.2461 59.36368,8.28422 106.68388,21.65899 105.69141,29.87304 -0.99271,8.21355 -49.91699,8.15671 -109.27735,-0.12695 -59.36371,-8.28422 -106.68391,-21.659 -105.69141,-29.87305 0.48636,-4.01928 12.70935,-6.22659 33.88477,-6.11914zm7.69531,34.67969c15.09367,-0.0753 32.61454,0.81411 50.47852,2.5625 51.50146,5.04084 94.00823,14.75226 93.67578,23.00391 -0.32891,8.2521 -42.34749,10.85536 -93.84961,5.81445C400.39893,568.77752 358.91755,558.00165 359.25,549.75c0.20345,-5.08688 15.52034,-7.17888 42.3457,-7.3125zm590.81446,21.09375c-26.28817,17.83124 -58.00395,39.71623 -85.84375,65.82227L1063.252,755.79883c5.9292,-6.64494 11.8308,-13.34093 17.6972,-20.10156C1043.5709,740.31699 1042.225,686.12754 1005,670c53.4509,-24.54202 74.1653,5.69528 79.6582,61.40234 18.288,-21.22222 36.2025,-43.13214 53.4609,-66.25 -50.4965,-31.89003 -99.3677,-65.63189 -145.70894,-101.62109zm92.24804,167.87109c-1.2353,1.43353 -2.4703,2.86748 -3.709,4.29493 1.3064,-0.16146 2.6533,-0.388 4.0508,-0.69727 -0.1038,-1.21628 -0.2241,-2.40447 -0.3418,-3.59766zm-21.4062,24.39649 1.3242,1.02344C1092.8236,758.22045 1130,765 1130,765c33.2353,-17.40792 57.5278,-36.95014 78.082,-57.38477 -19.9562,-11.65548 -39.7017,-23.55345 -59.2109,-35.71875 -15.5528,20.88792 -31.6462,40.7815 -48.0664,60.07227 34.429,-15.14174 49.9983,-46.37972 66.4785,-4.63672 -32.1431,-2.07452 -62.02,44.58146 -67.2129,5.5 -7.149,8.38604 -14.3562,16.66276 -21.6113,24.85352zM399.88477,574.98828c12.13924,-0.0753 26.23048,0.81416 40.59765,2.5625 41.42116,5.04089 74.78321,15.81675 74.51563,24.06836 -0.26463,8.25206 -34.05885,10.85531 -75.48047,5.81445 -41.42116,-5.04089 -74.78321,-15.81675 -74.51563,-24.06836 0.16364,-5.08693 13.30756,-8.24338 34.88282,-8.37695zm814.90823,12.6836 21.2675,21.26757a1.50015,1.50015 0 1 1 -2.121,2.1211l-21.2657,-21.26563c5.5369,10.76367 6.9837,19.84044 5.6211,27.22656h0.3223c10.6094,1.24816 20.4685,3.07443 28.8828,5.47852 -2.4278,-8.49731 -4.2627,-18.47029 -5.5117,-29.19922 -7.3807,1.35234 -16.4468,-0.0994 -27.1953,-5.6289zm-64.5879,0.002c-10.7501,5.53028 -19.8161,6.98044 -27.1973,5.62695v0.0723c-1.2488,10.70195 -3.0853,20.64836 -5.5078,29.12695 8.4975,-2.42785 18.4701,-4.26471 29.1992,-5.51367 -1.3518,-7.38039 0.1,-16.44561 5.6289,-27.19336l-21.2676,21.26758a1.50015,1.50015 0 1 1 -2.121,-2.1211zM399.95117,608.2207c7.75591,-0.014 16.33902,0.59569 25.04883,1.7793 30.51033,4.14665 55.19775,16.74619 55.24414,25 0.0491,8.25469 -24.64792,11.5847 -55.16016,7.4375 -30.51033,-4.14665 -55.28173,-14.19933 -55.32812,-22.45312 -0.0324,-5.62262 11.68692,-11.73096 30.19531,-11.76368zm2.94141,36.28321c3.92832,-0.0157 8.00124,0.15115 12.10742,0.49609 25.08573,2.10744 44.77796,7.02839 45.42188,14.97852 0.64298,7.94981 -19.17087,12.68576 -44.25586,10.57812 -25.08573,-2.10744 -45.94398,-10.26081 -46.5879,-18.21094 -0.52278,-6.4668 13.79255,-7.76393 33.31446,-7.84179zm-6.3711,30.78125c1.53788,10e-4 3.10151,0.0612 4.67383,0.17968 15.24356,1.1523 28.12847,7.43255 28.7793,14.02735 0.6519,6.59512 -11.17778,11.00764 -26.42188,9.85547 -15.24356,-1.1523 -28.12847,-7.43255 -28.77929,-14.02735 -0.57317,-5.81151 8.60794,-10.04793 21.74804,-10.03515zm-2.7207,30.4707c0.97501,0.002 1.96625,0.0499 2.96289,0.14453 9.66123,0.91446 17.82809,5.89851 18.24219,11.13281 0.4126,5.23472 -7.08576,8.73687 -16.74805,7.82227 -9.66123,-0.91446 -17.82809,-5.89851 -18.24219,-11.13281 -0.3645,-4.61356 5.45528,-7.97697 13.78516,-7.9668zm906.19922,0.0781 -34.2773,2.85547c0.2249,20.00253 -6.7832,39.15319 -30.7188,56.31055 24.0241,2.30082 45.4719,10.59792 60,35 -9.9971,24.98116 -26.6502,40.00143 -50,45 19.6816,21.91005 28.1768,47.18324 30.0293,74.45312l0.01,0.008 24.957,11.09375zm-167.2656,64.20508c0.2372,0.44647 0.4708,0.89347 0.7051,1.33985 -0.2343,-0.44637 -0.4679,-0.89339 -0.7051,-1.33985zm3.041,5.88282c0.083,0.16606 0.171,0.33199 0.2539,0.49804 -0.083,-0.16604 -0.1705,-0.33202 -0.2539,-0.49804zm2.6758,5.48437c0.2147,0.45253 0.425,0.90499 0.6367,1.35742 -0.2117,-0.45239 -0.4219,-0.90493 -0.6367,-1.35742zm2.455,5.32422c0.1795,0.40036 0.3641,0.80089 0.5411,1.20117 -0.177,-0.40029 -0.3615,-0.80081 -0.5411,-1.20117zm2.5958,5.98437c0.2099,0.50184 0.413,1.00415 0.6191,1.50586 -0.2062,-0.5018 -0.4092,-1.00393 -0.6191,-1.50586zm2.0703,5.11719c0.1975,0.50277 0.4,1.00516 0.5937,1.50781 -0.1937,-0.50252 -0.3962,-1.00516 -0.5937,-1.50781zm2.3418,6.1875c0.1922,0.53072 0.3764,1.06121 0.5644,1.5918 -0.188,-0.53055 -0.3722,-1.06112 -0.5644,-1.5918zm1.7324,4.96485c0.2042,0.60477 0.4106,1.20984 0.6094,1.81445 -0.1988,-0.60461 -0.4051,-1.20971 -0.6094,-1.81445zm2.0273,6.26562c0.1846,0.60177 0.3579,1.20308 0.5371,1.80469 -0.1792,-0.60139 -0.3525,-1.20313 -0.5371,-1.80469zm1.4688,5.00977c0.1799,0.63781 0.3593,1.27644 0.5332,1.91406 -0.174,-0.63786 -0.3532,-1.27602 -0.5332,-1.91406zM377.5,842.5c-4.42321,0 -9.31831,2.00257 -14.86719,9.24023C357.08394,858.97789 352.5,871.0223 352.5,885c0,13.9777 4.58394,26.0221 10.13281,33.25977 5.54888,7.23766 10.44398,9.24023 14.86719,9.24023 4.42321,0 9.31831,-2.00257 14.86719,-9.24023C397.91606,911.0221 402.5,898.9777 402.5,885c0,-13.9777 -4.58394,-26.02211 -10.13281,-33.25977C386.81831,844.50257 381.92321,842.5 377.5,842.5Zm-0.27344,4.79492c2.95574,0.0879 5.94922,5.08008 5.94922,10.70508 10.93128,-0.11104 14.67749,3.31056 5.67578,13 13.69744,3.7436 10.6454,8.69968 2.83789,14 7.80751,5.30032 10.85955,10.2564 -2.83789,14 9.00171,9.68944 5.2555,13.11104 -5.67578,13 0,10 -9.4596,18 -11.35156,0 -10.93128,0.11104 -14.67748,-3.31056 -5.67578,-13 -13.69744,-3.7436 -10.6454,-8.69968 -2.83789,-14 -7.80751,-5.30032 -10.85955,-10.2564 2.83789,-14 -9.0017,-9.68944 -5.2555,-13.11104 5.67578,-13 0.82773,-7.875 3.10344,-10.77344 5.40234,-10.70508zm352.35742,5.20508 -75.1914,86.93945 43.0039,-0.041L744.44531,885H840l-15,-32.5zm29.72266,65 -19.23047,22.23633L876.25,939.95508 860,917.5Zm-104.13476,52.41992 -315.75977,0.17969c2.43984,2.47881 4.98787,4.87423 7.56641,7.28906 15.37025,14.39437 29.32058,28.43253 41.91015,42.12693 1.06974,-4.4442 6.04965,-11.1309 16.11133,-19.5156 -30,-25 -15,-34.99999 15,-15 30,-19.99999 45,-10 15,15 30,25 15,35 -15,15 -11.06914,7.3794 -20.08451,10.6644 -25.5625,10.6289 1.31057,1.4627 2.62767,2.9262 3.90625,4.3809l256.41797,-0.1328zm-170.01172,4.44531C490.60938,974.21875 499.75,977.5 511,985c30,-19.99999 45,-10 15,15 30,25 15,35 -15,15 -30,20 -45,10 -15,-15 -18.75,-15.625 -19.92188,-25.39063 -10.83984,-25.63477zm91,0C581.60938,974.21875 590.75,977.5 602,985c30,-19.99999 45,-10 15,15 30,25 15,35 -15,15 -30,20 -45,10 -15,-15 -18.75,-15.625 -19.92188,-25.39063 -10.83984,-25.63477z"
				></path>
			</symbol>
			<symbol id="SQ4" preserveAspectRatio="none" viewBox="0 0 1300 2000">
				<path
					fill="black"
					d="M499.67383,0C598.83088,212.42554 698.5156,423.78371 891.07812,444.24805L557.50781,0ZM299.89844,59.855469C265.54099,182.85387 187.08454,297.85994 240.09961,458.2793L349.875,372.94531C322.20549,333.64118 300,282.28964 300,255c0,-20 5.00324,-149.9992 5,-155 -10e-4,-2.004308 -2.41143,-19.27436 -5.10156,-40.144531zM899.91016,454.8418C746.55122,593.77022 578.78424,763.04072 429.50781,939.46875l40.84766,0.54297C595.55342,787.07576 764.14431,621.01748 918.95508,481.37891Zm65.79101,87.45703c-28.87179,19.18723 -64.12524,44.12835 -93.97851,75.52344l25.55078,20.04296c30.22964,-29.84438 65.96002,-54.59002 95.59961,-73.97851 -9.28135,-6.87909 -18.47109,-14.10656 -27.17188,-21.58789zM685,755 525.10156,939.88281 570,940 699.86133,787.5H806.65039L805,755Z"
				></path>
			</symbol>
			<symbol id="SQ5" preserveAspectRatio="none" viewBox="0 0 1300 2000">
				<path
					stroke="#44F"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="6"
					fill="none"
					d="M435,885A57.5,75.000002 0 0 1 377.5,960.00001 57.5,75.000002 0 0 1 320,885 57.5,75.000002 0 0 1 377.5,810 57.5,75.000002 0 0 1 435,885v0M417.07718,940H876.02627M308.27069,940h28.75722M339.49097,970H901.47783M131.84482,543.19629 351.03451,374.58883M6.9310566e-5,644.61533 44.832165,610.1291M1138.1663,665.18229C1077.9926,627.18313 1020.1253,586.55302 965.29601,542.45758M1208.5796,707.90733c-20.1878,-11.78458 -40.1599,-23.81534 -59.8906,-36.12132M557.51806,-3.5577172e-4 965.44559,542.57786M1299.7291,1059.765c-68.4773,39.2778 -116.7334,76.5733 -164.2838,131.8131 -44.9491,-77.8482 -93.9175,-130.6069 -160.20897,-192.68943 -76.05982,-71.23062 -114.27421,-131.59148 -129.3711,-180.42578 -15.09688,-48.8343 -8.90849,-86.60287 7.94922,-120.96875 28.31708,-57.72677 91.51285,-102.35515 139.0695,-133.86354M499.68528,0.03748108C598.83742,212.45251 698.51437,423.77834 890.34164,443.851M364.36489,812.31243C320.07724,685.41364 328.50886,542.63024 321.33642,404.17725c76.71711,39.85219 163.35704,77.44074 457.8821,5.76082C644.587,533.12731 501.69292,642.05444 392.45651,811.84681M355.97656,456.125c29.62956,11.74764 64.92126,21.56216 110.04297,25.1543 51.30556,4.08443 115.56309,0.48617 200.57813,-14.40625 -98.57798,87.12824 -198.39177,177.48156 -282.2461,298.86133 -24.96545,-94.92731 -24.7974,-201.06283 -28.375,-309.60938v0M867.34252,440.4065C719.62961,574.07588 560.4386,730.57461 436.09373,879.43791M223.89186,472.86906c-0.82324,183.16931 37.98603,343.48203 98.11552,466.27071M191.49798,496.71315c2.08648,150.92196 30.40471,286.39171 75.55251,398.73891M429.507,939.46794C578.78343,763.03991 746.55158,593.76963 899.91052,454.84121M470.35494,940.01166C595.55289,787.0757 764.14488,621.01728 918.95565,481.37871M525,940 685,755h120.41872M567.92551,940.0502 699.86133,787.5h106.78892M611.46541,939.39021 714.72266,820h97.2642M654.39213,939.43943 729.58398,852.5h93.89714M697.39662,939.39902 744.44531,885h95.04566M740.07521,939.73575 759.30664,917.5H860M906.39152,629.42293 1063.7852,756.67736M871.92369,617.813 1043.2441,757.01082M459.61865,481.34795C414.86903,573.51288 406.45192,669.62669 385,765M303.65592,-0.00221915C259.09343,162.78907 138.61386,327.07777 209.42337,483.4732M240.09997,458.27954C187.0849,297.86018 265.54056,182.85405 300.09597,58.960082M805.81085,330.134c14.88787,-6.44544 30.42237,-12.16006 46.14865,-17.2138M0.09725143,902.73906C71.866196,860.06685 117.03718,820.61709 170,750c50,100 99.8567,155.1639 176.97865,227.3892 281.56105,263.6842 94.15072,409.6105 -13.08443,480.4695M377.5,842.5c4.42321,0 9.31831,2.00257 14.86719,9.24023C397.91606,858.97789 402.5,871.0223 402.5,885c0,13.9777 -4.58394,26.0221 -10.13281,33.25977C386.81831,925.49743 381.92321,927.5 377.5,927.5c-4.42321,0 -9.31831,-2.00257 -14.86719,-9.24023C357.08394,911.0221 352.5,898.9777 352.5,885c0,-13.9777 4.58394,-26.02211 10.13281,-33.25977C368.18169,844.50257 373.07679,842.5 377.5,842.5v0M1130,765c16.8191,30.21345 26.6544,60.2083 30,90 47.2312,18.32372 82.8871,51.83723 115,90 2.3419,-37.0436 -4.2974,-71.38724 -30,-100 23.3498,-4.99857 40.0029,-20.01884 50,-45 -14.5281,-24.40208 -35.9759,-32.69918 -60,-35 44.8752,-32.16719 30.2665,-71.33926 20,-110 -32.9633,38.74398 -63.8666,77.97963 -125,110v0M1300,705.83334l-34.3239,2.86032M1299.9997,930.55544l-26.1711,-11.63161M1192.7269,836.42558c37.6985,20.41997 54.5672,59.51932 65.2796,89.01033M1182.9686,784.9233c26.555,-0.86899 48.4536,-6.17171 77.0314,15.0767 -14.6369,19.51581 -30.1358,29.72065 -67.2011,34.6433M1234.6287,679.15791c-1.9945,40.38926 -12.7829,83.27561 -52.2037,104.5774M1162.3431,745.42454c26.5383,39.87481 36.0743,80.87688 26.979,123.43436M1130,765c0,0 -82.1675,-15 -95,-5 -12.8325,10 -32.9691,31.30714 -40,40 -31.97044,39.52731 3.64509,49.72935 20,30M1050,800c-59.31161,25.45028 -64.22618,120.61499 20,25M1041.1933,853.52948c-14.9444,32.29436 0.7581,60.30105 58.5,-5.24847M1062.1853,882.59071C1040.9944,921.29246 1103.755,918.14402 1160,855M1063.2524,755.79961c33.572,-37.62441 66.2866,-76.82735 96.4461,-120.73492M1078.4582,757.6865c32.4929,-36.68328 64.0954,-75.00591 93.2554,-117.82589M1085,735c-4.9523,-58.0017 -25.4042,-90.06768 -80,-65 38.526,16.69119 38.6175,74.15849 80,65v0M1005,670c37.8073,-6.25375 56.1399,40.79694 80,65M1100,732.33169c35,-15 50.6726,-47.07119 67.2824,-5 -32.2824,-2.08351 -62.2824,45 -67.2824,5v0M1100.0662,732.84533c26.3257,8.26747 52.4616,-23.9051 67.2162,-5.51364M1155.0001,585.00001C1080.0001,630 1080,484.99999 1155,530c-45,-75 100,-75 55,0 75,-45 75,100 10e-5,55 45,75.00001 -100.0001,74.99999 -55,10e-6v0M1242.5,557.5c-60,0 -60,0 -60,-60 0,60 0,60 -60,60 60,0 60,0 60,60 0,-60 0,-60 60,-60v0M1122.9743,521.34338c-1.248,-10.59434 -3.0726,-20.43952 -5.4737,-28.84337 8.5766,2.45046 18.6544,4.30045 29.4977,5.54996M1146.7554,616.97813c-10.7509,1.24908 -20.7424,3.08971 -29.255,5.52188 2.4225,-8.47859 4.2581,-18.42426 5.5069,-29.12621M1241.9485,592.9857c1.2496,10.84959 3.1002,20.93331 5.5519,29.5143 -8.4143,-2.40409 -18.2735,-4.23021 -28.8829,-5.47837M1218.5761,497.98319c10.625,-1.24828 20.4988,-3.07601 28.9239,-5.48319 -2.4151,8.45286 -4.2469,18.3639 -5.4955,29.0288M357.95908,386.26136c-4.7848,-2.30618 -9.52375,-4.6875 -14.28345,-7.12611M748.06895,383.93902C622.45119,413.08814 538.88863,420.5377 479.79194,417.07826M355.99023,456.12891c29.62693,11.74538 64.9141,21.55877 110.0293,25.15039 51.3028,4.08421 115.55629,0.48608 200.56445,-14.4043C568.01187,553.99998 468.15967,644.25595 384.25,765.71289 359.23837,670.90747 359.53927,564.67648 355.99023,456.12891v0M85,135c10.787262,31.12992 5,90 35,90 65,0 20,-95 -35,-145 -55.000004,50 -100.000004,145 -35,145 30,0 24.21273,-58.87008 35,-90v0M40,285c0,0 0,-10 10,-10 12.88094,0 15,45 -10,45 -34.999996,0 -29.999996,-70 5,-70 30,0 40,50 40,50 0,0 10,-50 40,-50 35,0 40,70 5,70 -25,0 -22.88094,-45 -10,-45 10,0 10,10 10,10M120,275c-55,2.66831 15,250 14.49097,296.289C134.16784,600.67311 125,630 85,630 45,630 35.832163,600.67311 35.509031,571.289 35,525 105,277.66831 50,275M70,264.98358V208.33333M100,265.18883V208.74384M103.20611,627.39263C121.81764,632.48836 135,645.16656 135,660c0,19.32997 -22.38576,35 -50,35 -27.614237,0 -50,-15.67003 -50,-35 0,-14.8303 13.176786,-27.50627 31.782083,-32.60414M65.931232,692.4756C41.674852,699.57662 35,720.74035 35,740c0,36.24391 13.136211,96.133 20.364326,126.34321M128.36935,800.67704C132.14739,778.91407 135,756.88968 135,740c0,-19.39937 -6.77205,-40.73054 -31.46191,-47.67672M256.89224,885h6.38602M1.1417102e-4,884.99999 28.737098,885M245.57157,870h11.90122M2.5229169e-5,870.00002 51.088175,870M233.67034,855h18.57752M4.1609595e-5,854.99999 52.539543,855M222.93022,840h24.09272M7.6084636e-5,840.00001 49.346532,840M212.77064,825h29.89819M4.2336546e-5,825.00002 46.443795,825M203.1916,810h34.54258M4.0905762e-6,810.00002 43.541058,810M194.48339,795h38.89668M129.46208,795h5.22493M-3.8457096e-5,795.00001 40.638321,795M186.06545,780h42.96051M131.78427,780h14.51368M-3.1733115e-5,780.00001 38.316131,780M178.22806,765h46.73407M133.81618,765h24.67327M10,765H36.284215M134.68701,750h86.50156M10,750H34.542573M134.97728,735h83.01828M15,735H35.12312M132.65509,720H205M15,720H37.844594M155,705h45M325,510c-11.82334,-17.57111 -24.45521,-31.94743 -45.42097,-47.16261 -21.67788,-15.73198 -32.01525,9.6364 -23.86278,22.70472M325,540c-13.68399,-15.7169 -40.72661,-39.31758 -62.25684,-51.80699 -20.39713,-11.83211 -26.52283,15.09906 -9.53546,27.99468M326.64903,572.53873c-13.68399,-15.7169 -40.42328,-39.85576 -62.25684,-51.80699 -33.04187,-18.08643 -43.83934,14.15892 -2.74316,31.80699M329.68204,632.14459c-13.68399,-15.7169 -40.42328,-39.85576 -62.25684,-51.80699 -30.81157,-16.86561 -37.65608,16.8659 -5.11631,35.80661M328.06764,597.68777c-13.86078,-13.59047 -33.31597,-27.70524 -50.77313,-39.51278 -22.07438,-14.9305 -34.10496,4.47364 -22.83565,17.22609M332.19576,659.38835c-13.77031,-13.23256 -32.62008,-26.88451 -49.58329,-38.35795 -24.04479,-16.26322 -36.17268,12.27173 -19.25152,25.31598M335.48063,686.60634C319.24375,673.64242 295.51352,659.7442 277.4252,650.3376c-31.2697,-16.26141 -36.88691,20.47944 -3.29829,37.12122M339.44241,709.94356C293.812,671.34406 241.20364,684.64228 285,715M345.57813,743.85785c-49.78299,-42.23381 -140.14002,-42.27022 -51.45386,5.50004M359.15379,797.42734C296.30783,757.35598 217.41506,767.9862 315.25691,808.08817M356.15219,815.71589c-43.41581,-18.1629 -92.79129,0.20988 -43.97099,13.65755M335.79649,833.55074c-36.46249,-11.38361 -55.92576,9.42664 -11.42381,20.21059M323.63736,467.38673c-7.1925,-7.58612 -15.51039,-14.89158 -25.85855,-22.4014 -17.52111,-12.71535 -26.71907,0.32727 -25.12324,12.4885M322.15877,428.22708c-1.31784,-1.00168 -2.67007,-2.00587 -4.05887,-3.01374 -19.41173,-14.0874 -28.60717,3.4419 -24.22651,16.36102M351.5017,769.34668c-41.8286,-32.62324 -87.13007,-22.98664 -57.82646,2.59886M396.50984,805.03398c97.55186,1.04019 65.93584,25.61549 21.19412,25.63392M410.20409,785.71584c31.87867,-11.92022 60.58013,-9.17207 74.95842,-1.62887 16.81695,8.82258 14.04006,24.2047 -26.16419,30.34906M430.54986,757.7319c58.57662,-11.0001 103.69453,13.94896 55.48459,26.1888M451.62343,729.60393c67.42086,-18.09697 125.45489,10.74224 49.42624,33.66324M469.15226,707.61747c69.25339,-23.47062 135.42699,4.47512 67.15155,28.14525M497.03474,675.73394c50.50234,-8.00778 88.6752,9.66559 55.551,28.0217M514.06286,656.56715c77.25396,-19.94453 157.95502,17.262 48.7626,27.75334M550.91529,618.31036c57.1762,-5.00205 100.00874,18.02731 40.2256,35.03407M568.89077,600.93936c75.24789,-19.79781 151.84194,14.60918 51.22446,34.33609M596.84001,574.15634c55.64482,-7.64299 102.46778,11.7471 64.24628,28.76475M620.73761,552.10789c71.56974,-16.51587 140.66537,14.62009 53.45997,34.06378M660.73433,515.56983c57.1151,-4.52529 99.00079,18.87447 36.45506,35.78648M684.38719,494.58861c73.88041,-16.89549 144.8643,16.89901 43.68109,36.08147M722.79564,460.82624c57.76542,-5.50387 101.75016,17.65976 42.02455,34.7974M748.43052,437.7647c68.01755,-11.92015 127.59071,17.4385 43.80212,36.02686M645.55164,273.86211C640.4516,285.47932 635.59316,297.26013 610,295c-14.37233,81.30224 -73.77303,98.38804 -130,120 0,0 -19.41945,15.64589 -29.41945,15.64589C435.58055,430.64589 425,425 420,425c-5,0 -10,5 -25,5 -15,0 -30,-25 -40,-50 -30,-40 -55,-96.04455 -55,-125 0,-20 5.003,-149.9992 5,-155 -0.002,-3.089335 -5.72781,-42.445846 -10.1037,-72.07356M622.93321,240.32144C616.61632,250.552 609.19352,264.74236 615,265c2.73428,0.12132 6.96971,-10.37759 10.24354,-19.90618M904.16018,494.81448l50.56379,54.17549M889.99031,508.2039l48.73454,52.21558M875.34795,521.08709l48.01937,51.44933M861.63691,534.96812l46.15447,49.45122M847.01655,547.87487l45.96336,49.24646M832.83302,561.24966l35.28817,37.80876M818.66315,574.63908l24.02599,25.74214M803.86532,587.3557l17.84203,19.11646M790.06402,601.14003l8.92784,9.56554M482.75862,925h55.41872M495.89491,910h55.00821M508.21018,895h55.82923M521.34647,880h55.41872M534.48276,865h55.41872M552.95566,845H585M790,820v32.5M765,820v32.5M740,820v32.5M703.26765,833.26765l22.578,22.578M684.08867,854.08867l23.39901,23.39901M665.93596,875.93596l22.78325,22.78325M648.19376,898.19376l22.578,22.578M629.22003,919.22003l20.73071,20.73071M791.29599,310.75526c15.62961,-6.29692 31.83381,-11.83473 48.11454,-16.69002M776.15664,290.35133c15.84539,-6.35519 32.2728,-11.93292 48.76488,-16.81275M760.82223,270.4856c16.18061,-6.50419 32.97255,-12.19625 49.8241,-17.16102M746.54814,252.22866c16.42632,-6.7965 33.54246,-12.73644 50.75899,-17.91046M739.12096,229.17409c11.71799,-4.608 23.73402,-8.79725 35.84163,-12.5995M726.54679,208.22774c8.46394,-3.2756 17.07495,-6.33535 25.75602,-9.1911M711.68624,188.33917c5.39484,-2.00758 10.85695,-3.94932 16.37032,-5.82515M900.40882,94.431781C848.5463,114.25376 796.72828,69.769511 761.4322,93.621964 715,125.00001 755,185 789.33498,165.18883 821.13528,146.84017 790,105 775,115c-9.30261,6.20174 -14.88842,18.30946 -10,25 6.18042,8.45885 10.48873,9.62814 20,5M901.46652,97.13303C861.76115,135.4564 879.34663,201.01228 842.74068,222.52055 794.42332,250.91 757.5027,188.96753 790.17065,166.51363c30.25635,-20.79631 54.6061,25.32412 39.1205,34.55428 -9.60379,5.72429 -22.93675,5.55043 -26.86936,-1.74304 -4.972,-9.22111 -4.17161,-13.61293 4.10189,-20.20332M765,180l90,-60M845,160c-10,-10 -45.467,-11.35662 -55,5 22.00764,-11.03808 34.76336,-24.75676 25,-45M795,230c25,30 50,20 75,10 24.05541,32.7653 64.66095,38.66637 105,45M725,130C715,110 740,85 755,75 749.14905,51.948962 757.70702,26.00987 766.59362,0.00490542M700,90c10,-25 25,-25 25,-25 -8.48271,-38.172217 3.28893,-47.867055 8.18679,-64.93099617M427.96416,0.01822477C445.06535,51.748024 483.31343,78.400493 539.31946,83.994433M446.67053,0.04362022C462.63103,38.843647 492.03631,61.699978 533.14043,70.683071M461.24526,0.01603427C475.22521,27.447203 496.92922,45.718691 525.58366,55.74792M476.99588,0.10806452C487.38028,16.453559 500.99836,28.964352 517.63646,37.893813M371.26432,0.04443925C356.34418,40.196712 340.91798,80.075485 304.69652,100.28589M355.60874,0.04353776C343.34293,31.804187 329.13875,61.845937 302.67098,80.298673M339.57059,0.02060224C329.73362,23.196287 317.89132,44.53011 299.71459,59.883794M325.15652,0.08430598C317.46458,14.722402 308.27692,27.964826 296.26758,38.544057M305,120c41.1016,-25.066138 61.56092,-14.28714 80,0 20,55 -15,110 -14.41945,151.6763 0.21559,15.47674 11.72696,13.44856 19.41945,13.3237 4.99934,-0.0811 15,10 15,10M305,125c29.58587,-20.97635 55.47603,-17.50669 80,-5M430,245c20,0 20,30 5,30 -40,5 -40,-10 -5,0M365,315v10l5,-5 -5,-5v0M455,320l5,-5v10l-5,-5v0M370,320c0,0 5,5 10,5 5,0 5.24415,-4.00984 12.32219,-4.4848C400,320 400,325 405,325c5,0 15,-10 20,-10 5,0 15,5 20,5h10M390,340c3.06957,28.45212 45.6136,8.68856 45,5 -5,5 -44.77199,31.85105 -45,-5v0M430,135c51.53607,-36.718861 85.86501,-16.18211 120,5 -35.40475,-25.98218 -85,-45 -120,-5v0M540,160C525,160 503.52953,134.61544 483.61398,136.45137 453.79885,139.1999 445,175 430,180 447.93464,158.59181 463.7944,151.78059 478.07024,151.93493 507.27438,152.25068 515,185 550,175M430,180c15,-10 32.80939,10.04302 45.17423,9.94542C504.08195,189.71723 519.49385,175 530,175M380,175c-20,0 -30.87367,-19.1648 -47.03192,-20.29027 -12.3413,-0.85961 -29.19452,12.61246 -29.19452,17.61246 0,7.07107 11.23734,20.70784 22.74316,23.25836C342.90794,199.21402 362.81244,175.3491 380,175v0M305,165c22.64276,-42.75014 64.95345,-9.49214 65,-5M820,265c15,15 35,10 45,5 20.5191,14.6565 42.75671,20.72048 62.68286,23.22939M851.86653 312.33707C895.10619 299.11787 938.83136 290.34833 975 285C924.90149 188.22308 899.90057 94.152754 874.11725 -0.0019513659 M851.86653,312.33707C895.10619,299.11787 938.83136,290.34833 975,285 924.90149,188.22308 899.90057,94.152754 874.11725,-0.00195137M851.01315,311.99775 635.36748,-2.4089679e-4M927.65339,293.26472C907.75671,290.72048 885.5191,284.6565 865,270c-10,5 -30,10 -45,-5"
				></path>
			</symbol>
			<symbol id="SQ6" preserveAspectRatio="none" viewBox="0 0 1300 2000">
				<path
					stroke="#44F"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="3"
					fill="none"
					d="M986.60333,811.20184l17.52527,26.83701m3.5763,5.47663 14.2883,21.88014M993.49031,800.86775c12.59499,20.81314 26.36539,39.79428 40.67199,57.93996m3.6811,4.63683c6.0574,7.57938 12.2001,15.02588 18.3803,22.41378m3.5795,4.26824c4.9357,5.87225 9.8895,11.71638 14.8372,17.56998M1002.2895,791.27746c25.6547,42.89167 56.3312,77.95704 86.5273,113.77117M1011.3206,782.24417c26.5981,44.89853 58.7236,81.18275 90.1523,118.55299M1018.2105,775.40469C1045.4382,820.51985 1078.1971,857.01507 1110,895M91.990234,409.08984c5.346491,34.39969 12.364566,69.89746 17.978516,99.54297 5.61395,29.64551 9.60751,54.84672 9.52344,62.49219 -0.14502,13.18721 -2.60383,25.09508 -7.35157,32.2207C107.39289,610.47133 101.33414,615 85,615 68.665861,615 62.607113,610.47133 57.859375,603.3457M95.230469,511.42383c2.783382,14.69817 5.162021,28.28252 6.812501,38.99023 1.65048,10.70771 2.46055,19.51658 2.44922,20.54688 -0.12561,11.42229 -3.03694,21.37127 -4.833987,24.06836 -1.554361,2.33286 -1.96098,2.67133 -3.316406,3.33203C94.986371,599.02203 91.780811,600 85,600M99.244141,641.85938C113.48363,645.75807 120,654.05348 120,660c0,3.87456 -2.13436,8.18273 -8.24609,12.46094C105.64218,676.73915 95.96981,680 85,680 74.030191,680 64.357824,676.73915 58.246094,672.46094M99.476562,706.76367c8.835718,2.48582 12.847888,6.43575 15.929688,11.99805C118.48805,724.32402 120,732.04575 120,740c0,15.20071 -2.70618,36.77501 -6.41016,58.11133M102.94922,660.2832C99.903483,662.33803 92.860098,665 85,665c-7.997241,0 -15.198086,-2.76015 -18.152344,-4.82812M102.28516,726.03125C103.52282,728.2651 105,733.94656 105,740c0,13.42041 -2.56634,34.6744 -6.189453,55.54492M726.75998,368.27894C639.85431,387.67178 574.6926,396.00751 524.83867,397.57475M715.61309,356.58894C649.94086,370.7787 597.12268,378.4618 554.16847,381.63062M703.03893,344.25945c-49.76763,10.38288 -91.8849,16.91189 -127.75629,20.52287M690.7875,331.76901c-38.30305,7.6982 -71.90839,13.04175 -101.50758,16.49148M680.13806,318.87243c-30.03631,5.82677 -57.08899,10.16495 -81.51547,13.25269M670.20516,305.76564c-23.347,4.36958 -44.8345,7.81564 -64.64196,10.45774M659.57286,292.71511c-18.04772,3.23925 -34.94556,5.91034 -50.78275,8.07274M390,380c11.94547,-13.95601 27.22073,-12.69836 45,0M440,195c10,15 30,15 45,15M310,205c50,25 60,-30 70,-30M350.01995,162.05531c1.14299,3.17833 1.7863,6.76631 1.7863,10.56373 0,13.03628 -7.58139,23.60427 -16.9335,23.60427 -9.35211,0 -16.93349,-10.568 -16.93349,-23.60427 0,-5.79795 1.49965,-11.10766 3.98776,-15.21654M488.55832,153.60687c1.90775,3.81995 3.02626,8.46304 3.02626,13.4703 0,13.03628 -7.58139,23.60427 -16.9335,23.60427 -9.35211,0 -16.93349,-10.568 -16.93349,-23.60427 0,-4.03258 0.72545,-7.82898 2.00436,-11.14943"
				></path>
				<use xlink:href="#SSQ" height="90" transform="translate(1188,935)scale(1,0.972)rotate(-40)translate(-45,-45)"></use>
				<use xlink:href="#SSQ" height="90" transform="translate(1194,1043)scale(1,0.972)rotate(-40)translate(-45,-45)"></use>
				<use xlink:href="#SSQ" height="90" transform="translate(1096,1033)scale(1,0.972)rotate(-40)translate(-45,-45)"></use>
				<use xlink:href="#SSQ" height="90" transform="translate(1022,947)scale(1,0.972)rotate(-40)translate(-45,-45)"></use>
				<use xlink:href="#SSQ" height="90" transform="translate(918,851)scale(1,0.972)rotate(-40)translate(-45,-45)"></use>
				<use xlink:href="#SSQ" height="90" transform="translate(897,726)scale(1,0.972)rotate(-40)translate(-45,-45)"></use>
			</symbol>
			<rect width="239" height="335" x="-119.5" y="-167.5" rx="12" ry="12" fill="white" stroke="black"></rect>
			<use width="164.8" height="260.8" x="-82.4" y="-130.4" xlink:href="#SQ1"></use>
			<use transform="rotate(180)" width="164.8" height="260.8" x="-82.4" y="-130.4" xlink:href="#SQ1"></use>
			<use width="164.8" height="260.8" x="-82.4" y="-130.4" xlink:href="#SQ2"></use>
			<use transform="rotate(180)" width="164.8" height="260.8" x="-82.4" y="-130.4" xlink:href="#SQ2"></use>
			<use width="164.8" height="260.8" x="-82.4" y="-130.4" xlink:href="#SQ3"></use>
			<use transform="rotate(180)" width="164.8" height="260.8" x="-82.4" y="-130.4" xlink:href="#SQ3"></use>
			<use width="164.8" height="260.8" x="-82.4" y="-130.4" xlink:href="#SQ4"></use>
			<use transform="rotate(180)" width="164.8" height="260.8" x="-82.4" y="-130.4" xlink:href="#SQ4"></use>
			<use width="164.8" height="260.8" x="-82.4" y="-130.4" xlink:href="#SQ5"></use>
			<use transform="rotate(180)" width="164.8" height="260.8" x="-82.4" y="-130.4" xlink:href="#SQ5"></use>
			<use width="164.8" height="260.8" x="-82.4" y="-130.4" xlink:href="#SQ6"></use>
			<use transform="rotate(180)" width="164.8" height="260.8" x="-82.4" y="-130.4" xlink:href="#SQ6"></use>
			<use xlink:href="#VSQ" height="32" x="-114.4" y="-156"></use>
			<use xlink:href="#SSQ" height="26.769" x="-111.784" y="-119"></use>
			<use xlink:href="#SSQ" height="55.68" x="36.088" y="-132.16"></use>
			<g transform="rotate(180)">
				<use xlink:href="#VSQ" height="32" x="-114.4" y="-156"></use>
				<use xlink:href="#SSQ" height="26.769" x="-111.784" y="-119"></use>
				<use xlink:href="#SSQ" height="55.68" x="36.088" y="-132.16"></use>
			</g>
			<use xlink:href="#XSQ" stroke="#44F" fill="none"></use>
		</svg>
	`;
	html = replaceAllFast(html, 'black', 'green');
	mDiv(dTable, {}, null, html);
	return;
}
function test10_queen_html() {

	let htmlWORKS = `
		<svg
			xmlns="http://www.w3.org/2000/svg"
			xmlns:xlink="http://www.w3.org/1999/xlink"
			face="QS"
			height="100%"
			preserveAspectRatio="none"
			viewBox="-120 -168 240 336"
			width="100%"
			fill="#ffff00"
			stroke="green"
			>
			<defs><rect id="XSQ" width="164.8" height="260.8" x="-82.4" y="-130.4"></rect></defs>
			<symbol id="VSQ" viewBox="-500 -500 1000 1000" preserveAspectRatio="xMinYMid">
				<path
					d="M-260 100C40 100 -40 460 260 460M-175 0L-175 -285A175 175 0 0 1 175 -285L175 285A175 175 0 0 1 -175 285Z"
					stroke="green"
					stroke-width="80"
					stroke-linecap="square"
					stroke-miterlimit="1.5"
					fill="none"
				></path>
			</symbol>
			<symbol id="SSQ" viewBox="-600 -600 1200 1200" preserveAspectRatio="xMinYMid">
				<path
					d="M0 -500C100 -250 355 -100 355 185A150 150 0 0 1 55 185A10 10 0 0 0 35 185C35 385 85 400 130 500L-130 500C-85 400 -35 385 -35 185A10 10 0 0 0 -55 185A150 150 0 0 1 -355 185C-355 -100 -100 -250 0 -500Z"
					fill="green"
				></path>
			</symbol>
			<symbol id="SQ1" preserveAspectRatio="none" viewBox="0 0 1300 2000">
				<path
					fill="green"
					d="M635.39648,0 851.86719,312.33789C895.10685,299.11869 938.83136,290.34833 975,285 924.90197,188.22401 899.89439,94.153799 874.11133,0ZM295.52539,27.285156C246.27551,180.9799 142.75435,335.54042 209.25195,483.08398l-17.43359,13.44922c1.76531,151.10099 30.08527,286.57163 74.54102,398.60938 18.12594,21.287 38.56227,42.11564 61.47851,64.11523 3.61128,3.46683 7.28461,6.96262 11.33789,10.61914L901.47852,970l-0.41407,-0.51953c-0.12219,-0.138 -0.23745,-0.27418 -0.35937,-0.41211 15.27725,17.28278 32.6506,35.12574 52.3164,53.54294C1030.1434,1094.8366 1080,1150 1130,1250c52.9819,-70.6425 98.186,-110.0972 170,-152.7871v-37.6016c-68.6196,39.3343 -116.9422,76.6549 -164.5547,131.9668 -44.9491,-77.8482 -93.9175,-130.6069 -160.20897,-192.68943 -76.05982,-71.23062 -114.27421,-131.59148 -129.3711,-180.42578 -15.09688,-48.8343 -8.90849,-86.60287 7.94922,-120.96875 28.31708,-57.72677 91.51367,-102.35489 139.07032,-133.86328l-26.7793,-21.49024C896.53697,588.11019 793.22595,665.67487 806.10938,786.48828L699.86133,787.5 568.0625,939.89258 429.48438,939.86328C578.06034,763.29892 745.82856,594.02803 899.1875,455.09961l-9.56836,-10.99023c-28.86687,-3.02061 -55.64392,-10.37642 -80.51758,-21.42774 -1.77605,4.17261 -4.43372,8.02096 -7.94336,11.23438C665.11643,558.39566 525.46983,665.166 419.78906,829.43164L392.45703,811.84766C501.69344,642.05529 644.58723,533.12674 779.21875,409.9375l17.51367,6.86328c-17.74437,-8.98707 -34.48695,-19.8921 -50.29101,-32.48437 -124.71285,29.03155 -208.27492,36.48099 -267.26758,31.98242 0,0 -19.31641,14.60547 -29.31641,14.60547 -15,0 -25.58008,-5.64453 -30.58008,-5.64453 -5,0 -10,5 -25,5 -15,0 -30,-25 -40,-50 -1.51422,-2.01895 -3.01443,-4.07919 -4.23242,-5.79297l-39.21875,30.25586 10.50977,-0.54493c7.17244,138.45299 -1.25836,281.23598 43.02929,408.13477l-27.41796,17.66602c-1.32891,-2.13106 -2.43311,-4.45616 -3.26758,-6.95704C288.22851,692.7888 295.29422,552.70428 289.59766,421.09961l-69.70313,53.77344 20.20508,-16.59375C187.08454,297.85994 265.54029,182.85491 300.0957,58.960938ZM85,80c-55.000004,50 -100.000004,145 -35,145 9.343263,0 15.215964,-5.70961 19.599609,-15.58984l-0.05469,54.80664C63.116922,255.80043 55.218717,250 45,250c-34.999996,0 -39.999996,70 -5,70 24.46345,0 22.957588,-43.08208 10.8125,-44.93164 53.48157,5.0855 -15.809214,250.16385 -15.302734,296.2207 0.268193,24.38822 6.628431,48.73678 31.46289,56.20899C48.176742,632.49354 35,645.1697 35,660 35,674.30844 47.265656,686.61054 65.384766,692.25586 41.674751,699.57565 35,720.74035 35,740 35,776.24391 48.1356,836.13212 55.517578,866.33008 82.604368,846.54619 106.08392,825.42866 128.83984,800.21875 132.14826,778.91478 135,756.88968 135,740 135,720.60063 128.2285,699.26867 104.15234,691.95898 118.02756,686.75065 129.28173,676.58841 135,660c0,-14.83344 -13.18185,-27.51102 -30.78711,-32.89844 24.05654,-8.65812 30.01787,-32.21714 30.27734,-55.8125C134.99671,525.23221 65.705931,280.15386 119.1875,275.06836 107.04241,276.91792 105.53655,320 130,320c35,0 30,-70 -5,-70 -10.83425,0 -19.06007,6.52154 -25.074219,15.02148L100.25195,209.2793C104.49041,218.99863 110.42097,225 120,225 185,225 140,130 85,80Zm641.48047,287.83789c-86.62544,19.83455 -151.78802,28.17022 -200.80469,29.24219 -14.2248,6.27415 -30.07191,11.92239 -45.7793,18.95898 58.99266,4.49857 142.55438,-2.95118 267.19727,-32.03711 -7.7527,-5.20716 -14.38853,-10.76914 -20.61328,-16.16406zm-370.49024,88.29102c29.62693,11.74538 64.9141,21.55877 110.0293,25.15039 51.3028,4.08421 115.55629,0.48608 200.56445,-14.4043C568.01187,553.99998 468.15967,644.25595 384.25,765.71289 359.23837,670.90747 359.53927,564.67648 355.99023,456.12891ZM1182.5,473.75c-24.0403,0 -48.0562,17.34722 -29.8594,52.02344A45,42.5 0 0 1 1182.5,515a45,42.5 0 0 1 29.8652,10.76367C1230.552,491.09427 1206.538,473.75 1182.5,473.75Zm-54.6914,47.48047c-45.2477,0.77462 -37.6424,97.7377 22.793,66.2168A45,42.5 0 0 1 1137.5,557.5a45,42.5 0 0 1 13.1113,-29.94336c-8.6891,-4.53343 -16.2978,-6.43753 -22.8027,-6.32617zm109.3828,0c-6.5027,-0.11132 -14.1076,1.79222 -22.793,6.32226A45,42.5 0 0 1 1227.5,557.5a45,42.5 0 0 1 -13.1094,29.94336c60.4429,31.53409 68.0505,-65.43824 22.8008,-66.21289zm-24.8301,67.99414A45,42.5 0 0 1 1182.5,600 45,42.5 0 0 1 1152.6348,589.23633c-11.9875,22.85174 -5.6311,38.16959 6.9726,45.95898 -23.6821,34.46419 -48.941,66.02584 -74.9492,96.20703C1079.1653,675.69528 1058.4509,645.45798 1005,670c37.225,16.12754 38.5709,70.31699 75.9492,65.69727 -5.8664,6.76063 -11.768,13.45662 -17.6972,20.10156l15.207,1.88672c7.2551,-8.19076 14.4623,-16.46748 21.6113,-24.85352 5.1929,39.08146 35.0698,-7.57452 67.2129,-5.5 -16.4802,-41.743 -32.0495,-10.50502 -66.4785,4.63672 24.5708,-28.86629 48.4073,-59.08334 70.8027,-91.95508 26.5679,6.12811 61.7407,-10.79807 40.7539,-50.78906zM1255,655c-32.9633,38.74398 -63.8666,77.97963 -125,110 16.8191,30.21345 26.6544,60.2083 30,90 47.2312,18.32372 82.8871,51.83723 115,90 2.3419,-37.0436 -4.2974,-71.38724 -30,-100 23.3498,-4.99857 40.0029,-20.01884 50,-45 -14.5281,-24.40208 -35.9759,-32.69918 -60,-35 44.8752,-32.16719 30.2665,-71.33926 20,-110zM811.88477,817.78516c10.86486,41.66548 35.34229,88.00659 78.58593,139.42382 -4.92291,-5.82285 -9.66276,-11.58316 -14.2207,-17.2539l-286.46289,-0.0586 64.60547,-0.45703 75.1914,-86.93945 93.88282,-0.33984c-4.9028,-11.9067 -8.74345,-23.39087 -11.58203,-34.375zM377.5,842.5c4.42321,0 9.31831,2.00257 14.86719,9.24023C397.91606,858.97789 402.5,871.0223 402.5,885c0,13.9777 -4.58394,26.0221 -10.13281,33.25977C386.81831,925.49743 381.92321,927.5 377.5,927.5c-4.42321,0 -9.31831,-2.00257 -14.86719,-9.24023C357.08394,911.0221 352.5,898.9777 352.5,885c0,-13.9777 4.58394,-26.02211 10.13281,-33.25977C368.18169,844.50257 373.07679,842.5 377.5,842.5Z"
				></path>
			</symbol>
			<symbol id="SQ2" preserveAspectRatio="none" viewBox="0 0 1300 2000">
				<path
					fill="red"
					d="M557.51758,0 805.9668,330.45703 851.01367,311.99805 635.36719,0Zm78.02148,0 63.76563,90.75C709.99966,65.000167 725,65 725,65 716.50651,26.779299 728.31462,17.104416 733.20117,0ZM820,265 851.86719,312.33789C877.5079,304.49903 903.31958,298.22492 927.6543,293.26562 907.75762,290.72138 885.5191,284.6565 865,270c-10,5 -30,10 -45,-5zm99.12695,216.28711C764.14521,621.01648 595.55342,787.07572 470.35547,940.01172L525,940 685,755h120.41797l-0.0547,-0.41211c6.37431,-102.76161 97.50088,-170.65811 160.41211,-212.22851zm-727.41992,15.5625 -59.86133,46.34766 -0.39648,0.30468c1.93099,12.0459 3.10803,21.69313 3.04101,27.78711 -0.25947,23.59536 -6.2208,47.15438 -30.27734,55.8125C121.81815,632.48898 135,645.16656 135,660 129.28173,676.58841 118.02756,686.75065 104.15234,691.95898 128.2285,699.26867 135,720.60063 135,740c0,16.88968 -2.85174,38.91478 -6.16016,60.21875 -1.95154,2.162 -3.90854,4.29257 -5.87304,6.39453C138.56664,789.96704 153.92711,771.43051 170,750 200.25102,810.50205 230.44886,854.59181 266.85742,895.71484 221.90196,783.10482 193.58426,647.63449 191.70703,496.84961ZM44.53125,610.36133 0,644.61523V902.7832C30.797744,884.46615 56.707359,866.73637 80.427734,846.89844 72.427991,853.57027 64.158102,860.01913 55.517578,866.33008 48.1356,836.13212 35,776.24391 35,740 35,720.74035 41.674751,699.57565 65.384766,692.25586 47.265656,686.61054 35,674.30844 35,660 35,645.1697 48.176742,632.49354 66.972656,627.49805 56.528563,624.35562 49.361734,618.22105 44.53125,610.36133Zm1190.09765,68.79687 -1.1211,1.04688c-20.0542,23.0427 -41.8711,45.665 -71.7441,65.72265 27.117,39.37142 36.6532,80.37363 27.7441,123.12891 25.4392,14.76465 47.2329,33.87001 67.875,55.8418 -10.0896,-28.95393 -26.9566,-68.05217 -64.6191,-89.36328C1229.865,829.72137 1245.3631,819.51581 1260,800c-28.5778,-21.24841 -50.4759,-15.94491 -77.3027,-15.66992 39.149,-21.89578 49.9371,-64.78262 51.9316,-105.17188zM110.74609,819.23828c-0.7889,0.78628 -1.58065,1.56702 -2.37304,2.3457 0.792,-0.77791 1.58362,-1.55961 2.37304,-2.3457zm-5.15234,5.05078c-0.76819,0.74251 -1.53476,1.48679 -2.30664,2.22266 0.77112,-0.73534 1.53841,-1.48017 2.30664,-2.22266zm-5.26172,5.00586c-2.077449,1.94603 -4.165139,3.87648 -6.273436,5.7793 2.104356,-1.90192 4.194747,-3.83083 6.273436,-5.7793zm-6.539061,6.02149c-1.467973,1.32281 -2.945132,2.63598 -4.429688,3.93945 1.482456,-1.30407 2.961518,-2.61456 4.429688,-3.93945zM377.5,862.5a11,22.5 0 0 0 -11,22.5 11,22.5 0 0 0 11,22.5 11,22.5 0 0 0 11,-22.5 11,22.5 0 0 0 -11,-22.5zm225.17578,127.46484a10,10 0 0 0 -10,10 10,10 0 0 0 10,9.99996 10,10 0 0 0 10,-9.99996 10,10 0 0 0 -10,-10zM420,990a10,10 0 0 0 -10,10 10,10 0 0 0 10,10 10,10 0 0 0 10,-10 10,10 0 0 0 -10,-10zm91.13281,0.41016a10,10 0 0 0 -10,10.00004 10,10 0 0 0 10,10 10,10 0 0 0 10,-10 10,10 0 0 0 -10,-10.00004z"
				></path>
			</symbol>
			<symbol id="SQ3" preserveAspectRatio="none" viewBox="0 0 1300 2000">
				<path
					fill="#44F"
					d="M472.5,150a12.5,20 0 0 0 -12.5,20 12.5,20 0 0 0 12.5,20 12.5,20 0 0 0 12.5,-20 12.5,20 0 0 0 -12.5,-20zm-140,5a12.5,20 0 0 0 -12.5,20 12.5,20 0 0 0 12.5,20 12.5,20 0 0 0 12.5,-20 12.5,20 0 0 0 -12.5,-20zm23.49023,301.12891c3.54904,108.54757 3.24814,214.77856 28.25977,309.58398 83.90967,-121.45694 183.76187,-211.71291 282.33398,-298.83789 -85.00816,14.89038 -149.26165,18.48851 -200.56445,14.4043 -45.1152,-3.59162 -80.40237,-13.40501 -110.0293,-25.15039zm42.92579,22.92187c22.57573,0.10326 52.52779,2.34383 83.49804,6.2461 65.74558,8.28415 118.15335,21.65893 117.05469,29.87304 -1.09829,8.2139 -56.30922,5.07893 -122.05273,-3.20508 -65.73948,-8.28354 -117.1185,-18.57868 -116.02735,-26.79296 0.53448,-4.02047 14.07178,-6.22853 37.52735,-6.1211zM1117.5,492.5c2.4011,8.40385 4.2266,18.24941 5.4746,28.84375v0.36133c7.3876,-1.36391 16.4655,0.0837 27.2324,5.62304l-21.2675,-21.26757a1.50015,1.50015 0 0 1 1.0449,-2.57617 1.50015,1.50015 0 0 1 1.0761,0.45507l21.2676,21.26758c-5.5291,-10.74776 -6.9807,-19.81297 -5.6289,-27.19336 -10.7286,-1.24895 -20.7021,-3.08593 -29.1992,-5.51367zm130,0c-8.4251,2.40718 -18.2988,4.23414 -28.9238,5.48242h-0.2793c1.3613,7.38557 -0.087,16.46062 -5.6231,27.22266l21.2657,-21.26563a1.50015,1.50015 0 0 1 1.0312,-0.45312 1.50015,1.50015 0 0 1 1.0898,2.57422l-21.2675,21.26757c10.7565,-5.53399 19.8272,-6.98416 27.2109,-5.62695v-0.17187c1.2486,-10.6649 3.081,-20.57644 5.4961,-29.0293zm-853.59961,15.25781c20.38428,0.10329 47.42876,2.34386 75.39258,6.2461 59.36368,8.28422 106.68388,21.65899 105.69141,29.87304 -0.99271,8.21355 -49.91699,8.15671 -109.27735,-0.12695 -59.36371,-8.28422 -106.68391,-21.659 -105.69141,-29.87305 0.48636,-4.01928 12.70935,-6.22659 33.88477,-6.11914zm7.69531,34.67969c15.09367,-0.0753 32.61454,0.81411 50.47852,2.5625 51.50146,5.04084 94.00823,14.75226 93.67578,23.00391 -0.32891,8.2521 -42.34749,10.85536 -93.84961,5.81445C400.39893,568.77752 358.91755,558.00165 359.25,549.75c0.20345,-5.08688 15.52034,-7.17888 42.3457,-7.3125zm590.81446,21.09375c-26.28817,17.83124 -58.00395,39.71623 -85.84375,65.82227L1063.252,755.79883c5.9292,-6.64494 11.8308,-13.34093 17.6972,-20.10156C1043.5709,740.31699 1042.225,686.12754 1005,670c53.4509,-24.54202 74.1653,5.69528 79.6582,61.40234 18.288,-21.22222 36.2025,-43.13214 53.4609,-66.25 -50.4965,-31.89003 -99.3677,-65.63189 -145.70894,-101.62109zm92.24804,167.87109c-1.2353,1.43353 -2.4703,2.86748 -3.709,4.29493 1.3064,-0.16146 2.6533,-0.388 4.0508,-0.69727 -0.1038,-1.21628 -0.2241,-2.40447 -0.3418,-3.59766zm-21.4062,24.39649 1.3242,1.02344C1092.8236,758.22045 1130,765 1130,765c33.2353,-17.40792 57.5278,-36.95014 78.082,-57.38477 -19.9562,-11.65548 -39.7017,-23.55345 -59.2109,-35.71875 -15.5528,20.88792 -31.6462,40.7815 -48.0664,60.07227 34.429,-15.14174 49.9983,-46.37972 66.4785,-4.63672 -32.1431,-2.07452 -62.02,44.58146 -67.2129,5.5 -7.149,8.38604 -14.3562,16.66276 -21.6113,24.85352zM399.88477,574.98828c12.13924,-0.0753 26.23048,0.81416 40.59765,2.5625 41.42116,5.04089 74.78321,15.81675 74.51563,24.06836 -0.26463,8.25206 -34.05885,10.85531 -75.48047,5.81445 -41.42116,-5.04089 -74.78321,-15.81675 -74.51563,-24.06836 0.16364,-5.08693 13.30756,-8.24338 34.88282,-8.37695zm814.90823,12.6836 21.2675,21.26757a1.50015,1.50015 0 1 1 -2.121,2.1211l-21.2657,-21.26563c5.5369,10.76367 6.9837,19.84044 5.6211,27.22656h0.3223c10.6094,1.24816 20.4685,3.07443 28.8828,5.47852 -2.4278,-8.49731 -4.2627,-18.47029 -5.5117,-29.19922 -7.3807,1.35234 -16.4468,-0.0994 -27.1953,-5.6289zm-64.5879,0.002c-10.7501,5.53028 -19.8161,6.98044 -27.1973,5.62695v0.0723c-1.2488,10.70195 -3.0853,20.64836 -5.5078,29.12695 8.4975,-2.42785 18.4701,-4.26471 29.1992,-5.51367 -1.3518,-7.38039 0.1,-16.44561 5.6289,-27.19336l-21.2676,21.26758a1.50015,1.50015 0 1 1 -2.121,-2.1211zM399.95117,608.2207c7.75591,-0.014 16.33902,0.59569 25.04883,1.7793 30.51033,4.14665 55.19775,16.74619 55.24414,25 0.0491,8.25469 -24.64792,11.5847 -55.16016,7.4375 -30.51033,-4.14665 -55.28173,-14.19933 -55.32812,-22.45312 -0.0324,-5.62262 11.68692,-11.73096 30.19531,-11.76368zm2.94141,36.28321c3.92832,-0.0157 8.00124,0.15115 12.10742,0.49609 25.08573,2.10744 44.77796,7.02839 45.42188,14.97852 0.64298,7.94981 -19.17087,12.68576 -44.25586,10.57812 -25.08573,-2.10744 -45.94398,-10.26081 -46.5879,-18.21094 -0.52278,-6.4668 13.79255,-7.76393 33.31446,-7.84179zm-6.3711,30.78125c1.53788,10e-4 3.10151,0.0612 4.67383,0.17968 15.24356,1.1523 28.12847,7.43255 28.7793,14.02735 0.6519,6.59512 -11.17778,11.00764 -26.42188,9.85547 -15.24356,-1.1523 -28.12847,-7.43255 -28.77929,-14.02735 -0.57317,-5.81151 8.60794,-10.04793 21.74804,-10.03515zm-2.7207,30.4707c0.97501,0.002 1.96625,0.0499 2.96289,0.14453 9.66123,0.91446 17.82809,5.89851 18.24219,11.13281 0.4126,5.23472 -7.08576,8.73687 -16.74805,7.82227 -9.66123,-0.91446 -17.82809,-5.89851 -18.24219,-11.13281 -0.3645,-4.61356 5.45528,-7.97697 13.78516,-7.9668zm906.19922,0.0781 -34.2773,2.85547c0.2249,20.00253 -6.7832,39.15319 -30.7188,56.31055 24.0241,2.30082 45.4719,10.59792 60,35 -9.9971,24.98116 -26.6502,40.00143 -50,45 19.6816,21.91005 28.1768,47.18324 30.0293,74.45312l0.01,0.008 24.957,11.09375zm-167.2656,64.20508c0.2372,0.44647 0.4708,0.89347 0.7051,1.33985 -0.2343,-0.44637 -0.4679,-0.89339 -0.7051,-1.33985zm3.041,5.88282c0.083,0.16606 0.171,0.33199 0.2539,0.49804 -0.083,-0.16604 -0.1705,-0.33202 -0.2539,-0.49804zm2.6758,5.48437c0.2147,0.45253 0.425,0.90499 0.6367,1.35742 -0.2117,-0.45239 -0.4219,-0.90493 -0.6367,-1.35742zm2.455,5.32422c0.1795,0.40036 0.3641,0.80089 0.5411,1.20117 -0.177,-0.40029 -0.3615,-0.80081 -0.5411,-1.20117zm2.5958,5.98437c0.2099,0.50184 0.413,1.00415 0.6191,1.50586 -0.2062,-0.5018 -0.4092,-1.00393 -0.6191,-1.50586zm2.0703,5.11719c0.1975,0.50277 0.4,1.00516 0.5937,1.50781 -0.1937,-0.50252 -0.3962,-1.00516 -0.5937,-1.50781zm2.3418,6.1875c0.1922,0.53072 0.3764,1.06121 0.5644,1.5918 -0.188,-0.53055 -0.3722,-1.06112 -0.5644,-1.5918zm1.7324,4.96485c0.2042,0.60477 0.4106,1.20984 0.6094,1.81445 -0.1988,-0.60461 -0.4051,-1.20971 -0.6094,-1.81445zm2.0273,6.26562c0.1846,0.60177 0.3579,1.20308 0.5371,1.80469 -0.1792,-0.60139 -0.3525,-1.20313 -0.5371,-1.80469zm1.4688,5.00977c0.1799,0.63781 0.3593,1.27644 0.5332,1.91406 -0.174,-0.63786 -0.3532,-1.27602 -0.5332,-1.91406zM377.5,842.5c-4.42321,0 -9.31831,2.00257 -14.86719,9.24023C357.08394,858.97789 352.5,871.0223 352.5,885c0,13.9777 4.58394,26.0221 10.13281,33.25977 5.54888,7.23766 10.44398,9.24023 14.86719,9.24023 4.42321,0 9.31831,-2.00257 14.86719,-9.24023C397.91606,911.0221 402.5,898.9777 402.5,885c0,-13.9777 -4.58394,-26.02211 -10.13281,-33.25977C386.81831,844.50257 381.92321,842.5 377.5,842.5Zm-0.27344,4.79492c2.95574,0.0879 5.94922,5.08008 5.94922,10.70508 10.93128,-0.11104 14.67749,3.31056 5.67578,13 13.69744,3.7436 10.6454,8.69968 2.83789,14 7.80751,5.30032 10.85955,10.2564 -2.83789,14 9.00171,9.68944 5.2555,13.11104 -5.67578,13 0,10 -9.4596,18 -11.35156,0 -10.93128,0.11104 -14.67748,-3.31056 -5.67578,-13 -13.69744,-3.7436 -10.6454,-8.69968 -2.83789,-14 -7.80751,-5.30032 -10.85955,-10.2564 2.83789,-14 -9.0017,-9.68944 -5.2555,-13.11104 5.67578,-13 0.82773,-7.875 3.10344,-10.77344 5.40234,-10.70508zm352.35742,5.20508 -75.1914,86.93945 43.0039,-0.041L744.44531,885H840l-15,-32.5zm29.72266,65 -19.23047,22.23633L876.25,939.95508 860,917.5Zm-104.13476,52.41992 -315.75977,0.17969c2.43984,2.47881 4.98787,4.87423 7.56641,7.28906 15.37025,14.39437 29.32058,28.43253 41.91015,42.12693 1.06974,-4.4442 6.04965,-11.1309 16.11133,-19.5156 -30,-25 -15,-34.99999 15,-15 30,-19.99999 45,-10 15,15 30,25 15,35 -15,15 -11.06914,7.3794 -20.08451,10.6644 -25.5625,10.6289 1.31057,1.4627 2.62767,2.9262 3.90625,4.3809l256.41797,-0.1328zm-170.01172,4.44531C490.60938,974.21875 499.75,977.5 511,985c30,-19.99999 45,-10 15,15 30,25 15,35 -15,15 -30,20 -45,10 -15,-15 -18.75,-15.625 -19.92188,-25.39063 -10.83984,-25.63477zm91,0C581.60938,974.21875 590.75,977.5 602,985c30,-19.99999 45,-10 15,15 30,25 15,35 -15,15 -30,20 -45,10 -15,-15 -18.75,-15.625 -19.92188,-25.39063 -10.83984,-25.63477z"
				></path>
			</symbol>
			<symbol id="SQ4" preserveAspectRatio="none" viewBox="0 0 1300 2000">
				<path
					fill="green"
					d="M499.67383,0C598.83088,212.42554 698.5156,423.78371 891.07812,444.24805L557.50781,0ZM299.89844,59.855469C265.54099,182.85387 187.08454,297.85994 240.09961,458.2793L349.875,372.94531C322.20549,333.64118 300,282.28964 300,255c0,-20 5.00324,-149.9992 5,-155 -10e-4,-2.004308 -2.41143,-19.27436 -5.10156,-40.144531zM899.91016,454.8418C746.55122,593.77022 578.78424,763.04072 429.50781,939.46875l40.84766,0.54297C595.55342,787.07576 764.14431,621.01748 918.95508,481.37891Zm65.79101,87.45703c-28.87179,19.18723 -64.12524,44.12835 -93.97851,75.52344l25.55078,20.04296c30.22964,-29.84438 65.96002,-54.59002 95.59961,-73.97851 -9.28135,-6.87909 -18.47109,-14.10656 -27.17188,-21.58789zM685,755 525.10156,939.88281 570,940 699.86133,787.5H806.65039L805,755Z"
				></path>
			</symbol>
			<symbol id="SQ5" preserveAspectRatio="none" viewBox="0 0 1300 2000">
				<path
					stroke="#44F"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="6"
					fill="none"
					d="M435,885A57.5,75.000002 0 0 1 377.5,960.00001 57.5,75.000002 0 0 1 320,885 57.5,75.000002 0 0 1 377.5,810 57.5,75.000002 0 0 1 435,885v0M417.07718,940H876.02627M308.27069,940h28.75722M339.49097,970H901.47783M131.84482,543.19629 351.03451,374.58883M6.9310566e-5,644.61533 44.832165,610.1291M1138.1663,665.18229C1077.9926,627.18313 1020.1253,586.55302 965.29601,542.45758M1208.5796,707.90733c-20.1878,-11.78458 -40.1599,-23.81534 -59.8906,-36.12132M557.51806,-3.5577172e-4 965.44559,542.57786M1299.7291,1059.765c-68.4773,39.2778 -116.7334,76.5733 -164.2838,131.8131 -44.9491,-77.8482 -93.9175,-130.6069 -160.20897,-192.68943 -76.05982,-71.23062 -114.27421,-131.59148 -129.3711,-180.42578 -15.09688,-48.8343 -8.90849,-86.60287 7.94922,-120.96875 28.31708,-57.72677 91.51285,-102.35515 139.0695,-133.86354M499.68528,0.03748108C598.83742,212.45251 698.51437,423.77834 890.34164,443.851M364.36489,812.31243C320.07724,685.41364 328.50886,542.63024 321.33642,404.17725c76.71711,39.85219 163.35704,77.44074 457.8821,5.76082C644.587,533.12731 501.69292,642.05444 392.45651,811.84681M355.97656,456.125c29.62956,11.74764 64.92126,21.56216 110.04297,25.1543 51.30556,4.08443 115.56309,0.48617 200.57813,-14.40625 -98.57798,87.12824 -198.39177,177.48156 -282.2461,298.86133 -24.96545,-94.92731 -24.7974,-201.06283 -28.375,-309.60938v0M867.34252,440.4065C719.62961,574.07588 560.4386,730.57461 436.09373,879.43791M223.89186,472.86906c-0.82324,183.16931 37.98603,343.48203 98.11552,466.27071M191.49798,496.71315c2.08648,150.92196 30.40471,286.39171 75.55251,398.73891M429.507,939.46794C578.78343,763.03991 746.55158,593.76963 899.91052,454.84121M470.35494,940.01166C595.55289,787.0757 764.14488,621.01728 918.95565,481.37871M525,940 685,755h120.41872M567.92551,940.0502 699.86133,787.5h106.78892M611.46541,939.39021 714.72266,820h97.2642M654.39213,939.43943 729.58398,852.5h93.89714M697.39662,939.39902 744.44531,885h95.04566M740.07521,939.73575 759.30664,917.5H860M906.39152,629.42293 1063.7852,756.67736M871.92369,617.813 1043.2441,757.01082M459.61865,481.34795C414.86903,573.51288 406.45192,669.62669 385,765M303.65592,-0.00221915C259.09343,162.78907 138.61386,327.07777 209.42337,483.4732M240.09997,458.27954C187.0849,297.86018 265.54056,182.85405 300.09597,58.960082M805.81085,330.134c14.88787,-6.44544 30.42237,-12.16006 46.14865,-17.2138M0.09725143,902.73906C71.866196,860.06685 117.03718,820.61709 170,750c50,100 99.8567,155.1639 176.97865,227.3892 281.56105,263.6842 94.15072,409.6105 -13.08443,480.4695M377.5,842.5c4.42321,0 9.31831,2.00257 14.86719,9.24023C397.91606,858.97789 402.5,871.0223 402.5,885c0,13.9777 -4.58394,26.0221 -10.13281,33.25977C386.81831,925.49743 381.92321,927.5 377.5,927.5c-4.42321,0 -9.31831,-2.00257 -14.86719,-9.24023C357.08394,911.0221 352.5,898.9777 352.5,885c0,-13.9777 4.58394,-26.02211 10.13281,-33.25977C368.18169,844.50257 373.07679,842.5 377.5,842.5v0M1130,765c16.8191,30.21345 26.6544,60.2083 30,90 47.2312,18.32372 82.8871,51.83723 115,90 2.3419,-37.0436 -4.2974,-71.38724 -30,-100 23.3498,-4.99857 40.0029,-20.01884 50,-45 -14.5281,-24.40208 -35.9759,-32.69918 -60,-35 44.8752,-32.16719 30.2665,-71.33926 20,-110 -32.9633,38.74398 -63.8666,77.97963 -125,110v0M1300,705.83334l-34.3239,2.86032M1299.9997,930.55544l-26.1711,-11.63161M1192.7269,836.42558c37.6985,20.41997 54.5672,59.51932 65.2796,89.01033M1182.9686,784.9233c26.555,-0.86899 48.4536,-6.17171 77.0314,15.0767 -14.6369,19.51581 -30.1358,29.72065 -67.2011,34.6433M1234.6287,679.15791c-1.9945,40.38926 -12.7829,83.27561 -52.2037,104.5774M1162.3431,745.42454c26.5383,39.87481 36.0743,80.87688 26.979,123.43436M1130,765c0,0 -82.1675,-15 -95,-5 -12.8325,10 -32.9691,31.30714 -40,40 -31.97044,39.52731 3.64509,49.72935 20,30M1050,800c-59.31161,25.45028 -64.22618,120.61499 20,25M1041.1933,853.52948c-14.9444,32.29436 0.7581,60.30105 58.5,-5.24847M1062.1853,882.59071C1040.9944,921.29246 1103.755,918.14402 1160,855M1063.2524,755.79961c33.572,-37.62441 66.2866,-76.82735 96.4461,-120.73492M1078.4582,757.6865c32.4929,-36.68328 64.0954,-75.00591 93.2554,-117.82589M1085,735c-4.9523,-58.0017 -25.4042,-90.06768 -80,-65 38.526,16.69119 38.6175,74.15849 80,65v0M1005,670c37.8073,-6.25375 56.1399,40.79694 80,65M1100,732.33169c35,-15 50.6726,-47.07119 67.2824,-5 -32.2824,-2.08351 -62.2824,45 -67.2824,5v0M1100.0662,732.84533c26.3257,8.26747 52.4616,-23.9051 67.2162,-5.51364M1155.0001,585.00001C1080.0001,630 1080,484.99999 1155,530c-45,-75 100,-75 55,0 75,-45 75,100 10e-5,55 45,75.00001 -100.0001,74.99999 -55,10e-6v0M1242.5,557.5c-60,0 -60,0 -60,-60 0,60 0,60 -60,60 60,0 60,0 60,60 0,-60 0,-60 60,-60v0M1122.9743,521.34338c-1.248,-10.59434 -3.0726,-20.43952 -5.4737,-28.84337 8.5766,2.45046 18.6544,4.30045 29.4977,5.54996M1146.7554,616.97813c-10.7509,1.24908 -20.7424,3.08971 -29.255,5.52188 2.4225,-8.47859 4.2581,-18.42426 5.5069,-29.12621M1241.9485,592.9857c1.2496,10.84959 3.1002,20.93331 5.5519,29.5143 -8.4143,-2.40409 -18.2735,-4.23021 -28.8829,-5.47837M1218.5761,497.98319c10.625,-1.24828 20.4988,-3.07601 28.9239,-5.48319 -2.4151,8.45286 -4.2469,18.3639 -5.4955,29.0288M357.95908,386.26136c-4.7848,-2.30618 -9.52375,-4.6875 -14.28345,-7.12611M748.06895,383.93902C622.45119,413.08814 538.88863,420.5377 479.79194,417.07826M355.99023,456.12891c29.62693,11.74538 64.9141,21.55877 110.0293,25.15039 51.3028,4.08421 115.55629,0.48608 200.56445,-14.4043C568.01187,553.99998 468.15967,644.25595 384.25,765.71289 359.23837,670.90747 359.53927,564.67648 355.99023,456.12891v0M85,135c10.787262,31.12992 5,90 35,90 65,0 20,-95 -35,-145 -55.000004,50 -100.000004,145 -35,145 30,0 24.21273,-58.87008 35,-90v0M40,285c0,0 0,-10 10,-10 12.88094,0 15,45 -10,45 -34.999996,0 -29.999996,-70 5,-70 30,0 40,50 40,50 0,0 10,-50 40,-50 35,0 40,70 5,70 -25,0 -22.88094,-45 -10,-45 10,0 10,10 10,10M120,275c-55,2.66831 15,250 14.49097,296.289C134.16784,600.67311 125,630 85,630 45,630 35.832163,600.67311 35.509031,571.289 35,525 105,277.66831 50,275M70,264.98358V208.33333M100,265.18883V208.74384M103.20611,627.39263C121.81764,632.48836 135,645.16656 135,660c0,19.32997 -22.38576,35 -50,35 -27.614237,0 -50,-15.67003 -50,-35 0,-14.8303 13.176786,-27.50627 31.782083,-32.60414M65.931232,692.4756C41.674852,699.57662 35,720.74035 35,740c0,36.24391 13.136211,96.133 20.364326,126.34321M128.36935,800.67704C132.14739,778.91407 135,756.88968 135,740c0,-19.39937 -6.77205,-40.73054 -31.46191,-47.67672M256.89224,885h6.38602M1.1417102e-4,884.99999 28.737098,885M245.57157,870h11.90122M2.5229169e-5,870.00002 51.088175,870M233.67034,855h18.57752M4.1609595e-5,854.99999 52.539543,855M222.93022,840h24.09272M7.6084636e-5,840.00001 49.346532,840M212.77064,825h29.89819M4.2336546e-5,825.00002 46.443795,825M203.1916,810h34.54258M4.0905762e-6,810.00002 43.541058,810M194.48339,795h38.89668M129.46208,795h5.22493M-3.8457096e-5,795.00001 40.638321,795M186.06545,780h42.96051M131.78427,780h14.51368M-3.1733115e-5,780.00001 38.316131,780M178.22806,765h46.73407M133.81618,765h24.67327M10,765H36.284215M134.68701,750h86.50156M10,750H34.542573M134.97728,735h83.01828M15,735H35.12312M132.65509,720H205M15,720H37.844594M155,705h45M325,510c-11.82334,-17.57111 -24.45521,-31.94743 -45.42097,-47.16261 -21.67788,-15.73198 -32.01525,9.6364 -23.86278,22.70472M325,540c-13.68399,-15.7169 -40.72661,-39.31758 -62.25684,-51.80699 -20.39713,-11.83211 -26.52283,15.09906 -9.53546,27.99468M326.64903,572.53873c-13.68399,-15.7169 -40.42328,-39.85576 -62.25684,-51.80699 -33.04187,-18.08643 -43.83934,14.15892 -2.74316,31.80699M329.68204,632.14459c-13.68399,-15.7169 -40.42328,-39.85576 -62.25684,-51.80699 -30.81157,-16.86561 -37.65608,16.8659 -5.11631,35.80661M328.06764,597.68777c-13.86078,-13.59047 -33.31597,-27.70524 -50.77313,-39.51278 -22.07438,-14.9305 -34.10496,4.47364 -22.83565,17.22609M332.19576,659.38835c-13.77031,-13.23256 -32.62008,-26.88451 -49.58329,-38.35795 -24.04479,-16.26322 -36.17268,12.27173 -19.25152,25.31598M335.48063,686.60634C319.24375,673.64242 295.51352,659.7442 277.4252,650.3376c-31.2697,-16.26141 -36.88691,20.47944 -3.29829,37.12122M339.44241,709.94356C293.812,671.34406 241.20364,684.64228 285,715M345.57813,743.85785c-49.78299,-42.23381 -140.14002,-42.27022 -51.45386,5.50004M359.15379,797.42734C296.30783,757.35598 217.41506,767.9862 315.25691,808.08817M356.15219,815.71589c-43.41581,-18.1629 -92.79129,0.20988 -43.97099,13.65755M335.79649,833.55074c-36.46249,-11.38361 -55.92576,9.42664 -11.42381,20.21059M323.63736,467.38673c-7.1925,-7.58612 -15.51039,-14.89158 -25.85855,-22.4014 -17.52111,-12.71535 -26.71907,0.32727 -25.12324,12.4885M322.15877,428.22708c-1.31784,-1.00168 -2.67007,-2.00587 -4.05887,-3.01374 -19.41173,-14.0874 -28.60717,3.4419 -24.22651,16.36102M351.5017,769.34668c-41.8286,-32.62324 -87.13007,-22.98664 -57.82646,2.59886M396.50984,805.03398c97.55186,1.04019 65.93584,25.61549 21.19412,25.63392M410.20409,785.71584c31.87867,-11.92022 60.58013,-9.17207 74.95842,-1.62887 16.81695,8.82258 14.04006,24.2047 -26.16419,30.34906M430.54986,757.7319c58.57662,-11.0001 103.69453,13.94896 55.48459,26.1888M451.62343,729.60393c67.42086,-18.09697 125.45489,10.74224 49.42624,33.66324M469.15226,707.61747c69.25339,-23.47062 135.42699,4.47512 67.15155,28.14525M497.03474,675.73394c50.50234,-8.00778 88.6752,9.66559 55.551,28.0217M514.06286,656.56715c77.25396,-19.94453 157.95502,17.262 48.7626,27.75334M550.91529,618.31036c57.1762,-5.00205 100.00874,18.02731 40.2256,35.03407M568.89077,600.93936c75.24789,-19.79781 151.84194,14.60918 51.22446,34.33609M596.84001,574.15634c55.64482,-7.64299 102.46778,11.7471 64.24628,28.76475M620.73761,552.10789c71.56974,-16.51587 140.66537,14.62009 53.45997,34.06378M660.73433,515.56983c57.1151,-4.52529 99.00079,18.87447 36.45506,35.78648M684.38719,494.58861c73.88041,-16.89549 144.8643,16.89901 43.68109,36.08147M722.79564,460.82624c57.76542,-5.50387 101.75016,17.65976 42.02455,34.7974M748.43052,437.7647c68.01755,-11.92015 127.59071,17.4385 43.80212,36.02686M645.55164,273.86211C640.4516,285.47932 635.59316,297.26013 610,295c-14.37233,81.30224 -73.77303,98.38804 -130,120 0,0 -19.41945,15.64589 -29.41945,15.64589C435.58055,430.64589 425,425 420,425c-5,0 -10,5 -25,5 -15,0 -30,-25 -40,-50 -30,-40 -55,-96.04455 -55,-125 0,-20 5.003,-149.9992 5,-155 -0.002,-3.089335 -5.72781,-42.445846 -10.1037,-72.07356M622.93321,240.32144C616.61632,250.552 609.19352,264.74236 615,265c2.73428,0.12132 6.96971,-10.37759 10.24354,-19.90618M904.16018,494.81448l50.56379,54.17549M889.99031,508.2039l48.73454,52.21558M875.34795,521.08709l48.01937,51.44933M861.63691,534.96812l46.15447,49.45122M847.01655,547.87487l45.96336,49.24646M832.83302,561.24966l35.28817,37.80876M818.66315,574.63908l24.02599,25.74214M803.86532,587.3557l17.84203,19.11646M790.06402,601.14003l8.92784,9.56554M482.75862,925h55.41872M495.89491,910h55.00821M508.21018,895h55.82923M521.34647,880h55.41872M534.48276,865h55.41872M552.95566,845H585M790,820v32.5M765,820v32.5M740,820v32.5M703.26765,833.26765l22.578,22.578M684.08867,854.08867l23.39901,23.39901M665.93596,875.93596l22.78325,22.78325M648.19376,898.19376l22.578,22.578M629.22003,919.22003l20.73071,20.73071M791.29599,310.75526c15.62961,-6.29692 31.83381,-11.83473 48.11454,-16.69002M776.15664,290.35133c15.84539,-6.35519 32.2728,-11.93292 48.76488,-16.81275M760.82223,270.4856c16.18061,-6.50419 32.97255,-12.19625 49.8241,-17.16102M746.54814,252.22866c16.42632,-6.7965 33.54246,-12.73644 50.75899,-17.91046M739.12096,229.17409c11.71799,-4.608 23.73402,-8.79725 35.84163,-12.5995M726.54679,208.22774c8.46394,-3.2756 17.07495,-6.33535 25.75602,-9.1911M711.68624,188.33917c5.39484,-2.00758 10.85695,-3.94932 16.37032,-5.82515M900.40882,94.431781C848.5463,114.25376 796.72828,69.769511 761.4322,93.621964 715,125.00001 755,185 789.33498,165.18883 821.13528,146.84017 790,105 775,115c-9.30261,6.20174 -14.88842,18.30946 -10,25 6.18042,8.45885 10.48873,9.62814 20,5M901.46652,97.13303C861.76115,135.4564 879.34663,201.01228 842.74068,222.52055 794.42332,250.91 757.5027,188.96753 790.17065,166.51363c30.25635,-20.79631 54.6061,25.32412 39.1205,34.55428 -9.60379,5.72429 -22.93675,5.55043 -26.86936,-1.74304 -4.972,-9.22111 -4.17161,-13.61293 4.10189,-20.20332M765,180l90,-60M845,160c-10,-10 -45.467,-11.35662 -55,5 22.00764,-11.03808 34.76336,-24.75676 25,-45M795,230c25,30 50,20 75,10 24.05541,32.7653 64.66095,38.66637 105,45M725,130C715,110 740,85 755,75 749.14905,51.948962 757.70702,26.00987 766.59362,0.00490542M700,90c10,-25 25,-25 25,-25 -8.48271,-38.172217 3.28893,-47.867055 8.18679,-64.93099617M427.96416,0.01822477C445.06535,51.748024 483.31343,78.400493 539.31946,83.994433M446.67053,0.04362022C462.63103,38.843647 492.03631,61.699978 533.14043,70.683071M461.24526,0.01603427C475.22521,27.447203 496.92922,45.718691 525.58366,55.74792M476.99588,0.10806452C487.38028,16.453559 500.99836,28.964352 517.63646,37.893813M371.26432,0.04443925C356.34418,40.196712 340.91798,80.075485 304.69652,100.28589M355.60874,0.04353776C343.34293,31.804187 329.13875,61.845937 302.67098,80.298673M339.57059,0.02060224C329.73362,23.196287 317.89132,44.53011 299.71459,59.883794M325.15652,0.08430598C317.46458,14.722402 308.27692,27.964826 296.26758,38.544057M305,120c41.1016,-25.066138 61.56092,-14.28714 80,0 20,55 -15,110 -14.41945,151.6763 0.21559,15.47674 11.72696,13.44856 19.41945,13.3237 4.99934,-0.0811 15,10 15,10M305,125c29.58587,-20.97635 55.47603,-17.50669 80,-5M430,245c20,0 20,30 5,30 -40,5 -40,-10 -5,0M365,315v10l5,-5 -5,-5v0M455,320l5,-5v10l-5,-5v0M370,320c0,0 5,5 10,5 5,0 5.24415,-4.00984 12.32219,-4.4848C400,320 400,325 405,325c5,0 15,-10 20,-10 5,0 15,5 20,5h10M390,340c3.06957,28.45212 45.6136,8.68856 45,5 -5,5 -44.77199,31.85105 -45,-5v0M430,135c51.53607,-36.718861 85.86501,-16.18211 120,5 -35.40475,-25.98218 -85,-45 -120,-5v0M540,160C525,160 503.52953,134.61544 483.61398,136.45137 453.79885,139.1999 445,175 430,180 447.93464,158.59181 463.7944,151.78059 478.07024,151.93493 507.27438,152.25068 515,185 550,175M430,180c15,-10 32.80939,10.04302 45.17423,9.94542C504.08195,189.71723 519.49385,175 530,175M380,175c-20,0 -30.87367,-19.1648 -47.03192,-20.29027 -12.3413,-0.85961 -29.19452,12.61246 -29.19452,17.61246 0,7.07107 11.23734,20.70784 22.74316,23.25836C342.90794,199.21402 362.81244,175.3491 380,175v0M305,165c22.64276,-42.75014 64.95345,-9.49214 65,-5M820,265c15,15 35,10 45,5 20.5191,14.6565 42.75671,20.72048 62.68286,23.22939M851.86653 312.33707C895.10619 299.11787 938.83136 290.34833 975 285C924.90149 188.22308 899.90057 94.152754 874.11725 -0.0019513659 M851.86653,312.33707C895.10619,299.11787 938.83136,290.34833 975,285 924.90149,188.22308 899.90057,94.152754 874.11725,-0.00195137M851.01315,311.99775 635.36748,-2.4089679e-4M927.65339,293.26472C907.75671,290.72048 885.5191,284.6565 865,270c-10,5 -30,10 -45,-5"
				></path>
			</symbol>
			<symbol id="SQ6" preserveAspectRatio="none" viewBox="0 0 1300 2000">
				<path
					stroke="#44F"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="3"
					fill="none"
					d="M986.60333,811.20184l17.52527,26.83701m3.5763,5.47663 14.2883,21.88014M993.49031,800.86775c12.59499,20.81314 26.36539,39.79428 40.67199,57.93996m3.6811,4.63683c6.0574,7.57938 12.2001,15.02588 18.3803,22.41378m3.5795,4.26824c4.9357,5.87225 9.8895,11.71638 14.8372,17.56998M1002.2895,791.27746c25.6547,42.89167 56.3312,77.95704 86.5273,113.77117M1011.3206,782.24417c26.5981,44.89853 58.7236,81.18275 90.1523,118.55299M1018.2105,775.40469C1045.4382,820.51985 1078.1971,857.01507 1110,895M91.990234,409.08984c5.346491,34.39969 12.364566,69.89746 17.978516,99.54297 5.61395,29.64551 9.60751,54.84672 9.52344,62.49219 -0.14502,13.18721 -2.60383,25.09508 -7.35157,32.2207C107.39289,610.47133 101.33414,615 85,615 68.665861,615 62.607113,610.47133 57.859375,603.3457M95.230469,511.42383c2.783382,14.69817 5.162021,28.28252 6.812501,38.99023 1.65048,10.70771 2.46055,19.51658 2.44922,20.54688 -0.12561,11.42229 -3.03694,21.37127 -4.833987,24.06836 -1.554361,2.33286 -1.96098,2.67133 -3.316406,3.33203C94.986371,599.02203 91.780811,600 85,600M99.244141,641.85938C113.48363,645.75807 120,654.05348 120,660c0,3.87456 -2.13436,8.18273 -8.24609,12.46094C105.64218,676.73915 95.96981,680 85,680 74.030191,680 64.357824,676.73915 58.246094,672.46094M99.476562,706.76367c8.835718,2.48582 12.847888,6.43575 15.929688,11.99805C118.48805,724.32402 120,732.04575 120,740c0,15.20071 -2.70618,36.77501 -6.41016,58.11133M102.94922,660.2832C99.903483,662.33803 92.860098,665 85,665c-7.997241,0 -15.198086,-2.76015 -18.152344,-4.82812M102.28516,726.03125C103.52282,728.2651 105,733.94656 105,740c0,13.42041 -2.56634,34.6744 -6.189453,55.54492M726.75998,368.27894C639.85431,387.67178 574.6926,396.00751 524.83867,397.57475M715.61309,356.58894C649.94086,370.7787 597.12268,378.4618 554.16847,381.63062M703.03893,344.25945c-49.76763,10.38288 -91.8849,16.91189 -127.75629,20.52287M690.7875,331.76901c-38.30305,7.6982 -71.90839,13.04175 -101.50758,16.49148M680.13806,318.87243c-30.03631,5.82677 -57.08899,10.16495 -81.51547,13.25269M670.20516,305.76564c-23.347,4.36958 -44.8345,7.81564 -64.64196,10.45774M659.57286,292.71511c-18.04772,3.23925 -34.94556,5.91034 -50.78275,8.07274M390,380c11.94547,-13.95601 27.22073,-12.69836 45,0M440,195c10,15 30,15 45,15M310,205c50,25 60,-30 70,-30M350.01995,162.05531c1.14299,3.17833 1.7863,6.76631 1.7863,10.56373 0,13.03628 -7.58139,23.60427 -16.9335,23.60427 -9.35211,0 -16.93349,-10.568 -16.93349,-23.60427 0,-5.79795 1.49965,-11.10766 3.98776,-15.21654M488.55832,153.60687c1.90775,3.81995 3.02626,8.46304 3.02626,13.4703 0,13.03628 -7.58139,23.60427 -16.9335,23.60427 -9.35211,0 -16.93349,-10.568 -16.93349,-23.60427 0,-4.03258 0.72545,-7.82898 2.00436,-11.14943"
				></path>
				<use xlink:href="#SSQ" height="90" transform="translate(1188,935)scale(1,0.972)rotate(-40)translate(-45,-45)"></use>
				<use xlink:href="#SSQ" height="90" transform="translate(1194,1043)scale(1,0.972)rotate(-40)translate(-45,-45)"></use>
				<use xlink:href="#SSQ" height="90" transform="translate(1096,1033)scale(1,0.972)rotate(-40)translate(-45,-45)"></use>
				<use xlink:href="#SSQ" height="90" transform="translate(1022,947)scale(1,0.972)rotate(-40)translate(-45,-45)"></use>
				<use xlink:href="#SSQ" height="90" transform="translate(918,851)scale(1,0.972)rotate(-40)translate(-45,-45)"></use>
				<use xlink:href="#SSQ" height="90" transform="translate(897,726)scale(1,0.972)rotate(-40)translate(-45,-45)"></use>
			</symbol>
			<rect width="239" height="335" x="-119.5" y="-167.5" rx="12" ry="12" fill="white" stroke="green"></rect>
			<use width="164.8" height="260.8" x="-82.4" y="-130.4" xlink:href="#SQ1"></use>
			<use transform="rotate(180)" width="164.8" height="260.8" x="-82.4" y="-130.4" xlink:href="#SQ1"></use>
			<use width="164.8" height="260.8" x="-82.4" y="-130.4" xlink:href="#SQ2"></use>
			<use transform="rotate(180)" width="164.8" height="260.8" x="-82.4" y="-130.4" xlink:href="#SQ2"></use>
			<use width="164.8" height="260.8" x="-82.4" y="-130.4" xlink:href="#SQ3"></use>
			<use transform="rotate(180)" width="164.8" height="260.8" x="-82.4" y="-130.4" xlink:href="#SQ3"></use>
			<use width="164.8" height="260.8" x="-82.4" y="-130.4" xlink:href="#SQ4"></use>
			<use transform="rotate(180)" width="164.8" height="260.8" x="-82.4" y="-130.4" xlink:href="#SQ4"></use>
			<use width="164.8" height="260.8" x="-82.4" y="-130.4" xlink:href="#SQ5"></use>
			<use transform="rotate(180)" width="164.8" height="260.8" x="-82.4" y="-130.4" xlink:href="#SQ5"></use>
			<use width="164.8" height="260.8" x="-82.4" y="-130.4" xlink:href="#SQ6"></use>
			<use transform="rotate(180)" width="164.8" height="260.8" x="-82.4" y="-130.4" xlink:href="#SQ6"></use>
			<use xlink:href="#VSQ" height="32" x="-114.4" y="-156"></use>
			<use xlink:href="#SSQ" height="26.769" x="-111.784" y="-119"></use>
			<use xlink:href="#SSQ" height="55.68" x="36.088" y="-132.16"></use>
			<g transform="rotate(180)">
				<use xlink:href="#VSQ" height="32" x="-114.4" y="-156"></use>
				<use xlink:href="#SSQ" height="26.769" x="-111.784" y="-119"></use>
				<use xlink:href="#SSQ" height="55.68" x="36.088" y="-132.16"></use>
			</g>
			<use xlink:href="#XSQ" stroke="#44F" fill="none"></use>
		</svg>
		`;

	let d1 = mDiv();
	d1.innerHTML = html;

	mAppend(dTable, d1);
}
function test9_just_1_card() {
	let dTable = mBy('dTable')
	clearElement(dTable);

	let card = ari_get_card('QSn', 200);
	mAppend(dTable, iDiv(card));
	return card;
}
function test7_add_hand_card() {
	let [A, fen, uplayer] = [Z.A, Z.fen, Z.uplayer];
	let card = prompt('enter card (eg. 8H');
	fen.players[uplayer].hand.push(card + 'n');
	take_turn_fen();
}
function test4_direct_login_onclick_user() {
	show_users();
	let uplayer = localStorage.getItem('uplayer');
	if (isdef(uplayer)) onclick_user(uplayer);

}
function test3_show_tables() {
	phpPost({ app: 'easy' }, 'tables');
}
function test2_onclick_user() {
	let ms = 300;
	show_users(300);
	setTimeout(() => onclick_user('felix'), 400);
}
function test1_show_users() {
	show_users();
}
function test0_aristo_setup() {
	let g = { func: aristo(), options: get_default_options('aristo') };
	g.fen = g.func.setup(['felix', 'mimi'], {});

	console.log('fen', g.fen);

}
//#endregion

//#region misc helpers
function ensure_actions(fen) { fen.actionsCompleted = []; }
function ensure_market(fen, n) { fen.stallSelected = []; deck_add(fen.deck, n - fen.market.length, fen.market); }
function ensure_stall(fen, uplayer, n) { let pl = fen.players[uplayer]; deck_add(fen.deck, n - pl.stall.length, pl.stall); }
function ensure_stallSelected(fen) { if (nundef(fen.stallSelected)) fen.stallSelected = []; }
//#endregion

//#region mods
function add_rumors_to_buildings(o) {
	//console.log('deck', jsCopy(otree.deck));
	fen = o.fen;
	for (const plname of fen.plorder) {
		let buildings = fen.players[plname].buildings;
		for (const type in buildings) {
			for (const b of buildings[type]) {
				if (type == 'farm') b.h = rCard('n');
				b.rumors = arrFunc(2, () => rCard('r'));
			}
		}
	}
}
function add_a_correct_building_to(fen, uname, type) {
	let ranks = lookupSet(DA, ['test', 'extra', 'ranks'], 'A23456789TJQK');
	if (ranks.length <= 0) {
		console.log('===>ranks empty!', ranks)
		ranks = lookupSetOverride(DA, ['test', 'extra', 'ranks'], 'A23456789TJQK');
	}
	let r = ranks[0]; lookupSetOverride(DA, ['test', 'extra', 'ranks'], ranks.substring(1));
	let keys = [`${r}Sn`, `${r}Hn`, `${r}Cn`, `${r}Dn`];
	if (type != 'farm') keys.push(`${r}Cn`); if (type == 'chateau') keys.push(`${r}Hn`);
	fen.players[uname].buildings[type].push({ list: keys, h: null });

	//console.log('keys', keys);
}
function add_a_schwein(fen, uname) {
	let type = rChoose(['farm', 'estate', 'chateau']);
	let keys = deck_deal(fen.deck, type[0] == 'f' ? 4 : type[0] == 'e' ? 5 : 6);
	fen.players[uname].buildings[type].push({ list: keys, h: null });
}
function bluff_start_bid(o) {
	let ranks = rChoose(BLUFF.rankstr, 2).map(x => BLUFF.toword[x]);
	let b2 = coin(10) ? '_' : rNumber(1, 4);
	o.fen.lastbid = [rNumber(1, 4), ranks[0], b2, b2 == '_' ? '_' : ranks[1]];
}
function drawcard(key, dParent, sz) {
	let d1;
	let card = ari_get_card(key, sz);
	mAppend(dParent, iDiv(card));
	let d = iDiv(card); mStyle(d, { position: 'relative', margin: 20 });


	let h = sz * .6;
	let w = h / 6.5;
	let left = sz >= 300 ? 7 : sz >= 200 ? 5 : sz >= 100 ? 3 : 3;
	let bottom = sz >= 300 ? 0 : sz >= 200 ? -1 : sz >= 100 ? -2 : -3;
	let matop = (sz - h) / 2;
	let html = `<img height=${sz / 3} src="./base/assets/images/icons/deco0.svg" style="transform:scaleX(-1);">`;
	// d1 = mDiv(d, {position:'absolute',top:matop,left:left}, null, html); 
	d1 = mDiv(d, { position: 'absolute', bottom: bottom, left: left, opacity: .5 }, null, html);
	let dt = mDiv(d, { family: 'Algerian' }, null, 'luxury');
	mPlace(dt, 'tc', 0, '50%')


	// let wc=sz*0.6;
	// let hc=wc/5; 
	// let offx=card.w-hc;
	// console.log('wc',wc,'hc',hc);
	// let html = `<img width=${wc} height=${hc} src="./base/assets/images/icons/deco_v.png">`;
	// d1 = mDiv(d, {position:'absolute',top:0,left:0, bg:'blue'}, null, html); 
	// d1 = mDiv(d, {position:'absolute',bg:'red',top:hc,left:0}, null, html); 
	//d1 = mDiv(d, {position:'absolute','transform-origin':'top right',transform:`rotate(-90deg)`,top:card.h/4,right:card.w}, null, html); 



	//let d1=mDiv(d,{'transform-origin':'0px 0px',transform:'rotate(90deg)'},null,`<img height=${sz/3} src="./base/assets/images/icons/ornamenth.png">`); //,rounding:h/2,border:'5px solid gold',bg:'transparent'});
	//let d1 = mDiv(d, {}, null, html); //,rounding:h/2,border:'5px solid gold',bg:'transparent'});
	//let d1 = mDiv(d, {transform:'rotate(-90deg) translateX(-50%) translateY(-328%)'}, null, html);
	// let d1 = mDiv(d, {'transform-origin':'center', transform:'rotate(-90deg)'}, null, html);
	// let rect=getRect(d1);
	//mPlace(d1, 'cc');

}
function each_hand_of_one(o) {
	let [fen, uplayer] = [o.fen, o.fen.turn[0]];
	for (const plname of fen.plorder) {
		let pl = fen.players[plname];
		pl.hand = [rChoose(['4Hn', '5Hn', 'QHn', 'KHn', 'AHn'])];
		pl.goals['33'] = true; pl.roundgoal = '33';
		pl.journeys.push(['4Hn', '4Sn', '*Hn'], ['5Hn', '5Sn', '*Hn'], ['QHn', 'QSn', '*Hn']);
	}
	fen.players[uplayer].hand = ['4Cn'];
}
function get_building_with_rumor(fen, plname) {
	let buildings = fen.players[plname].buildings;
	for (const type in buildings) {
		let i = 0;
		for (const b of buildings[type]) {
			if (isdef(b.rumors)) {
				b.type = type;
				b.path = `players.${plname}.buildings.${type}.${i}`;
				return b;
			}
			i++;
		}
	}
	return null;
}
function give_player_hand_groups(o) {
	let [fen, uplayer] = [o.fen, o.fen.turn[0]];
	let pl = fen.players[uplayer];
	pl.hand = ['2Hn', '2Hn', '2Sn', '2Cn', '3Sn', '3Hn', '4Hn', '4Sn', '*Hn'];

}
function give_player_only_one_card(o) {
	let [fen, uplayer] = [o.fen, o.fen.turn[0]];
	let pl = fen.players[uplayer];
	pl.hand = ['4Hn'];
}
function give_player_group(o) {
	let [fen, uplayer] = [o.fen, o.fen.turn[0]];
	let pl = fen.players[uplayer];
	pl.journeys = [['2Hn', '2Sn', '2Hn']];

}
function give_player_one_ferro_set(o) {
	o.fen.players[o.fen.turn[0]].hand = ['*Hn', 'KHn', 'KCn'];
}
function give_player_two_ferro_sets(o) {
	o.fen.players[o.fen.turn[0]].hand = ['*Hn', 'KHn', 'KCn', 'QHn', 'QCn', 'QDn'];
}
function give_player_7R(o) {
	let [fen, uplayer] = [o.fen, o.fen.turn[0]];
	let pl = fen.players[uplayer];
	pl.hand = ['7Cn', '8Cn', 'TCn', 'JCn', 'QCn', 'KCn', 'ACn', '*Hn', '8Cn', '2Hn', '2Sn', '2Hn'];
	let otherplayer = firstCond(fen.plorder, (p) => p != uplayer);
	let plother = fen.players[otherplayer];
	plother.hand.unshift('9Cn', '2Sn', '2Hn', '6Cn', '5Cn');

}
function give_player_hand_group(o) {
	let [fen, uplayer] = [o.fen, o.fen.turn[0]];
	let pl = fen.players[uplayer];
	pl.hand = ['2Hn', '2Sn', '2Hn', '3Hn', '3Sn', '3Hn', '4Hn', '4Sn', '*Hn'];

}
function give_player_jolly(o) {
	let [fen, uplayer] = [o.fen, o.fen.turn[0]];
	let pl = fen.players[uplayer];
	pl.hand.push('*Hn');
}
function give_each_jolly_group(o) {
	let [fen, uplayer] = [o.fen, o.fen.turn[0]];
	for (const plname of fen.plorder) {
		let pl = fen.players[plname];
		pl.journeys.push(['4Hn', '4Sn', '*Hn']);
		pl.goals['3'] = true; pl.roundgoal = '3';

	}
	fen.players[uplayer].hand.push('4Cn');
}
function give_player_sequence(o) {
	let [fen, uplayer] = [o.fen, o.fen.turn[0]];
	let pl = fen.players[uplayer];
	pl.hand = ['2Sn', '3Sn', '4Sn', '5Sn', '6Sn', '7Sn', '8Sn', '9Sn', 'ASn'];
}
function give_other_jolly_group(o) {
	let [fen, uplayer] = [o.fen, o.fen.turn[0]];
	let otherplayer = firstCond(fen.plorder, (p) => p != uplayer);
	let pl = fen.players[otherplayer];
	pl.journeys.push(['2Hn', '2Sn', '*Hn']);
	pl.goals['3'] = true; pl.roundgoal = '3';

	fen.players[uplayer].hand.push('2Cn');
}
function give_player_jolly_sequence(o) {
	let [fen, uplayer] = [o.fen, o.fen.turn[0]];
	let pl = fen.players[uplayer];
	pl.journeys.push(['KHn', 'AHn', '*Hn', '3Hn', '4Hn', '5Hn', '6Hn']);
	pl.goals['7R'] = true; pl.roundgoal = '7R';
	fen.players[uplayer].hand.push('2Hn', 'JHn', 'QHn');
}
function give_other_jolly_sequence(o) {
	let [fen, uplayer] = [o.fen, o.fen.turn[0]];
	let otherplayer = firstCond(fen.plorder, (p) => p != uplayer);
	let pl = fen.players[otherplayer];
	pl.journeys.push(['KHn', 'AHn', '*Hn', '3Hn', '4Hn', '5Hn', '6Hn']);
	pl.goals['7R'] = true; pl.roundgoal = '7R';
	fen.players[uplayer].hand.push('2Hn', '5Hn', 'JHn', 'QHn');
}
function give_other_blackmailed_building(o) {
	let [fen, uplayer] = [o.fen, o.fen.turn[0]];
	let b1 = stage_building(fen, 1, 'farm'); b1.rumors = ['KHr'];
	b1.isblackmailed = true;
	set_queen_phase(o);
}
function give_player_various_buildings(o) {
	let plname = o.fen.turn[0];
	return give_various_buildings_to(o, plname);
}
function give_other_various_buildings(o) {
	let [fen, uplayer] = [o.fen, o.fen.turn[0]];
	let other = firstCond(o.fen.plorder, (p) => p != uplayer);
	return give_various_buildings_to(o, other);
}
function give_various_buildings_to(o, plname) {
	let [fen, uplayer] = [o.fen, o.fen.turn[0]];
	let i = fen.plorder.indexOf(plname);
	//console.log('other is',plname,'index',i,'plorder',fen.plorder);
	let b1 = stage_building(fen, i, 'farm'); b1.rumors = ['KHr'];
	let b2 = stage_building(fen, i, 'farm');
	let lead = b2.lead; //console.log('lead', lead);
	b2.rumors = ['4Cr', `${lead[0]}Cr`];

	let b3 = stage_building(fen, i, 'farm');
	return plname;
}
function give_player_achieve_5(o) {
	let [fen, uplayer] = [o.fen, o.fen.turn[0]];
	let pl = fen.players[uplayer];
	pl.hand = ['6Hn', '6Hn', '6Hn', '6Hn', '*Hn', '4Cn', '4Cn', '4Cn', '3Dn', '3Dn', '2Sn', 'KHn', 'QSn'];
	for (const plname of fen.plorder) {
		if (plname == uplayer) continue;
		let pl1 = fen.players[plname];
		pl1.journeys = [['2Cn', '2Hn', '*Hn']];
	}
}
function give_players_buildings(o) {
	let [fen, uplayer] = [o.fen, o.fen.turn[0]];
	stage_correct_buildings(fen, { mimi: { estate: 1 }, amanda: { chateau: 1 } });
	fen.stage = 5;
	fen.phase = 'king';
}
function give_players_schwein_old(o, isOpen = true) {
	let [fen, uplayer] = [o.fen, o.fen.turn[0]];
	let b = stage_building(fen, 1, 'farm');
	b.h = 'KHn';
	if (isOpen) b.schweine = [b.list[2]];
	fen.stage = 5;
	fen.phase = 'king';
}
function give_one_player_0_coins(o) {
	let [fen, uplayer] = [o.fen, o.fen.turn[0]];
	let otherplayer = firstCond(fen.plorder, (p) => p != uplayer);
	let pl = fen.players[otherplayer];
	pl.coins = 0;
}
function give_players_empty_stalls(o) {
	let [fen, uplayer] = [o.fen, o.fen.turn[0]];
	let n = rChoose([2, 3]);
	fen.market = deck_deal(fen.deck, 2);
	fen.stage = 4, fen.actionsCompleted = [], fen.stallSelected = jsCopy(fen.plorder);
	for (const plname of fen.plorder) {
		let pl = fen.players[plname];
		pl.stall = [];
		pl.stall_value = 0;
	}
}
function give_players_stalls(o) {
	let [fen, uplayer] = [o.fen, o.fen.turn[0]];
	let n = rChoose([2, 3]);
	fen.market = deck_deal(fen.deck, 2);
	fen.stage = 4, fen.actionsCompleted = [], fen.stallSelected = jsCopy(fen.plorder);
	for (const plname of fen.plorder) {
		let pl = fen.players[plname];
		for (let i = 0; i < n; i++)	top_elem_from_to(pl.hand, pl.stall);
		pl.stall_value = calc_stall_value(fen, plname);
	}
}
function give_player_king(o) {
	let [fen, uplayer] = [o.fen, o.fen.turn[0]];
	fen.players[uplayer].hand.push('KHn');
}
function give_player_queen(o) {
	let [fen, uplayer] = [o.fen, o.fen.turn[0]];
	fen.players[uplayer].hand.push('QHn');
}
function give_player_luxury_cards(o) {
	let [fen, uplayer] = [o.fen, o.fen.turn[0]];
	fen.players[uplayer].hand.push('AHl', 'AHl', 'AHl');
}
function give_player_only_4_cards(o) {
	let [fen, uplayer] = [o.fen, o.fen.turn[0]];
	fen.players[uplayer].hand = ['AHn', 'AHn'];
	fen.players[uplayer].stall = ['ACn', 'ASn'];
}
function give_player_multiple_commission_cards(o) {
	let [fen, uplayer] = [o.fen, o.fen.turn[0]];
	let pl = fen.players[uplayer];
	pl.hand.push('QCn', 'QHn');
	pl.stall.push('QDn', 'QSn');
	pl.commissions.push('QCc');
}
function give_players_schwein(o) {
	let [fen, uplayer] = [o.fen, o.fen.turn[0]];
	for (let i = 0; i < fen.plorder.length; i++) {
		let b = stage_building(fen, i, 'farm');
		b.h = 'KHn';
		b.schweine = [2];
		let b1 = stage_building(fen, i, 'estate');
	}
	[fen.turn, fen.stage] = [[uplayer], 5];
	fen.phase = 'king';
}
function give_players_schweine_variety(o) {
	let [fen, uplayer] = [o.fen, o.fen.turn[0]];

	let b = stage_building_new(fen, 1, 'farm', 1, 1);
	b = stage_building_new(fen, 1, 'farm', 1, 0);
	b = stage_building_new(fen, 1, 'farm', 0, 0);
	b = stage_building_new(fen, 1, 'farm', 0, 1);
	b = stage_building_new(fen, 1, 'farm', 0, 2);

	b = stage_building(fen, 0, 'farm'); b.h = 'KHn'; b.schweine = [2];
	[fen.turn, fen.stage] = [[uplayer], 5];
	fen.phase = 'king';
}
function give_players_hand_journey(o) {
	let [fen, uplayer] = [o.fen, o.fen.turn[0]];
	for (const plname of fen.plorder) {
		let pl = fen.players[plname];
		arrExtend(pl.hand, ['ACn', '2Cn', '3Cn']);
	}
}
function give_players_hand_A2(o) {
	let [fen, uplayer] = [o.fen, o.fen.turn[0]];
	for (const plname of fen.plorder) {
		let pl = fen.players[plname];
		pl.hand = ['ACn', '2Cn', '3Cn', '5Hn', '7Hn', '7Sn', '7Cn', '7Dn'];
	}
	[fen.stage, fen.turn] = set_journey_or_stall_stage(fen, o.options, fen.phase);
}
function give_players_buildings_plus(o) {
	let [fen, uplayer] = [o.fen, o.fen.turn[0]];
	let di = {};
	for (const plname of fen.plorder) { di[plname] = { estate: 1, farm: 1, chateau: 1 }; }
	stage_correct_buildings(fen, di);
	ari_add_harvest_cards(fen);

	fen.stage = o.stage = 5;
	fen.phase = 'king';
}
function make_both_run_out_of_time(o) {
	let [fen, uplayer] = [o.fen, o.fen.turn[0]];
	for (const plname in fen.players) {
		let pl = fen.players[plname];
		pl.time_left = 100;
	}
}
function make_church(o) {
	let [fen, uplayer] = [o.fen, o.fen.turn[0]];
	fen.stage = 1004;
	fen.market = ['JHn', 'QSn'];
}
function make_long_history(o) {
	let [fen, uplayer] = [o.fen, o.fen.turn[0]];
	fen.history = [];
	for (let i = 0; i < 100; i++) {
		let lines = [`${rChoose(get_keys(fen.players))} discards ${rCard()}`];
		let title = 'discard';
		//let html = beautify_history(lines, title, fen, uplayer);
		//fen.history.push(html);
		fen.history.push({ title: title, lines: lines });
	}
}
function make_deck_empty(o) {
	let fen = o.fen;
	fen.deck_discard = fen.deck;
	output_arr_short(fen.deck);
	fen.deck = [];
}
function make_deck_discard(o) {
	let fen = o.fen;
	let uplayer = o.uplayer;
	fen.deck_discard = ['2Sn', '3Sn', '4Sn', '5Sn', '6Sn', '7Sn', '8Sn', '9Sn', 'TSn'];
	fen.journeys = [['2Dn', '3Dn', '4Dn'], ['5Sn', '6Sn', '7Sn']];
}
function prep_for_church_downgrade(o) {
	let [fen, uplayer] = [o.fen, o.fen.turn[0]];
	fen.stage = 1004;
	fen.market = ['JHn', 'QSn'];

	let ob = {}; ob[uplayer] = { estate: 1 }; stage_correct_buildings(fen, ob);

	for (const plname of fen.plorder) {
		let pl = fen.players[plname];
		pl.hand = ['JHn', 'QSn']; pl.stall = ['JHn', 'QSn'];
		if (plname == uplayer) {
			pl.hand = ['2Hn', '2Sn']; pl.stall = ['AHn', 'ASn'];
		}
	}

}
function set_blackmail_owner_stage_defend(o) {
	set_blackmail_owner_stage(o);
	console.log('==>blackmailed is', o.fen.turn[0])
	let fen = o.fen;
	let uplayer = fen.turn[0];
	console.log('==>blackmailed is', uplayer)
	let building = path2fen(fen, fen.blackmail.building_path);
	let lead = building.lead;
	fen.players[uplayer].rumors.push(`${lead[0]}Cr`);

	let plname = fen.blackmail.blackmailed;
	let rumors = fen.players[plname].rumors;
	console.log('lead', lead, 'blackmailed rumors', rumors);
}
function set_blackmail_owner_stage(o) {
	set_queen_phase(o); //hier wird manchmal trn geaendert!!!
	let fen = o.fen;
	//console.log(fen)
	let uplayer = fen.turn[0];
	console.log('blackmailed is', uplayer)
	give_various_buildings_to(o, uplayer);
	let other = firstCond(fen.plorder, (p) => p != uplayer);

	//console.log('uplayer',uplayer,'other',other,'fen',fen.players[uplayer].buildings);
	let building = get_building_with_rumor(o.fen, uplayer);
	//console.log('building',building);
	let payment = { o: null, a: 'coin', key: 'coin', friendly: 'coin', path: null };
	fen.blackmail = { blackmailer: other, blackmailed: uplayer, payment: payment, building_path: building.path };
	building.isblackmailed = true;
	// console.log('blackmail',fen.blackmail);
	fen.stage = o.stage = 33;
}
function set_player_tithes(o) {
	let [fen, uplayer] = [o.fen, o.fen.turn[0]];
	let min = 1000, minplayer = null;
	for (const plname of fen.plorder) {
		let pl = fen.players[plname];
		let hkey = pl.hand[0];
		let val = ari_get_card(hkey).val;
		pl.tithes = { keys: [hkey], val: val };
		if (val < min) { min = val; minplayer = plname; }

		console.log('player', plname, 'tithes', pl.tithes);
	}
	let sorted = sortByDescending(fen.plorder, x => fen.players[x].tithes.val);
	fen.church_order = jsCopy(fen.plorder);
	fen.tithe_minimum =
		//fen.selection_order = sorted;

		fen.stage = 21;
}
function set_auction_phase(o) {
	fen = o.fen;
	fen.phase = o.phase = 'jack';
	fen.turn = [fen.plorder[0]];
	fen.stage = 12;
	ensure_market(fen, 3);

	//fen.market=['2Hn','2Hn','2Hn'];  //test uniqueness wenn mehrere cards gleich sind: sollte KAUFEN koennen!!!!
	// arisim_stage_3(fen);
	// arisim_stage_4_all(fen, 3, false);
	// ensure_actions(fen);

}
function set_king_phase(o) { set_queen_phase(o); o.phase = o.fen.phase = 'king'; }
function set_queen_phase(o) {
	fen = o.fen;
	fen.phase = o.phase = 'queen';
	arisim_stage_3(fen);
	arisim_stage_4_all(fen, 3, false);
	ensure_actions(fen);
	fen.turn = [fen.plorder[0]];
}
function small_hands(o) {
	let [fen, uplayer] = [o.fen, o.fen.turn[0]];
	for (const plname of fen.plorder) {
		let pl = fen.players[plname];
		pl.hand.sort();
		pl.hand = arrTake(pl.hand, 7); //journeys.push(['4Hn', '4Sn', '*Hn']);
	}
}






function onclick_game_menu_item(ev) {
	let gamename = ev_to_gname(ev);
	stopgame();
	show('dMenu'); mClear('dMenu');
	let dMenu = mBy('dMenu');

	let dForm = mDiv(dMenu, { align: 'center' }, 'fMenuInput');
	let dInputs = mDiv(dForm, {}, 'dMenuInput');
	let dButtons = mDiv(dForm, {}, 'dMenuButtons');
	let bstart = mButton('start', () => {
		let players = DA.playerlist.map(x => ({ name: x.uname, playmode: x.playmode }));
		//console.log('players are', players);
		let game = gamename;
		let options = collect_game_specific_options(game);
		for (const pl of players) { if (isEmpty(pl.strategy)) pl.strategy = valf(options.strategy, 'random'); }
		//console.log('options nach collect',options)
		startgame(game, players, options); hide('dMenu');
	}, dButtons, {}, 'button');
	let bcancel = mButton('dcancel', () => { hide('dMenu'); }, dButtons, {}, 'button');

	let d = dInputs; mClear(d); mCenterFlex(d);
	let dParent = mDiv(d, { gap: 6 });
	mCenterFlex(dParent);
	DA.playerlist = [];

	//show players
	DA.playerlist = [];
	let params = [gamename, DA.playerlist];
	let funcs = [style_not_playing, style_playing_as_human, style_playing_as_bot];
	for (const u of Serverdata.users) {
		if (['ally', 'bob', 'leo'].includes(u.name)) continue; //lass die aus!!!!
		let d = get_user_pic_and_name(u.name, dParent, 40); mStyle(d, { w: 60 })
		let item = { uname: u.name, div: d, state: 0, strategy: '', inlist: false, isSelected: false };

		//host spielt als human mit per default
		if (isdef(U) && u.name == U.name) { toggle_select(item, funcs, gamename, DA.playerlist); }

		//katzen sind bots per default! (select twice!)
		// if (['nimble', 'guest', 'minnow', 'buddy'].includes(u.name)) { toggle_select(item, funcs, gamename, DA.playerlist); toggle_select(item, funcs, gamename, DA.playerlist); }

		d.onclick = () => toggle_select(item, funcs, gamename, DA.playerlist);
		mStyle(d, { cursor: 'pointer' });
	}
	mLinebreak(d, 10);
	show_game_options(d, gamename);

	mFall('dMenu');
}














function ari_present(dParent) {
	let [fen, ui, uplayer, stage, pl] = [Z.fen, UI, Z.uplayer, Z.stage, Z.pl];
	let [dOben, dOpenTable, dMiddle, dRechts] = tableLayoutMR(dParent);
	if (fen.num_actions > 0 && (Z.role == 'active' || Z.mode == 'hotseat')) {
		//console.log('hmin wird gemacht!')
		mStyle(dOben, { hmin: 110 })
	}

	ari_stats(dRechts);

	show_history(fen, dRechts);

	//let h=ARI.hcontainer;
	let deck = ui.deck = ui_type_deck(fen.deck, dOpenTable, { maleft: 12 }, 'deck', 'deck', ari_get_card);
	let market = ui.market = ui_type_market(fen.market, dOpenTable, { maleft: 12 }, 'market', 'market', ari_get_card, true);
	let open_discard = ui.open_discard = ui_type_market(fen.open_discard, dOpenTable, { maleft: 12 }, 'open_discard', 'discard', ari_get_card);
	let deck_discard = ui.deck_discard = ui_type_deck(fen.deck_discard, dOpenTable, { maleft: 12 }, 'deck_discard', '', ari_get_card);

	if (exp_commissions(Z.options)) {
		let open_commissions = ui.open_commissions = ui_type_market(fen.open_commissions, dOpenTable, { maleft: 12 }, 'open_commissions', 'bank', ari_get_card);
		mMagnifyOnHoverControlPopup(ui.open_commissions.cardcontainer);
		let deck_commission = ui.deck_commission = ui_type_deck(fen.deck_commission, dOpenTable, { maleft: 4 }, 'deck_commission', '', ari_get_card);
		// let commissioned = ui.commissioned = ui_type_list(fen.commissioned, ['rank','count'], dOpenTable, {h:130}, 'commissioned', 'commissioned');
		let comm = ui.commissioned = ui_type_rank_count(fen.commissioned, dOpenTable, {}, 'commissioned', 'sentiment', ari_get_card);
		if (comm.items.length > 0) { let isent = arrLast(comm.items); let dsent = iDiv(isent); set_card_border(dsent, 15, 'green'); }
	}

	if (exp_church(Z.options)) {
		let church = ui.church = ui_type_church(fen.church, dOpenTable, { maleft: 28 }, 'church', 'church', ari_get_card);
		//mMagnifyOnHoverControlPopup(ui.church.cardcontainer);
	}

	if (exp_rumors(Z.options)) {
		let deck_rumors = ui.deck_rumors = ui_type_deck(fen.deck_rumors, dOpenTable, { maleft: 25 }, 'deck_rumors', 'rumors', ari_get_card);
	}


	let uname_plays = fen.plorder.includes(Z.uname);
	let show_first = uname_plays && Z.mode == 'multi' ? Z.uname : uplayer;
	let order = get_present_order();
	for (const plname of order) {
		let pl = fen.players[plname];

		let playerstyles = { w: '100%', bg: '#ffffff80', fg: 'black', padding: 4, margin: 4, rounding: 9, border: `2px ${get_user_color(plname)} solid` };
		let d = mDiv(dMiddle, playerstyles, null, get_user_pic_html(plname, 25));

		mFlexWrap(d);
		mLinebreak(d, 9);
		//R.add_ui_node(d, getUID('u'), uplayer);

		let hidden = compute_hidden(plname);

		ari_present_player(plname, d, hidden);
	}

	ari_show_handsorting_buttons_for(Z.mode == 'hotseat' ? Z.uplayer : Z.uname); delete Clientdata.handsorting;
	show_view_buildings_button(uplayer);

	let desc = ARI.stage[Z.stage];
	Z.isWaiting = false;

	//console.log('Z.stage', Z.stage, 'uplayer',uplayer, 'desc', desc, 'pldata',firstCond(Z.playerdata,x=>x.name == uplayer));
	if (isdef(fen.winners)) ari_reveal_all_buildings(fen);
	else if (desc == 'comm_weitergeben' && is_playerdata_set(uplayer)) {
		//console.log('hallo')
		if ((Z.mode == 'hotseat' || Z.host == uplayer) && check_resolve()) {
			//console.log('waiting and hotseat or host && can_resolve!!!!');
			Z.turn = [Z.host];
			Z.stage = 104; //'next_comm_setup_stage';
			//take_turn_fen();
		}
		show_waiting_message(`waiting for possible other players...`);
		Z.isWaiting = true;
	}
}






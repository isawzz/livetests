
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






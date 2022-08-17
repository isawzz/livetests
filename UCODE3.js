
function _onclick_game_menu_item(ev) {
	let gamename = ev_to_gname(ev);
	stopgame();
	show('dMenu'); mClear('dMenu');
	let html = `
	<form id="fMenuInput" style="text-align: center" action="javascript:void(0);">
		<div id="dMenuInput">hallo</div>
		<div style="width: 100%">
			<input type="submit" class="button" value="start" />
			<input type="button" onclick="onclick_cancelmenu()" class="button" value="cancel" />
		</div>
	</form>
	`;
	let form = mCreateFrom(html); //mBy('fMenuInput');
	mAppend('dMenu', form);
	let d = form.children[0]; mClear(d); mCenterFlex(d);
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

	form.onsubmit = () => {
		let players = DA.playerlist.map(x => ({ name: x.uname, playmode: x.playmode }));
		//console.log('players are', players);
		let game = gamename;
		let options = collect_game_specific_options(game);
		for (const pl of players) { if (isEmpty(pl.strategy)) pl.strategy = valf(options.strategy, 'random'); }
		//console.log('options nach collect',options)
		startgame(game, players, options); hide('dMenu');
	};

	mFall('dMenu')
}

function ari_pre_action() {
	let [stage, A, fen, phase, uplayer, deck, market] = [Z.stage, Z.A, Z.fen, Z.phase, Z.uplayer, Z.deck, Z.market];

	if (Z.num_actions > 0) fen.progress = `(action ${Z.action_number} of ${Z.total_pl_actions})`; else delete fen.progress;

	show_stage();
	switch (ARI.stage[stage]) {
		case 'action: command': Z.stage = 6; select_add_items(ui_get_commands(uplayer), process_command, 'must select an action', 1, 1); break; //5
		case 'action step 2':
			switch (A.command) {
				case 'trade': select_add_items(ui_get_trade_items(uplayer), post_trade, 'must select 2 cards to trade', 2, 2); break;
				case 'build': select_add_items(ui_get_payment_items('K'), payment_complete, 'must select payment for building', 1, 1); break;
				case 'upgrade': select_add_items(ui_get_payment_items('K'), payment_complete, 'must select payment for upgrade', 1, 1); break;
				case 'downgrade': select_add_items(ui_get_building_items(uplayer, A.payment), process_downgrade, 'must select a building to downgrade', 1, 1); break;
				case 'pickup': select_add_items(ui_get_stall_items(uplayer), post_pickup, 'must select a stall card to take into your hand', 1, 1); break;
				case 'harvest': select_add_items(ui_get_harvest_items(uplayer), post_harvest, 'must select a farm to harvest from', 1, 1); break;
				case 'sell': select_add_items(ui_get_stall_items(uplayer), post_sell, 'must select 2 stall cards to sell', 2, 2); break;
				case 'buy': select_add_items(ui_get_payment_items('J'), payment_complete, 'must select payment option', 1, 1); break;
				case 'buy rumor': ari_open_rumors(); break;
				case 'exchange': select_add_items(ui_get_exchange_items(uplayer), post_exchange, 'must select cards to exchange', 2, 2); break;
				case 'visit': select_add_items(ui_get_payment_items('Q'), payment_complete, 'must select payment for visiting', 1, 1); break;
				case 'rumor': select_add_items(ui_get_other_buildings_and_rumors(uplayer), process_rumor, 'must select a building and a rumor card to place', 2, 2); break;
				case 'inspect': select_add_items(ui_get_other_buildings(uplayer), process_inspect, 'must select building to visit', 1, 1); break;
				case 'blackmail': select_add_items(ui_get_payment_items('Q'), payment_complete, 'must select payment for blackmailing', 1, 1); break;
				case 'commission': select_add_items(ui_get_commission_items(uplayer), process_commission, 'must select a card to commission', 1, 1); break;
				case 'pass': post_pass(); break;
			}
			break;
		case 'pick_schwein': select_add_items(ui_get_schweine_candidates(A.uibuilding), post_inspect, 'must select the new schwein', 1, 1); break;
		case 'comm_weitergeben': if (!is_playerdata_set(uplayer)) select_add_items(ui_get_all_commission_items(uplayer), process_comm_setup, `must select ${fen.comm_setup_num} card${fen.comm_setup_num > 1 ? 's' : ''} to discard`, fen.comm_setup_num, fen.comm_setup_num); break;
		case 'rumors_weitergeben':
			let rumitems = ui_get_rumors_and_players_items(uplayer);
			if (isEmpty(rumitems)) {
				//console.log('ALL ITEMS HAVE BEEN ASSIGNED!!!');
				show_waiting_message('waiting for other players...');
				let done = ari_try_resolve_rumors_distribution();
				if (!done) autopoll();
				//check if other playerdata are also complete, if yes and I am the trigger??? modify fen!
			} else select_add_items(rumitems, process_rumors_setup, `must select a player and a rumor to pass on`, 2, 2);
			break;
		case 'next_rumor_setup_stage': post_rumor_setup(); break;
		case 'buy rumor': select_add_items(ui_get_top_rumors(), post_buy_rumor, 'must select one of the new rumor cards', 1, 1); break;
		case 'rumor discard': select_add_items(ui_get_rumors_items(uplayer), process_rumor_discard, 'must select a rumor card to discard', 1, 1); break;
		case 'rumor_both': select_add_items(ui_get_top_rumors(), post_rumor_both, 'must select one of the new rumor cards', 1, 1); break;
		case 'blackmail': select_add_items(ui_get_other_buildings_with_rumors(uplayer), process_blackmail, 'must select a building to blackmail', 1, 1); break;
		case 'blackmail_owner': select_add_items(ui_get_blackmailed_items(), being_blackmailed, 'must react to BLACKMAIL!!!', 1, 1); break; //console.log('YOU ARE BEING BLACKMAILED!!!',uplayer); break;
		case 'accept_blackmail': select_add_items(ui_get_stall_items(uplayer), post_accept_blackmail, 'must select a card to pay off blackmailer', 1, 1); break;
		case 'blackmail_complete': post_blackmail(); break;
		case 'journey': select_add_items(ui_get_hand_and_journey_items(uplayer), process_journey, 'may form new journey or add cards to existing one'); break;
		case 'add new journey': post_new_journey(); break;
		case 'auto market': ari_open_market(fen, phase, deck, market); break;
		case 'TEST_starts_in_stall_selection_complete':
			if (is_stall_selection_complete()) {
				delete fen.stallSelected;
				fen.actionsCompleted = [];
				if (check_if_church()) ari_start_church_stage(); else ari_start_action_stage();
			} else select_add_items(ui_get_hand_items(uplayer), post_stall_selected, 'must select your stall'); break;
		case 'stall selection': select_add_items(ui_get_hand_items(uplayer), post_stall_selected, 'must select cards for stall'); break;
		case 'church': select_add_items(ui_get_hand_and_stall_items(uplayer), post_tithe, `must select cards to tithe ${isdef(fen.tithemin) ? `(current minimum is ${fen.tithemin})` : ''}`, 1, 100); break;
		case 'church_minplayer_tithe_add': select_add_items(ui_get_hand_and_stall_items(uplayer), post_tithe_minimum, `must select cards to reach at least ${fen.tithe_minimum}`, 1, 100); break;
		case 'church_minplayer_tithe_downgrade': select_add_items(ui_get_building_items(uplayer, A.payment), process_downgrade, 'must select a building to downgrade', 1, 1); break;
		case 'church_minplayer_tithe': console.log('NOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO');
			//fen.tithe_minimum is what fen.minplayer (=uplayer) must reach to tithe
			//first compute if hand and stall cards can get up to minimum
			//console.log('church_minplayer_tithe!', Z.stage, fen.stage);
			let pl = fen.players[uplayer];
			let hst = pl.hand.concat(pl.stall);
			let vals = hst.map(x => ari_get_card(x).val);
			let sum = arrSum(vals);
			//console.log('gesamtes minplayer blatt + stall', sum);
			let min = fen.tithe_minimum;
			if (sum < min) {
				//jetzt gibt es ein problem! player muss ein building downgraden!
				//fahre fort wie bei downgrade!
				//aber danach muss ich wieder zurueck zu church!!!

				//uplayer looses all hand and stall cards!!!

				ari_history_list([`${uplayer} must downgrade a building to tithe ${min}!`], 'downgrade');
				select_add_items(ui_get_building_items(uplayer, A.payment), process_downgrade, 'must select a building to downgrade', 1, 1);
			} else {
				//must select more cards to tithe!
				ari_history_list([`${uplayer} must tithe more cards to reach ${min}!`], 'tithe');
				select_add_items(ui_get_hand_and_stall_items(uplayer), post_tithe_minimum, `must select cards to reach at least ${fen.tithe_minimum}`, 1, 100);
			}


			break;
		case 'church_newcards':
			//console.log('church_newcards!', Z.stage, fen.stage);
			reveal_church_cards();
			let items = ui_get_church_items(uplayer);
			let num_select = items.length == fen.church.length ? 1 : 2;
			let instr = num_select == 1 ? `must select a card for ${fen.candidates[0]}` : 'must select card and player';
			select_add_items(items, post_church, instr, num_select, num_select);
			break;
		case 'complementing_market_after_church':
			select_add_items(ui_get_hand_items(uplayer), post_complementing_market_after_church, 'may complement stall'); break;
		case 'tax': let n = fen.pl_tax[uplayer]; select_add_items(ui_get_hand_items(uplayer), post_tax, `must pay ${n} card${if_plural(n)} tax`, n, n); break;
		case 'build': select_add_items(ui_get_build_items(uplayer, A.payment), post_build, 'must select cards to build (first card determines rank)', 4, 6, true); break;
		case 'commission_stall': select_add_items(ui_get_commission_stall_items(), process_commission_stall, 'must select matching stall card to discard', 1, 1); break;
		case 'commission new': select_add_items(ui_get_commission_new_items(uplayer), post_commission, 'must select a new commission', 1, 1); break;
		case 'upgrade': select_add_items(ui_get_build_items(uplayer, A.payment), process_upgrade, 'must select card(s) to upgrade a building', 1); break;
		case 'select building to upgrade': select_add_items(ui_get_farms_estates_items(uplayer), post_upgrade, 'must select a building', 1, 1); break;
		case 'select downgrade cards': select_add_items(A.possible_downgrade_cards, post_downgrade, 'must select card(s) to downgrade a building', 1, is_in_middle_of_church() ? 1 : 100); break;
		case 'buy': select_add_items(ui_get_open_discard_items(uplayer, A.payment), post_buy, 'must select a card to buy', 1, 1); break;
		case 'visit': select_add_items(ui_get_other_buildings(uplayer, A.payment), process_visit, 'must select a building to visit', 1, 1); break;
		case 'visit destroy': select_add_items(ui_get_string_items(['destroy', 'get cash']), post_visit, 'must destroy the building or select the cash', 1, 1); break;
		case 'ball': select_add_items(ui_get_hand_items(uplayer), post_ball, 'may add cards to the ball'); break;
		case 'auction: bid': select_add_items(ui_get_coin_amounts(uplayer), process_auction, 'must bid for the auction', 1, 1); break;
		case 'auction: buy': select_add_items(ui_get_market_items(), post_auction, 'must buy a card', 1, 1); break;
		case 'end game?': select_add_items(ui_get_endgame(uplayer), post_endgame, 'may end the game here and now or go on!', 1, 1); break;
		case 'pick luxury or journey cards': select_add_items(ui_get_string_items(['luxury cards', 'journey cards']), post_luxury_or_journey_cards, 'must select luxury cards or getting cards from the other end of the journey', 1, 1); break;
		case 'next_comm_setup_stage': select_confirm_weiter(post_comm_setup_stage); break;
		default: console.log('stage is', stage); break;
	}

}


function animate_build_action(cards,is_coin_pay,callback){
	if (is_coin_pay) animcoin(Z.uplayer, 800, callback);
}

function redraw_hand(){
	let [fen, A, uplayer] = [Z.fen, Z.A, Z.uplayer];
	let ui = UI.players[uplayer];
	let dplayer = iDiv(ui);
	let chi = arrChildren(dplayer);
	let ihand = chi.indexOf(iDiv(ui.hand));
	console.log('index of hand div is', ihand);
}



function animate_build_action(cards,is_coin_pay,callback){
	//console.log('hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh')
	// let ms=3000;
	// for (const item of building_items) {
	// 	ari_make_unselectable(item);
	// 	mPulse(iDiv(item.o),DA.duration);
	// 	//animate_card_approx(item.o, UI.players[uplayer], DA.duration);
	// }
	//let d=UI.player_stat_items[Z.uplayer].dCoin;
	if (is_coin_pay) animate_coin_pay(); //anim1(d,700,callback);
	//anipulse(UI.player_stat_items[uplayer].dCoin,3000,callback);
	//setTimeout(ari_next_action, DA.duration); //ari_next_action();
}

function animate_coin_pay() {
	let uplayer = Z.uplayer;
	let stand = Z.fen.players[uplayer].coins;
	let ui_item = UI.player_stat_items[uplayer];
	//console.log('ui_item', ui_item);
	//ui_item.dAmount.innerHTML = stand;
	mPulse(ui_item.dCoin, DA.duration, () => { ui_item.dAmount.innerHTML = stand; mStyle(ui_item.dAmount, { fg: 'red' }); })
	//.innerHTML = stand);

}

function calc_ferro_highest_goal_achieved(pl) {
	let di = {
		'3': pl.journeys.length > 0 && is_group(pl.journeys[0]) && pl.journeys[0].length >= 3,
		'33': pl.journeys.length > 1 && is_group(pl.journeys[0]) && pl.journeys[0].length >= 3
			&& is_group(pl.journeys[1]) && pl.journeys[1].length >= 3,
		'4': pl.journeys.length > 0 && is_group(pl.journeys[0]) && pl.journeys[0].length >= 4,
		'44': pl.journeys.length > 1 && is_group(pl.journeys[0]) && pl.journeys[0].length >= 4
			&& is_group(pl.journeys[1]) && pl.journeys[1].length >= 4,
		'5': pl.journeys.length > 0 && is_group(pl.journeys[0]) && pl.journeys[0].length >= 5,
		'55': pl.journeys.length > 1 && is_group(pl.journeys[0]) && pl.journeys[0].length >= 5
			&& is_group(pl.journeys[1]) && pl.journeys[1].length >= 5,
		'7R': pl.journeys.length > 0 && is_sequence(pl.journeys[0]) && pl.journeys[0].length >= 7,
	};

	for (const k of Z.fen.availableGoals) { // ['7R', '55', '5', '44', '4', '33', '3']) {
		if (pl.goals[k]) {
			console.log('player', pl.name, 'already achieved goal', k);
			continue;
		}
		let achieved= di[k];
		console.log('player', pl.name, 'achieved', k, achieved);
		if (achieved) {
			//console.log('goal', k, 'available to', pl.name);
			return k;
		}
	}
	//console.log('no goal is available that matches the revealed sets! THIS SHOULD BE IMPOSSIBLE!!!!!!');
	return null;
}


function reveal_animation(cards, callback) {

	console.log("_reveal_animation!!!!!");
	//console.log()
	let bound = cards.length;
	for (let i = 1; i < bound; i++) {
		let c = cards[i];
		if (c.faceUp) continue;
		mFlip(c, 300, i == bound - 1 ? callback : null);
	}
}

function show_instruction() {

	let d = mBy('dAdminMiddle');
	clearElement(d)
	if (Z.role == 'spectator') {
		let d = mBy('dInstruction');
		mStyle(d, { display: 'flex', 'justify-content': 'end' });
		mDiv(d, { maright: 10 }, null, 'SPECTATING');

	} else if (Z.role == 'inactive') {
		let d = mBy('dInstruction');
		mStyle(d, { display: 'flex', 'justify-content': 'start' });
		mDiv(d, { maleft: 10 }, null, 'NOT YOUR TURN');

	} else if (isdef(Z.fen.instruction)) {
		let d = mBy('dInstruction');
		mStyle(d, { display: 'flex', 'justify-content': 'center' });
		mDiv(d, {}, null, Z.fen.instruction);

	}


	//mBy('dInstruction'), Z.role == 'active' ? Z.fen.instruction : Z.role == 'inactive' ? 'NOT YOUR TURN' : '<span style="float:right;">Spectating</span>');
}

function ui_get_card_items(cards, uibuilding) {
	//console.log('uplayer',uplayer,UI.players[uplayer])
	let items = [], i = 0;
	for (const o of cards) {
		let item = { o: o, a: o.key, key: o.key, friendly: o.short, path: uibuilding.path, index: i };
		i++;
		items.push(item);
	}
	return items;
}

function post_exchange() {
	let [fen, A, uplayer] = [Z.fen, Z.A, Z.uplayer];
	//there should be exactly 2 selected actions and they should be in different groups
	//the 2 actions correspond to the 2 legal cards to trade!
	if (A.selected.length != 2) {
		select_error('please, select exactly 2 cards!');
		return;
	}
	let i0 = A.items[A.selected[0]];
	let i1 = A.items[A.selected[1]];
	//one of the cards has to be from a building
	let [p0, p1] = [i0.path, i1.path];
	if (p0.includes('build') == p1.includes('build')) {
		select_error('select exactly one building card and one of your hand or stall cards!');
		return;
	}

	console.log('i0', i0, 'i1', i1);

	//exchange_items_in_fen(fen, i0, i1); 
	//instead, need to exchange exactly at the same position!!!
	let ibuilding = p0.includes('build') ? i0 : i1;
	let ihandstall = ibuilding == i0 ? i1 : i0;
	let fenbuilding = lookup(fen, ibuilding.path.split('.')); //stringBeforeLast(ibuilding.path, '.').split('.'));

	let ib_index = ibuilding.o.index; //index of the building card within building!

	//if this index is in fenbuilding.schweine, remove index from schweine
	if (fenbuilding.schweine.includes(ib_index)) {
		fenbuilding.schweine.splice(fenbuilding.schweine.indexOf(ib_index), 1);
	}

	let pl = fen.players[uplayer];
	let list2 = ihandstall.path.includes('hand') ? pl.hand : pl.stall;
	let i2 = list2.indexOf(ihandstall.o.key)
	exchange_by_index(fenbuilding.list, ib_index, list2, i2);

	// //exchange the cards preserving index in fenbuilding.list
	// let list = fenbuilding.list;
	// list[ib_index] = ihandstall.o.key;
	// ihandstall.o.index = ib_index;

	// if (ihandstall.path.includes('hand')){
	// 	//remove card from hand
	// 	let hand = fen.players[uplayer].hand;
	// 	hand[hand.indexOf(ihandstall.o.key)] = ibuilding.o.key;
	// }else{
	// 	//remove card from stall
	// 	let stall = fen.players[uplayer].stall;
	// 	stall[stall.indexOf(ihandstall.o.key)] = ibuilding.o.key;
	// }

	//the cards have been exchanged in fen!

	//console.log('fenbuilding', fenbuilding);

	//NEW!!!!
	// if (isdef(fenbuilding.schweine) && fenbuilding.schweine.includes(ibuilding.key)) {
	// 	removeInPlace(fenbuilding.schweine, ibuilding.key);
	// 	if (fenbuilding.schweine.length == 0) delete fenbuilding.schweine;
	// }
	//fenbuilding.schweine = null; //STIMMT NICHT!!!! KOENNTEN MEHRERE SCHWEINE SEIN!

	ari_history_list([`${uplayer} exchanges card in ${ari_get_building_type(fenbuilding)}`], 'exchange');
	ari_next_action();
}

function make_card_selectable(item) {
	let d = iDiv(item.o);
	spread_hand(item.path, .3);
	// console.log('d',d);
	// d.onmouseenter = ()=>{mStyle(d,{display:'inline-block',transform:'scale(2)',border:'solid green 20px'});console.log('mouseenter');};
	// d.onmouseleave = ()=>{mStyleRemove(d,'border');console.log('mouseleave');};
	//mClass(d, 'selectable'); 
	mStyle(d, { display: 'inline-block', transform: 'scale(1.1)', origin: 'bottom right' }); //, transform: 'scale(2)', border: 'solid green 20px' });
	//mClass(d.parentNode, 'selectable_parent'); 
}

function ui_get_card_items(cards) {
	let items = [], i = 0;
	for (const o of cards) {
		let item = { o: o, a: o.key, key: o.key, friendly: o.short, path: ``, index: i };
		i++;
		items.push(item);
	}
	return items;
}

function old_turn_schwein_up() {
	//b is uibuilding
	let key = uibuilding.keycard.key;
	let list = uibuilding.list;

	let schweine = firstCond(list, x => x[0] != key[0]);
	assertion(isdef(schweine), 'WAS DA IST GARKEIN SCHWEIN!!!!!!!!!!', uibuilding);
	let ui = firstCond(uibuilding.items, x => x.key == schweine);
	//console.log('schweine card is',ui)
	face_up(ui);

	let fenbuilding = lookup(Z.fen, uibuilding.path.split('.'));
	uibuilding.schweine = fenbuilding.schweine = schweine;
	ari_open_rumors(32);
}



function post_inspect_NO() {
	let uibuilding = item.o;
	let fenbuilding = lookup(fen, uibuilding.path.split('.'));
	let key = uibuilding.keycard.key;
	let cards = uibuilding.items;

	//find ckey in list that is not key but is not in schweine already
	//A.newschwein = firstCond(uibuilding.items, x => x.key != key && !fenbuilding.schweine.includes(uibuilding.list.indexOf(x.index)));

	//console.log('newschwein',A.newschwein); uibuilding.items.map(x=>face_up(x));
	//newschwein ist ein card item!

	reveal_animation(cards, weiter_post_inspect);
}
function reveal_animation(cards, callback) {

	console.log("_reveal_animation!!!!!");
	let key = cards[0].rank;

	if (isdef(newschwein)) {
		let d = iDiv(newschwein);
		mPulse1(d, () => { face_up(c); callback(); });
	}

	for (let i = 0; i < cards.length; i++) { }
	let i = -1;
	for (const c of cards) {
		if (++i == 0) continue;
		let d = iDiv(c);
		if (c.rank != key) {
			mPulse1(d, () => { face_up(c); if (i == cards.length) callback(); });
		} else {
			mPulse1(d, () => { if (i == cards.length) callback(); });
		}
	}
}

function ui_type_building(b, dParent, styles = {}, path = 'farm', title = '', get_card_func = ari_get_card, separate_lead = false, ishidden = false) {

	//console.log('hallo!!!!!!!!!!!!!')
	let cont = ui_make_container(dParent, get_container_styles(styles));
	let cardcont = mDiv(cont);

	let list = b.list;
	//console.log('list', list)
	//let n = list.length;
	let d = mDiv(dParent);
	let items = list.map(x => get_card_func(x));
	// let cont = ui_make_hand_container(items, d, { maleft: 12, padding: 4 });

	let schweine = null;
	for (let i = 1; i < items.length; i++) {
		let item = items[i];
		// if (b.schweine != item.key) face_down(item); else schweine = item;
		if (isdef(b.schweine) && b.schweine.includes(item.key)) face_down(item); else schweine = item;
	}

	let d_harvest = null;
	if (isdef(b.h)) {
		let keycard = items[0];
		let d = iDiv(keycard);
		mStyle(d, { position: 'relative' });
		d_harvest = mDiv(d, { position: 'absolute', w: 20, h: 20, bg: 'orange', opacity: .5, fg: 'black', top: '45%', left: -10, rounding: '50%', align: 'center' }, null, 'H');
	}

	let d_rumors = null, rumorItems = [];
	//console.log('b',b)
	if (!isEmpty(b.rumors)) {
		//console.log('ja, hat rumors!!!!!!!!!!!!!!')
		let d = cont;
		mStyle(d, { position: 'relative' });
		d_rumors = mDiv(d, { display: 'flex', gap: 2, position: 'absolute', h: 30, bottom: 0, right: 0 }); //,bg:'green'});
		for (const rumor of b.rumors) {
			let dr = mDiv(d_rumors, { h: 24, w: 16, vmargin: 3, align: 'center', bg: 'dimgray', rounding: 2 }, null, 'R');
			rumorItems.push({ div: dr, key: rumor });
		}
	}

	let card = isEmpty(items) ? { w: 1, h: 100, ov: 0 } : items[0];
	//console.log('card',card)
	let [ov, splay] = separate_lead ? [card.ov * 1.5, 5] : [card.ov, 2];
	mContainerSplay(cardcont, 5, card.w, card.h, items.length, card.ov * 1.5 * card.w);
	ui_add_cards_to_hand_container(cardcont, items, list);

	ui_add_container_title(title, cont, items);

	// if (isdef(title) && !isEmpty(items)) { mText(title, d); }

	return {
		ctype: 'hand',
		list: list,
		path: path,
		container: cont,
		cardcontainer: cardcont,
		items: items,
		schweine: schweine,
		harvest: d_harvest,
		rumors: rumorItems,
		keycard: items[0],

	};
}

//#region working on schweine
function turn_new_schwein_up(uibuilding) {
	//b is uibuilding
	let key = uibuilding.keycard.key;
	let list = uibuilding.list;

	let schweine = firstCond(list, x => x[0] != key[0]);
	assertion(isdef(schweine), 'WAS DA IST GARKEIN SCHWEIN!!!!!!!!!!', uibuilding);
	let ui = firstCond(uibuilding.items, x => x.key == schweine);
	//console.log('schweine card is',ui)
	face_up(ui);

	let fenbuilding = lookup(Z.fen, uibuilding.path.split('.'));
	uibuilding.schweine = fenbuilding.schweine = schweine;
	ari_open_rumors(32);
}

function post_inspect() {
	let [stage, A, fen, uplayer] = [Z.stage, Z.A, Z.fen, Z.uplayer];
	let item = A.items[A.selected[0]];

	//console.log('building to inspect:', item.o);
	//lead is item.o.keycard
	//if the building has a _schwein, and _schwein is open, uplayer gets a rumor
	let building = item.o;

	if (isdef(building.schweine)) {
		//uplayer gets a rumor from rumor deck
		//output_arr_short(fen.deck_rumors);
		let rumor = fen.deck_rumors[0]; fen.deck_rumors.shift();
		fen.players[uplayer].rumors.push(rumor);
		//console.log('...got rumor', rumor);
		//output_arr_short(fen.deck_rumors);
		ari_history_list([`${uplayer} inspects a schweine!`], 'inspect');

		ari_next_action();
	} else if (building_is_correct(building)) {
		//uplayer need to chose a rumor card to discard!
		//console.log('')
		Z.stage = 29;
		ari_history_list([`${uplayer} inspects a correct building`], 'inspect');
		ari_pre_action();
	} else {
		//building is not correct: turn _schwein up, both players get a rumor
		//console.log('building is not correct')
		//console.log('building', building);
		A.owner = stringAfter(building.path, '.');
		A.owner = stringBefore(A.owner, '.');
		ari_history_list([`${uplayer} reveals a schweine!`], 'inspect');
		turn_new_schwein_up(building);
	}

	// if the building has a schweine, and schweine is closed, _ari_open_rumors, followed by stage: inspect_schwein_beide
	// if the building has no schweine, uplayer needs to select one of his rumors to pay
}




function ui_type_building(b, dParent, styles = {}, path = 'farm', title = '', get_card_func = ari_get_card, separate_lead = false) {

	//console.log('hallo!!!!!!!!!!!!!')
	let cont = ui_make_container(dParent, get_container_styles(styles));
	let cardcont = mDiv(cont);

	let list = b.list;
	//console.log('list', list)
	//let n = list.length;
	let d = mDiv(dParent);
	let items = list.map(x => get_card_func(x));
	// let cont = ui_make_hand_container(items, d, { maleft: 12, padding: 4 });

	let schweine = null;
	for (let i = 1; i < items.length; i++) {
		let item = items[i];
		// if (b.schweine != item.key) face_down(item); else schweine = item;
		if (isdef(b.schweine) && b.schweine.includes(item.key)) face_down(item); else schweine = item;
	}

	let d_harvest = null;
	if (isdef(b.h)) {
		let keycard = items[0];
		let d = iDiv(keycard);
		mStyle(d, { position: 'relative' });
		d_harvest = mDiv(d, { position: 'absolute', w: 20, h: 20, bg: 'orange', opacity: .5, fg: 'black', top: '45%', left: -10, rounding: '50%', align: 'center' }, null, 'H');
	}

	let d_rumors = null, rumorItems = [];
	//console.log('b',b)
	if (!isEmpty(b.rumors)) {
		//console.log('ja, hat rumors!!!!!!!!!!!!!!')
		let d = cont;
		mStyle(d, { position: 'relative' });
		d_rumors = mDiv(d, { display: 'flex', gap: 2, position: 'absolute', h: 30, bottom: 0, right: 0 }); //,bg:'green'});
		for (const rumor of b.rumors) {
			let dr = mDiv(d_rumors, { h: 24, w: 16, vmargin: 3, align: 'center', bg: 'dimgray', rounding: 2 }, null, 'R');
			rumorItems.push({ div: dr, key: rumor });
		}
	}

	let card = isEmpty(items) ? { w: 1, h: 100, ov: 0 } : items[0];
	//console.log('card',card)
	let [ov, splay] = separate_lead ? [card.ov * 1.5, 5] : [card.ov, 2];
	mContainerSplay(cardcont, 5, card.w, card.h, items.length, card.ov * 1.5 * card.w);
	ui_add_cards_to_hand_container(cardcont, items, list);

	ui_add_container_title(title, cont, items);

	// if (isdef(title) && !isEmpty(items)) { mText(title, d); }

	return {
		ctype: 'hand',
		list: list,
		path: path,
		container: cont,
		cardcontainer: cardcont,
		items: items,
		schweine: schweine,
		harvest: d_harvest,
		rumors: rumorItems,
		keycard: items[0],

	};
}

function post_exchange() {
	let [fen, A, uplayer] = [Z.fen, Z.A, Z.uplayer];
	//there should be exactly 2 selected actions and they should be in different groups
	//the 2 actions correspond to the 2 legal cards to trade!
	if (A.selected.length != 2) {
		select_error('please, select exactly 2 cards!');
		return;
	}
	let i0 = A.items[A.selected[0]];
	let i1 = A.items[A.selected[1]];
	//one of the cards has to be from a building
	let [p0, p1] = [i0.path, i1.path];
	if (p0.includes('build') == p1.includes('build')) {
		select_error('select exactly one building card and one of your hand or stall cards!');
		return;
	}

	exchange_items_in_fen(fen, i0, i1); //replace cards in otree
	//the repaired building loses its _schwein if any!
	//console.log('exchange items', i0, i1);

	let ibuilding = p0.includes('build') ? i0 : i1;
	let fenbuilding = lookup(fen, ibuilding.path.split('.')); //stringBeforeLast(ibuilding.path, '.').split('.'));
	//console.log('fenbuilding', fenbuilding);

	//NEW!!!!
	if (isdef(fenbuilding.schweine) && fenbuilding.schweine.includes(ibuilding.key)) {
		removeInPlace(fenbuilding.schweine, ibuilding.key);
		if (fenbuilding.schweine.length == 0) delete fenbuilding.schweine;
	}
	//fenbuilding.schweine = null; //STIMMT NICHT!!!! KOENNTEN MEHRERE SCHWEINE SEIN!

	ari_history_list([`${uplayer} exchanges card in ${ari_get_building_type(fenbuilding)}`], 'exchange');
	ari_next_action();
}
function process_visit() {
	process_payment();
	let [fen, A, uplayer] = [Z.fen, Z.A, Z.uplayer];
	let item = A.items[A.selected[0]];
	let obuilding = lookup(fen, item.path.split('.'));
	let parts = item.path.split('.');
	let owner = parts[1];

	if (isdef(obuilding.schweine)) {

		Z.stage = 46;
		A.building = item;
		A.obuilding = obuilding;
		A.buildingowner = owner;
		ari_pre_action();
		return;

	} else {

		//this building is revealed
		let cards = item.o.items;
		let key = cards[0].rank;
		//let schweine = false;
		//let schweine = null;
		for (const c of cards) {
			if (c.rank != key) { schweine = true; schweine = c.key; face_up(c); break; }
		}
		if (schweine) {
			if (fen.players[owner].coins > 0) {
				fen.players[owner].coins--;
				fen.players[uplayer].coins++;
			}
			let b = lookup(fen, item.path.split('.'));
			b.schweine = schweine;
		}

		ari_history_list([
			`${uplayer} visited ${ari_get_building_type(obuilding)} of ${owner} resulting in ${schweine ? 'schweine' : 'ok'} ${ari_get_building_type(obuilding)}`,
		], 'visit');

		reveal_animation(cards, () => ari_next_action(fen, uplayer));

		//ari_next_action(fen, uplayer);
	}


}












//#endregion

function post_inspect() {
	let [stage, A, fen, uplayer] = [Z.stage, Z.A, Z.fen, Z.uplayer];
	let item = A.items[A.selected[0]];

	//console.log('building to inspect:', item.o);
	//lead is item.o.keycard
	//if the building has a schwein, and schwein is open, uplayer gets a rumor
	let building = item.o;

	if (isdef(building.schwein)) {
		//uplayer gets a rumor from rumor deck
		//output_arr_short(fen.deck_rumors);
		let rumor = fen.deck_rumors[0]; fen.deck_rumors.shift();
		fen.players[uplayer].rumors.push(rumor);
		//console.log('...got rumor', rumor);
		//output_arr_short(fen.deck_rumors);
		ari_history_list([`${uplayer} inspects a schwein!`], 'inspect');

		ari_next_action();
	} else if (building_is_correct(building)) {
		//uplayer need to chose a rumor card to discard!
		//console.log('')
		Z.stage = 29;
		ari_history_list([`${uplayer} inspects a correct building`], 'inspect');
		ari_pre_action();
	} else {
		//building is not correct: turn schwein up, both players get a rumor
		//console.log('building is not correct')
		//console.log('building', building);
		A.owner = stringAfter(building.path, '.');
		A.owner = stringBefore(A.owner, '.');
		ari_history_list([`${uplayer} reveals a schwein!`], 'inspect');
		turn_new_schwein_up(building);
	}

	// if the building has a schwein, and schwein is closed, _ari_open_rumors, followed by stage: inspect_schwein_beide
	// if the building has no schwein, uplayer needs to select one of his rumors to pay
}

function ensure_buttons_visible_for(plname) {
	if (Z.role == 'spectator' || isdef(mBy('dbPlayer'))) return;

	let fen = Z.fen;
	let pl = fen.players[plname];
	let plui = UI.players[plname];
	//console.log('plui', plui);
	if (pl.hand.length <= 1) return; // only display for hand size > 1
	let d = iDiv(plui);
	mStyle(d, { position: 'relative' })
	//console.log('d', d);
	let dbPlayer = mDiv(d, { position: 'absolute', bottom: 2, left: 100, height: 25 }, 'dbPlayer');
	let styles = { rounding: 6, bg: 'silver', fg: 'black', border: 0, maleft: 10 };
	let bByRank = mButton('by rank', onclick_by_rank_ferro, dbPlayer, styles, 'enabled');
	let bBySuit = mButton('by suit', onclick_by_suit_ferro, dbPlayer, styles, 'enabled');
	// if (Z.game == 'ferro' && plname == uplayer) {
	// 	let b = mButton('clear selection', onclick_clear_selection_ferro, dbPlayer, styles, 'enabled', 'bClearSelection'); //isEmpty(A.selected)?'disabled':'enabled');
	// 	if (isEmpty(A.selected)) hide(b);
	// }

}
function ensure_buttons_visible_ferro() {
	let [plorder, stage, A, fen, uplayer, pl] = [Z.plorder, Z.stage, Z.A, Z.fen, Z.uplayer, Z.fen.players[Z.uplayer]];
	if (fen.players[uplayer].hand.length <= 1) return; // only display for hand size > 1
	let dbPlayer = mBy('dbPlayer');
	if (nundef(dbPlayer)) {
		let d = iDiv(UI.players[uplayer]);
		mStyle(d, { position: 'relative' })
		dbPlayer = mDiv(d, { position: 'absolute', bottom: 2, left: 100, height: 25 }, 'dbPlayer');
	}
	let styles = { rounding: 6, bg: 'silver', fg: 'black', border: 0, maleft: 10 };
	// let bByRank = mButton('by rank', onclick_by_rank_ferro, dbPlayer, styles, 'enabled');
	// let bBySuit = mButton('by suit', onclick_by_suit_ferro, dbPlayer, styles, 'enabled');
	if (Z.game == 'ferro') {
		let b = mButton('clear selection', onclick_clear_selection_ferro, dbPlayer, styles, 'enabled', 'bClearSelection'); //isEmpty(A.selected)?'disabled':'enabled');
		if (isEmpty(A.selected)) hide(b);
	}

}

function fritz_present(z, dParent, uplayer) {
	//console.log('present')
	DA.hovergroup = null;
	let [fen, ui, stage] = [z.fen, UI, z.stage];
	//fen.shield=true;
	//console.log('role',Z.role)
	let [dOben, dOpenTable, dMiddle, dRechts] = tableLayoutMR(dParent); mFlexWrap(dOpenTable)
	Config.ui.card.h = 130;
	Config.ui.container.h = Config.ui.card.h + 30;

	//let deck = ui.deck = ui_type_deck(fen.deck, dOpenTable, { maleft: 12 }, 'deck', 'deck', fritz_get_card);
	if (isEmpty(fen.deck_discard)) {
		mText('discard empty', dOpenTable);
		ui.deck_discard = { items: [] }
	} else {
		let deck_discard = ui.deck_discard = ui_type_hand(fen.deck_discard, dOpenTable, { maright: 25 }, 'deck_discard', 'discard', fritz_get_card, true);
		let i = 0; deck_discard.items.map(x => { x.source = 'discard'; x.index = i++ });
	}
	mLinebreak(dOpenTable);


	let ddarea = UI.ddarea = mDiv(dOpenTable, { border: 'dashed 1px black', bg: '#eeeeee80', box: true, hmin: 162, wmin: 245, padding: '5px 50px 5px 5px', margin: 5 });
	mDroppable(ddarea, drop_card_fritz); ddarea.id = 'dOpenTable'; Items[ddarea.id] = ddarea;
	mFlexWrap(ddarea)

	fritz_stats(z, dRechts);

	show_history(fen, dRechts);

	//loose cards and journeys
	DA.TJ = [];
	//journeys become groups
	//fen.journeys = [['QHn', 'KHn', 'AHn'], ['QCn', 'QHn', 'QDn']];
	for (const j of fen.journeys) {
		let cards = j.map(x => fritz_get_card(x));
		frnew(cards[0], { target: 'hallo' });
		for (let i = 1; i < cards.length; i++) { fradd(cards[i], Items[cards[0].groupid]); }

	}
	//loose cards of fen and other players become groups. own loose cards will ALSO go to player area
	let loosecards = ui.loosecards = jsCopy(fen.loosecards).map(c => fritz_get_card(c));
	for (const plname of fen.plorder) {
		let cards = fen.players[plname].loosecards.map(c => fritz_get_card(c));
		cards.map(x => x.owner = plname);
		// if (plname != uplayer) { loosecards = loosecards.concat(cards); }
		loosecards = loosecards.concat(cards);
	}
	for (const looseui of loosecards) {
		//console.log('looseui', looseui);
		let card = looseui;
		frnew(card, { target: 'hallo' });
	}

	//all cards in drop area are droppable
	for (const group of DA.TJ) {
		assertion(isdef(group.id), 'no group id', group);
		let d = iDiv(group);
		//console.log('d',d);
		let ch = arrChildren(iDiv(group));
		let cards = ch.map(x => Items[x.id]);
		//console.log('cards', cards);
		cards.map(x => mDroppable(x, drop_card_fritz));
	}

	//if ddarea is empty, write drag and drop hint
	if (arrChildren(ddarea).length == 0) {
		let d = mDiv(ddarea, { 'pointer-events': 'none', maleft: 45, align: 'center', hmin: 40, w: '100%', fz: 12, fg: 'dimgray' }, 'ddhint', 'drag and drop cards here');
		//setRect(ddarea)
		//mPlace(d,'cc')

	}

	ui.players = {};
	let uname_plays = fen.plorder.includes(Z.uname);
	let plmain = uname_plays && Z.mode == 'multi' ? Z.uname : uplayer;
	fritz_present_player(plmain, dMiddle);

	if (TESTING) {
		for (const plname of arrMinus(fen.plorder, plmain)) {
			fritz_present_player(plname, dMiddle);
		}
	}


}
function fritz_present_player(playername, dMiddle) {
	let [fen, ui, stage] = [Z.fen, UI, Z.stage];
	let pl = fen.players[playername];
	let playerstyles = { w: '100%', bg: '#ffffff80', fg: 'black', padding: 4, margin: 4, rounding: 10, border: `2px ${get_user_color(playername)} solid` };
	let d = mDiv(dMiddle, playerstyles, null, get_user_pic_html(playername, 25)); mFlexWrap(d); mLinebreak(d, 10);

	//#region old handsorting code
	// if (isdef(pl.handsorting)) {
	// 	let bysuit = pl.handsorting.by == 'suit';
	// 	let [arr1, arr2] = arrSplitAtIndex(pl.hand, pl.handsorting.n - 1);
	// 	pl.hand = sort_cards(arr1, bysuit, 'CDSH', true, 'A23456789TJQK*').concat(arr2);
	// }
	//#endregion
	pl.hand = correct_handsorting(pl.hand, playername);

	let upl = ui.players[playername] = { div: d };
	upl.hand = ui_type_hand(pl.hand, d, {}, `players.${playername}.hand`, 'hand', fritz_get_card);
	upl.hand.items.map(x => x.source = 'hand');

	let ploose = pl.loosecards;
	if (!isEmpty(ploose)) {
		//console.log('ploosecards', ploose);
		upl.loose = ui_type_market(ploose, d, {}, `players.${playername}.loose`, 'untouchables', fritz_get_hint_card);
		upl.loose.items.map(x => x.source = 'loose');
	} else {
		//console.log('player has no loose cards',pl);
	}
	ensure_buttons_visible_for(playername);

}
function fritz_activate_ui() {
	//return;
	let [plorder, stage, A, fen, uplayer, pl] = [Z.plorder, Z.stage, Z.A, Z.fen, Z.uplayer, Z.fen.players[Z.uplayer]];
	A.autosubmit = false;

	new_cards_animation(1);
	round_change_animation(1);

	//UI.players[uplayer].hand.items.map(x=>iDiv(x).onclick=()=>onclick_fritz_discard(x));
	select_add_items(ui_get_hand_items(uplayer), end_of_turn_fritz, 'must drag drop cards to assemble groups, then discard 1 hand card', 0, 1);

	A.items.map(x => iDiv(x).onclick = ev => {
		let card = Items[x.id];
		let item = x;
		clear_quick_buttons();
		select_last(item, select_toggle, ev);
		if (item.index == A.selected[0]) {
			//mach so einen button dorthin wo die mouse ist!
			let pos = get_mouse_pos(ev);
			//console.log('mouse pos', pos);
			let b = DA.bQuick = mButton('discard', ev => {
				b.remove();
				end_of_turn_fritz();
			}, document.body, { position: 'absolute', left: pos.x - 40, top: pos.y - 10 }, 'selectbutton');

		}
		//console.log('clicked card', card, '\nitem', item);
		//output mouse position on page

	});

	UI.timer = select_timer(fen.players[uplayer].time_left + Z.options.seconds_per_move * 1000, end_of_turn_fritz);

	ensure_buttons_visible_ferro();

}

function ferro_present_new(z, dParent, uplayer) {

	if (DA.simulate == true) show('bRestartMove'); else hide('bRestartMove'); //console.log('DA', DA);
	//DA.no_shield = true;
	let [fen, ui, stage] = [z.fen, UI, z.stage];
	let [dOben, dOpenTable, dMiddle, dRechts] = tableLayoutMR(dParent);

	ferro_stats_new(z, dRechts);

	show_history(fen, dRechts);

	let deck = ui.deck = ui_type_deck(fen.deck, dOpenTable, { maleft: 12 }, 'deck', 'deck', ferro_get_card);
	let deck_discard = ui.deck_discard = ui_type_deck(fen.deck_discard, dOpenTable, { maleft: 12 }, 'deck_discard', '', ferro_get_card);
	//console.log('deck_discard',deck_discard);
	if (!isEmpty(deck_discard.items)) face_up(deck_discard.get_topcard());

	let uname_plays = fen.plorder.includes(Z.uname);
	let show_first = uname_plays && Z.mode == 'multi' ? Z.uname : uplayer;
	//let order = TESTING ? fen.plorder : [show_first].concat(fen.plorder.filter(x => x != show_first));
	order = arrCycle(fen.plorder, fen.plorder.indexOf(show_first));
	for (const plname of order) {
		let pl = fen.players[plname];

		let playerstyles = { w: '100%', bg: '#ffffff80', fg: 'black', padding: 4, margin: 4, rounding: 10, border: `2px ${get_user_color(plname)} solid` };
		let d = mDiv(dMiddle, playerstyles, null, get_user_pic_html(plname, 25));

		mFlexWrap(d);
		mLinebreak(d, 10);

		let hidden = compute_hidden(plname);

		ferro_present_player_new(z, plname, d, hidden);
	}

	//console.log('playerdata changed', Z.playerdata_changed_for);
	Z.isWaiting = false;
	if (Z.stage == 'round_end') {
		show_waiting_for_ack_message();

		//*** auto resolve *** */
	} else if (Z.stage == 'buy_or_pass' && uplayer == fen.trigger && ferro_check_resolve()) {
		assertion(Z.stage == 'buy_or_pass', 'stage is not buy_or_pass when checking can_resolve!');
		Z.stage = 'can_resolve';
		[Z.turn, Z.stage] = [[get_multi_trigger()], 'can_resolve'];
		take_turn_fen(); return;
	} else if (Z.stage == 'buy_or_pass' && (Z.role != 'active' || is_playerdata_set(uplayer))) {

		//console.log('HAAAAAAAAAAAAAAAAAAAAALLLLLLLLLLLLLLLLLOOOOOOOOOOOOOOOOOOOOOOOOOOO')

		//get players in turn that have not yet set playerdata
		assertion(isdef(Z.playerdata), 'playerdata is not defined in buy_or_pass (present ferro)');
		let pl_not_done = Z.playerdata.filter(x => Z.turn.includes(x.name) && isEmpty(x.state)).map(x => x.name);
		// show_waiting_message(`waiting for ${pl_not_done.join(', ')} to make buy decision`);
		show_waiting_message(`waiting for possible buy decision...`);
		Z.isWaiting = true;
		//ich soll hier auch den statisTitle machen und sanduhr stoppen fuer diesen player!!! und alle players die bereits done sind!
		//if (Z.role == 'active') { Z.role = 'waiting'; staticTitle('waiting for ' + pl_not_done.join(', ')); }
	}

	// //*** auto trigger remove players from turn who have made buy or pass decision!!!! *** */
	// Ne das macht wieder das neue problem dass der timer dann neu startet, das will ich nicht!
	// if (Z.stage == 'buy_or_pass' && uplayer == fen.trigger && !isEmpty(Z.playerdata_changed_for) && Z.playerdata_changed_for.length < Z.plorder){
	// 	Z.playerdata_changed_for.map(x=>removeInPlace(Z.turn,x));
	// 	take_turn_fen();
	// 	return;
	// }

	new_cards_animation();


}
function ferro_present_player_new(g, plname, d, ishidden = false) {
	let fen = g.fen;
	let pl = fen.players[plname];
	let ui = UI.players[plname] = { div: d };
	Config.ui.card.h = ishidden ? 100 : 150;
	Config.ui.container.h = Config.ui.card.h + 30;

	//#region old handsorting code: split off newcards
	// // no presorting!!! pl.hand = sort_cards(pl.hand, false, null, true, '23456789TJQKA*');
	// //if (!TESTING) pl.hand = sort_cards(pl.hand, false, null, true, '23456789TJQKA*');
	// // if (lookup(Clientdata['handsorting',plname])) pl.handsorting = lookup(Clientdata['handsorting',plname]);
	// if (isdef(Clientdata.handsorting)) pl.handsorting = Clientdata.handsorting;
	// if (isdef(pl.handsorting)) {
	// 	let bysuit = pl.handsorting.by == 'suit';
	// 	let [arr1, arr2] = arrSplitAtIndex(pl.hand, pl.handsorting.n - 1);
	// 	pl.hand = sort_cards(arr1, bysuit, 'CDSH', true, '23456789TJQKA*').concat(arr2);
	// }
	//#endregion
	if (!ishidden) pl.hand = correct_handsorting(pl.hand, plname);

	let hand = ui.hand = ui_type_hand(pl.hand, d, {}, `players.${plname}.hand`, 'hand', ferro_get_card);
	if (ishidden) { hand.items.map(x => face_down(x)); }
	else {
		//mStyle(d,{transform:'scale(2)'}); } 
		//hand.items.map(x=>mStyle(iDiv(x),{h:200,w:100})); 
		ensure_buttons_visible_for(Z.mode == 'hotseat' ? Z.uplayer : Z.uname);

	}

	ui.journeys = [];
	let i = 0;
	for (const j of pl.journeys) {
		let jui = ui_type_lead_hand(j, d, { maleft: 12, h: 130 }, `players.${plname}.journeys.${i}`, '', ferro_get_card);//list, dParent, path, title, get_card_func
		//jui.path = `players.${uplayer}.journeys.${i}`;
		i += 1;
		ui.journeys.push(jui);
	}

}
function ferro_activate_ui() {
	//first animations!!!!
	let [stage, A, fen, plorder, uplayer, deck] = [Z.stage, Z.A, Z.fen, Z.plorder, Z.uplayer, Z.deck];
	let pl = fen.players[uplayer];

	//console.log('activate!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
	//new_cards_animation();
	//round_change_animation();

	ferro_pre_action();
}


function _drawcard(key, dParent, sz) {
	let d1;
	let card = ari_get_card(key, sz);
	mAppend(dParent, iDiv(card));
	let d = iDiv(card); mStyle(d, { position: 'relative', margin: 20 });
	let wc = sz * 0.6;
	let hc = wc / 5;
	let offx = card.w - hc;
	console.log('wc', wc, 'hc', hc);
	let html = `<img width=${wc} height=${hc} src="./base/assets/images/icons/deco_v.png">`;
	// d1 = mDiv(d, {position:'absolute',top:0,left:0, bg:'blue'}, null, html); 
	// d1 = mDiv(d, {position:'absolute',bg:'red',top:hc,left:0}, null, html); 
	d1 = mDiv(d, { position: 'absolute', 'transform-origin': 'top right', transform: `rotate(-90deg)`, top: card.h / 4, right: card.w }, null, html);



	//let d1=mDiv(d,{'transform-origin':'0px 0px',transform:'rotate(90deg)'},null,`<img height=${sz/3} src="./base/assets/images/icons/ornamenth.png">`); //,rounding:h/2,border:'5px solid gold',bg:'transparent'});
	//let d1 = mDiv(d, {}, null, html); //,rounding:h/2,border:'5px solid gold',bg:'transparent'});
	//let d1 = mDiv(d, {transform:'rotate(-90deg) translateX(-50%) translateY(-328%)'}, null, html);
	// let d1 = mDiv(d, {'transform-origin':'center', transform:'rotate(-90deg)'}, null, html);
	// let rect=getRect(d1);
	//mPlace(d1, 'cc');

}

function ari_get_card(ckey, h, w, ov = .2) {
	//console.log('ckey', ckey);
	let type = ckey[2];
	let info = type == 'n' ? to_aristocard(ckey) : type == 'l' ? to_luxurycard(ckey) : to_commissioncard(ckey);
	let card = cardFromInfo(info, h, w, ov);
	if (type == 'l') {
		let d = iDiv(card);
		let sym = mSym('crow', d, { bg: 'green', h: 100, w: 5 }, 'tl');


		//symbolcolor(card, 'royalblue');
		//set_card_border(card, 10, 'orangered', "20,10,5,5,5,10"); 
		//set_card_style(card, { bg: 'gold' }) }
	}
	return card;
}

function to_luxurycard(ckey, color = 'gold', sz = 100, w) {
	let card = to_aristocard(ckey, color);

	console.log('card', card);
	set_card_style(card, { bg: 'lightgoldenrodyellow' });


	return card;
}
function post_commission() {
	let [fen, A, uplayer] = [Z.fen, Z.A, Z.uplayer];

	let comm_selected = A.items[A.selected[0]];

	//console.log('process_commission:', comm_selected);

	//1. berechne wieviel der player bekommt!
	//first check N1 = wie oft im fen.commissioned der rank von A.commission schon vorkommt
	//fen.commissioned koennte einfach sein: array of {rank:rank,count:count} und sorted by latest
	let rank = A.commission.key[0];
	if (nundef(fen.commissioned)) fen.commissioned = [];
	let x = firstCond(fen.commissioned, x => x.rank == rank);
	if (x) { removeInPlace(fen.commissioned, x); }
	else { x = { key: A.commission.key, rank: rank, count: 0 }; }

	//console.log('x', x)

	x.count += 1;

	//is the rank >= that the rank of the topmost commissioned card
	let pl = fen.players[uplayer];
	let top = isEmpty(fen.commissioned) ? null : arrLast(fen.commissioned);
	let rankstr = 'A23456789TJQK';
	let points = !top || get_rank_index(rank, rankstr) >= get_rank_index(top.rank, rankstr) ? 1 : 0;
	points += Number(x.count);
	pl.coins += points;
	fen.commissioned.push(x);

	let key = A.commission.similar.key;
	removeInPlace(pl.stall, key); // das muss aendern!!!!!!!!!!!!!

	if (comm_selected.path == 'open_commissions') {
		//top comm deck card goes to open commissions
		removeInPlace(fen.open_commissions, comm_selected.key);
		top_elem_from_to(fen.deck_commission, fen.open_commissions);
	} else {
		removeInPlace(fen.deck_commission, comm_selected.key);
	}

	//console.log('pl', pl, pl.commissions);
	arrReplace(pl.commissions, [A.commission.key], [comm_selected.key]);

	ari_history_list([`${uplayer} replaced commission card ${A.commission.key} by ${comm_selected.key}`, `${uplayer} gets ${points} for commissioning ${A.commission.key}`], 'commission');

	ari_next_action();
}


function ai_move(ms = 100) {

	//mFade(dTable,100); //mAnimateTo(dTable, 'opacity', .2, 100); //irgendwie muss ich table hiden!

	DA.ai_is_moving = true;
	let [A, fen] = [valf(Z.A, {}), Z.fen];
	let selitems;

	if (Z.game == 'ferro') {
		//console.log('ferro ai_move', A.items);
		if (Z.stage == 'card_selection') {
			let uplayer = Z.uplayer;
			let i1 = firstCond(A.items, x => x.path.includes(`${uplayer}.hand`));
			let i2 = firstCond(A.items, x => x.key == 'discard');
			selitems = [i1, i2];

		} else if (Z.stage == 'buy_or_pass') {
			selitems = [A.items[1]]; //waehlt immer pass
		} else selitems = [A.items[0]];
		//console.log('A', A)
	} else if (Z.game == 'bluff') {

		//testing 
		let [newbid, handler] = bluff_ai();
		//console.log('newbid',newbid,'handler',handler.name);
		if (newbid) { fen.newbid = newbid; UI.dAnzeige.innerHTML = bid_to_string(newbid); } //console.log('newbid', newbid); }
		else if (handler != handle_gehtHoch) { bluff_generate_random_bid(); }
		A.callback = handler;

		selitems = [];
		// if (isdef(fen.lastbid)) {
		// 	if (coin(25)) A.callback = handle_gehtHoch; else { if (!newbid) bluff_generate_random_bid(); A.callback = handle_bid; }
		// } else {
		// 	if (!newbid) bluff_generate_random_bid();
		// 	A.callback = handle_bid;
		// }

		//console.log('bluff ai_move selitems', selitems, 'callback', A.callback.name);

	} else if (A.command == 'trade') {
		selitems = ai_pick_legal_trade();
	} else if (A.command == 'exchange') {
		selitems = ai_pick_legal_exchange();
	} else if (A.command == 'upgrade') {
		selitems = [rChoose(A.items)];
	} else if (A.command == 'rumor') {
		selitems = [];
		let buildings = A.items.filter(x => x.path.includes('building'));
		let rumors = A.items.filter(x => !x.path.includes('building'));
		selitems = [rChoose(buildings), rChoose(rumors)];
	} else if (ARI.stage[Z.stage] == 'rumors_weitergeben') {
		let players = A.items.filter(x => Z.plorder.includes(x.key))
		let rumors = A.items.filter(x => !Z.plorder.includes(x.key))
		selitems = [rChoose(players), rChoose(rumors)];
	} else if (ARI.stage[Z.stage] == 'journey') {
		//console.log('bot should be picking a correct journey!!!! wie geht das?');
		selitems = []; // always pass!
	} else {
		let items = A.items;
		//console.log('items',items);
		let nmin = A.minselected;
		let nmax = Math.min(A.maxselected, items.length);
		let nselect = rNumber(nmin, nmax);
		selitems = rChoose(items, nselect); if (!isList(selitems)) selitems = [selitems];

	}

	for (const item of selitems) {
		select_last(item, select_toggle);

		//submit on enter item muss als letztes ausgewahehlt werden, und nach dem select_toggle aus A.selected entfernt werden!!!
		//da submit on enter sowieso A.callback aufruft => verify! JA
		if (isdef(item.submit_on_click)) A.selected.pop();
	}
	clearTimeout(TO.ai);
	loader_on();
	TO.ai = setTimeout(() => { if (isdef(A.callback)) A.callback(); loader_off(); }, ms);
}

function get_higher_ranks(rank, rankstr, except_list = []) {
	if (rank == '_') return BLUFF.rankstr.split('');
	let irank = rankstr.indexOf(rank);
	let ranks = rankstr.split('');
	return arrMinus(arrTake(ranks, 0, irank + 1), except_list);
}
function _ueberbiete(n, r, nreas, except_rank, definite = false) {
	//hier ist r ein word (also 'six' anstatt '6')
	let rankstr = BLUFF.rankstr.replace(BLUFF.torank[except_rank], '');
	let hr = get_higher_ranks(BLUFF.torank[r], rankstr);
	console.log('rankstr', rankstr, 'missing', except_rank);
	if (n == '_') return [nreas, BLUFF.toword[rRank(rankstr)]];
	else if (n <= nreas) return [n + 1, r];
	else if (!isEmpty(hr)) {
		console.log('higher ranks', hr);
		return [n, BLUFF.toword[rChoose(hr)]];
	}
	else if (definite) return [n + 1, r];
	else return [null, null];
}

function _bot_random(list, max, mmax, exp, nreas, n2, have2, words, fen) {
	let ranks = rChoose(words, 2);
	let b;
	if (nundef(fen.lastbid)) b = [rNumber(1, nreas), ranks[0], rNumber(1, nreas), ranks[1]];
	else if (fen.lastbid[0] > nreas + 2) {
		return [null, handle_gehtHoch];
	} else {
		[n1, r1, n2, r2] = bluff_convert2ranks(fen.lastbid);

		// if n1 or n2 is < nreas, just increase it
		let done = true;
		if (n1 <= nreas) n1++; else if (n2 <= nreas) n2++; else done = false;
		if (done) return bluff_convert2words([n1, r1, n2, r2]);

		//both are > nreas, so try changing ranks instead!
		//remove r1 and r2 from BLUFF.rankstr
		let rankstr = BLUFF.rankstr.replace(BLUFF.torank[r1], 'x').replace(BLUFF.torank[r2], 'x');

		//compute indexOf r1, r2 in BLUFF.rankstr
		let [i1, i2] = [BLUFF.rankstr.indexOf(r1), BLUFF.rankstr.indexOf(r2)];

		//try increase i1: 
		let s = '3456789TJQKA';
		//split s into 4 parts: <min(i1,i2), between(i1,i2), between(i2,max), >max(i1,i2)
		let [min, between, between2, max] = [s.substring(0, Math.min(i1, i2)), s.substring(Math.min(i1, i2), Math.max(i1, i2)), s.substring(Math.max(i1, i2), s.length), s.substring(Math.max(i1, i2) + 1, s.length)];

		console.log('i1', i1, 'i2', i2, '\nmin', min, 'between', between, 'between2', between2, 'max', max);


		// //find if higher index can be increased
		// let hi = Math.max(i1, i2); let i = hi == i1 ? 1 : 2;
		// if (hi < rankstr.length - 1) { hi = rNumber(hi + 1, BLUFF.rankstr.length - 1); } else done = false;
		// if (done) return bluff_convert2words([n1, i == 1 ? BLUFF.rankstr[hi] : r1, n2, i == 2 ? BLUFF.rankstr[hi] : r2]);

		// //lower rank index needs to be increased: use rankstr in order to avoid duplicates


		// let [n2, r2] = ueberbiete(b[2], b[3], nreas, get_higher_ranks(b[3], BLUFF.rankstr, [b[1]]), get_higher_ranks('_', BLUFF.rankstr, [b[1]]), coin(25));
		// if (!r2) [b[0], b[1]] = ueberbiete(b[0], b[1], nreas, get_higher_ranks(b[1], BLUFF.rankstr, [b[3]]), get_higher_ranks('_', BLUFF.rankstr, [b[3]]), true);
		// else[b[2], b[3]] = [n2, r2];

		// b = bluff_convert2words(b);
	}

	return [b, handle_bid]; //rChoose([handle_bid, handle_gehtHoch])];
}
function ueberbiete(n, r, nreas, higher, all, definite = false) {
	if (n == '_') return [nreas, rChoose(higher)];
	else if (n <= nreas) return [n + 1, rChoose(all)];
	else if (!isEmpty(higher)) {
		console.log('higher ranks', higher);
		return [n, rChoose(higher)];
	}
	else if (definite) return [n + 1, r];
	else return [null, null];
}



function _bluff_generate_random_bid() {
	let [A, fen, uplayer] = [Z.A, Z.fen, Z.uplayer];
	const di2 = { _: '_', three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9, ten: 'T', jack: 'J', queen: 'Q', king: 'K', ace: 'A' };

	let words = get_keys(di2).slice(1); // words sind three, four, ..., king, ace

	let b = isdef(fen.lastbid) ? jsCopy(fen.lastbid) : null;
	//console.log('last bid:', isdef(b) ? b : 'null');
	if (isdef(b)) {
		assertion(b[0] >= (b[2] == '_' ? 0 : b[2]), 'bluff_generate_random_bid: bid not formatted correctly!!!!!!!', b)

		let nmax = calc_reasonable_max(fen);
		let n = b[0] == '_' ? 1 : Number(b[0]);
		let done = false;
		if (n > nmax + 1) {
			//try to modify word instead!
			const di = { '3': 'three', '4': 'four', '5': 'five', '6': 'six', '7': 'seven', '8': 'eight', '9': 'nine', T: 'ten', J: 'jack', Q: 'queen', K: 'king', A: 'ace' };

			let rankstr = '3456789TJQKA';
			let w1 = di2[b[1]];
			let idx = isdef(w1) ? rankstr.indexOf(w1) : -1;
			if (idx >= 0 && idx < rankstr.length - 2) {
				let r = rankstr[idx + 1];
				b[1] = di[r];
				done = true;
			}
		}

		//if no done, manipulate number
		if (!done) {
			if (b[3] == '_') { b[2] = 1; b[3] = rChoose(words, 1, x => x != b[1]); }
			else if (b[0] > b[2]) { b[2] += 1; } //console.log('new bid is now:', b); }
			else { b[0] += coin(80) ? 1 : 2; if (coin()) b[2] = b[3] = '_'; }
		}
	} else {
		//let words = get_keys(di2); //!!!!!!!!!!!!!!!!!!!!!!!!!!NOOOOOOOOOOOOOOOOOOO

		//max bid soll abhaengig sein von wieviele cards im spiel sind oder ich mach clairvoyant bot!
		let nmax = calc_reasonable_max(fen);
		let nmin = Math.max(nmax - 1, 1);
		let arr_nmax = arrRange(1, nmax);
		let arr_nmin = arrRange(1, nmin);
		b = [rChoose(arr_nmax), rChoose(words), rChoose(arr_nmin), rChoose(words)];

		// b = [rChoose([1, 2, 3, 4]), rChoose(words), rChoose([1, 2]), rChoose(words)];
		if (b[1] == b[3]) b[3] = rChoose(words, 1, x => x != b[1]);
		if (coin()) b[2] = b[3] = '_';
	}
	fen.newbid = b;
	//console.log('new bid:', b);
	UI.dAnzeige.innerHTML = bid_to_string(b);

}

function process_rumors_setup() {

	let [fen, A, uplayer, plorder, data] = [Z.fen, Z.A, Z.uplayer, Z.plorder, Z.uplayer_data];

	let items = A.selected.map(x => A.items[x]);
	let receiver = firstCond(items, x => plorder.includes(x.key)).key;
	let rumor = firstCond(items, x => !plorder.includes(x.key));
	if (nundef(receiver) || nundef(rumor)) {
		select_error('you must select exactly one player and one rumor card!');
		return;
	}

	//receiver gets that rumor, aber die verteilung ist erst wenn alle rumors verteilt sind!
	//das geht nicht!!!!!!!!!!!!!!!!!!!!!!! weil ich ja nicht in die fen schreiben kann!!!!!!!
	assertion(isdef(data), 'no data for player ' + uplayer);
	sss(); //console.log('data',data);


	//assertion(isdef(data.state.remaining), 'no state.remaining for player ' + uplayer);

	let remaining = arrMinus(data.state.remaining, rumor.key); //fen.players[uplayer].rumors = arrMinus(fen.players[uplayer].rumors, rumor.key);

	// lookupAddToList(fen, ['di', receiver], rumor.key);
	// lookupAddToList(fen, ['receivers'], receiver);
	lookupAddToList(data, ['state', 'di', receiver], rumor.key);
	lookupAddToList(data, ['state', 'receivers'], receiver);
	lookupSetOverride(data, ['state', 'remaining'], remaining);

	console.log('state nach auswahl von', rumor.key, 'fuer', receiver, data.state);

	Z.state = data.state; //genau DAS muss gesendet werden!!!!!


	//so geht es schon mal NICHT weil der state ja successively geupdated wird!!!!
	// let data = firstCond(Z.playerdata, x => x.name == uplayer);
	// data.state = Z.state;

	//console.log('di', fen.di)

	//der rest wird anders!
	//check can_resolve (das ist weenn ALLE rumors von ALLEN spielern verteilt sind!)
	let done = ari_try_resolve_rumors_distribution();
	if (!done) take_turn_write();
}
function ari_try_resolve_rumors_distribution() {
	if (!i_am_host()) return;
	//console.log('HAAAAAAAAAAAAAAAAAAAAAAAA')
	let can_resolve = true;
	for (const pldata of Z.playerdata) {
		//let data1 = pldata;
		console.log('pldata', pldata, pldata.state, pldata.remaining);
		if (isEmpty(pldata.state)) { console.log('empty, break'); can_resolve = false; break; }

		else if (!isEmpty(pldata.state.remaining)) { console.log('some remaining!, break'); can_resolve = false; break; }
		//let receivers = data1.receivers;		if (receivers.length < Z.plorder.length-1) { can_resolve = false; break; }
	}

	console.log('can_resolve', can_resolve);
	if (can_resolve) {
		//console.log('HAAAAAAAAAAAAAAAAAALLLLLLLLLLLLLLLOOOOOOOOOOOOOOOOOOOOO');
		Z.turn = [Z.host];
		Z.stage = 105; //'next_rumors_setup_stage';
		take_turn_fen_write();
		return true;
	}
	return false;
}
function post_rumor_setup() {
	let [fen, A, uplayer, plorder] = [Z.fen, Z.A, Z.uplayer, Z.plorder];

	for (const plname of plorder) { fen.players[plname].rumors = []; }


	for (const plname of plorder) {
		//if (plname == uplayer) continue;
		//let pl = fen.players[plname];
		let data = firstCond(Z.playerdata, x => x.name == plname);
		let di = data.state.di;
		console.log('di', plname, di);
		for (const k in di) arrPlus(fen.players[k].rumors, di[k]);
		// 	assertion(isdef(fen.rumor_setup_di[plname]), 'no rumors for ' + plname);
		// 	pl.rumors = fen.rumor_setup_di[plname];
	}
	// delete fen.rumor_setup_di;
	// delete fen.rumor_setup_receivers;
	ari_history_list([`gossiping ends`], 'rumors');


	[Z.stage, Z.turn] = set_journey_or_stall_stage(fen, Z.options, fen.phase);
	take_turn_fen_clear();
}




function ui_get_rumors_and_players_items(uplayer) {
	//console.log('uplayer',uplayer,UI.players[uplayer])
	let items = [], i = 0;
	let comm = UI.players[uplayer].rumors;

	let data = firstCond(Z.playerdata, x => x.name == uplayer);
	assertion(isdef(data), 'no data for player ' + uplayer);

	let remaining = valf(lookup(data, ['state', 'remaining']), jsCopy(Z.fen.players[uplayer].rumors));

	for (const o of comm.items) {

		let item = { o: o, a: o.key, key: o.key, friendly: o.short, path: comm.path, index: i };
		i++;
		items.push(item);
	}

	let players = [];
	// let received = valf(Z.fen.rumor_setup_receivers, []);

	let received = valf(lookup(data, ['state', 'rumor_setup_receivers']), []);
	for (const plname in UI.players) {
		if (plname == uplayer || received.includes(plname)) continue;
		players.push(plname);
	}
	items = items.concat(ui_get_string_items(players));

	assertion(comm.items.length == players.length, 'irgendwas stimmt nicht mit rumors verteilung!!!!', players, comm)

	reindex_items(items);
	return items;
}

function process_rumors_setup_orig() {

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
		ari_history_list([`gossiping ends`], 'rumors');


		[Z.stage, Z.turn] = set_journey_or_stall_stage(fen, Z.options, fen.phase);
	} else if (isEmpty(remaining)) {
		//next rumor round starts
		delete fen.rumor_setup_receivers;
		Z.turn = [next];
	}
	take_turn_fen();
}


function process_comm_setup_orig() {

	let [fen, A, uplayer, plorder] = [Z.fen, Z.A, Z.uplayer, Z.plorder];

	//console.log('we are in stage ' + Z.stage);

	let items = A.selected.map(x => A.items[x]);
	let next = get_next_player(Z, uplayer);
	let receiver = next;
	let giver = uplayer;
	let keys = items.map(x => x.key);
	fen.players[giver].commissions = arrMinus(fen.players[giver].commissions, keys);
	if (nundef(fen.comm_setup_di)) fen.comm_setup_di = {};
	fen.comm_setup_di[receiver] = keys;

	if (is_setup_commissions_complete()) {
		for (const plname of plorder) {
			let pl = fen.players[plname];
			assertion(isdef(fen.comm_setup_di[plname]), 'no commission setup for ' + plname);
			pl.commissions = pl.commissions.concat(fen.comm_setup_di[plname]);
		}
		delete fen.comm_setup_di;
		delete fen.comm_setup_num;

		ari_history_list([`commission trading ends`], 'commissions');

		if (exp_rumors) {
			[Z.stage, Z.turn] = [24, [plorder[0]]];
			ari_history_list([`gossiping starts`], 'rumors');

		} else { [Z.stage, Z.turn] = set_journey_or_stall_stage(fen, Z.options, fen.phase); }

	} else if (next == plorder[0]) {
		//next commission round starts
		for (const plname of plorder) {
			let pl = fen.players[plname];
			assertion(isdef(fen.comm_setup_di[plname]), 'no commission setup for ' + plname);
			pl.commissions = pl.commissions.concat(fen.comm_setup_di[plname]);
		}
		fen.comm_setup_num -= 1;
		Z.turn = [plorder[0]]
	} else {
		Z.turn = [next];
	}
	take_turn_fen();

}

function is_commission_stage_complete(fen) {

	//comm stage 3 is complete when comm_setup_di hat entry fuer alle players in plorder
	for (const plname of fen.plorder) {
		if (!isdef(fen.comm_setup_di[plname])) return false;
	}
	return true;


}

function ui_game_menu_item(g, g_tables = []) {
	function runderkreis(color, id) {
		return `<div id=${id} style='width:20px;height:20px;border-radius:50%;background-color:${color};color:white;position:absolute;left:0px;top:0px;'>` + '' + "</div>";
	}
	let [sym, bg, color, id] = [Syms[g.logo], g.color, null, getUID()];
	if (!isEmpty(g_tables)) {
		let t = g_tables[0]; //most recent table of that game
		let have_another_move = t.player_status == 'joined';
		color = have_another_move ? 'green' : 'red';
		id = `rk_${t.id}`;
	}
	return `
	<div onclick="onclick_game_menu_item(event)" gamename=${g.id} style='cursor:pointer;border-radius:10px;margin:10px;padding:5px;padding-top:15px;min-width:120px;height:90px;display:inline-block;background:${bg};position:relative;'>
	${nundef(color) ? '' : runderkreis(color, id)}
	<span style='font-size:50px;font-family:${sym.family}'>${sym.text}</span><br>${g.friendly.toString()}</div>
	`;
}

function show_games(ms = 500) {

	let dParent = mBy('dGames');
	mClear(dParent);
	mText(`<h2>start new game</h2>`, dParent, { maleft: 12 });

	let html = `<div id='game_menu' style="color:white;text-align: center; animation: appear 1s ease both">`;
	let gamelist = 'a_game aristo bluff spotit ferro fritz';
	for (const g of dict2list(Config.games)) { if (gamelist.includes(g.id)) html += ui_game_menu_item(g); }
	mAppend(dParent, mCreateFrom(html));
	//mCenterCenterFlex(mBy('game_menu'));
	mFlexWrap(mBy('game_menu'));

	//mRise(dParent, ms);
}

function ui_game_menu_item(g, g_tables = []) {
	function runderkreis(color, id) {
		return `<div id=${id} style='width:20px;height:20px;border-radius:50%;background-color:${color};color:white;position:absolute;left:0px;top:0px;'>` + '' + "</div>";
	}
	let [sym, bg, color, id] = [Syms[g.logo], g.color, null, getUID()];
	if (!isEmpty(g_tables)) {
		let t = g_tables[0]; //most recent table of that game
		let have_another_move = t.player_status == 'joined';
		color = have_another_move ? 'green' : 'red';
		id = `rk_${t.id}`;
	}
	return `
	<div onclick="onclick_game_menu_item(event)" gamename=${g.id} style='cursor:pointer;border-radius:10px;margin:10px;padding:5px;padding-top:15px;min-width:120px;height:90px;display:inline-block;background:${bg};position:relative;'>
	${nundef(color) ? '' : runderkreis(color, id)}
	<span style='font-size:50px;font-family:${sym.family}'>${sym.text}</span><br>${g.friendly.toString()}</div>
	`;
}

function show_polling_signal() {

	let url = window.location.href;
	//console.log('url', url, typeof(url));
	let loc = url.includes('telecave') ? 'tele' : 'local';
	document.title = `${loc}:${DA.pollCounter} ${Config.games[Z.game].friendly}`;


	// let d1 = mDiv(mBy('dAdmin'), { position: 'fixed', top: 10, left: 73, width: 20, height: 20, bg: valf(DA.reloadColor, 'green'), rounding: 10 });
	// mFadeRemove(d1, 1000);
}

function gamestep() {

	show_admin_ui();

	DA.running = true; clear_screen();
	dTable = mBy('dTable'); mFall(dTable); mClass('dTexture', 'wood');

	shield_off();
	show_title();
	show_role();
	Z.func.present(Z, dTable, Z.uplayer);	// *** Z.uname und Z.uplayer ist IMMER da! ***

	//console.log('_____uname:'+Z.uname,'role:'+Z.role,'player:'+Z.uplayer,'host:'+Z.host,'curplayer:'+Z.turn[0],'bot?',is_current_player_bot()?'YES':'no');
	if (isdef(Z.scoring.winners)) { show_winners(); }
	else if (Z.func.check_gameover(Z)) {
		let winners = show_winners();
		Z.scoring = { winners: winners }
		sendgameover(winners[0], Z.friendly, Z.fen, Z.scoring);
	} else if (is_shield_mode()) {
		if (!DA.no_shield == true) { hide('bRestartMove'); shield_on(); } //mShield(dTable.firstChild.childNodes[1])} //if (isdef(Z.fen.shield)) mShield(dTable);  }
		autopoll();
	} else {
		Z.A = { level: 0, di: {}, ll: [], items: [], selected: [], tree: null, breadcrumbs: [], sib: [], command: null, autosubmit: Config.autosubmit };
		copyKeys(jsCopy(Z.fen), Z);
		copyKeys(UI, Z);
		activate_ui(Z); //console.log('uiActivated',uiActivated?'true':'false');
		Z.func.activate_ui();
		//if (Z.options.zen_mode != 'yes' && Z.mode != 'hotseat' && !DA.simulate) autopoll();
		if (Z.options.zen_mode != 'yes' && Z.mode != 'hotseat' && Z.fen.keeppolling) autopoll();
		//  (Z.turn.length > 1 || Z.stage == 'can_resolve' && get_multi_trigger() != 'mimi' || Z.game == 'bluff')) autopoll();
		//  (Z.turn.length > 1 || Z.stage == 'can_resolve' || Z.game == 'bluff' && Z.stage == 1)) autopoll();

		//let favicon = document.querySelector('[rel=icon]'); favicon.href = "../base/assets/images/icons/yourturn.gif";

	}

	//landing();

}

//#region comm pass trial 1
function ari_transfer_commission_cards_to_di() {
	let [fen, A, uplayer, plorder] = [Z.fen, Z.A, Z.uplayer, Z.plorder];

	//console.log('we are in stage ' + Z.stage);

	let items = A.selected.map(x => A.items[x]);
	let next = get_next_player(Z, uplayer);
	let receiver = next;
	let giver = uplayer;
	let keys = items.map(x => x.key);
	fen.players[giver].commissions = arrMinus(fen.players[giver].commissions, keys);
	if (nundef(fen.comm_setup_di)) fen.comm_setup_di = {};
	fen.comm_setup_di[receiver] = keys;
}
function process_comm_setup() {

	let [fen, A, uplayer, plorder] = [Z.fen, Z.A, Z.uplayer, Z.plorder];

	//console.log('we are in stage ' + Z.stage);

	ari_transfer_commission_cards_to_di();

	if (is_commission_stage_complete(fen)) {
		//transfer cards from di to each player's commision cards
		for (const plname of plorder) {
			if (isdef(fen.comm_setup_di[plname])) {
				fen.players[plname].commissions = arrPlus(fen.players[plname].commissions, fen.comm_setup_di[plname]);
			}
		}

		// 
	}
}
function old_process_comm_setup() {
	if (is_setup_commissions_complete()) {
		for (const plname of plorder) {
			let pl = fen.players[plname];
			assertion(isdef(fen.comm_setup_di[plname]), 'no commission setup for ' + plname);
			pl.commissions = pl.commissions.concat(fen.comm_setup_di[plname]);
		}
		delete fen.comm_setup_di;
		delete fen.comm_setup_num;

		ari_history_list([`commission trading ends`], 'commissions');

		if (exp_rumors) {
			[Z.stage, Z.turn] = [24, [plorder[0]]];
			ari_history_list([`gossiping starts`], 'rumors');

		} else { [Z.stage, Z.turn] = set_journey_or_stall_stage(fen, Z.options, fen.phase); }

	} else if (next == plorder[0]) {
		//next commission round starts
		for (const plname of plorder) {
			let pl = fen.players[plname];
			assertion(isdef(fen.comm_setup_di[plname]), 'no commission setup for ' + plname);
			pl.commissions = pl.commissions.concat(fen.comm_setup_di[plname]);
		}
		fen.comm_setup_num -= 1;
		Z.turn = [plorder[0]]
	} else {
		Z.turn = [next];
	}
	take_turn_fen();

}





//#region ack::: rem cons nach bluff check!!!!!!!!!!!!!
function start_simple_ack_round(ackstage, ack_players, nextplayer, callbackname_after_ack, keeppolling = false) {

	let fen = Z.fen;
	//each player except uplayer will get opportunity to buy top discard - nextplayer will draw if passing
	fen.ack_players = ack_players;
	fen.lastplayer = arrLast(ack_players);
	fen.nextplayer = nextplayer; //next player after ack!
	fen.turn_after_ack = [nextplayer];
	fen.callbackname_after_ack = callbackname_after_ack;
	fen.keeppolling = keeppolling;

	Z.stage = ackstage;
	Z.turn = [ack_players[0]];

}
function ack_player(plname) {
	let [fen, uplayer, pl] = [Z.fen, Z.uplayer, Z.fen.players[Z.uplayer]];

	//console.log('ack_player','plname',plname,'uplayer',uplayer,'pl',pl,'Z.turn',Z.turn,'Z.stage',Z.stage);
	assertion(sameList(Z.turn, [plname]), "ack_player: wrong turn");

	if (plname == fen.lastplayer || fen.players[uplayer].buy == true) {
		let func = window[fen.callbackname_after_ack];
		if (isdef(func)) func();
	} else {
		Z.turn = [get_next_in_list(plname, fen.ack_players)];
	}
	//console.log('ack_player','plname',plname,'uplayer',uplayer,'pl',pl,'Z.turn',Z.turn,'Z.stage',Z.stage);
	take_turn_fen();
}
function clear_ack_variables() {
	let [fen, uplayer, pl] = [Z.fen, Z.uplayer, Z.fen.players[Z.uplayer]];
	delete fen.ack_players;
	delete fen.lastplayer;
	delete fen.nextplayer;
	delete fen.turn_after_ack;
	delete fen.ackstage;
	delete fen.callbackname_after_ack;
	delete fen.keeppolling;

}
//#endregion


function bluff_ack_uplayer() {
	let [A, fen, stage, uplayer] = [Z.A, Z.fen, Z.stage, Z.uplayer];
	fen.players[uplayer].ack = true;
	//DA.ack[uplayer] = true;
	ack_player(uplayer);
}

function new_cards_animation(n = 2) {
	let [stage, A, fen, plorder, uplayer, deck] = [Z.stage, Z.A, Z.fen, Z.plorder, Z.uplayer, Z.deck];
	let pl = fen.players[uplayer];
	if (stage == 'card_selection' && !isEmpty(Clientdata.newcards)) {
		let anim_elems = [];
		for (const key of Clientdata.newcards) {
			let ui = lastCond(UI.players[uplayer].hand.items, x => x.key == key);
			ui = iDiv(ui);
			anim_elems.push(ui);
		}
		delete Clientdata.newcards;
		anim_elems.map(x => mPulse(x, n * 1000));
	}
}

function new_cards_animation(n = 2) {
	let [stage, A, fen, plorder, uplayer, deck] = [Z.stage, Z.A, Z.fen, Z.plorder, Z.uplayer, Z.deck];
	let pl = fen.players[uplayer];
	if (stage == 'card_selection' && !isEmpty(pl.newcards)) {
		let anim_elems = [];

		//console.log('player', uplayer, 'newcards', jsCopy(pl.newcards));
		for (const key of pl.newcards) {
			let ui = lastCond(UI.players[uplayer].hand.items, x => x.key == key);
			ui = iDiv(ui);
			anim_elems.push(ui);
		}
		delete pl.newcards;
		//console.log('player', uplayer, 'newcards deleted:', pl.newcards);

		//animate newcards!
		anim_elems.map(x => mPulse(x, n * 1000));
		// setTimeout(ferro_pre_action,1000);
	}
}

function turn_send_move_update(action_star = false) {
	take_turn_fen();
}


//#region ferro multi zeug!

function ferro_start_buy_or_pass() {

	let fen = Z.fen;
	//fen.canbuy =, fen.trigger, fen.buyer, fen.nextturn (und playerdata natuerlich!)
	//each player except uplayer will get opportunity to buy top discard - nextplayer will draw if passing
	fen.ack_players = ack_players;
	fen.lastplayer = arrLast(ack_players);
	fen.nextplayer = nextplayer; //next player after ack!
	fen.turn_after_ack = [nextplayer];
	fen.callbackname_after_ack = callbackname_after_ack;
	fen.keeppolling = keeppolling;

	Z.stage = ackstage;
	Z.turn = [ack_players[0]];

}
function ferro_simple_ack_player(plname) {
	let [fen, uplayer, pl] = [Z.fen, Z.uplayer, Z.fen.players[Z.uplayer]];

	//console.log('ack_player','plname',plname,'uplayer',uplayer,'pl',pl,'Z.turn',Z.turn,'Z.stage',Z.stage);
	assertion(sameList(Z.turn, [plname]), "ack_player: wrong turn");

	if (plname == fen.lastplayer || fen.players[uplayer].buy == true) {
		let func = window[fen.callbackname_after_ack];
		if (isdef(func)) func();
	} else {
		Z.turn = [get_next_in_list(plname, fen.ack_players)];
	}
	//console.log('ack_player','plname',plname,'uplayer',uplayer,'pl',pl,'Z.turn',Z.turn,'Z.stage',Z.stage);
	take_turn_fen();
}
function ferro_clear_ack_variables() {
	let [fen, uplayer, pl] = [Z.fen, Z.uplayer, Z.fen.players[Z.uplayer]];
	delete fen.ack_players;
	delete fen.lastplayer;
	delete fen.nextplayer;
	delete fen.turn_after_ack;
	delete fen.ackstage;
	delete fen.callbackname_after_ack;
	delete fen.keeppolling;

}





function take_turn_lock_multi() { take_turn(true, false, true, 'lock'); }
function take_turn_end_multi() { take_turn(true, false, true); }



//#region take_turn old mit notes...

function take_turn_single() { take_turn(); }

function take_turn_spotit() { take_turn(true, true); }

function take_turn_init_multi(endcond = 'turn') { take_turn(true, false, false, `indiv_${endcond}`, true); }

function take_turn_lock_multi() { take_turn(true, false, true, 'lock'); }

function take_turn_multi_plus_lock() { take_turn(true, true, false, 'lock'); }

function take_turn_end_multi() { take_turn(true, false, false, '', true); }

function take_turn_multi() { if (isdef(Z.state)) take_turn(false, true); else take_turn(false, false, true); }


function take_turn(write_fen = true, write_player = false, read_players = false, write_notes = null, clear_players = false) {
	prep_move();
	let o = { uname: Z.uplayer, friendly: Z.friendly };
	if (isdef(Z.fen)) o.fen = Z.fen;
	if (write_fen) o.write_fen = true;
	if (isdef(write_notes)) { o.write_notes = write_notes; } //console.log('JA');}
	if (write_player) { o.write_player = true; o.state = Z.state; }
	if (read_players) o.read_players = true;
	if (clear_players) o.clear_players = true;

	//console.log('sending', o);
	let cmd = 'table';
	send_or_sim(o, cmd);
}

function prep_move() {
	let [fen, uplayer, pl] = [Z.fen, Z.uplayer, Z.pl];
	for (const k of ['round', 'phase', 'stage', 'step', 'turn']) { fen[k] = Z[k]; }
	deactivate_ui();
	clear_timeouts();
}
function send_or_sim(o, cmd) {
	Counter.server += 1;
	if (nundef(Z) || is_multi_stage()) o.read_players = true;
	if (DA.simulate) phpPostSimulate(o, cmd); else phpPost(o, cmd);
}

//#endregion

function sendmove(plname, friendly, fen, action, expected, phase, round, step, stage, notes, scoring = {}) {
	deactivate_ui();
	clear_timeouts();

	let o = { uname: plname, friendly: friendly, fen: fen, action: action, expected: expected, phase: phase, round: round, step: step, stage: stage, notes: notes, scoring: scoring };
	//console.log('sendmove: turn',fen.turn)

	//console.log(`sendmove: simulated: ${DA.simulate}`);
	if (DA.simulate) phpPostSimulate(o, 'move'); else phpPost(o, 'move');
}

function turn_send_move_update(action_star = false) {
	take_turn_single(); return;
	let [fen, uplayer] = [Z.fen, Z.uplayer];	//console.log('sending move:Z',Z); //return;

	//console.log('uplayer', uplayer, 'action_star', action_star);

	[fen.stage, fen.phase, fen.turn] = [Z.stage, Z.phase, Z.turn];

	//ACHTUNG!!!!
	assertion(!isEmpty(fen.turn), 'ACHTUNG!!!!!!!!!!! TURN IST EMPTY in take_turn_single!!!!!!!!!!!!!', Z.turn);
	//if (isEmpty(fen.turn)) { fen.turn = Z.turn = [Z.host]; console.log('SETTING HOST TURN BECAUSE TURN EMPTY AT SEND!!!!!!!') }

	let action = action_star ? { stage: '*', step: '*' } : Z.expected[uplayer];
	let expected = {}; fen.turn.map(x => expected[x] = { stage: fen.stage, step: Z.step });
	//console.log(':::take_turn_single: action', action, 'expected', expected, 'Z.step', Z.step, 'Z.turn', Z.turn);

	//console.log('in',getFunctionsNameThatCalledThisFunction(),'fen.turn', fen.turn);
	sendmove(Z.uplayer, Z.friendly, Z.fen, action, expected, Z.phase, Z.round, Z.step, Z.stage, Z.notes, Z.scoring);
}


function spotit_clear_score() {
	assertion(isdef(Z.notes), 'Z.notes not defined');
	Z.notes = {};
	//ensure_score();
	//for (const plname in Z.fen.players) { Z.notes[plname].score = 0; }
}
function _spotit_move(uplayer, success) {
	//console.log('g',g,'uname',uname,'success',success)
	if (success) {
		//console.log('success!',jsCopy(g.expected));
		inc_player_score(uplayer);
		Z.action = { stage: 'move', step: Z.options.zen_mode == 'yes' ? '*' : Z.step };
		for (const plname in Z.expected) { Z.expected[plname].step += 1 }
		Z.step += 1; Z.round += 1;
		//console.log('sending',jsCopy(g.expected));
		Z.fen.items = spotit_item_fen(Z.options);
		//Clientdata.iwin = true;
		sendmove(uplayer, Z.friendly, Z.fen, Z.action, Z.expected, Z.phase, Z.round, Z.step, Z.stage, Z.notes)
	} else {
		let d = mShield(dTable, { bg: '#000000aa', fg: 'red', fz: 60, align: 'center' });
		d.innerHTML = 'NOPE!!! try again!';
		TO.spotit_penalty = setTimeout(() => d.remove(), 2000);
	}
}


function ferro_ack_uplayer_lean() {
	let [A, uplayer] = [Z.A, Z.uplayer];
	stopPolling();
	let o_pldata = Z.playerdata.find(x => x.name == uplayer);
	Z.state = o_pldata.state = { buy: !isEmpty(A.selected) && A.selected[0] == 0 };
	let can_resolve = ferro_check_resolve();
	if (can_resolve) {
		assertion(Z.stage == 'buy_or_pass', 'stage is not buy_or_pass when checking can_resolve!');
		Z.stage = 'can_resolve';
		[Z.turn, Z.stage] = [[get_multi_trigger()], 'can_resolve'];
		take_turn_multi_plus_lock();
	} else { take_turn_multi(); }
}

function ferro_ack_uplayer() {
	let [A, fen, stage, uplayer] = [Z.A, Z.fen, Z.stage, Z.uplayer];
	//console.log('A.selected', A.selected)

	stopPolling();

	// update Z.playerstate (fuer resolve check!) and set Z.state
	let o_pldata = Z.playerdata.find(x => x.name == uplayer);
	Z.state = o_pldata.state = { buy: !isEmpty(A.selected) && A.selected[0] == 0 };

	//console.log('====>ack_player:playerdata', Z.playerdata);

	//NEIN!FORCE_REDRAW = true; //brauch ich damit ui fuer diesen player weggeht

	//console.log('<===write_player', uplayer, Z.state);

	//hier muss ich checken ob eh schon genug info habe fuer can_resolve!
	let can_resolve = ferro_check_resolve();
	//console.log('===>can_resolve', can_resolve);
	if (can_resolve) {
		assertion(Z.stage == 'buy_or_pass', 'stage is not buy_or_pass when checking can_resolve!');
		//console.log('====>buyer found!', fen.buyer);
		Z.stage = 'can_resolve';
		[Z.turn, Z.stage] = [[get_multi_trigger()], 'can_resolve'];
		take_turn_multi_plus_lock();
	} else {
		// if (Z.mode == 'hotseat') {
		// 	let next = get_next_in_list(fen.canbuy, uplayer);
		// 	assertion(next != fen.canbuy[0], 'sollte schon laengst can_resolve sein!!!!!!!!!!!!!!!!!')
		// 	Z.turn = [next];
		// }
		take_turn_multi();
	}
	//Z.func.state_info(mBy('dTitleLeft')); //rem cons
}


function handle_result(result, cmd) {

	//if (cmd == 'table') {console.log('result', result); } //return;}

	if (verbose) console.log('cmd', cmd, '\nresult', result); //return;
	if (result.trim() == "") return;
	let obj;
	try { obj = JSON.parse(result); } catch { console.log('ERROR:', result); }

	if (verbose) console.log('HANDLERESULT bekommt', jsCopy(obj));
	processServerdata(obj, cmd);

	// console.log('obj.fen', obj.fen,'obj.turn', obj.turn, 'obj.a', obj.a, 'obj.b', obj.b);
	//console.log('obj.fen', obj.fen,'obj.turn', obj.turn, 'obj.a', obj.a, 'obj.b', obj.b);

	switch (cmd) {
		case "assets": load_assets(obj); start_with_assets(); break;
		case "users": show_users(); break;
		case "tables": show_tables(); break;
		case "delete_table":
		case "delete_tables": show_tables(); break;
		//************************* table *************************** */
		case "gameover":
		//case "clear":
		case "table":
		case "startgame":
			update_table();

			//console.log('===>turn', Z.turn);
			// console.log(`_________ ${Counter.server} apiserver cmd`,cmd,Z.turn);
			// console.log('<===request', obj.status);
			// console.log('===>stage', Z.stage);
			// console.log('===>notes', Z.notes);
			// console.log('===>fen.multi', Z.fen.multi); //return;
			// console.log('===>playerdata', Z.playerdata); //return;

			//handle multi stage
			if (is_multi_stage()) {
				//check if is already in can_resolve stage
				if (Z.stage == 'can_resolve') {
					//trigger soll jetzt mal manually ACK clicken
					//console.log('triggering manual ACK to resolve');
					if (is_multi_trigger(Z.uplayer)) {
						//for now do NOT goto gamestep but just show Clear Ack button
						show('bClearAck');
						Z.func.state_info(mBy('dTitleLeft'));
						return;
					}
				}

				assertion(Z.stage != 'can_resolve', "WTF!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");	//I am NOT in can_resolve stage yet!!!!

				//check if can be resolved
				let can_resolve = Z.func.check_resolve();
				if (can_resolve) {
					[Z.turn, Z.stage] = [[get_multi_trigger()], 'can_resolve'];
					Z.func.state_info(mBy('dTitleLeft'));
					take_turn_lock_multi();
					//return;
				} else if (is_multi_trigger()) {
					//update turn to only those players with empty playerdata
				}
			}

			if (Z.skip_presentation) { Z.func.state_info(mBy('dTitleLeft')); autopoll(); return; }
			console.log('===>turn', Z.turn);
			clear_timeouts();
			gamestep();
			break;

	}
}

// ferro vor change of clear_ack
function clear_ack() {
	if (Z.stage == 'buy_or_pass') {
		//ferro_change_to_turn_round();
		if (isList(Z.playerdata) && lookup(Z.fen, ['multi', 'trigger']) == Z.uplayer) ferro_force_resolve(true);
		else {
			ferro_change_to_card_selection();
			prep_move();
			let o = { uname: Z.uplayer, friendly: Z.friendly, fen: Z.fen, write_fen: true, write_notes: '' };
			let cmd = 'table';
			send_or_sim(o, cmd);

		}
	}
	else if (Z.stage == 'round_end') start_new_round_ferro();
}

function ferro() {
	function clear_ack() {
		if (Z.stage == 'buy_or_pass') {
			//ferro_change_to_turn_round();
			if (isList(Z.playerdata) && lookup(Z.fen, ['multi', 'trigger']) == Z.uplayer) ferro_force_resolve(true);
			else {
				ferro_change_to_card_selection();
				prep_move();
				let o = { uname: Z.uplayer, friendly: Z.friendly, fen: Z.fen, write_fen: true, write_notes: '' };
				let cmd = 'table';
				send_or_sim(o, cmd);

			}
		}
		else if (Z.stage == 'round_end') start_new_round_ferro();
	}
	function state_info(dParent) { ferro_state_new(dParent); }
	function setup(players, options) {
		let fen = { players: {}, plorder: jsCopy(players), history: [] };

		//calc how many decks are needed (basically 1 suit per person, plus 1 for the deck)
		let n = players.length;
		let num_decks = fen.num_decks = 2 + (n >= 9 ? 2 : n >= 7 ? 1 : 0); // 2 + (n > 5 ? Math.ceil((n - 5) / 2) : 0); //<=5?2:Math.max(2,Math.ceil(players.length/3));
		//console.log('num_decks', num_decks);
		let deck = fen.deck = create_fen_deck('n', num_decks, 4 * num_decks);
		let deck_discard = fen.deck_discard = [];
		shuffle(deck);
		if (DA.TEST0 != true) shuffle(fen.plorder);
		let starter = fen.plorder[0];
		//console.log('options', options);
		let handsize = valf(Number(options.handsize), 11);
		for (const plname of players) {
			let pl = fen.players[plname] = {
				hand: deck_deal(deck, plname == starter ? handsize + 1 : handsize),
				journeys: [],
				coins: 10,
				vps: 0,
				score: 0,
				name: plname,
				color: get_user_color(plname),
			};
			pl.goals = { 3: 0, 33: 0, 4: 0, 44: 0, 5: 0, 55: 0, '7R': 0 };

			if (plname == starter) {
				pl.hand = ['AHn', 'AHn', 'AHn', 'AHn'];
			}
			//for(const goal of Config.games.ferro.options.goals) pl.goals[goal]=0;
		}
		fen.phase = ''; //TODO: king !!!!!!!
		[fen.stage, fen.turn] = ['card_selection', [starter]];
		return fen;
	}
	function present(z, dParent, uplayer) { ferro_present_new(z, dParent, uplayer); }
	function present_player(g, plname, d, ishidden = false) { ferro_present_player_new(g, plname, d, ishidden = false) }
	function check_gameover() { return isdef(Z.fen.winners) ? Z.fen.winners : false; }
	function stats(Z, dParent) { ferro_stats_new(dParent); }
	function activate_ui() { ferro_activate_ui(); }
	function check_resolve() { return ferro_check_resolve(); }
	function resolve() { ferro_resolve(); }
	return { check_resolve, resolve, clear_ack, state_info, setup, present, present_player, check_gameover, stats, activate_ui };
}

function playerstate_check() {
	//returns true if automessage has been sent by trigger
	//this function sends a write_fen message and return true if playerdata can be resolved!
	//otherwise returns false (will result in Z.skip_presentation if not resolve)

	//is this a turn that collects individual playerdata?
	//how to handle spotit this time?
	let trigger = lookup(Z, ['fen', 'multi', 'trigger']);
	if (!trigger) return false;
	let [uplayer, fen, stage, pldata] = [Z.uplayer, Z.fen, Z.stage, Z.playerdata];

	//case1: stage != can_resolve
	if (stage != 'can_resolve') {
		let can_resolve = Z.func.check_resolve();
		if (can_resolve) {
			[Z.turn, Z.stage] = [[trigger], 'can_resolve'];
			take_turn_lock_multi();
			return true;
		} else return false;
	} else if (uplayer == trigger) {
		//case2: uplayer == trigger
		//das ist der der resolven koennte! NUR trigger kann fen aendern!!!!!!
		//es wird resolved!
		Z.func.resolve();
		// console.log('buy process done ... resolving');
		// ferro_change_to_card_selection(); //das soll durch resolve ersetzt werden
		// prep_move();
		// let o = { uname: Z.uplayer, friendly: Z.friendly, fen: Z.fen, write_fen: true, write_notes: '' };
		// let cmd = 'table';
		// send_or_sim(o, cmd);

		return true;
	} else return false;

}


//#region ferro last version vor standard take_turn!
function ferro_change_to_buy_pass() {
	let [plorder, stage, A, fen, uplayer] = [Z.plorder, Z.stage, Z.A, Z.fen, Z.uplayer];
	let nextplayer = get_next_player(Z, uplayer); //player after buy_or_pass round

	//newturn is list of players starting with nextplayer
	let newturn = jsCopy(plorder); while (newturn[0] != nextplayer) { newturn = arrCycle(newturn, 1); } //console.log('newturn', newturn);
	let buyerlist = fen.canbuy = []; //fen.canbuy list ist angeordnet nach reihenfolge der frage
	for (const plname of newturn) {
		let pl = fen.players[plname];
		if (plname != uplayer && pl.coins > 0) { pl.buy = false; buyerlist.push(plname); }
		//if (plname == uplayer) { pl.buy = false; buyerlist.push(plname); } else if (pl.coins > 0) { pl.buy = false; buyerlist.push(plname); }
	}


	fen.multi = {
		//turn: buyerlist,
		//stage: 'buy_or_pass',
		trigger: uplayer,  //Z.host, //uplayer, host geht nicht weil der ja dann nicht buy or pass kann!!!
		endcond: 'turn',
		turn_after_ack: [nextplayer],
		callbackname_after_ack: 'ferro_change_to_card_selection',
		next_stage: 'card_selection',

	};
	[Z.stage, Z.turn] = ['buy_or_pass', buyerlist];
	console.log('sending turn', Z.turn);
	//take_turn_init_multi('turn');
	prep_move();
	let o = { uname: Z.uplayer, friendly: Z.friendly, clear_players: buyerlist, write_notes: 'indiv_turn', fen: Z.fen, write_fen: true };
	//console.log('sending to server', o);
	let cmd = 'table';
	send_or_sim(o, cmd);

	//log_object(fen, 'buyers', 'nextplayer canbuy');

	//start_indiv_ack_round('buy_or_pass', buyerlist, nextplayer, 'ferro_change_to_turn_round');

}
function ferro_ack_uplayer() {
	let [A, fen, stage, uplayer] = [Z.A, Z.fen, Z.stage, Z.uplayer];
	//console.log('A.selected', A.selected)
	Z.state = { buy: !isEmpty(A.selected) && A.selected[0] == 0 };
	//Z.state = Clientdata.playerstate = { buy: !isEmpty(A.selected) && A.selected[0] == 0 };
	//Clientdata._playerdata_set = true;
	FORCE_REDRAW = true;

	console.log('<===write_player', uplayer, Z.state)
	prep_move();
	let o = { uname: Z.uplayer, friendly: Z.friendly, fen: Z.fen, state: Z.state, write_player: true };
	let cmd = 'table';
	send_or_sim(o, cmd);
}
function ferro_change_to_card_selection() {
	//console.log('ferro_change_to_turn_round_', getFunctionsNameThatCalledThisFunction()); 
	let [z, fen, stage, uplayer, ui] = [Z, Z.fen, Z.stage, Z.uplayer, UI];
	assertion(stage != 'card_selection', "ALREADY IN TURN ROUND!!!!!!!!!!!!!!!!!!!!!!");

	for (const plname of fen.canbuy) {
		let pl = fen.players[plname];
		if (pl.buy == true) {
			let card = fen.deck_discard.shift();
			pl.hand.push(card);
			deck_deal_safe_ferro(fen, plname, 1);
			pl.coins -= 1; //pay
			ari_history_list([`${plname} bought ${card}`], 'buy');
			break;
		}
	}
	let nextplayer = fen.multi.turn_after_ack[0];
	deck_deal_safe_ferro(fen, nextplayer, 1); //nextplayer draws

	//console.log('multi',fen.multi);
	Z.turn = fen.multi.turn_after_ack;
	Z.stage = 'card_selection';

	clear_ack_variables();
	delete fen.multi;

	for (const k of ['canbuy']) delete fen[k];
	for (const plname of fen.plorder) { delete fen.players[plname].buy; }
	clear_transaction();
}
function ferro_check_resolve() {
	let [pldata, stage, A, fen, plorder, uplayer, deck, turn] = [Z.playerdata, Z.stage, Z.A, Z.fen, Z.plorder, Z.uplayer, Z.deck, Z.turn];
	let pl = fen.players[uplayer];

	if (stage != 'buy_or_pass') return false;
	for (const plname of turn) {
		let data = firstCond(pldata, x => x.name == plname);
		assertion(isdef(data), 'no pldata for', plname);
		let state = data.state;

		console.log('state', plname, state);
		if (isEmpty(state)) done = false;
		else if (state.buy == true) buyer = plname;
		else continue;

		break;
	}
	return done;
}
function ferro_resolve() {
	console.log('buy process done, buyer', buyer);
	ferro_change_to_card_selection();
	prep_move();
	let o = { uname: Z.uplayer, friendly: Z.friendly, fen: Z.fen, write_fen: true, write_notes: '' };
	let cmd = 'table';
	send_or_sim(o, cmd);
}
//#endregion ===========================

function take_turn_spotit() {
	prep_move();
	let o = { uname: Z.uplayer, friendly: Z.friendly, fen: Z.fen, state: Z.state, write_player: true, write_fen: true };
	let cmd = 'table';
	send_or_sim(o, cmd);
}

function query_status() {
	prep_move();
	let o = { uname: Z.uname, friendly: Z.friendly };
	let cmd = 'collect_status';
	send_or_sim(o, cmd);
}

function trigger_check_is_sending(trigger) {
	//this function seends a write_fen message and return true if playerdata can be resolved!
	//otherwise returns false (will result in Z.skip_presentation if not resolve)

	if (!trigger) return false;
	let [uplayer, fen, stage, pldata] = [Z.uplayer, Z.fen, Z.stage, Z.playerdata];

	//case1: stage != can_resolve
	if (stage != 'can_resolve') {
		let can_resolve = Z.func.check_resolve();
		if (can_resolve) {
			[Z.turn, Z.stage] = [[trigger], 'can_resolve'];
			prep_move();
			let o = { uname: Z.uplayer, friendly: Z.friendly, fen: Z.fen, write_fen: true, write_notes: 'lock' };
			let cmd = 'table';
			send_or_sim(o, cmd);

			return true;
		} else return false;
	} else if (uplayer == trigger) {
		//case2: uplayer == trigger
		//das ist der der resolven koennte! NUR trigger kann fen aendern!!!!!!
		//es wird resolved!
		Z.func.resolve();
		// console.log('buy process done ... resolving');
		// ferro_change_to_card_selection(); //das soll durch resolve ersetzt werden
		// prep_move();
		// let o = { uname: Z.uplayer, friendly: Z.friendly, fen: Z.fen, write_fen: true, write_notes: '' };
		// let cmd = 'table';
		// send_or_sim(o, cmd);

		return true;
	} else return false;

}

function check_collect(obj) {
	//erwarte dass obj ein collect_complete und ein too_late hat!
	//console.log('notes', Z.notes)
	if (nundef(obj.collect_complete)) return false;
	if (Z.mode != 'multi') { console.log('COLLECT NUR IN MULTI PLAYER MODE!!!!!!'); return false; }
	if (!startsWith(Z.notes, 'indiv') && Z.notes != 'lock') { return false; } //console.log('!!!notes is NOT indiv or lock'); return false; }
	assertion(isdef(obj.playerdata), 'no playerdata but collect_complete');

	let collect_complete = obj.collect_complete;
	let too_late = obj.too_late;
	//console.log('notes', Z.notes)
	//console.log('collect_open', collect_complete, 'too_late', too_late);

	if (i_am_acting_host() && collect_complete) {

		//console.log('collect_open: i am host, collect_complete, was nun???');
		assertion(obj.table.fen.turn.length == 1 && obj.table.fen.turn[0] == U.name && U.name == obj.table.fen.acting_host, 'collect_open: acting host is NOT the one in turn!');
		assertion(isdef(Z.func.post_collect), 'post_collect not defined for game ' + obj.table.game);

		//Z.playerdata = obj.playerdata;
		//console.log('playerdata vorher', Z.playerdata);
		if (Z.fen.end_cond == 'all') for (const p of Z.playerdata) { p.state = JSON.parse(p.state); }
		else if (Z.fen.end_cond == 'first') {
			for (const p of Z.playerdata) {
				if (isdef(p.state)) {
					p.state = JSON.parse(p.state);
					//console.log('*** winning player is', p.name, p.state);
				}

			}
			//console.log('playerdata nachher', Z.playerdata);
		}
		Z.func.post_collect();


	} else if (collect_complete && (Z.turn.length > 1 || Z.turn[0] != Z.fen.acting_host)) {
		Z.turn = [Z.fen.acting_host];
		take_turn_single();
		//console.log('collect_open: collect_complete, bin aber nicht der host! was nun???');

	} else if (i_am_acting_host()) {
		//console.log('collect_open: i am host, bin aber nicht collect_complete, was nun???');
		//autopoll();
		return false;

	} else {
		//console.log('collect_open: bin nicht der host, bin nicht collect_complete, was nun???');
		//autopoll();
		return false;

	}
	return true;

}

function MUELL() {
	if (Z.stage == 'can_resolve') {
		assertion(trigger, 'no trigger and can_resolve!!!');
	}

	//first check if resolve condition is met!
	let resolve = Z.func.check_resolve();

	if (Z.stage == 'can_resolve' && uplayer == trigger) {
		//das ist der der resolven koennte! NUR trigger kann fen aendern!!!!!!
		//es wird resolved!
	} else if (resolve) {
		[Z.turn, Z.stage] = [[trigger], 'can_resolve'];

	} else return false;

	//das ist nur prototyping!!!!!!!!!!!!!!!!!
	if (Z.game == 'ferro' && Z.stage == 'buy_or_pass') {
		let [pldata, multi, turn, done, buyer] = [Z.playerdata, Z.fen.multi, Z.turn, true, null];
		console.log(':::trigger check!', turn);
		//console.log('..............pldata', pldata);

		for (const plname of turn) {
			let data = firstCond(Z.playerdata, x => x.name == plname);
			assertion(isdef(data), 'no pldata for', plname);
			let state = data.state;

			console.log('state', plname, state);
			if (isEmpty(state)) done = false;
			else if (state.buy == true) buyer = plname;
			else continue;

			break;
		}
		if (done) {
			console.log('buy process done, buyer', buyer);
			ferro_change_to_card_selection();
			prep_move();
			let o = { uname: Z.uplayer, friendly: Z.friendly, fen: Z.fen, write_fen: true, write_notes: '' };
			let cmd = 'table';
			send_or_sim(o, cmd);

			return true;
		}
	}
	return false;

}

function ferro_force_resolve(by_ack_button = false) {
	assertion(isdef(Z.playerdata) || by_ack_button, 'no playerdata in force_resolve by trigger!!!!');
	// for(const data of Z.playerdata){
	// 	let pl = fen.players[data.name];
	// 	if (isEmpty(data.state)) pl.buy = false; else	pl.buy = data.state.buy;
	// }
	ferro_call_resolve();

}
function ferro_call_resolve() {
	//expects a function fen.multi.callbackname_after_ack

	assertion(Z.stage == 'buy_or_pass', 'no buy_or_pass in call_resolve');

	let [fen, stage, uplayer] = [Z.fen, Z.stage, Z.uplayer];
	let callbackname = fen.multi.callbackname_after_ack;
	// console.log('===>RESOLVE',Z.uplayer); 
	// console.log('fen.multi', fen.multi); //return;

	for (const data of Z.playerdata) {
		let pl = fen.players[data.name];
		if (isEmpty(data.state)) pl.buy = false; else pl.buy = data.state.buy;
	}

	if (isdef(callbackname)) {
		let f = window[callbackname];
		if (isdef(f)) {
			f();
		}
	}
	prep_move();
	let o = { uname: Z.uplayer, friendly: Z.friendly, fen: Z.fen, write_fen: true, write_notes: '' };
	let cmd = 'table';
	send_or_sim(o, cmd);
}
function ferro_clear_playerdata() { if (isdef(Clientdata._playerdata_set)) { delete Clientdata._playerdata_set; } }

function ferro_handle_buy_or_pass() {
	let [fen, stage, uplayer] = [Z.fen, Z.stage, Z.uplayer];
	// if (uplayer == fen.multi.trigger) {
	// 	//hier muss der trigger checken fuer early break up von buy_or_pass
	// 	console.log('HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHAAAAAAAAAAAAALLLLLLLLLLLLOOOOOOOOOOOOO')
	// 	let pldata = Z.playerdata;
	// 	console.log('..............pldata', pldata);
	// }else	
	if (uplayer == lookup(fen, ['multi', 'trigger'])) {
		//select_timer(6000, ferro_force_resolve);
	} else if (nundef(Clientdata.playerdata_set)) {
		select_add_items(ui_get_buy_or_pass_items(), ferro_ack_uplayer, 'may click top discard to buy or pass', 1, 1);
		//select_timer(5000, ferro_ack_uplayer);
	}
}



//#region ferro ack NEW!
function ferro_change_to_ack_round() {
	let [plorder, stage, A, fen, uplayer] = [Z.plorder, Z.stage, Z.A, Z.fen, Z.uplayer];
	let nextplayer = get_next_player(Z, uplayer); //player after buy_or_pass round

	//newturn is list of players starting with nextplayer
	let newturn = jsCopy(plorder); while (newturn[0] != nextplayer) { newturn = arrCycle(newturn, 1); } //console.log('newturn', newturn);
	let buyerlist = fen.canbuy = []; //fen.canbuy list ist angeordnet nach reihenfolge der frage
	for (const plname of newturn) {
		let pl = fen.players[plname];
		if (plname == uplayer) { pl.buy = false; continue; }
		else if (pl.coins > 0) { pl.buy = false; buyerlist.push(plname); }
	}
	//log_object(fen, 'buyers', 'nextplayer canbuy');

	start_simple_ack_round('buy_or_pass', buyerlist, nextplayer, 'ferro_change_to_turn_round');
}
function ferro_change_to_turn_round() {
	//console.log('ferro_change_to_turn_round_', getFunctionsNameThatCalledThisFunction()); 
	let [z, A, fen, stage, uplayer, ui] = [Z, Z.A, Z.fen, Z.stage, Z.uplayer, UI];
	assertion(stage != 'card_selection', "ALREADY IN TURN ROUND!!!!!!!!!!!!!!!!!!!!!!");

	for (const plname of fen.canbuy) {
		let pl = fen.players[plname];
		if (pl.buy == true) {
			let card = fen.deck_discard.shift();
			pl.hand.push(card);
			deck_deal_safe_ferro(fen, plname, 1);
			pl.coins -= 1; //pay
			ari_history_list([`${plname} bought ${card}`], 'buy');
			break;
		}
	}
	deck_deal_safe_ferro(fen, fen.nextplayer, 1); //nextplayer draws

	console.log('multi', fen.multi);
	Z.turn = fen.multi.turn_after_ack;
	Z.stage = 'card_selection';

	clear_ack_variables();
	for (const k of ['canbuy']) delete fen[k];
	for (const plname of fen.plorder) { delete fen.players[plname].buy; }
	clear_transaction();
}
function _ferro_ack_uplayer() {
	let [A, fen, stage, uplayer] = [Z.A, Z.fen, Z.stage, Z.uplayer];
	fen.players[uplayer].buy = A.selected[0] == 0;

	ack_player(uplayer);
}

//#endregion


function start_indiv_ack_round(ackstage, ack_players, nextplayer, callbackname_after_ack) {

	let fen = Z.fen;
	//each player except uplayer will get opportunity to buy top discard - nextplayer will draw if passing
	fen.acting_host = Z.uplayer;
	fen.ack_players = ack_players;
	fen.lastplayer = arrLast(ack_players);
	fen.nextplayer = nextplayer; //next player after ack!
	fen.turn_after_ack = [nextplayer];
	fen.callbackname_after_ack = callbackname_after_ack;

	Z.stage = ackstage;
	Z.turn = jsCopy(ack_players);

}

function old_ensure_buttons_visible_ferro() {
	if (isdef(mBy('dbPlayer'))) return;
	let [plorder, stage, A, fen, uplayer, pl] = [Z.plorder, Z.stage, Z.A, Z.fen, Z.uplayer, Z.fen.players[Z.uplayer]];
	if (fen.players[uplayer].hand.length <= 1) return; // only display for hand size > 1
	let d = iDiv(UI.players[uplayer]);
	mStyle(d, { position: 'relative' })
	//console.log('d', d);
	let dbPlayer = mDiv(d, { position: 'absolute', bottom: 2, left: 100, height: 25 }, 'dbPlayer');
	let styles = { rounding: 6, bg: 'silver', fg: 'black', border: 0, maleft: 10 };
	let bByRank = mButton('by rank', onclick_by_rank_ferro, dbPlayer, styles, 'enabled');
	let bBySuit = mButton('by suit', onclick_by_suit_ferro, dbPlayer, styles, 'enabled');
	if (Z.game == 'ferro') {
		let b = mButton('clear selection', onclick_clear_selection_ferro, dbPlayer, styles, 'enabled', 'bClearSelection'); //isEmpty(A.selected)?'disabled':'enabled');
		if (isEmpty(A.selected)) hide(b);
	}

}

function handle_result(result, cmd) {
	//if (verbose) console.log('cmd', cmd, '\nresult', result); //return;
	if (result.trim() == "") return;
	let obj;
	try { obj = JSON.parse(result); } catch { console.log('ERROR:', result); }

	if (verbose) console.log('HANDLERESULT bekommt', jsCopy(obj));
	processServerdata(obj, cmd);

	switch (cmd) {
		case "assets": load_assets(obj); start_with_assets(); break;
		case "users": show_users(); break;
		case "tables": show_tables(); break;
		case "delete_table":
		case "delete_tables": show_tables(); break;
		case "collect_status":
			//console.log('collect_status', obj);
			//update_playerdata(obj);
			update_table();
			//console.log('Z.stage', Z.stage);
			if (!is_collect_mode()) {
				show_status(`waiting for ${Z.turn.join(', ')}`);

			} else if (obj.collect_complete == false) {
				let pls = obj.playerstates;
				let waiting_for = [];
				for (const val of pls) {
					let state = !isEmpty(val.state) ? JSON.parse(val.state) : null;
					//console.log('val', val, 'state', state);
					if (isEmpty(state)) { waiting_for.push(val.name); }
				}
				show_status(`waiting for ${waiting_for.join(', ')}`);
			} else { show_status('COMPLETE!'); }
			break;

		case "collect_open":
			//erwarte dass obj ein collect_complete und ein too_late hat!
			let collect_complete = obj.collect_complete;
			let too_late = obj.too_late;
			console.log('collect_open', collect_complete, 'too_late', too_late);

			if (Z.mode != 'multi') { console.log('COLLECT NUR IN MULTI PLAYER MODE!!!!!!'); return; }

			//do I have obj.table?
			if (isdef(obj.table)) {
				let me = U.name; //console.log('me', me);
				//console.log('obj.table', obj.table); // table ist eh schon unpacked! war ja in processServerdata!!!!!!!
				let fen = obj.table.fen;
				let turn = fen.turn;
				console.log('me', me, 'turn', turn);
			}
			if (isdef(obj.playerdata)) {
				let playerdata = obj.playerdata;
				console.log('playerdata', playerdata);
			} else {
				console.log('playerdata nicht da');
			}


			if (i_am_acting_host() && collect_complete) {

				console.log('collect_open: i am host, collect_complete, was nun???');

				assertion(obj.table.fen.turn.length == 1 && obj.table.fen.turn[0] == U.name && U.name == obj.table.fen.acting_host, 'collect_open: acting host is NOT the one in turn!');
				//integrate all player indiv moves into fen
				let fen = obj.table.fen;
				//console.log('YES!')

				update_table(); pollStop();
				assertion(isdef(Z.func.post_collect), 'post_collect not defined for game ' + obj.table.game);
				console.log('playerdata', Z.playerdata)
				for (const p of Z.playerdata) {
					p.state = JSON.parse(p.state);
				}
				console.log('playerdata', Z.playerdata)
				Z.func.post_collect();
				return;


			} else if (collect_complete) {
				console.log('collect_open: collect_complete, bin aber nicht der host! was nun???');

			} else if (i_am_acting_host()) {
				console.log('collect_open: i am host, bin aber nicht collect_complete, was nun???');

			} else {
				console.log('collect_open: bin nicht der host, bin nicht collect_complete, was nun???');

			}
			autopoll();
			// if (collect_complete) {
			// 	update_table();
			// 	autopoll();
			// 	// if (Z.skip_presentation) {
			// 	// 	console.log('presentation is skipped!!!')
			// 	// 	return;
			// 	// }
			// 	// // //console.log('obj has keys', Object.keys(obj));
			// 	// // for (const k in obj) {
			// 	// // 	if (['table', 'tables', 'users'].includes(k)) continue;
			// 	// // 	//console.log('k', k, typeof obj[k], obj[k]);
			// 	// // }
			// 	// gamestep();
			// }				//for (const k in obj) { console.log('k', k, typeof obj[k], obj[k]); }
			break;

		case "gameover":
		case "clear":
		case "table":
		case "startgame":
			update_table();
			let is_collect = check_collect(obj);

			if (is_collect) { pollStop(); console.log('WAS NUN?????'); return; }

			if (Z.skip_presentation) { pollStop(); console.log('not presenting!'); return; }

			console.log('WILL PRESENT! obj has keys', Object.keys(obj));
			//for (const k in obj) { if (['table', 'tables', 'users'].includes(k)) continue; console.log('k', k, typeof obj[k], obj[k]); }

			gamestep(); break;

		// case "table":
		// case "startgame":

		// 	//console.log('Serverdata', Serverdata);
		// 	update_table(); 
		// 	//console.log('will present',!Z.skip_presentation);
		// 	if (!Z.skip_presentation) {
		// 		let [fen,uname,role,uplayer,playmode]=[Z.fen,Z.uname,Z.role,Z.uplayer,Z.playmode]
		// 		console.log('______present',Z.friendly, fen.turn);
		// 		console.log('uname',uname,role);
		// 		console.log('uplayer',uplayer,playmode);
		// 	}else{console.log('not presenting');}
		// 	break; // console.log('Z', Z); //if (!Z.skip_presentation) gamestep(); break;
	}
}
function _show_history(fen, dParent) {
	if (!isEmpty(fen.history)) {
		let html = '';
		for (const arr of jsCopy(fen.history).reverse()) {
			html += arr;//html+=`<h1>${k}</h1>`;
			//for (const line of arr) { html += `<p>${line}</p>`; }
		}
		// let dHistory =  mDiv(dParent, { padding: 6, margin: 4, bg: '#ffffff80', fg: 'black', hmax: 400, 'overflow-y': 'auto', wmin: 240, rounding: 12 }, null, html); //JSON.stringify(fen.history));
		let dHistory = mDiv(dParent, { paleft: 12, bg: colorLight('#EDC690', .5), box: true, matop: 10, patop: 10, w: '100%', hmax: `calc( 100vh - 250px )`, 'overflow-y': 'auto', wmin: 260 }, null, html); //JSON.stringify(fen.history));
		// let dHistory =  mDiv(dParent, { padding: 6, margin: 4, bg: '#ffffff80', fg: 'black', hmax: 400, 'overflow-y': 'auto', wmin: 240, rounding: 12 }, null, html); //JSON.stringify(fen.history));
		//mNode(fen.history, dHistory, 'history');
		UI.dHistoryParent = dParent;
		UI.dHistory = dHistory;
		console.log('dHistory', dHistory);
	}

}

//#region ferro ausmisten
function matches_on_either_end_new(key, j, rankstr = 'A23456789TJQKA') {
	let jfirst = arrFirst(j.o.list);
	let jlast = arrLast(j.o.list);
	for (let i = 0; i < rankstr.length - 1; i++) { let r = rankstr[i]; if (jfirst[0] == rankstr[i + 1]) return true; }
	for (let i = rankstr.length - 1; i > 0; i--) { let r = rankstr[i]; if (jlast[0] == rankstr[i - 1]) return true; }
	return false;
}
function get_all_journeys() {
	let [plorder, stage, A, fen, uplayer] = [Z.plorder, Z.stage, Z.A, Z.fen, Z.uplayer];
	let sets = [];
	for (const plname of plorder) {
		let pl = fen.players[plname];
		let i = 0;
		for (const j of pl.journeys) {
			sets.push({ plname: plname, j: j, jnew: jsCopy(j), index: i });
			i++;
		}
	}
	return sets;
}

function try_add_to_group(key, j, addkey = true) {
	if (is_group(j)) {
		if (key[0] == find_group_rank(j)) { if (addkey) j.push(key); return true; }
	} else {
		if (matches_on_either_end_new(key, j)) { if (addkey) j.push(key); return true; }
	}
	return false;
}
function try_replace_jolly(key, j, replace = true) {
	let jolly_idx = find_index_of_jolly(j);
	if (jolly_idx == -1) return false;

	if (is_group(j)) {
		let r = find_group_rank(j);
		if (key[0] == r) { if (replace) j[jolly_idx] = key; return true; }
	} else if (jolly_idx > 0) {
		let rank_before_index = j[jolly_idx - 1][0];
		let rankstr = 'A23456789TJQKA';
		let rank_needed = rankstr[rankstr.indexOf(rank_before_index) + 1];
		if (key[0] == rank_needed) { if (replace) j[jolly_idx] = key; return true; }
	} else {
		let rank_after_index = j[jolly_idx + 1][0];
		let rankstr = 'A23456789TJQKA';
		let rank_needed = rank_after_index == 'A' ? 'K' : rankstr[rankstr.indexOf(rank_after_index) - 1];
		if (key[0] == rank_needed) { if (replace) j[jolly_idx] = key; return true; }
	}
	return false;
}
function get_journeys_with_jolly_for_key(key) {
	let [plorder, stage, A, fen, uplayer] = [Z.plorder, Z.stage, Z.A, Z.fen, Z.uplayer];
	let sets = [];
	for (const plname of plorder) {
		let pl = fen.players[plname];
		let i = 0;
		for (const j of pl.journeys) {
			if (try_replace_jolly(key, j, false)) sets.push({ plname: plname, j: j, index: i });
			i++;
		}
	}
	return sets;
}
function ui_get_jolly_items() {
	//find journey items that contain a jolly replaceable by A.selectedCards[0].key
	let items = [], i = 0;
	let sets = Z.A.jollySets;
	//console.log('...sets', sets);
	for (const s of sets) {
		let o = UI.players[s.plname].journeys[s.index];
		let name = `${s.plname}_j${i}`;
		o.div = o.container;
		let item = { o: o, a: name, key: o.list[0], friendly: name, path: o.path, index: i, ui: o.container };
		i++;
		items.push(item);

	}
	return items;

}

//#region aristo rumors
function path2fen(path) {
	let [fen, uplayer] = [Z.fen, Z.uplayer];
	let res = lookup(fen, path.split('.'));
	//console.log('res',res);
	return res;
}
function mStamp(d1, text) {
	mStyle(d1, { position: 'relative' });
	//let stamp = mDiv(d1, { family:'tahoma', fz:16, weight:'bold', position:'absolute', top:'25%',left:'10%',transform:'rotate(35deg)', w: '80%', h: 24 },null,`blackmail!`,'rubberstamp');
	//let stamp = mDiv(d1, { position:'absolute',top:30,left:0,transform:'rotate( 35deg )' },null,`blackmail!`,'rubberp');
	// mDiv(d1,{position:'absolute',top:30,left:0,},null,`<span class="stamp is-approved">BLACKMAIL!</span>`);
	// mDiv(d1,{position:'absolute',top:30,left:0,},null,`<span class="stamp1">BLACKMAIL!</span>`);
	//mDiv(d1, { position: 'absolute', top: 25, left: 5, weight: 700, fg: 'black', border: '2px solid black', padding: 2 }, null, `BLACKMAIL`, 'stamp1');

	let r = getRect(d1);
	let [w, h] = [r.w, r.h];
	let sz = r.h / 7;
	console.log('r', r, 'sz', sz);
	//let [border,rounding,angle]=[sz*.08,sz/3,-14];
	let [padding, border, rounding, angle] = [sz / 10, sz / 6, sz / 8, rNumber(-25, 25)];
	mDiv(d1, {
		opacity: 0.9,
		position: 'absolute', top: 25, left: 5, //weight: 700, fg: 'black', border: '2px solid black', padding: 2,
		transform: `rotate(${angle}deg)`,
		fz: sz,
		//'line-height':sz,
		// border:`${border}px solid black`,
		border: `${border}px solid black`,
		hpadding: 2, //padding,
		vpadding: 0,
		// vpadding: border,
		// hpadding: rounding,
		rounding: rounding,
		// 'background-image': `url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/8399/grunge.png')`,
		// 'background-size': `${300*sz}px ${200*sz}px`,
		// 'background-position': `${4*sz}px ${2*sz}px`,
		// 'background-image': 'url(../base/assets/images/textures/stamp.jpg)',
		// 'background-size': `${300*sz}px ${200*sz}px`,
		// 'background-position': `${4*sz}px ${2*sz}px`,

		'-webkit-mask-size': `${w}px ${h}px`,
		'-webkit-mask-position': `50% 50%`,
		//'-webkit-mask-image': `url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/8399/grunge.png')`,
		'-webkit-mask-image': 'url("../base/assets/images/textures/grunge.png")',

		// '-webkit-mask-size': `311px 200px`,
		// '-webkit-mask-position': `4rem 2rem`,
		// '-webkit-mask-image': `url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/8399/grunge.png')`,

		weight: 400, //700,
		display: 'inline-block',
		'text-transform': 'uppercase',
		family: "black ops one", //'Courier', //'courier new',
		'mix-blend-mode': 'multiply'
	}, null, text);

}


//#region aristo rumors
function ui_get_top_rumors() {
	//let cards = ari_open_rumors();
	return ui_get_card_items(cards);
	let items = [], i = 0;
	let comm = UI.deck_rumors;
	for (const o of comm.items) {
		let item = { o: o, a: o.key, key: o.key, friendly: o.short, path: comm.path, index: i };
		i++;
		items.push(item);
	}
	let topdeck = UI.deck_commission.get_topcard();
	items.push({ o: topdeck, a: topdeck.key, key: topdeck.key, friendly: topdeck.short, path: 'deck_commission', index: i });
	//console.log('choose among:', items)
	return items;
}
function post_rumor() {

	let [fen, A, uplayer, building, obuilding, owner] = [Z.fen, Z.A, Z.uplayer, Z.A.building, Z.A.obuilding, Z.A.buildingowner];
	let buildingtype = Z.A.building.o.type;
	//console.log('====>buildingtype',buildingtype);
	let res = A.selected[0] == 0; //confirm('destroy the building?'); //TODO das muss besser werden!!!!!!!
	if (!res) {
		if (fen.players[owner].coins > 0) {
			//console.log('player', owner, 'pays to', uplayer, fen.players[owner].coins, fen.players[uplayer].coins);
			fen.players[owner].coins -= 1;
			fen.players[uplayer].coins += 1;
			//console.log('after payment:', fen.players[owner].coins, fen.players[uplayer].coins)
		}
	} else {
		let list = obuilding.list;
		//console.log('!!!!!!!!!!!!!building', obuilding, 'DESTROY!!!!!!!!!!!!!!!!', '\nlist', list);
		let correct_key = list[0];
		let rank = correct_key[0];
		//console.log('rank is', rank);
		//console.log('building destruction: ', correct_key);
		while (list.length > 0) {
			let ckey = list[0];
			//console.log('card rank is', ckey[0])
			if (ckey[0] != rank) {
				elem_from_to_top(ckey, list, fen.deck_discard);
				//console.log('discard',otree.deck_discard);
			} else {
				elem_from_to(ckey, list, fen.players[owner].hand);
			}
		}
		//console.log('building after removing cards', list, obuilding)
		if (isdef(obuilding.harvest)) {
			fen.deck_discard.unshift(obuilding.harvest);
		}
		ari_reorg_discard(fen);


		let blist = lookup(fen, stringBeforeLast(building.path, '.').split('.')); //building.path.split('.')); //stringBeforeLast(ibuilding.path, '.').split('.'));, stringBeforeLast(building.path, '.').split('.'));

		//console.log('===>remove',obuilding,'from',blist);
		removeInPlace(blist, obuilding);

		//console.log('player', owner, 'after building destruction', otree[owner])
	}
	ari_history_list([`${uplayer} rumored ${buildingtype} of ${owner} resulting in ${res ? 'destruction' : 'payoff'}`,], 'rumor');

	ari_next_action(fen, uplayer);


}
function rest() {

	if (isdef(obuilding.schwein)) {

		Z.stage = 46;
		A.building = item;
		A.obuilding = obuilding;
		A.buildingowner = owner;
		ari_pre_action();
		return;

	} else {

		//this building is revealed
		let cards = item.o.items;
		let key = cards[0].rank;
		let schweine = false;
		let schwein = null;
		for (const c of cards) {
			if (c.rank != key) { schweine = true; schwein = c.key; face_up(c); break; }
		}
		if (schweine) {
			if (fen.players[owner].coins > 0) {
				fen.players[owner].coins--;
				fen.players[uplayer].coins++;
			}
			let b = lookup(fen, item.path.split('.'));
			b.schwein = schwein;
		}

		ari_history_list([
			`${uplayer} rumored ${ari_get_building_type(obuilding)} of ${owner} resulting in ${schweine ? 'schweine' : 'ok'} ${ari_get_building_type(obuilding)}`,
		], 'rumor');

		ari_next_action(fen, uplayer);
	}


}

function ui_type_building(b, dParent, styles = {}, path = 'farm', title = '', get_card_func = ari_get_card) {

	let cont = ui_make_container(dParent, get_container_styles(styles));
	let cardcont = mDiv(cont);

	let list = b.list;
	//console.log('list', list)
	//let n = list.length;
	let d = mDiv(dParent);
	let items = list.map(x => get_card_func(x));
	// let cont = ui_make_hand_container(items, d, { maleft: 12, padding: 4 });

	let schwein = null;
	for (let i = 1; i < items.length; i++) {
		let item = items[i];
		if (b.schwein != item.key) face_down(item); else schwein = item;
	}

	let d_harvest = null;
	if (isdef(b.h)) {
		let keycard = items[0];
		let d = iDiv(keycard);
		mStyle(d, { position: 'relative' });
		d_harvest = mDiv(d, { position: 'absolute', w: 20, h: 20, bg: 'orange', opacity: .5, fg: 'black', top: '45%', left: -10, rounding: '50%', align: 'center' }, null, 'H');
	}

	let card = isEmpty(items) ? { w: 1, h: 100, ov: 0 } : items[0];
	//console.log('card',card)
	mContainerSplay(cardcont, 2, card.w, card.h, items.length, card.ov * card.w);
	ui_add_cards_to_hand_container(cardcont, items, list);

	ui_add_container_title(title, cont, items);

	// if (isdef(title) && !isEmpty(items)) { mText(title, d); }

	return {
		ctype: 'hand',
		list: list,
		path: path,
		container: cont,
		cardcontainer: cardcont,
		items: items,
		schwein: schwein,
		harvest: d_harvest,
		keycard: items[0],

	};
}


//#region fritz

function _show_special_message(msg, stay = false) {
	let dParent = mBy('dBandMessage');
	console.log('dBandMessage', mBy('dBandMessage'))
	if (nundef(dParent)) dParent = mDiv(document.body, {}, 'dBandMessage');
	console.log('dParent', dParent)
	show(dParent);
	clearElement(dParent);
	mStyle(dParent, { position: 'absolute', top: 200, bg: 'green', wmin: '100vw' });
	let d = mDiv(dParent, { margin: 0 });
	let styles = { classname: 'slow_gradient_blink', vpadding: 10, align: 'center', position: 'absolute', fg: 'white', fz: 24, w: '100vw' };
	let dContent = mDiv(d, styles, null, msg);
	mFadeClear(dParent, 3000);
}


function end_of_turn_fritz() {
	//console.log('A', Z.A)
	//console.log('time is up!!!', getFunctionsNameThatCalledThisFunction());
	let [A, fen, uplayer, plorder] = [Z.A, Z.fen, Z.uplayer, Z.plorder];
	let pl = fen.players[uplayer];
	//console.log('__________________________');

	clear_quick_buttons();

	//all TJ groups must be checked and loose cards placed in loosecards
	let ploose = {};
	fen.journeys = [];
	fen.loosecards = [];
	for (const plname in fen.players) { fen.players[plname].loosecards = []; }
	for (const group of DA.TJ) {
		let ch = arrChildren(iDiv(group));
		let cards = ch.map(x => Items[x.id]);
		//find out if is a set
		//console.log('cards', cards);
		let set = ferro_is_set(cards, Z.options.jokers_per_group, 3);
		//console.log('set', set);
		if (!set) {
			//dann kommen die Karten in die Loosecards
			for (const card of cards) {
				if (is_joker(card)) {
					//console.log('pushing joker', card.key);
					fen.loosecards.push(card.key);
					continue;
				}
				let owner = valf(card.owner, uplayer);
				lookupAddToList(ploose, [owner], card.key);
				//console.log('add card', card.key, 'to', owner);
			}
			//console.log('NOT A SET', cards);
		} else {
			let j = set; //[];
			//for (const card of cards) { delete card.owner; j.push(card.key); }
			fen.journeys.push(j);
			//console.log('YES!!!', 'adding journey', j);
		}
	}
	for (const plname in ploose) {
		fen.players[plname].loosecards = ploose[plname];
	}

	//console.log('_____\npublic loosecards', fen.loosecards);
	//console.log('journeys:', fen.journeys);
	//for (const plname in fen.players) { console.log('loosecards', plname, fen.players[plname].loosecards); }

	//discard pile must be reduced by all cards that do not have source = 'discard'
	let discard = UI.deck_discard.items.filter(x => x.source == 'discard');
	fen.deck_discard = discard.map(x => x.key);

	if (!isEmpty(A.selected)) {
		//console.log('selected', A.selected);
		let ui_discarded_card = A.selected.map(x => A.items[x].o)[0];

		removeInPlace(UI.players[uplayer].hand.items, ui_discarded_card);
		ckey = ui_discarded_card.key;
		//console.log('discard', discard);
		elem_from_to(ckey, fen.players[uplayer].hand, fen.deck_discard);
		//ari_history_list([`${uplayer} discards ${c}`], 'discard');

	}

	//all UI.hand cards that do NOT have source=hand must be removed from player hands

	let uihand = UI.players[uplayer].hand.items; //.filter(x => x.source == 'hand');
	let fenhand_vorher = fen.players[uplayer].hand;
	let fenhand = fen.players[uplayer].hand = uihand.filter(x => x.source == 'hand').map(x => x.key);
	//console.log('hand', uihand, 'fenhand vorher:', fenhand_vorher, 'fenhand', fenhand);

	//check gameover!!!!
	if (isEmpty(fenhand) && isEmpty(fen.players[uplayer].loosecards)) {
		end_of_round_fritz(uplayer);

	} else {
		Z.turn = [get_next_player(Z, uplayer)];
		deck_deal_safe_fritz(fen, Z.turn[0]);
	}
	//console.log('==>fen.loosecards', fen.loosecards); //, fen.players[uplayer].loosecards); //, fen.players);
	let ms = fen.players[uplayer].time_left = stop_user_timer();

	//console.log('fritz_turn_ends', 'ms', ms);
	if (ms <= 0) {
		console.log('time is up!!!');
		//this player needs to be removed!
		if (Z.turn[0] == uplayer) Z.turn = [get_next_player(Z, uplayer)];
		//if only 1 player in plorder, that player wins
		remove_player(fen, uplayer);
		if (plorder.length == 1) { end_of_round_fritz(plorder[0]); }
	}

	turn_send_move_update();

}


function fritz_present(z, dParent, uplayer) {

	let [fen, ui, stage] = [z.fen, UI, z.stage];
	let [dOben, dOpenTable, dMiddle, dRechts] = tableLayoutMR(dParent, 5, 1); mFlexWrap(dOpenTable)
	Config.ui.card.h = 130;
	Config.ui.container.h = Config.ui.card.h + 30;

	//let deck = ui.deck = ui_type_deck(fen.deck, dOpenTable, { maleft: 12 }, 'deck', 'deck', fritz_get_card);
	if (isEmpty(fen.deck_discard)) {
		mText('discard empty', dOpenTable);
		ui.deck_discard = { items: [] }
	} else {
		let deck_discard = ui.deck_discard = ui_type_hand(fen.deck_discard, dOpenTable, { maright: 25 }, 'deck_discard', 'discard', fritz_get_card, true);
		let i = 0; deck_discard.items.map(x => { x.source = 'discard'; x.index = i++ });
	}
	mLinebreak(dOpenTable);


	let ddarea = UI.ddarea = mDiv(dOpenTable, { border: 'dashed 1px black', bg: '#eeeeee80', box: true, wmin: 245, padding: '5px 50px 5px 5px', margin: 5 });
	mDroppable(ddarea, drop_card_fritz); ddarea.id = 'dOpenTable'; Items[ddarea.id] = ddarea;
	mFlexWrap(ddarea)

	fritz_stats(z, dRechts);

	show_history(fen, dRechts);

	DA.TJ = [];
	//journeys become groups
	//fen.journeys = [['QHn', 'KHn', 'AHn'], ['QCn', 'QHn', 'QDn']];
	for (const j of fen.journeys) {
		let cards = j.map(x => fritz_get_card(x));
		frnew(cards[0], { target: 'hallo' });
		for (let i = 1; i < cards.length; i++) { fradd(cards[i], Items[cards[0].groupid]); }

	}
	//loose cards of fen and other players become groups. own loose cards will ALSO go to player area
	let loosecards = ui.loosecards = jsCopy(fen.loosecards).map(c => fritz_get_card(c));
	for (const plname of fen.plorder) {
		let cards = fen.players[plname].loosecards.map(c => fritz_get_card(c));
		cards.map(x => x.owner = plname);
		// if (plname == uplayer) { ui.ploosecards = cards; } else { loosecards = loosecards.concat(cards); }
		if (plname != uplayer) { loosecards = loosecards.concat(cards); }
		//loosecards = loosecards.concat(cards);
	}
	for (const looseui of loosecards) {
		//console.log('looseui', looseui);
		let card = looseui;
		frnew(card, { target: 'hallo' });
	}

	//all cards in drop area are droppable
	for (const group of DA.TJ) {
		let d = iDiv(group);
		//console.log('d',d);
		let ch = arrChildren(iDiv(group));
		let cards = ch.map(x => Items[x.id]);
		//console.log('cards', cards);
		cards.map(x => mDroppable(iDiv(x), drop_card_fritz));
	}

	//if ddarea is empty, write drag and drop hint
	if (arrChildren(ddarea).length == 0) {
		let d = mDiv(ddarea, { 'pointer-events': 'none', maleft: 45, align: 'center', hmin: 40, w: '100%', fz: 12, fg: 'dimgray' }, 'ddhint', 'drag and drop cards here');
		//setRect(ddarea)
		//mPlace(d,'cc')

	}

	ui.players = {};
	let uname_plays = fen.plorder.includes(Z.uname);
	let plmain = uname_plays && Z.mode == 'multi' ? Z.uname : uplayer;
	fritz_present_player(plmain, dMiddle);

	if (TESTING) {
		for (const plname of arrMinus(fen.plorder, plmain)) {
			fritz_present_player(plname, dMiddle);
		}
	}


}



//#region rechnung
function boamain_start() {
	//console.log('haaaaaaaaaaaaaaaaa');
	S.boa_state = 'authorized';

	//hier start timer that will reset boa_state to null
	if (DA.challenge == 1) {
		TO.boa = setTimeout(() => {
			S.boa_state = null;
			let msg = DA.challenge == 1 ? 'CONGRATULATIONS!!!! YOU SUCCEEDED IN LOGGING IN TO BOA' : 'Session timed out!';
			show_eval_message(true);
			//alert(msg);
			//boa_start();
		}, 3000);
	}

	show_correct_location('boa');  //das ist um alle anderen screens zu loeschen!
	let dParent = mBy('dBoa'); mClear(dParent);

	let d0 = mDiv(dParent, { align: 'center' }, 'dBoaMain'); mCenterFlex(d0);
	// let d0 = mDiv(d, { align:'center', display: 'grid', 'grid-template-columns': '2', gap:20 }, 'dBoaMain');
	//let d0 = mDiv(d, { display: 'flex', 'justify-content': 'center', gap:20 }, 'dBoaMain');

	let [wtotal, wleft, wright] = [972, 972 - 298, 292];

	let d = mDiv(d0, { w: wtotal, hmin: 500 }); mAppend(d, createImage('boamain_header.png', { h: 111 }));
	//return;

	// let d0 = mDiv(d);
	//let d1 = mDiv(d0, { align: 'center' });

	// let d2 = mDiv(d);
	// let d3 = mDiv(d2, { display: 'flex', 'justify-content': 'center' }, 'dBoaMain');

	// d = mDiv(d3, { w: wtotal, hmin: 500 });
	let dl = mDiv(d, { float: 'left', w: wleft, hmin: 400 });
	let dr = mDiv(d, { float: 'right', hmin: 400, w: wright });

	mDiv(dr, { h: 100 });
	mAppend(dr, createImage('boamain_rechts.png', { w: 292 }));

	mAppend(dl, createImage('boamain_left_top.jpg', { matop: 50, maleft: -20 }));
	//mDiv(dl, { family:'connectionsregular,Verdana,Geneva,Arial,Helvetica,sans-serif', fz: 18, weight: 500, 'line-height':70, fg:'#524940' }, null, 'Payment Center');

	mDiv(dl, { bg: '#857363', fg: 'white', fz: 15 }, null, '&nbsp;&nbsp;<i class="fa fa-caret-down"></i>&nbsp;&nbsp;Default Group<div style="float:right;">Sort&nbsp;&nbsp;</div>');

	let boadata = get_fake_boa_data_list();
	let color_alt = '#F9F7F4';
	let i = 0;
	//let sortedkeys = get_keys(boadata);	sortedkeys.sort();
	for (const o of boadata) {
		let k = o.key;
		o.index = i;
		//console.log('key',k,'index',i);
		let logo = valf(o.logo, 'defaultacct.jpg');
		let path = `${logo}`;
		let [sz, bg] = [25, i % 2 ? 'white' : color_alt];

		let dall = mDiv(dl, { bg: bg, fg: '#FCFCFC', 'border-bottom': '1px dotted silver' }, `dAccount${i}`);
		let da = mDiv(dall);
		mFlexLR(da);

		let img = createImage(path, { h: sz, margin: 10 });

		let da1 = mDiv(da);
		mAppend(da1, img);
		let dtext = mDiv(da1, { align: 'left', display: 'inline-block', fg: '#FCFCFC', fz: 14 });
		mAppend(dtext, mCreateFrom(`<a>${k}</a>`));
		let dsub = mDiv(dtext, { fg: 'dimgray', fz: 12 }, null, o.sub);

		let da2 = mDiv(da); mFlex(da2);
		let da21 = mDiv(da2, { w: 100, hmargin: 20, mabottom: 20 });
		let padinput = 7;
		mDiv(da21, { fg: 'black', fz: 12, weight: 'bold' }, null, 'Amount');
		mDiv(da21, { w: 100 }, null, `<input onfocus="add_make_payments_button(event)" style="color:dimgray;font-size:14px;border:1px dotted silver;padding:${padinput}px;width:85px" id="inp${i}" name="authocode" value="$" type="text" />`);

		let da22 = mDiv(da2, { maright: 10 });
		mDiv(da22, { fg: 'black', fz: 12, weight: 'bold' }, null, 'Deliver By');
		mDiv(da22, {}, null, `<input style="color:dimgray;font-size:12px;border:1px dotted silver;padding:${padinput}px" id="inpAuthocode" name="authocode" value="" type="date" />`);

		// mDiv(dall,{fz:12,fg:'blue',maleft:400,mabottom:25},null,'hallo');
		let dabot = mDiv(dall);
		mFlexLR(dabot);
		let lastpayment = isdef(o['Last Payment']) ? `Last Payment: ${o['Last Payment']}` : ' ';
		mDiv(dabot, { fz: 12, fg: '#303030', maleft: 10, mabottom: 25 }, null, `${lastpayment}`);
		mDiv(dabot, { fz: 12, fg: 'blue', maright: 90, mabottom: 25 }, null, `<a>Activity</a>&nbsp;&nbsp;&nbsp;<a>Reminders</a>&nbsp;&nbsp;&nbsp;<a>AutoPay</a>`);

		mDiv(dall);
		//let dadummy = mDiv(dall, {margin:500 },null,`<a>Activity</a><a>Reminders</a><a>AutoPay</a>`); //;'border-bottom':'1px solid black'});

		i++;
	}


	//mDiv(dl, { hmin: 400, bg: 'orange' });
	//for (let j = 0; j < i; j++) { let inp = document.getElementById(`inp${j}`); inp.addEventListener('keyup', unfocusOnEnter); }

}
function _boamain_start() {
	//console.log('haaaaaaaaaaaaaaaaa');
	S.boa_state = 'authorized';

	//hier start timer that will reset boa_state to null
	if (DA.challenge == 1) {
		TO.boa = setTimeout(() => {
			S.boa_state = null;
			let msg = DA.challenge == 1 ? 'CONGRATULATIONS!!!! YOU SUCCEEDED IN LOGGING IN TO BOA' : 'Session timed out!';
			alert(msg);
			boa_start();
		}, 3000);
	}

	show_correct_location('boa');  //das ist um alle anderen screens zu loeschen!
	let d = mBy('dBoa'); mClear(d);

	let d0 = mDiv(d);
	let d1 = mDiv(d0, { align: 'center' });
	mAppend(d1, createImage('boamain_header.png', { h: 111 }));

	let d2 = mDiv(d);
	let d3 = mDiv(d2, { display: 'flex', 'justify-content': 'center' }, 'dBoaMain');

	let [wtotal, wleft, wright] = [972, 972 - 298, 292];
	d = mDiv(d3, { w: wtotal, hmin: 500 });
	let dl = mDiv(d, { float: 'left', w: wleft, hmin: 400 });
	let dr = mDiv(d, { float: 'right', hmin: 400, w: wright });

	mDiv(dr, { h: 100 });
	mAppend(dr, createImage('boamain_rechts.png', { w: 292 }));

	mAppend(dl, createImage('boamain_left_top.jpg', { matop: 50, maleft: -20 }));
	//mDiv(dl, { family:'connectionsregular,Verdana,Geneva,Arial,Helvetica,sans-serif', fz: 18, weight: 500, 'line-height':70, fg:'#524940' }, null, 'Payment Center');

	mDiv(dl, { bg: '#857363', fg: 'white', fz: 15 }, null, '&nbsp;&nbsp;<i class="fa fa-caret-down"></i>&nbsp;&nbsp;Default Group<div style="float:right;">Sort&nbsp;&nbsp;</div>');

	let boadata = get_fake_boa_data();
	let color_alt = '#F9F7F4';
	let i = 0;
	for (const k in boadata) {
		let o = boadata[k];
		//console.log('o', o);
		let logo = valf(o.logo, 'defaultacct.jpg');
		let path = `${logo}`;
		let [sz, bg] = [25, i % 2 ? 'white' : color_alt];

		let dall = mDiv(dl, { bg: bg, fg: '#FCFCFC', 'border-bottom': '1px dotted silver' });
		let da = mDiv(dall);
		mFlexLR(da);

		let img = createImage(path, { h: sz, margin: 10 });

		let da1 = mDiv(da);
		mAppend(da1, img);
		let dtext = mDiv(da1, { display: 'inline-block', fg: '#FCFCFC', fz: 14 });
		mAppend(dtext, mCreateFrom(`<a>${k}</a>`));
		let dsub = mDiv(dtext, { fg: 'dimgray', fz: 12 }, null, o.sub);

		let da2 = mDiv(da); mFlex(da2);
		let da21 = mDiv(da2, { w: 100, hmargin: 20, mabottom: 20 });
		let padinput = 7;
		mDiv(da21, { fg: 'black', fz: 12, weight: 'bold' }, null, 'Amount');
		mDiv(da21, { w: 100 }, null, `<input style="color:dimgray;font-size:14px;border:1px dotted silver;padding:${padinput}px;width:85px" id="inpAuthocode" name="authocode" value="$" type="text" />`);

		let da22 = mDiv(da2, { maright: 10 });
		mDiv(da22, { fg: 'black', fz: 12, weight: 'bold' }, null, 'Deliver By');
		mDiv(da22, {}, null, `<input style="color:dimgray;font-size:12px;border:1px dotted silver;padding:${padinput}px" id="inpAuthocode" name="authocode" value="" type="date" />`);

		// mDiv(dall,{fz:12,fg:'blue',maleft:400,mabottom:25},null,'hallo');
		let dabot = mDiv(dall);
		mFlexLR(dabot);
		let lastpayment = isdef(o['Last Payment']) ? `Last Payment: ${o['Last Payment']}` : ' ';
		mDiv(dabot, { fz: 12, fg: '#303030', maleft: 10, mabottom: 25 }, null, `${lastpayment}`);
		mDiv(dabot, { fz: 12, fg: 'blue', maright: 90, mabottom: 25 }, null, `<a>Activity</a>&nbsp;&nbsp;&nbsp;<a>Reminders</a>&nbsp;&nbsp;&nbsp;<a>AutoPay</a>`);
		//let dadummy = mDiv(dall, {margin:500 },null,`<a>Activity</a><a>Reminders</a><a>AutoPay</a>`); //;'border-bottom':'1px solid black'});

		i++;
	}

	//mDiv(dl, { hmin: 400, bg: 'orange' });

}

function restrest() {
	let d1 = mDiv(d0, { align: 'center' });
	mAppend(d1, createImage('boamain_header.png', { h: 111 }));

	let d2 = mDiv(d);
	let d3 = mDiv(d2, { display: 'flex', 'justify-content': 'center' });

	let [wtotal, wleft, wright] = [972, 972 - 298, 292];
	d = mDiv(d3, { w: wtotal, hmin: 500 });
	let dl = mDiv(d, { float: 'left', w: wleft, hmin: 400 });
	let dr = mDiv(d, { float: 'right', hmin: 400, w: wright });

	mDiv(dr, { h: 100 });
	mAppend(dr, createImage('boamain_rechts.png', { w: 292 }));

	mAppend(dl, createImage('boamain_left_top.jpg', { matop: 50, maleft: -20 }));
	//mDiv(dl, { family:'connectionsregular,Verdana,Geneva,Arial,Helvetica,sans-serif', fz: 18, weight: 500, 'line-height':70, fg:'#524940' }, null, 'Payment Center');

	mDiv(dl, { bg: '#857363', fg: 'white', fz: 15 }, null, '&nbsp;&nbsp;<i class="fa fa-caret-down"></i>&nbsp;&nbsp;Default Group<div style="float:right;">Sort&nbsp;&nbsp;</div>');

	let boadata = get_fake_boa_data();
	let color_alt = '#F9F7F4';
	let i = 0;
	for (const k in boadata) {
		let o = boadata[k];
		//console.log('o', o);
		let logo = valf(o.logo, 'defaultacct.jpg');
		let path = `${logo}`;
		let [sz, bg] = [25, i % 2 ? 'white' : color_alt];

		let dall = mDiv(dl, { bg: bg, fg: '#FCFCFC', 'border-bottom': '1px dotted silver' });
		let da = mDiv(dall);
		mFlexLR(da);

		let img = createImage(path, { h: sz, margin: 10 });

		let da1 = mDiv(da);
		mAppend(da1, img);
		let dtext = mDiv(da1, { display: 'inline-block', fg: '#FCFCFC', fz: 14 });
		mAppend(dtext, mCreateFrom(`<a>${k}</a>`));
		let dsub = mDiv(dtext, { fg: 'dimgray', fz: 12 }, null, o.sub);

		let da2 = mDiv(da); mFlex(da2);
		let da21 = mDiv(da2, { w: 100, hmargin: 20, mabottom: 20 });
		let padinput = 7;
		mDiv(da21, { fg: 'black', fz: 12, weight: 'bold' }, null, 'Amount');
		mDiv(da21, { w: 100 }, null, `<input style="color:dimgray;font-size:14px;border:1px dotted silver;padding:${padinput}px;width:85px" id="inpAuthocode" name="authocode" value="$" type="text" />`);

		let da22 = mDiv(da2, { maright: 10 });
		mDiv(da22, { fg: 'black', fz: 12, weight: 'bold' }, null, 'Deliver By');
		mDiv(da22, {}, null, `<input style="color:dimgray;font-size:12px;border:1px dotted silver;padding:${padinput}px" id="inpAuthocode" name="authocode" value="" type="date" />`);

		// mDiv(dall,{fz:12,fg:'blue',maleft:400,mabottom:25},null,'hallo');
		let dabot = mDiv(dall);
		mFlexLR(dabot);
		let lastpayment = isdef(o['Last Payment']) ? `Last Payment: ${o['Last Payment']}` : ' ';
		mDiv(dabot, { fz: 12, fg: '#303030', maleft: 10, mabottom: 25 }, null, `${lastpayment}`);
		mDiv(dabot, { fz: 12, fg: 'blue', maright: 90, mabottom: 25 }, null, `<a>Activity</a>&nbsp;&nbsp;&nbsp;<a>Reminders</a>&nbsp;&nbsp;&nbsp;<a>AutoPay</a>`);
		//let dadummy = mDiv(dall, {margin:500 },null,`<a>Activity</a><a>Reminders</a><a>AutoPay</a>`); //;'border-bottom':'1px solid black'});

		i++;
	}



	//mDiv(dl, { hmin: 400, bg: 'orange' });

}
function _bw_widget_popup() {
	let dpop = mBy('dPopup');
	show(dpop); mClear(dpop)
	mStyle(dpop, { top: 50, right: 10 }); let prefix = 'boa';
	let d = mDiv(dpop, { wmin: 200, hmin: 200, padding: 0 }, 'dBw');
	let d2 = mDiv(d, { padding: 0, h: 30 }, null, `<img width='100%' src='../rechnung/images/bwsearch.jpg'>`);
	//let d2 = mDiv(d, { bg: 'dodgerblue', fg: 'white' }, null, 'your bitwarden vault');

	let d3 = mDiv(d, { bg: '#eee', fg: 'dimgray', padding: 8, matop: 8 }, null, 'LOGINS');
	let d4 = mDiv(d, { bg: 'white', fg: 'black' });
	let d5 = mDiv(d4, { display: 'flex' });
	let dimg = mDiv(d5, { bg: 'white', fg: 'black' }, null, `<img src='../rechnung/images/boa.png' height=14 style="margin:8px">`);
	// let dtext = mDiv(d5, {}, null, `<div>boa</div><div style="font-size:12px;color:gray">gleeb69</div>`);
	let dtext = mDiv(d5, { cursor: 'pointer' }, null, `<div>boa</div><div style="font-size:12px;color:gray">gleeb69</div>`);
	dtext.onclick = () => onclick_bw_symbol(prefix)
	let d6 = mDiv(d4, { display: 'flex', padding: 2 });
	let disyms = {
		bwtext: { postfix: 'userid', matop: 2, maright: 0, mabottom: 0, maleft: 0, sz: 27 },
		bwcross: { postfix: 'cross', matop: 2, maright: 0, mabottom: 0, maleft: -13, sz: 25 },
		bwkey: { postfix: 'pwd', matop: 0, maright: 0, mabottom: 0, maleft: -12, sz: 27 },
		bwclock: { postfix: 'clock', matop: 0, maright: 0, mabottom: 0, maleft: 0, sz: 25 },
	}
	for (const k of ['bwtext', 'bwcross', 'bwkey']) { //,'bwclock']) {
		let o = disyms[k];
		let [filename, styles] = [k, disyms[k]];
		let path = `../rechnung/images/${filename}.png`;
		let [sz, ma] = [styles.sz, `${styles.matop}px ${styles.maright}px ${styles.mabottom}px ${styles.maleft}px`];
		//console.log('ma', ma);
		let img = mDiv(d6, { paright: 16 }, null, `<img src='${path}' height=${sz} style="margin:${ma}">`);
		if (k != 'bwcross') {
			mStyle(img, { cursor: 'pointer' });
			img.onclick = () => onclick_bw_symbol(prefix, o.postfix);
		}
	}
	mFlexSpacebetween(d4);
	let d7 = mDiv(d, { bg: '#eee', fg: 'dimgray', padding: 7 }, null, 'CARDS');
	//let d8 = mDiv(d, { fg: 'white' }, null, `<img width='100%' src='../rechnung/images/rest_bw.jpg'>`);

}

//#endregion

//#region ack OLD
function ferro_update_ack() {
	//should return true if need to resend!
	let [fen, stage, uplayer] = [Z.fen, Z.stage, Z.uplayer];

	//console.log('___________notes', jsCopy(Z.notes));

	if (Z.notes.resolve == true && uplayer == Z.host) { ferro_change_to_turn_round(); return true; }

	//update turn from notes
	let updated = false;
	for (const k in Z.notes) {
		if (k == 'akku') continue;
		if (!Z.turn.includes(k)) continue;
		updated = true;
		removeInPlace(Z.turn, k);
		console.log('removing player', k, 'from turn', Z.turn);
	}
	//console.log('Z.turn is now:', jsCopy(Z.turn));
	fen.turn = Z.turn;

	if (!isEmpty(Z.turn)) return updated;

	//ab hier is Z.turn EMPTY da heisst akku ist voll!!!!
	else if (uplayer == Z.host) { ferro_change_to_turn_round(); return true; }
	else { Z.turn = fen.turn = [Z.host]; Z.notes.resolve = true; return true; } //hier sollte resolve flag setzen!!!
}
function ferro_change_to_ack_round() {
	let [plorder, stage, A, fen, uplayer] = [Z.plorder, Z.stage, Z.A, Z.fen, Z.uplayer];
	let nextplayer = get_next_player(Z, uplayer);

	//console.log('nextplayer should be', nextplayer)

	//newturn is list of players starting with nextplayer
	let newturn = jsCopy(plorder); while (newturn[0] != nextplayer) { newturn = arrCycle(newturn, 1); }

	//each player except uplayer will get opportunity to buy top discard - nextplayer will draw if passing
	fen.lastplayer = uplayer;
	fen.nextplayer = nextplayer;
	fen.turn_after_ack = [nextplayer];
	fen.nextstage = 'card_selection';
	let buyerlist = fen.canbuy = [];
	//console.log('newturn', newturn);
	for (const plname of newturn) {
		let pl = fen.players[plname];
		if (plname == uplayer) { pl.buy = false; continue; }
		//if (plname == nextplayer) { pl.buy = false; buyerlist.push(plname); }
		else if (pl.coins > 0) { pl.buy = false; buyerlist.push(plname); }
	}
	//log_object(fen, 'buyers', 'nextplayer canbuy');

	Z.stage = 'buy_or_pass';
	Z.turn = buyerlist;
	//console.log('Z.turn', Z.turn);
	Z.notes = { akku: true };
}
function ferro_change_to_turn_round() {
	//console.log('ferro_change_to_turn_round', getFunctionsNameThatCalledThisFunction()); 
	let [z, A, fen, stage, uplayer, ui] = [Z, Z.A, Z.fen, Z.stage, Z.uplayer, UI];
	assertion(stage == 'buy_or_pass', "ALREADY IN TURN ROUND!!!!!!!!!!!!!!!!!!!!!!")
	Z.turn = fen.turn_after_ack;
	//console.log('fen.canbuy', fen.canbuy);
	//console.log('next player will be', Z.turn);

	//resolve buy or pass round!
	//if any player has bought, he will get top discard
	for (const plname of fen.canbuy) {
		let pl = fen.players[plname];
		//console.log('pl',pl);
		if (pl.buy) {
			let card = fen.deck_discard.shift();
			//console.log('card',card,jsCopy(pl.hand));
			pl.hand.push(card);
			//also pl gets 2 top cards from deck
			//console.log('card',card,pl.hand);
			pl.hand.push(fen.deck.shift()); //get 1 extra card from deck
			pl.coins -= 1; //pay
			fen.player_bought = plname;
			ari_history_list([`${plname} bought ${card}`], 'buy');
			//console.log(plname, 'bought', card, 'for', 1, 'coins');
			break;
		}
	}
	fen.players[fen.nextplayer].hand.push(fen.deck.shift());//nextplayer draws
	Z.stage = fen.nextstage;
	//cleanup buy_or_pass variables
	for (const k of ['player_bought', 'nextplayer', 'nextstage', 'canbuy', 'turn_after_ack', 'akku']) delete fen[k];
	for (const plname of fen.plorder) { delete fen.players[plname].buy; }
	Z.notes = {};
	clear_transaction();

	//hier kann ich turn snapshot machen

}
function ferro_ack_uplayer() {
	let [A, fen, stage, uplayer] = [Z.A, Z.fen, Z.stage, Z.uplayer];
	removeInPlace(Z.turn, uplayer);
	if (A.selected[0] == 0) {
		Z.notes[uplayer] = { buy: true };
		fen.players[uplayer].buy = true;
	} else {
		Z.notes[uplayer] = { buy: false };
		fen.players[uplayer].buy = false;
	}

	if (isEmpty(Z.turn)) { ferro_change_to_turn_round(); }
	turn_send_move_update();
}
//#endregion



function ui_get_bluff_inputs(strings) {
	let uplayer = Z.uplayer;
	let items = ui_get_string_items(strings);
	console.log('items', items)
	return items;
	//hier koennt ich die ergebnis inputs dazugeben!
}


function ui_get_ferro_action_items() {
	let [plorder, stage, A, fen, uplayer, pl] = [Z.plorder, Z.stage, Z.A, Z.fen, Z.uplayer, Z.fen.players[Z.uplayer]];

	let items = ui_get_hand_items(uplayer);
	let actions = ['discard', 'auflegen', 'anlegen', 'jolly'];
	items = items.concat(ui_get_string_items(actions));
	reindex_items(items);
	return items;
}
function ferro_process_action() {
	let [plorder, stage, A, fen, uplayer, pl] = [Z.plorder, Z.stage, Z.A, Z.fen, Z.uplayer, Z.fen.players[Z.uplayer]];

	let selitems = A.selected.map(x => A.items[x]);
	console.log('selitems:', selitems);
	let cards = selitems.filter(x => x.itemtype == 'card');
	let actions = selitems.filter(x => x.itemtype == 'string');
	if (actions.length == 0) { select_error('select an action!'); selitems.map(x => ari_make_unselected(x)); A.selected = []; return; }
	let cmd = actions[0].a;
	switch (cmd) {
		case 'discard': ferro_process_discard(); break;
		case 'auflegen': ferro_process_group(); break;
		case 'anlegen': ferro_process_anlegen(); break;
		case 'jolly': ferro_process_jolly(); break;
		default: console.log('unknown command: ' + cmd);
	}
}
function ferro_process_action_() {
	let [plorder, stage, A, fen, uplayer, pl] = [Z.plorder, Z.stage, Z.A, Z.fen, Z.uplayer, Z.fen.players[Z.uplayer]];

	//player has selected 1 card

	//need to find out what can do with that card?
	//commands will be: discard group sequence anlegen jolly
	A.initialItem = A.items[A.selected[0]];
	Z.stage = 'commands';
	ferro_pre_action();
}
function ferro_process_command_() {

	let [plorder, stage, A, fen, uplayer, pl] = [Z.plorder, Z.stage, Z.A, Z.fen, Z.uplayer, Z.fen.players[Z.uplayer]];

	//player has selected 1 card
	let cmd = A.items[A.selected[0]].a;
	switch (cmd) {
		case 'discard': ferro_process_discard(); break;
		case 'group': ferro_prep_group(); break;
		default: console.log('unknown command: ' + cmd);
	}
}
function ferro_prep_group() {
	let [plorder, stage, A, fen, uplayer] = [Z.plorder, Z.stage, Z.A, Z.fen, Z.uplayer];

	A.command = 'group';
	Z.stage = 'group';
	ferro_pre_action();

}
function ferro_get_actions(uplayer) {
	let fen = Z.fen;
	//actions include market card exchange
	let actions = ['discard', 'group', 'sequence', 'anlegen', 'jolly'];
	//if (Config.autosubmit) actions.push('pass'); ////, 'pass'];
	let avail_actions = [];
	for (const a of actions) {
		//check if this action is possible for uplayer
		let avail = ferro_check_action_available(a, fen, uplayer);
		if (avail) avail_actions.push(a);
	}
	return avail_actions;

}
function ferro_check_action_available(a, fen, uplayer) {
	let card = Z.A.initialItem.o;
	let pl = fen.players[uplayer];
	if (a == 'discard') { return true; }
	else if (a == 'group') {

		//check if player can build a group of 3 cards with rank = card.rank
		let rank = card.rank;
		let hand = pl.hand;
		//hand needs to have at least 3 cards of rank rank
		let group = hand.filter(x => x[0] == rank);

		//find a card in hand that has rank '*'
		let wildcard = hand.find(x => x[0] == '*');
		//console.log('wildcard', wildcard?'yes':'no');
		let n = group.length + (isdef(wildcard) ? 1 : 0);
		console.log('can build group of', n)
		return n >= 3;

	} else return false;
}
function ui_get_group_items() {
	let [plorder, stage, A, fen, uplayer] = [Z.plorder, Z.stage, Z.A, Z.fen, Z.uplayer];
	let rank = A.initialItem.o.rank;
	let items = ui_get_hand_items(uplayer);
	console.log('items', items, 'rank', rank);

	items = items.filter(x => x.key[0] == rank || x.key[0] == '*');
	console.log('items', items);
	reindex_items(items);
	return items;
}
function ui_get_ferro_commands() {

	let avail = ferro_get_actions(Z.uplayer);
	let items = [], i = 0;
	for (const cmd of avail) { //just strings!
		let item = { o: null, a: cmd, key: cmd, friendly: cmd, path: null, index: i };
		i++;
		items.push(item);
	}
	//console.log('available commands', items);
	return items;
}
function ferro_pre_action_() {
	let [stage, A, fen, plorder, uplayer, deck] = [Z.stage, Z.A, Z.fen, Z.plorder, Z.uplayer, Z.deck];
	//log_object(fen, 'fen', 'stage turn players');	//console.log('__________stage', stage, 'uplayer', uplayer, '\nDA', get_keys(DA));	//console.log('fen',fen,fen.players[uplayer]);
	switch (stage) {
		case 'throw': select_add_items(ui_get_hand_items(uplayer), ferro_post_discard, 'must discard', 1, 1); break;
		case 'buy_or_pass': select_add_items(ui_get_buy_or_pass_items(), ferro_ack_uplayer, 'may click top discard to buy or pass', 1, 1); break;
		case 'card_selection': select_add_items(ui_get_ferro_action_items(), ferro_process_action, 'must discard or play a set', 1, 100); break;
		// case 'commands': select_add_items(ui_get_string_items(['discard', 'group', 'sequence', 'anlegen', 'jolly']), ferro_process_command, 'must select an action', 1, 1); break;
		case 'commands': select_add_items(ui_get_ferro_commands(), ferro_process_command, 'must select an action', 1, 1); break;
		case 'group': select_add_items(ui_get_group_items(), ferro_process_group, 'must select cards to reveal', 3, 100); break;

		default: console.log('stage is', stage); break;
	}
}





















function process_commission_stall(){
	let [fen, A, uplayer] = [Z.fen, Z.A, Z.uplayer];
	console.log('process_commission_stall selected', A.selected,'item', A.items[A.selected[0]]);
	Z.A.commission_stall_item = A.items[A.selected[0]];
	Z.stage = 16;
	ari_pre_action();
}
function process_commission() {
	let [fen, A, uplayer] = [Z.fen, Z.A, Z.uplayer];

	//console.log('process_commission:', A.items[A.selected[0]]);

	//was muss jetzt passieren?
	//1. frage den player was er auswaehlen wird?
	A.commission = A.items[A.selected[0]];

	//hier muss was her fuer wenn multiple stall items die passen hat!!!
	if (A.commission.similar.length > 1){
		Z.stage = 37;
	}else{
		A.commission_stall_item = A.commission.similar[0];
		Z.stage = 16;
	}

	ari_pre_action();
}
function post_commission() {
	let [fen, A, uplayer] = [Z.fen, Z.A, Z.uplayer];

	let comm_selected = A.items[A.selected[0]];
	let stall_item = A.commission_stall_item;
	console.log('stall_item:', stall_item);
	
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

	// let key = A.commission.similar.key;
	let key = stall_item.key;
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

	//ari_history_list([`${uplayer} replaced commission card ${A.commission.key} by ${comm_selected.key}`, `${uplayer} gets ${points} for commissioning ${A.commission.key}`], 'commission');
	ari_history_list([`${uplayer} commissions card ${A.commission.key}`, `${uplayer} gets ${points} coin${if_plural(points)} for commissioning ${A.commission.key}`], 'commission');

	ari_next_action();
}

function process_blackmail() {
	let [stage, A, fen, uplayer] = [Z.stage, Z.A, Z.fen, Z.uplayer];
	let item = A.items[A.selected[0]];

	console.log('selected building to blackmail:', item);

	let building_owner = stringAfter(item.o.path, '.'); building_owner = stringBefore(building_owner, '.');

	let path = item.o.path;
	fen.blackmail = { blackmailer: uplayer, blackmailed: building_owner, payment: A.payment, building_path: path };
	let fenbuilding = lookup(fen, path.split('.'));
	console.log('blackmail:', fen.blackmail);
	fenbuilding.isblackmailed = true;

	ari_history_list([`${uplayer} is blackmailing ${building_owner}`], 'blackmail');
	[Z.stage,Z.turn] = [33, [building_owner]];
	turn_send_move_update();

}
function being_blackmailed(){
	let [stage, A, fen, uplayer] = [Z.stage, Z.A, Z.fen, Z.uplayer];
	let item = A.items[A.selected[0]];

	console.log('selected reaction to blackmail:', item.key);
	//was kann der jetzt entscheiden?
	// er kann das blackmail ablehnen: dann gehen alle seine stall cards zu dem blackmailer und 1 rumor is removed
}











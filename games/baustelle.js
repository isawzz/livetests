
//das ist manually!
function activate_playerstats() {
	let fen = Z.fen;
	for (const plname in fen.players) {
		let ui = UI.player_stat_items[plname];
		let d = iDiv(ui);
		d.onclick = () => {switch_uname(plname);onclick_reload();}
	}
}
function switch_uname(plname) {
	set_user(plname);
	show_username();
	

}

















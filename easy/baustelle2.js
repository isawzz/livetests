
function output_loose_and_journeys(fen){

	for(const j of fen.journeys){ console.log('journey', j.join(', ')); }
	//console.log('journeys:', fen.journeys);

	for (const plname in fen.players) { console.log('loosecards', plname, fen.players[plname].loosecards.join(', ')); }

}
















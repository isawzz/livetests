
function show_strategy_popup() {
	//console.log('options', options);
	let dpop = mPopup('',dTable, { fz: 16, fg: 'white', top: 0, right: 0, border: 'white', padding: 10, bg: 'dimgray' }, 'dOptions');
	mAppend(dpop, mCreateFrom(`<div style="text-align:center;width:100%;font-family:Algerian;font-size:22px;">${Z.game}</div>`));
	mDiv(dpop,{matop:5,maleft:10},null,`choose strategy:`);

	let vals = Config.games[Z.game].options.strategy.split(',');
	console.log('vals', vals);

	UI.dStrategyContent = mTextArea(10,20,dpop,{margin:10,padding:10},'dStrategyContent');

	//console.log('popup', dpop);
}



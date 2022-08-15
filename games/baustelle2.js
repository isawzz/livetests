function animcoin(plname, ms = 800, callback = null) {
	let d = UI.player_stat_items[plname].dCoin;
	let ani = [{ transform: 'scale(1)' }, { transform: 'scale(3)' }, { transform: 'scale(1)' }];
	let options = {
		duration: ms,
		iterations: 1,
		//fill: 'forwards',
		easing: 'ease-out',
	};
	let a = d.animate(ani, options);
	a.onfinish = () => {
		let uplayer = Z.uplayer;
		let dAmount = UI.player_stat_items[uplayer].dAmount;
		dAmount.innerHTML = Z.fen.players[uplayer].coins;
		mStyle(dAmount, { fg: 'red' });
		if (callback) callback();
	};
}
function animbuilding(ui_building, ms = 800, callback = null) {
	let d = ui_building.cardcontainer;
	let ani = [{ transform: 'scale(1)' }, { transform: 'scale(1.5)' }, { transform: 'scale(1)' }];
	let options = {
		duration: ms,
		iterations: 1,
		//fill: 'forwards',
		easing: 'ease-out',
	};
	let a = d.animate(ani, options);
	a.onfinish = callback;

}
function animtest(d, ms = 1000, callback) {
	let spinAway = [
		{ transform: 'rotate(0) scale(1)' },
		{ transform: 'rotate(360deg) scale(0)' }
	];

	spinAway = [
		{ transform: 'rotate(0) scale(1)' },
		{ transform: 'rotate(180deg) scale(0)' },
		{ transform: 'rotate(360deg) scale(2)' }
	];

	spinAway = [
		{ transform: 'scale(1)' },
		{ transform: 'scale(3)' },
		{ transform: 'scale(1)' }
	];

	// spinAway = [
	// 	{ transform: 'scale(1)' },
	// 	{ transform: 'scale(3)' },
	// 	{ transform: 'scale(.8)' },
	// 	{ transform: 'scale(1)' },
	// ];

	// spinAway = [
	// 	{ transform: 'scale(1)', 'box-shadow': '0 0 33px 0' },
	// 	{ transform: 'scale(3)', 'box-shadow': '0 0 33px 0' },
	// 	{ transform: 'scale(.8)' },
	// 	{ transform: 'scale(1)' },
	// ];

	let options = {
		duration: ms,
		iterations: 1,
		//fill: 'forwards',
		easing: 'ease-out', //'cubic-bezier(.24,.65,.78,.03)',
		// easing: 'cubic-bezier(.51,.65,.88,.65)',
		// easing: 'cubic-bezier(.71,.53,.08,.93)',
		//easing: 'cubic-bezier(.89,.31,.67,1.05)', // 'cubic-bezier(.55,.22,.52,.98)' //'cubic-bezier(1,-0.03,.86,.68)'
	}

	d.addEventListener('click', (ev) => {
		evNoBubble(ev);
		let a = d.animate(spinAway, options);
		a.onfinish = callback;
	});
}
function anipulse(d, ms = 3000, callback) {
	//create a glow animation
	let a = d.animate(
		[{
			'background-color': '#2ba805',
			'box-shadow': '0 0 3px #2ba805'
		},
		{
			'background-color': `#49e819`,
			'box-shadow': `0 0 10px #49e819`,
		},
		{
			'background-color': `#2ba805`,
			'box-shadow': `0 0 3px #2ba805`
		}], { fill: 'both', duration: ms, easing: 'ease', delay: 1000 });
	a.onfinish = callback;
	return a;

}











//#region rechnung
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
	let d3 = mDiv(d2, { display: 'flex', 'justify-content': 'center' },'dBoaMain');

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
























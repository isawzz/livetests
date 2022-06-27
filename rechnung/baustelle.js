
function show_bill_button() {
	let tb = mBy('dTopRight');
	let b = mDiv(tb, {}, `tbbill`, `<a href="javascript:onclick_bill()"><img src="../rechnung/images/bill.png" height="30"/></a>`);
	mInsert(tb, b);
}
function onclick_bill() {
	console.log('clicked bill');
	let dParent = mBy('dBoaMain');
	if (dParent.children.length > 1) dParent.lastChild.remove();

	let accs = get_fake_boa_data();
	acclist = dict2list(accs).filter(x => isdef(x['Last Payment']));
	console.log('accs', acclist);
	let boacc = rChoose(acclist);

	let item = generate_statement(dParent, boacc, boacc.brand);
	DA.bill = item;
	lookupAddIfToList(DA,['challengedata'],item);
	console.log('item', item, DA);
	//item.boacc.sub
}
function addMonthToDate(date, months) {
	let d = new Date(date);
	d.setMonth(d.getMonth() + months);
	return d;
}
function addWeekToDate(date, weeks) {
	let d = new Date(date);
	d.setDate(d.getDate() + (weeks * 7));
	return d;
}
function formate_date(date) {
	return date.toLocaleDateString();
}
function generate_statement(dParent, boacc, brand) {

	let brand_colors = {
		usbank: 'navy', prime: 'skyblue', citibank: 'silver', wellsfargo: RED, BofA_rgb: 'navy', chase_bank: BLUE,
		comcast: 'orange', oasis: GREEN, PSE: 'gold', redmond:'grey'
	};

	let date = new Date();
	
	let acc = { index:boacc.index, creditline: rNumber(0, 10) * 100, holder: 'Gunter Yang Lee', num: 242948572348, due: generate_random_date(addWeekToDate(date, 4), addWeekToDate(date, 2)) }
	let nums = { prevbalance: rNumber(0, 100), payments: rNumber(100, 1000) + rNumber(0, 100) / 100, fees: rNumber(0, 100) };
	nums.balance = nums.prevbalance + nums.payments + nums.fees;
	acc.cashadvance = acc.creditline / 4;

	//acc.num should be a 12 digit number where the last 4 digits correspond to boacc.sub.substring(1)
	acc.num = acc.num.toString();
	acc.num = acc.num.substring(0, acc.num.length - 4) + boacc.sub.substring(1);
	acc.num = parseInt(acc.num);


	let [color, fromdate, todate] = [valf(brand_colors[brand], 'random'), addWeekToDate(date, -5), addWeekToDate(date, -1)];

	//#region header
	let d;
	if (nundef(dParent)) {
		let dpop = mBy('dPopup'); show(dpop); mClear(dpop); mStyle(dpop, { top: 50, right: 10 });
		d = mDiv(dpop, { padding: 10, border: '1px solid #ddd', bg: 'white', fg: 'black' });
	} else {
		mStyle(dParent, { 'justify-content': 'start' });
		d = mDiv(dParent);
	}
	mStyle(d, { bg: 'white', position: 'fixed', top: 50, right: 0, padding: 10 });

	let d1 = mDiv(d, { bg: color, h: 5, w: '100%' }); //horizontal line
	let dheader = mDiv(d, { fz: 12 }); //header part
	let [dl, dr] = mColFlex(dheader, [1, 3]); //, [BLUE, GREEN]);
	//mDiv(dl1, { weight: 'bold' }, null, `- your partner in business -`);
	let logo = createImage(`${brand}.png`,{ hmax: 90, wmax: 300});

	let dl1 = mDiv(dl, { hmax: 90, wmax: 400 });  mAppend(dl1,logo); //, null, img_html(`${brand}.png`));
	let dr1 = mDiv(dr, { align: 'right', paright: 10 });
	mDiv(dr1, {}, null, `Account Holder: ${acc.holder}`);
	mDiv(dr1, {}, null, `Account Number: ${acc.num}`);
	mDiv(dr1, {}, null, `Statement Period: ${formate_date(fromdate)} - ${formate_date(todate)}`);
	mDiv(dr1, {}, null, `Due Date: ${formate_date(acc.due)}`);
	mDiv(d, {}, null, '<br>');
	//#endregion
	let dmain = mDiv(d, { wmax: 600 }); //main part
	let [dlm, drm] = mColFlex(dmain, [1, 1.25]); //, [BLUE, GREEN]);
	let dlm1 = mDiv(dlm, { hmargin: 10, }, null, `ACCOUNT SUMMARY`);
	let dsum = mDiv(dlm, { hmargin: 10, rounding: 12, padding: 10, border: '1px solid #ccc', bg: 'white', fg: 'black' });
	mDivLR(dsum, { w: '100%' }, null, [`Previous Balance:`, `${format_currency(nums.prevbalance)}`]);
	mDivLR(dsum, { w: '100%' }, null, [`Payments and Credits:`, `${format_currency(nums.payments)}`]);
	mDivLR(dsum, { w: '100%' }, null, [`Purchases:`, `${format_currency(nums.payments)}`]);
	mDivLR(dsum, { w: '100%' }, null, [`Balance Transfers:`, `${format_currency(0)}`]);
	mDivLR(dsum, { w: '100%' }, null, [`Cash Advances:`, `${format_currency(0)}`]);
	mDivLR(dsum, { w: '100%' }, null, [`Fees Charged:`, `${format_currency(nums.fees)}`]);
	mDivLR(dsum, { w: '100%' }, null, [`Interest Charged:`, `${format_currency(0)}`]);
	mDivLR(dsum, { w: '100%' }, null, [`New Balance:`, `${format_currency(nums.balance)}`]);
	mDiv(dsum, { fz: 9, align: 'center' }, null, 'see interest charge calculation section following the Transactions section for detailed APR information');
	mLine(dsum, { fz: 10, align: 'center' });
	mDivLR(dsum, { w: '100%' }, null, [`Credit Line:`, `${format_currency(acc.creditline)}`]);
	mDivLR(dsum, { w: '100%' }, null, [`Credit Line Available:`, `${format_currency(acc.creditline)}`]);
	mDivLR(dsum, { w: '100%' }, null, [`Cash Advance Credit Line:`, `${format_currency(acc.cashadvance)}`]);
	mDivLR(dsum, { w: '100%' }, null, [`Cash Advance Credit Line Available:`, `${format_currency(acc.cashadvance)}`]);
	mDiv(dsum, {}, null, 'You may be able to avoid interest on purchases. See reverse for details');

	// mDiv(dsum,{},null,`Account Number: ${acc.num}`);
	// mDiv(dsum,{},null,`Statement Period: ${formate_date(fromdate)} - ${formate_date(todate)}`);
	// mDiv(dsum,{},null,`Due Date: ${formate_date(acc.due)}`);

	let drm1 = mDiv(drm, { hmargin: 10, }, null, `PAYMENT INFORMATION`);
	let dpay = mDiv(drm, { hmargin: 10, rounding: 12, padding: 10, border: '1px solid #ccc', bg: 'white', fg: 'black' });
	mDivLR(dpay, { w: '100%', weight: 'bold' }, null, [`New Balance:`, `${format_currency(nums.balance)}`]);
	mLine(dpay, { fz: 10, align: 'center' });
	mDivLR(dpay, { w: '100%' }, null, [`Minimum Payment Due:`, `${format_currency(nums.balance / 10)}`]);
	mDivLR(dpay, { w: '100%', weight: 'bold' }, null, [`Payment Due Date:`, `${formate_date(acc.due)}`]);
	mDiv(dpay, { fz: 9, matop: 10 }, null, '<b>Late Payment Warning:</b> If we do not receive your minimum payment by the date listed above, you may have to pay a fee of up to $10.00.');

	let drm2 = mDiv(drm, { matop: 10, hmargin: 10, }, null, `REWARDS`);
	let drewards = mDiv(drm, { hmargin: 10, rounding: 12, padding: 10, border: '1px solid #ccc', bg: 'white', fg: 'black' });
	mDivLR(drewards, { w: '100%', weight: 'bold' }, null, [`Cashback Bonus*:`, `Anniversary Month`]);
	mDivLR(drewards, { w: '100%' }, null, [`Opening Balance:`, `${format_currency(0)}`]);
	mDivLR(drewards, { w: '100%' }, null, [`New Cashback Bonus this Period:`, `${format_currency(4.98)}`]);
	mDivLR(drewards, { w: '100%' }, null, [`Redeemed this Period:`, `${format_currency(0)}`]);
	mLine(drewards, { fz: 10, align: 'center' });
	mDivLR(drewards, { w: '100%', weight: 'bold' }, null, [`Cashback Bonus Balance:`, `${format_currency(4.98)}`]);
	mDiv(drewards, { fz: 10 }, null, `<b>to learn more log in to www.${brand}.com</b>`);

	mDiv(d, { matop: 25, maleft: 6 }, null, img_html('statement2.jpg'));
	mDiv(d, {}, null, '<br>');
	let dbla1 = mDiv(d, { hmargin: 10, rounding: 12, padding: 10, border: '1px solid #ccc', bg: 'white', fg: 'black' });
	mAppend(dbla1, createImage('statement1.jpg', {}));
	mAppend(d, createImage('statementfooter.jpg', {}));


	return { div: d, nums: nums, acc: acc, topay: nums.balance, brand:brand, boacc:boacc };

}
function format_currency(num) {
	//num should be presented with 2 decimals and a $ sign in front
	return '$' + num.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}















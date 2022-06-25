onload = start; var FirstLoad = true;

function start() { let uname = localStorage.getItem('coname'); if (isdef(uname)) U = { name: uname }; phpPost({ app: 'cosensus' }, 'coassets'); }
function start_with_assets() {

	console.log('users', Serverdata.users, 'contrib', Serverdata.contrib);
	dTable = mBy('dWrapper'); mCenterFlex(dTable);

	//show_home();
	//show_project_editor();
}
function show_home() {
	console.log('hallo! should clear table!!!')
	mClear(dTable);
	show_motto();
	mLinebreak(dTable, 40);
	show_compose();
	mLinebreak(dTable, 4);
	show_recent_contributions();
}
function mCardButton(caption, handler, dParent, styles, classtr = '', id = null) {
	let classes = toWords("card300 wb fett no_outline btn" + classtr);
	return mButton(caption, handler, dParent, styles, classes, id);
}
function mCard(dParent, styles, classtr = '', id = null) {
	let classes = toWords("card300 wb " + classtr);
	console.log('classes', classes);
	// classes = classes.filter(x=>!isEmpty(x));
	// for(const cl of classes){
	// 	if (cl == '') console.log('YES EMPTY!!!')
	// }
	// console.log('classes',classes);
	return mDiv(dParent, styles, id, null, classes);
}
function mButtonX(dParent, handler){
	let sz = 50;
	let d2 = mDiv(dParent, { bg:'silver',fg:'black', w: sz, h: sz, pointer: 'cursor' }, null, `<i class="fa fa-times" style="font-size:${sz}px;"></i>`, 'btnX');
	d2.onclick = handler;
	mPlace(d2, 'bl', 10);
	return d2;
}
function mButtonX(dParent, pos='tr', handler=null, defaultBehavior='hide') {
	//ACHTUNG!!! default behavior is: removing dParent
	dParent = toElem(dParent);
	let sz = 32;

	// let d2 = mDiv(dParent, { family:'opensans', box:true, align:'center','line-height':34,w: 32, h: 32, pointer: 'cursor' }, null, `<i class="fa-thin fa-times" style="font-size:${sz}px;"></i>`, 'btnX');
	let d2 = mDiv(dParent, { box:true, border:`blue solid ${3*sz/34}px`, bg: GREEN, rounding:'50%', cursor:'pointer',w:sz,h:sz }, null, `<svg width='100%' height='100%' ><use xlink:href="#Times1" /></svg>`); //, 'btnX');
	mClass(d2,'svgbtnX');

	d2.onclick = isdef(handler)? handler:defaultBehavior=='hide'?()=>hide(dParent):()=>dParent.remove();
	mPlace(d2, pos,10);
	return d2;
}

function show_motto() {
	mDiv(dTable, {}, null, `Compose. Connect. Contribute.`);
	mLinebreak(dTable);
	mDiv(dTable, {}, null, `Collective decision making made easy.`);
}
function show_compose() {
	mCardButton('compose', onclick_compose, dTable);
}
function show_recent_contributions() {
	let d = mCard(dTable);
	let contrib = Serverdata.contrib;
	if (isEmpty(contrib)) { d.innerHTML = 'no projects yet...'; return; }


}
function show_project_editor() {
	console.log('display the project editor!');
	mClear(dTable);
	let d = mCard(dTable, {}, 'coform'); mCenterFlex(d);
	mLinebreak(d, 40);
	let d1 = mText('New Composition', d, {}, 'fett');
	mPlace(d1, 'tl', 10);
	let d2 = mButtonX(d,onclick_close_project_editor);

	let i = 0;
	let d3 = mInput(d, {}, 'inTitle', 'Title', 'coinput', i++); //, 'input');
	let d4 = mInput(d, {}, 'inCreator', 'Creator', 'coinput', i++, isdef(U) ? U.name : ''); //, 'input');
	let d5 = mInput(d, {}, 'inDescription', 'Short Description', 'coinput', i++); //, 'input');

	let b = mButton('next', onclick_add_question, d, {}, ['fett', 'no_outline', 'btn']);
}
function show_question_editor() {

	mLinebreak(dTable, 4)
	let d = mCard(dTable, {}, 'coform'); mCenterFlex(d);

	let iform = arrChildren(dTable).length;
	console.log('this is question number', iform);

	let d1 = mText('New Composition', d, {}, 'fett'); mPlace(d1, 'tl', 10);
	let d2 = mDiv(d, {}, null, `<i class="fa fa-times" style="font-size:18px;"></i>`); mPlace(d2, 'tr', 10);
	d2.onclick = onclick_close_project_editor;

	mLinebreak(d, 40);
	let i = 0;
	let d3 = mInput(d, {}, 'inTitle' + iform, 'Title', 'coinput', i++); //, 'input');
	let d4 = mInput(d, {}, 'inCreator' + iform, 'Creator', 'coinput', i++, isdef(U) ? U.name : ''); //, 'input');
	let d5 = mInput(d, {}, 'inDescription' + iform, 'Short Description', 'coinput', i++); //, 'input');

	let b = mButton('next', onclick_add_question, d, {}, ['fett', 'no_outline', 'btn']);

}




















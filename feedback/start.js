
onload = start;

var W_init = 10; 
function onclick_reset_progressbars() { for (const k in DA.bars) set_bar(k, W_init, 2); }
function onclick_plus(id, inc) { let bar = DA.bars[id]; set_bar(id, bar.w + inc, 1); }
function set_bar(id, val, speed) {
	let bar = DA.bars[id];
	//console.log('bar', bar);
	let goal = Math.min(100, Math.max(0, val));
	if (goal == bar.w) return;
	let i = goal > bar.w ? speed : -speed;

	clearInterval(bar.ti);
	bar.ti = setInterval(() => anim(bar, i, goal), 10);

	function anim(bar, i, goal) {
		if (i < 0 && bar.w <= goal || i > 0 && bar.w >= goal) {
			clearInterval(bar.ti);
		} else {
			bar.w += i;
			bar.div.style.width = bar.w + '%';
		}
	}
}

function start() {
	dTable = mBy('dTable');
	let dgreen = get_plus_progressbar(dTable, 'green');
	mLinebreak(dTable);
	let dred = get_plus_progressbar(dTable, 'red');
	mLinebreak(dTable);
	mButton('reset', onclick_reset_progressbars, dTable, {h:30,w:100});

	DA.bars = {
		green: dgreen,
		red: dred,
	};
	onclick_reset_progressbars();
	console.log('DA', DA);
}

function get_plus_progressbar(dParent, color, id) {
	//color has to be a word (web color)
	console.log('dParent', dParent);
	if (nundef(id)) id = getUID();
	let d = mDiv(dParent, { }, id, null,'grid_progressbar');
	let button=mButton('+', () => onclick_plus(color, 10),d);
	let d1=mDiv(d,{},null,null,'progressbar');
	let dbar=mDiv(d1,{bg:color},'b_' + color,null,'barstatus');
	return { w: W_init, cont: d, div:dbar, ti: null };
}










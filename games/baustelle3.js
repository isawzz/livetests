//#region schwein
function get_schweine(fenbuilding) { return fenbuilding.schweine; }
function get_schweine_ui(uibuilding) { return uibuilding.schweine; }

function add_schwein() {

}
function has_schweine(fenbuilding) { return !isEmpty(fenbuilding.schweine); }
function remove_schwein() {

}
function reveal_animation(cards, callback) {

	console.log("_reveal_animation!!!!!");
	//console.log()
	let bound = cards.length;
	for (let i = 1; i < bound; i++) {
		let c = cards[i];
		if (c.faceUp) continue;
		mFlip(c, 300, callback);
	}
}

function mFlip(card, ms, callback) {
	let a = mAnimate(iDiv(card), 'transform', [`scale(1,1)`, `scale(0,1)`],
		() => {
			if (card.faceUp) face_down(card); else face_up(card);
			mAnimate(iDiv(card), 'transform', [`scale(0,1)`, `scale(1,1)`], callback, ms / 2, 'ease-in', 0, 'both');
		},
		ms / 2, 'ease-out', 0, 'both');
	//a.onfinish = callback;
}







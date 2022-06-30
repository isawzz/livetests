
//smart set forming
function is_overlapping_set(cards, max_jollies_allowed = 1, seqlen = 7, group_same_suit_allowed = true) {

	//sequence can be up or down
	//case 2,3,4,3,2 oder 2,3,4,5,4,3
	//auf jeden fall nimm mindestens 3 cards vom anfang: die muessen eine seq or group ergeben!
	//let orig_cards = jsCopy(cards);
	let istart = 0;
	let inextstart = 0;
	let lmin = 3;
	let legal = true;
	while (legal && istart<=cards.length-lmin) {
		let cl = cards.slice(istart, istart + lmin);
		console.log('istart',istart,'looking at',cl.map(x=>x.key).join(','));
		//check that cl is a ferro set
		let set = ferro_is_set(cl, max_jollies_allowed, seqlen, group_same_suit_allowed);

		if (set) { istart++; inextstart = Math.min(istart + lmin,cards.length-3); }
		else if (!set && inextstart == istart) return false;
		else istart++;

	}
	return cards.map(x => x.key);
}
















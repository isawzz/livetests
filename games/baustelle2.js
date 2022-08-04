function get_robot_personality(name) { return { erratic: 20, bluff: 20, random: 20, risk: 20, passive: 20, clairvoyant: 20, aggressive: 20 }; }
function botbest(list, max, mmax, exp, nreas, n2, have2, words, fen) {
	let bot = bot_random;
	let [b, f] = bot(list, max, mmax, exp, nreas, n2, have2, words, fen);
	console.log('bot', stringAfter(bot.name, '_'), 'picked', b);
	return [b, f];
}

function bot_clairvoyant(list, max, mmax, exp, nreas, n2, have2, words, fen) {
	if (nundef(fen.lastbid)) b = [list[1].value, BLUFF.toword[list[1].rank], list[2].value, BLUFF.toword[list[2].rank]];

	return [b, null]; //rChoose([handle_bid, handle_gehtHoch])];
}
function bot_random(list, max, mmax, exp, nreas, n2, have2, words, fen) {
	let ranks = rChoose(words, 2);
	let b;
	if (nundef(fen.lastbid)) b = [rNumber(1, nreas), ranks[0], rNumber(1, nreas), ranks[1]];
	else {
		b = jsCopy(fen.lastbid);

		let [n2, r2] = ueberbiete(b[2], b[3], nreas);
		if (!r2) [b[0], b[1]] = ueberbiete(b[0], b[1], nreas, true); else[b[2], b[3]] = [n2, r2];
	}

	return [b, null]; //rChoose([handle_bid, handle_gehtHoch])];
}
function ueberbiete(n, r, nreas, definite = false) {
	if (n == '_') return [nreas, BLUFF.toword[rRank(BLUFF.rankstr)]];
	else if (n <= nreas) return [n + 1, r];
	else if (r != 'ace') {
		let hr = get_higher_ranks(BLUFF.torank[r], BLUFF.rankstr);
		console.log('higher ranks', hr);
		return [n, BLUFF.toword[rChoose(hr)]];
	}
	else if (definite) return [n + 1, r];
	else return [null, null];
}
function get_higher_ranks(rank, rankstr) {
	let irank = rankstr.indexOf(rank);
	let ranks = rankstr.split('');
	return arrTake(ranks,0, irank + 1);
}


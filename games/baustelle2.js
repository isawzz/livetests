function get_robot_personality(name) { return { erratic: 20, bluff: 20, random: 20, risk: 20, passive: 20, clairvoyant: 20, aggressive: 20 }; }
function botbest(list, max, mmax, exp, nreas, n2, have2, words, fen) {
	//console.log('uplayer',Z.uplayer)
	//console.log('strategy',Z.strategy)
	let bot = window[`bot_${Z.strategy}`];
	let [b, f] = bot(list, max, mmax, exp, nreas, n2, have2, words, fen);
	//console.log('bot', stringAfter(bot.name, '_'), 'picked', b);

	//if (isdef(b) && isdef(fen.lastbid)) console.log('higher?',is_bid_higher_than(b, fen.lastbid));

	return [b, f];
}
function bot_clairvoyant(list, maxvalue, mmax, exp, nreas, n2, have2, words, fen) {
	let reduced_list = list.filter(x=>x.value == list[0].value || x.mine);
	//assertion(list.length>=2, 'list.length is < 2!!!!!'); NEIN, es kann 1 el haben wenn mine cards gleicher rank!
	let res=reduced_list.length>=2?rChoose(list,2):[reduced_list[0],{value:0,rank:'_'}];
	let max=res[0].value>=res[1].value?res[0]:res[1];let min=res[0].value<res[1].value?res[0]:res[1];
	let b=[max.value,max.rank,min.value,min.rank];
	//list.map(x => console.log(x)); //
	//console.log('chose b:', b);
	if (isdef(fen.lastbid)) {
		//need to make sure that bid is high enough. if not, geht hoch!
		let [n1, r1, n2, r2] = bluff_convert2ranks(fen.lastbid);
		//if (n1<)
		if (!is_bid_higher_than(bluff_convert2words(b), fen.lastbid)) {
			return [null, handle_gehtHoch];
		}
		//if (b[0])
	} 

	return [bluff_convert2words(b), handle_bid];
}
function bot_perfect(list, max, mmax, exp, nreas, n2, have2, words, fen) {


	let i=0;while(list[i].rank == '2') i++;
	let b = [list[i].value+n2, list[i].rank, list[i+1].value, list[i+1].rank];
	list.map(x => console.log(x)); //
	console.log('b:', b);
	if (isdef(fen.lastbid)) {
		//need to make sure that bid is high enough. if not, geht hoch!
		let [n1, r1, n2, r2] = bluff_convert2ranks(fen.lastbid);
		if (!is_bid_higher_than(bluff_convert2words(b), fen.lastbid)) {
			return [null, handle_gehtHoch];
		}
		//if (b[0])
	} 

	return [bluff_convert2words(b), handle_bid];
}
function bot_random(list, max, mmax, exp, nreas, n2, have2, words, fen) {
	let ranks = rChoose('3456789TJQKA', 2);
	let b;
	if (nundef(fen.lastbid)) b = [rNumber(1, nreas), ranks[0], rNumber(1, nreas), ranks[1]];
	else if (fen.lastbid[0] > nreas + 2) {
		return [null, handle_gehtHoch];
	} else {
		[n1, r1, n2, r2] = bluff_convert2ranks(fen.lastbid);
		assertion(isNumber(n1) && n1>0 && isNumber(n2), 'bot_random: n1 or n2 is not a number OR n1<=0!!!!!!!',n1,n2);

		if ((n1 + n2) / 2 > nreas && coin(50)) {
			return [null, handle_gehtHoch];
		} else if ((n1 + n2) / 2 <= nreas + 1) b = n1 <= nreas + 1 ? [n1 + 1, r1, n2, r2] : [n1, r1, n2 + 1, r2];
		else {
			let [i1, i2] = [BLUFF.rankstr.indexOf(r1), BLUFF.rankstr.indexOf(r2)];

			//try increase i1: 
			let s = '3456789TJQKA';
			//split s into 4 parts: <min(i1,i2), between(i1,i2), between(i2,max), >max(i1,i2)
			let imin = Math.min(i1, i2); let imax = Math.max(i1, i2); let i = imax == i1 ? 1 : 2;
			let [smin, between, smax] = [s.substring(0, imin), s.substring(imin + 1, imax), s.substring(imax + 1, s.length)];

			//which one to be replaced?

			if (!isEmpty(smax)) { if (i == 1) b = [n1, rChoose(smax), n2, r2]; else b = [n1, r1, n2, rChoose(smax)]; }
			else if (!isEmpty(between)) { if (i == 2) b = [n1, rChoose(between), n2, r2]; else b = [n1, r1, n2, rChoose(between)]; }
			else return [null, handle_gehtHoch];
		}
	}

	//console.log('b', b);
	return [bluff_convert2words(b), handle_bid];
}




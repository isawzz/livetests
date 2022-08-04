
function bluff_ai() {
	let [A, fen, uplayer, pl] = [Z.A, Z.fen, Z.uplayer, Z.pl];
	const torank = { _: '_', three: '3', four: '4', five: '5', six: '6', seven: '7', eight: '8', nine: '9', ten: 'T', jack: 'J', queen: 'Q', king: 'K', ace: 'A' };
	const toword = { _: '_', '3': 'three', '4': 'four', '5': 'five', '6': 'six', '7': 'seven', '8': 'eight', '9': 'nine', T: 'ten', J: 'jack', Q: 'queen', K: 'king', A: 'ace' };
	let words = get_keys(torank).slice(1); // words sind three, four, ..., king, ace

	//all about ranks of cards in play
	let all_hand_cards = aggregate_elements(dict2list(fen.players, 'name'), 'hand'); // all cards in play
	let no_twos = all_hand_cards.filter(x => x[0] != '2'); // alle Karten ohne 2er
	let rankstr = '3456789TJQKA2';
	sortByRank(all_hand_cards, rankstr);
	let byrank = aggregate_player_hands_by_rank(fen);
	let rank_list = dict2list(byrank, 'rank');
	let unique_ranks = sortByRank(get_keys(byrank));
	let myranks = sortByRank(pl.hand.map(x => x[0]));
	console.log('myranks', myranks);
	let my_unique = unique_ranks.filter(x => myranks.includes(x));
	rank_list.map(x => { x.mine = myranks.includes(x.rank); x.irank = rankstr.indexOf(x.rank); x.i = x.irank + 100 * x.value; });
	sortByDescending(rank_list, 'i');
	let maxcount = rank_list[0].value;
	let mymaxcount = rank_list.filter(x => x.mine)[0].value;


	//console.log('all_hand_cards:', all_hand_cards, '\nno_twos:', no_twos, '\nrankstr:', rankstr, '\nbyrank:', byrank, '\nrank_list:', rank_list, '\nunique_ranks:', unique_ranks, '\nmyranks:', myranks, '\nmy_unique:', my_unique);
	rank_list.map(x => console.log(x)); //console.log('rank_list:', rank_list);
	console.log('maxcount:', maxcount, 'mymaxcount:', mymaxcount);

	let expected = all_hand_cards.length / 13; // auch 2er gibt es soviele!
	let nreason = Math.max(1, Math.round(expected * 2));
	let n_twos = all_hand_cards.filter(x => x[0] == '2').length;
	let have2 = firstCond(rank_list,x=>x.rank=='2' && x.mine);
	console.log('expected:', expected, '\nnreason:', nreason, '\nn_twos:', n_twos, '\nhave 2:', have2);

	return botbest(rank_list, maxcount, mymaxcount, expected, nreason, n_twos, have2, words, fen);
}
function restrest() {
	let len = no_twos.length; // anzahl der Karten ohne 2er
	let upper = arrTake(no_twos, len / 2, len / 2 - 1);
	let lower = arrTake(no_twos, len / 2, 0);

	let myupper = intersection(upper, pl.hand); //upper.filter(x => pl.hand.map(y=>x[0] == pl.name); // meine Karten ohne 2er
	let highset = isEmpty(myupper) ? upper : myupper;


	let highrank = rChoose(highset)[0];
	let lowrank = rChoose(lower)[0];
	if (highrank == lowrank) lowrank = firstCond(pl.hand, x => x[0] != highrank);
	if (highrank == lowrank) lowrank = firstCond(no_twos, x => x[0] != highrank);

	let newbid = null;
	if (nundef(fen.lastbid)) {
		console.log('muesste hier landen')
		//make a reasonable guess
		newbid = [nreason, toword[highrank], 1, toword[lowrank]];
		return [newbid, handle_bid];
	} else if (get_rank_index(highrank, rankstr) > get_rank_index(torank[fen.lastbid[1]], rankstr)) {
		//how likely is it that I can overbid higher number?
		let b = fen.lastbid;
		newbid = [b[0], toword[highrank], b[2], b[3]];
	}
	if (newbid) {
		//console.log('all_hand_cards:', all_hand_cards,upper,myupper);
		//console.log('expected:', expected, nreason);
		//console.log('upper, lower', upper, lower);
		console.log('newbid', newbid);
	}
	return [newbid, newbid == null && nundef(fen.lastbid) ? handle_gehtHoch : handle_bid];

}


function restttt() {
	let words = get_keys(torank).slice(1); // words sind three, four, ..., king, ace
	let b = isdef(fen.lastbid) ? jsCopy(fen.lastbid) : null;
	let playerslist = dict2list(fen.players, 'name');

	let all_hand_cards = aggregate_elements(playerslist, 'hand');
	let expected = all_hand_cards / 13; // auch 2er gibt es soviele!
	let byrank = aggregate_player_hands_by_rank(fen);
	let rank_list = dict2list(byrank, 'rank');

	//sort rank_list by value
	rank_list.sort((a, b) => b.value - a.value);
	let max_reason = Math.round(expected * 1.5);
	let max_count = rank_list[0].value;
	let min_count = rank_list[rank_list.length - 1].value;

	console.log('all_hand_cards:', byrank, rank_list);
	let max_ranks = rank_list.filter(x => x.value == max_count);
	let max_owner = max_ranks.filter(x => pl.hand.map(y => y[0]).includes(x.rank));
	console.log('max_ranks', jsCopy(max_ranks));
	let highest_count = b ? b[0] : 0;
	let highest_rank = b ? torank[b[1]] : '3';

	//soll ich der ai eine kleine chance geben dass sie komplett schummelt???
	//if (coin()) {
	console.log('last bid:', isdef(b) ? b : 'null'); //[2, 'six', 2, 'five'] beispiel

	//try to overbid last bid using rank_list
	let newbid = null;
	if (isdef(b)) {
		//if max_count is higher than highest_count, I can overbid
		if (max_count > highest_count) {
			//find highest_rank in rank_list

			newbid = [max_count, toword[rChoose(isEmpty(max_owner) ? max_ranks : max_owner).rank], b[2], b[3]];

		} else if (max_count == highest_count) {

			//find a rank in max_ranks that is higher than highest_rank
			let rankstr = '3456789TJQKA2';
			console.log('highest_rank:', highest_rank);
			let highest_index = get_rank_index(highest_rank, rankstr);
			let valid_ranks = max_ranks.filter(x => get_rank_index(x.rank, rankstr) > highest_index);
			if (valid_ranks.length > 0) {
				//can still beat it!
				newbid = [max_count, toword[rChoose(valid_ranks).rank], b[2], b[3]];
			} else {
				valid_ranks = max_ranks.filter(x => get_rank_index(x.rank, rankstr) == highest_index);
				if (valid_ranks.length > 0) {
					//remove valid_ranks from max_ranks
					max_ranks = arrMinus(max_ranks, valid_ranks);
					console.log('max_ranks is jetzt', jsCopy(max_ranks));
				}

				//can I 
			}

		}

	} else {
		console.log('...max', max_owner, max_ranks);
		let rand = rChoose(isEmpty(max_owner) ? max_ranks : max_owner);
		let rank = rand.rank;
		console.log('rand', rand, 'rank', rank);
		newbid = [max_count, toword[rank], '_', '_'];

	}
	if (newbid) {
		fen.newbid = newbid;
		//console.log('new bid:', b);
		UI.dAnzeige.innerHTML = bid_to_string(newbid);
	}
	return newbid;
}


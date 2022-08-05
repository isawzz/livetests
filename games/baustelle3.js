
function normalize_bid(bid) {
	let need_to_sort = bid[0] == '_' && bid[2] != '_'
		|| bid[2] != '_' && bid[2] > bid[0]
		|| bid[2] == bid[0] && is_higher_ranked_name(bid[3], bid[1]);

	if (need_to_sort) {
		//console.log('need_to_sort', need_to_sort);
		let [h0, h1] = [bid[0], bid[1]];
		[bid[0], bid[1]] = [bid[2], bid[3]];
		[bid[2], bid[3]] = [h0, h1];
		//console.log('bid sorted:', bid);
	}
	return bid;
}
function is_bid_higher_than(bid, oldbid) {
	//replace all _ by 0
	bid = jsCopy(bid);
	console.log('bid:', bid, 'oldbid:', oldbid);	
	if (bid[0] == '_') bid[0] = 0;
	if (bid[2] == '_') bid[2] = 0;
	if (oldbid[0] == '_') oldbid[0] = 0;
	if (oldbid[2] == '_') oldbid[2] = 0;

	//check if newbid is higher than old bid
	let higher = bid[0] > oldbid[0]
		|| bid[0] == oldbid[0] && is_higher_ranked_name(bid[1], oldbid[1])
		|| bid[0] == oldbid[0] && bid[1] == oldbid[1] && bid[2] > oldbid[2]
		|| bid[0] == oldbid[0] && bid[1] == oldbid[1] && bid[2] == oldbid[2] && is_higher_ranked_name(bid[3], oldbid[3]);
	//console.log('YES, new bid is higher!!!');

	return higher;
}





function add_card_to_group(card, oldgroup, oldindex, targetcard, targetgroup) {
	card.groupid = targetgroup.id;

	//hier muss card von UI hand entfernen wenn source == 'hand'
	if (card.source == 'hand') {
		let hand = UI.players[Z.uplayer].hand;
		removeInPlace(hand.items, card);
	}

	card.source = 'group';
	mDroppable(iDiv(card), drop_card_fritz); 

	if (nundef(targetcard)){ //} || targetcard.id == arrLast(targetgroup.ids)) {
		targetgroup.ids.push(card.id);
		mAppend(iDiv(targetgroup), iDiv(card));
	} else {

		//targetcard canNOT be null here!!!!!!
		//oldgroup can be undefined
		// aber die card wurde ja schon untied?!!!!!!!!
		// if (oldgroup == group){
		// 	//in this case have oldindex
		// 	//if oldindex < index of targetcard, insert
		// 	console.log('oldindex', oldindex, 'index of targetcard', group.ids.indexOf(targetcard.id));
		// }

		let index = targetgroup.ids.indexOf(targetcard.id)+1;

		//how do I get the old group?
		//console.log('inserting card at index', index);
		console.log('ids', jsCopy(targetgroup.ids));
		console.log('targetcard index', index);
		targetgroup.ids.splice(index, 0, card.id);
		console.log('ids', jsCopy(targetgroup.ids));
		mClear(iDiv(targetgroup));
		for (let i = 0; i < targetgroup.ids.length; i++) {
			let c = Items[targetgroup.ids[i]];
			mAppend(iDiv(targetgroup), iDiv(c));
		}
		//mInsert(iDiv(targetgroup), iDiv(card), index);
	}

	resplay_container(targetgroup);
}


















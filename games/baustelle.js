

function dragover_fritz(ev){
	ev.preventDefault();
	ev.dataTransfer.dropEffect = "move"; //macht so ein kleines kastel, 'copy' (default) macht ein kastel mit einem +

	//ich will eigentlich nur feststellen, wo die card landen wuerde!
	let target_id = evToClosestId(ev);
	let d=mBy(target_id);
	mStyle(d,{bg:'red'});
	
	if (target_id == 'dOpenTable') {

	} else if (isdef(Items[target_id])) {
		let targetcard = Items[target_id];
		let targetgroup = Items[targetcard.groupid];
	} else {
		//console.log('ERROR IMPOSSIBLE!!!! dropped',data,card,'to',target_id);
	}

}
























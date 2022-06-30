
function spread_cards_wider(x, group) {

	if (nundef(DA.hovergroup)){
		DA.hovergroup = group;
		resplay_container(DA.hovergroup, .75);
		group.is_wider = true;
		return;	
	}

	//if card x comes from group do nothing
	if (group.ids.includes(x.id)) return;

	//DA.hovergroupu is already defined so it has an id! if it is same id, dont do any spreading
	if (DA.hovergroup.id == group.id) return;

	console.log('HAVE TO ACT!!!!!!!!!',DA.hovergroup.id,group.id,x.id);
	// //DA.hovergroup is different from group, but it could still be that hovergroup is already wide
	// //jetzt brauch ich ein: group last dropped!
	// if (nundef(oldgroup)) {DA.}

	// let oldid = lookup(DA, ['hovergroup', 'id']);
	// if (oldid == group.id) return; //already expanded

	// if (isdef(DA.hovergroup)) { resplay_container(DA.hovergroup); }
	// console.log('DA.hovergroup', oldid, 'group', group.id);
	DA.hovergroup = group;
	resplay_container(DA.hovergroup, .75);
	// if (isdef(DA.hovergroup) && DA.hovergroup != group) { console.log('other hovergroup is', DA.hovergroup); resplay_container(DA.hovergroup); }
	// else if (DA.hovergroup == group) { return; }
	// else { DA.hovergroup = group; resplay_container(group, .75); console.log('need to spread group wider'); }

}

















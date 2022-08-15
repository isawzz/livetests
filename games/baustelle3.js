

function remove_ui_items(items){
	//UI muss NICHT consistent bleiben!!!! das wird nur bevor take turn gemacht!!!
	console.log('remove_ui_items', items);
	for (const item of items) { 
		let card=item.o;
		make_card_unselectable(item);
		iDiv(item.o).remove(); 
	}
}





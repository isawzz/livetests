onload = start; var FirstLoad = true;
DA.SIMSIM = true; DA.exclusive = true; DA.TESTSTART1 = true; //DA.sendmax = 3; 

async function start() {
	//DB = await route_path_yaml_dict('./base/DB.yaml');	console.log('DB',DB);	return; //OK!
	Serverdata = await load_assets_fetch('./base/', './games/'); //war vorher './easy/' !!!!!!!!!!!!!!!!!!!!!!!! 
	//console.log('Serverdata',Serverdata); return; //OK!
	let uname = DA.secretuser = 'mimi'; //localStorage.getItem('uname');
	U = firstCond(Serverdata.users, x => x.name == uname);
	assertion(isdef(U), 'user not found');

	show_home_logo(); 
	TESTING = true; //DA.AUTOSWITCH = true;
	show_username(); 

	start_with_assets();
}
function start_with_assets() { 
	start_tests(); 
}



//stubs & helpers
function get_texture(name) { return `url(/./base/assets/images/textures/${name}.png)`; }
function _poll() { return; }
//function clear_screen() { } //console.log('...clear_screen'); }
function stopgame() { console.log('...stopgame',getFunctionsNameThatCalledThisFunction()); }


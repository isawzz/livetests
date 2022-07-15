function bw_master_password_renew() {
	//console.log('bw_master_password_renew');

	let [inp1, inp2] = [document.getElementById('inputPassword'), document.getElementById('inputPassword2')];
	let pw = inp1.value;
	let pw2 = inp2.value;
	let letters = toLetters(pw);
	let minlen = 8;
	let correct = false;
	let d = mBy('dError');
	if (pw.length < minlen) {
		d.innerHTML = `password needs to be at least ${minlen} long!`;
	} else if (!letters.find(x => 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.includes(x))) {
		d.innerHTML = 'password needs to contain at least 1 uppercase letter!';
	} else if (!letters.find(x => '0123456789'.includes(x))) {
		d.innerHTML = 'password needs to contain at least 1 digit!';
	} else if (isAlphaNum(pw)) {
		d.innerHTML = 'password needs to contain at least 1 special symbol!';
	} else if (pw !== pw2) {
		d.innerHTML = 'passwords do not match';
	} else correct = true;
	if (correct) {
		console.log('new password has been set!',pw)
		S.master_password = pw;
		boa_save();
		hide('dPopup');
		show_eval_message(true);	

		//toggle_bw_symbol();
	}else{
		//console.log('WRONG!!!!!!!!!!!!!!!!!!!!!!!!!!')
		inp1.value = inp2.value = '';
		inp1.focus();
	}

}












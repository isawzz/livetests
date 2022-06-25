function addColorPicker(c) {
	//console.log('addColorPicker geht!',c);
	//if (DA.colorPickerLoaded) return;
	//DA.colorPickerLoaded=true;
	let form = mBy('myform');
	let img = mBy('imgPreview');
	//let c = Session.cur_me.color; //get_user_color()
	let picker = mColorPickerBehavior(colorFrom(c), img, form,
		(a) => { DA.newColor = a; DA.colorChanged = true; },
		{ w: 322, h: 45, bg: 'green', rounding: 6, margin: 'auto', align: 'center' });

	img.ondragover = img.ondrop = img.ondragleave = handle_drag_and_drop;
	//hier brauch noch das drag to change image!

	mBy('img_dd_instruction').style.opacity = 1;

	img.onload = null;
}
function present_account(userdata) {

	if (nundef(userdata)) userdata = { color: 'red', }

	DA.imageChanged = DA.colorChanged = false; //DA.colorPickerLoaded = false;
	//console.log('userdata', userdata);
	return `
	<div id="dAccount" style="padding-bottom:10px;max-width=500px; margin-top:10px; display:flex; animation: appear1 1s ease;justify-content:center; align-content:center">
		<div id="error"></div>
		<div style='text-align:center;min-width:300px;'>
			<form id="myform" autocomplete="off" style='text-align:center;background:${userdata.color}'>
				<span id='img_dd_instruction' style="font-size:11px;">drag and drop an image to change</span><br>
				<img id="imgPreview" onload='addColorPicker("${userdata.color}");' src='${get_image_path(userdata)}' 
				ondragover="handle_drag_and_drop(event)" ondrop="handle_drag_and_drop(event)" 
				ondragleave="handle_drag_and_drop(event)"	style="height:200px;margin:10px;" /><br>
				<input id='iUsername' type="text" name="motto" placeholder='motto' value="${userdata.motto}" autofocus
					onkeydown="if (event.keyCode === 13){event.preventDefault();collect_data(event);}" />
				<br />
				<input id='save_settings_button' type="button" value="Submit" onclick="collect_data(event)" style="margin:12px" ><br>
			</form>
	</div></div>
	`; //onload='addColorPicker(${userdata.color})' 
}

function get_image_path(udata) { return './base/assets/images/mimi.jpg'; }

function collect_data() {

	console.log('jaaaaaaaaaaaaaaaaa')

	var myform = mBy("myform");
	var inputs = myform.getElementsByTagName("INPUT");
	var data = {};
	for (var i = inputs.length - 1; i >= 0; i--) {
		var key = inputs[i].name;
		switch (key) {
			case "username":
			case "name":
				let uname = inputs[i].value;
				console.log(`${key} in input is`, uname);
				uname = replaceAllSpecialChars(uname, ' ', '_');
				uname = replaceAllSpecialChars(uname, '&', '_');
				uname = replaceAllSpecialChars(uname, '+', '_');
				uname = replaceAllSpecialChars(uname, '?', '_');
				uname = replaceAllSpecialChars(uname, '=', '_');
				uname = replaceAllSpecialChars(uname, '+', '_');
				uname = replaceAllSpecialChars(uname, '/', '_');
				uname = replaceAllSpecialChars(uname, '\\', '_');
				data[key] = uname.toLowerCase();
				break;
			case "motto":
				data[key] = inputs[i].value.toLowerCase();
		}
	}

	//TODO!!!!
	console.log('saving image at server....');//	save_image_at_server('imgPreview','hallo');

	set_image_as_background('imgPreview', document.body);
	return;
	if (DA.imageChanged) {
		//do the same as I did before!
		sendHtml('imgPreview', Session.cur_user);
		//DA.imageChanged = false;
	} else {
		let udata = get_current_userdata();
		let changed = false;
		if (DA.colorChanged) { udata.color = DA.newColor; changed = true; }// DA.colorChanged = false;}
		if (data.motto != udata.motto) {
			changed = true;
			udata.motto = data.motto;
			mBy('motto').innerHTML = udata.motto;
		}
		if (changed) {
			//console.log('changed!');
			DA.next = get_login;
			db_save(); //save_users();

		}

	}


}
function set_image_as_background(id, elem) {

	//console.log('_______________HALLO!!!!')
	window.scrollTo(0, 0);
	html2canvas(document.getElementById(id)).then(function (canvas) {


		console.log('haaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')

		let imgData = canvas.toDataURL("image/jpeg", 0.9);

		const rgbArray = buildRgb(imageData.data);

		/**
		 * Color quantization
		 * A process that reduces the number of colors used in an image
		 * while trying to visually maintin the original image as much as possible
		 */
		const quantColors = quantization(rgbArray, 0);

		// Create the HTML structure to show the color palette



		buildPalette(quantColors);


	});
}

function save_image_at_server(id, uploadFilename) {

	if (nundef(uploadFilename)) uploadFilename = 'baustellenimage';

	//console.log('_______________HALLO!!!!')
	window.scrollTo(0, 0);
	html2canvas(document.getElementById(id)).then(function (canvas) {
		let imgData = canvas.toDataURL("image/jpeg", 0.9);

		//var profile_image = mBy("profile_image");
		//profile_image.src = imgData;
		//mBy('imgPreview').src = imgData;
		var ajax = new XMLHttpRequest();
		ajax.open("POST", "server/save_url_encoded_image.php", true);
		ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		//ajax.setRequestHeader("Cache-Control", "no-cache"); das ist es nicht!!!!!!!!!!!!!!!!!!!
		ajax.send("image=" + canvas.toDataURL("image/jpeg", 0.9) + "&filename=" + uploadFilename + ".jpg");
		ajax.onreadystatechange = function () {
			if (this.readyState == 4 && this.status == 200) {
				//console.log('RESPONSE IMAGE UPLOAD!!!!!!!', this.responseText);
				let udata = get_current_userdata();
				if (!udata.image) { udata.image = true; db_save(); } //save_users(); }
				get_login();
				//window.location.replace('index.html');
			}
		};
	});
}

//#region drag drop
function drag(e) {
	where();
	let newUsername = e.target.parentNode.getAttribute('username');
	//console.log('drag', newUsername);
	e.dataTransfer.setData("username", newUsername);
}
function handle_drag_and_drop(e) {
	//return;
	if (e.type == "dragover") {
		e.preventDefault();
		mClass(e.target, "dragging");
	} else if (e.type == "dragleave") {
		mClassRemove(e.target, "dragging");
	} else if (e.type == "drop") {
		let target = e.target;
		let id = target.id;
		mClassRemove(e.target, "dragging");
		//changing user image
		console.log('===>dropped on target:', e.target);
		e.preventDefault();
		DA.imageChanged = true;
		mClassRemove(e.target, "dragging");
		mDropImage(e, e.target);
	} else {
		mClassRemove(e.target, "dragging");
	}
}
//#endregion

function mDropImage(e, img) {
	var dt = e.dataTransfer;
	console.log('dropped', dt)
	var files = dt.files;
	if (files.length) {

		console.log('files abteilung!!!!!!!!!!!!!!!')
		let imgFile = files[0];
		var reader = new FileReader();
		reader.onload = function (e) {
			img.src = e.target.result;
			imgFile.data = e.target.result;
			//console.log('data',imgFile.data);

			img.onloaded = () => {
				//set_image_as_background('imgPreview',mBy('dAdmin'));
				html2canvas(document.getElementById('imgPreview')).then(function (canvas) {
					console.log('haaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
					let imgData = canvas.toDataURL("image/jpeg", 0.9);
					const rgbArray = buildRgb(imageData.data);
					const quantColors = quantization(rgbArray, 0);
					buildPalette(quantColors);
				});
			}

			// const rgbArray = buildRgb(imgFile.data);
			// const quantColors = quantization(rgbArray, 0);
			// buildPalette(quantColors);


		}
		reader.readAsDataURL(imgFile);
	} else {
		console.log('internet abteilung!!! dropped on', e.target, 'img', img);
		clearElement(img);
		var html = dt.getData('text/html');
		console.log('__________dataTransfer', html);
		let match = html && /\bsrc="?([^"\s]+)"?\s*/.exec(html);
		let url = match && match[1];
		if (url) {
			//previewImageFromUrl(url, img);
			img.onerror = function () {
				alert("Error in uploading");
			}
			img.onload = function () {
				console.log('JA!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
				console.log(mBy('imgPreview'));
				//set_image_as_background('imgPreview',mBy('dAdmin'));
			}
			img.crossOrigin = ""; // if from different origin, same as "anonymous"
			img.src = url;



		}
	}
}




























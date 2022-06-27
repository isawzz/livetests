
function get_make_payments_button(){
	let html = `
		<a
			href="javascript:void(0);"
			onclick="make_payments();"
			class="btn-bofa btn-bofa-blue btn-bofa-small behbio btn-bofa-noRight"
			name="make-payments-submit"
			>
			<span class="btn-bofa  btn-bofa-blue-lock">Make Payments</span>
		</a>

	`;
}

function add_make_payments_button(ev){
	let id = evToClosestId(ev);
	let inp=mBy(id);

	if (isdef(DA.prevHidden)){mClear(DA.prevHidden);}
	let dHidden = inp.parentNode.parentNode.parentNode.parentNode.parentNode.lastChild;
	mClear(dHidden);
	let d1=mCard(dHidden,{w:'90%',padding:10,box:true}); 
	let el=mDiv(d1,{cursor:'pointer'},null,`<span class="btn-bofa btn-bofa-blue btn-bofa-blue-lock">Make Payments</span>`);
	el.onclick=()=>make_payments_challenge_eval(inp);

	//mAppend(dHidden,mBy('dummy'))
	//console.log('parent', parent);

	//window.scrollTo(window.screenY,0);
	//el.scrollIntoView();
	DA.prevHidden = dHidden;

}
function make_payments_challenge_eval(inp){
	let val=inp.value;
	console.log('mit was muss ich das jetzt vergleichen',val);

	let solution = {amount:DA.bill.nums.balance,index:DA.bill.acc.index};
	let answer = {amount:Number(val.substring(1).trim()),index:Number(inp.id.substring(3))};

	console.log('solution',solution,'answer',answer);
	if (solution.amount == answer.amount && solution.index == answer.index){
		console.log('CORRECT!!!!!!!!!');
	}else {
		console.log('WRONG!!!!!!!!!');
	}
}










var submitData = new function() {
	this.submitThisForm = function(form){
		document.getElementById('main_View').innerHTML = "";
		var formName = form.name;
		var formRef = form.data_Type.value;
		var fbRef = firebase.child(formRef);
		var newfbRef = fbRef.push();
		newfbRef.set({
			title:form.data_Title.value,
			content: form.data_Content.value,
			uploadedAt: Date()
		});
	}
}
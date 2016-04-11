var editEntry = new function() {

	this.id;

	this.section;

	this.populate = function(event,key,category,elem) {
		event.preventDefault();
		var data = elem.href.split("&?");
		data.splice(0,1);
		this.id = key;
		this.section = category;
		// console.log(key, category, data);
		var editQuery = new Firebase('https://documentate.firebaseio.com/' + category);
		editQuery.orderByKey().equalTo(key).on('child_added', function(snapshot) {
			// console.log(snapshot.val());

			document.getElementById('data_Key_Edit').value = key;
			document.getElementById('data_Category_Edit').value = category;
			document.getElementById('data_Title_Edit').value = snapshot.val().title;
			document.getElementById('data_Content_Edit').value = snapshot.val().content;
		});
	}

	this.update = function(form) {
		var key = form.data_Key_Edit.value;
		var category = form.data_Category_Edit.value;
		var fbUpdate = firebase.child(category).child(key);
		fbUpdate.update({
			title: form.data_Title_Edit.value,
			content: form.data_Content_Edit.value,
		});
		fbUpdate.child('updatedAt').set(Date());
	}
}
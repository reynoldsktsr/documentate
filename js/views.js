/**
* 
*/
var data = new Firebase('https://documentate.firebaseio.com/');
var viewSelector = document.getElementById('view_Selector');
data.on('value',function(snapshot) {
	viewSelector.innerHTML = "";
	console.log(snapshot.val());
	for (var key in snapshot.val()){
		console.log(key);
		var option = document.createElement('option');
		option.innerHTML = key;
		viewSelector.appendChild(option);
	}
})

function updateTable() {
	var selectedCategory = viewSelector.value;
	var view = new Firebase('https://documentate.firebaseio.com/' + selectedCategory);
	console.log(updateView.clearTable());
	view.on('value', function(snapshot) {
		// console.log(snapshot);
		updateView.renderTableHeader();
		var tBody = document.createElement('tbody');
		for (var key in snapshot.val()) {
			var title = snapshot.val()[key].title;
			var content = snapshot.val()[key].content;
			var createdAt = snapshot.val()[key].uploadedAt;
			tBody.appendChild(updateView.addRow(title,content,createdAt,key,selectedCategory));
		}
		document.getElementById(updateView.tableId).appendChild(tBody);
	}, function(errorObject) {
		conosle.log('Error: ' + errorObject.code);
	})
}

var updateView = new function() {
	this.tableId = "main_View";

	this.clearTable = function() {
		document.getElementById(this.tableId).innerHTML = "";
	}
	this.renderTableHeader = function() {
		var thead = document.createElement('thead');
		var row = document.createElement('tr');
		row.appendChild(this.addHeadColumn("Title"));
		row.appendChild(this.addHeadColumn("Content"));
		row.appendChild(this.addHeadColumn("CreatedAt"));
		row.appendChild(this.addHeadColumn("Edit"));
		row.appendChild(this.addHeadColumn("Delete"));
		thead.appendChild(row);
		document.getElementById(this.tableId).appendChild(thead);
	} //"<tr><td>Title</td><td>Content</td><td>Created At:</td><td>Edit</td><td>Delete</td></tr>";

	this.addRow = function(title,content,createdAt,key,selectedCategory) {
		// body...
		var row = document.createElement('tr');
		row.appendChild(this.addColumn(title));
		row.appendChild(this.addColumn(content));
		row.appendChild(this.addColumn(createdAt));
		row.appendChild(this.addEdit(key,selectedCategory));
		row.appendChild(this.addDelete());
		return row;
	}

	this.addHeadColumn = function(data){
		var column = document.createElement('th');
		column.innerHTML = data;
		return column;

	}
	this.addColumn = function(data){
		var column = document.createElement('td');
		column.innerHTML = data;
		return column;

	}
	this.addDelete = function(){
		var column = document.createElement('td');
		column.innerHTML = "Delete";
		return column;

	}
	this.addEdit = function(key,selectedCategory){
		var column = document.createElement('td');
		var link = document.createElement('a');
		link.href = "/&?id=" + key + "&?section=" + selectedCategory;
		link.innerHTML = "Edit";
		link.setAttribute("onclick","editEntry.populate(event,'" + key + "', '" + selectedCategory + "',this)");
		column.appendChild(link);
		return column;

	}
}

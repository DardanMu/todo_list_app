jQuery(document).ready(function($) {
	//global variables/functions
	var currentCountInc = JSON.parse(localStorage.getItem("userList")).length + 1;
	var secondsVar = new Date().getTime() / 1000;
	var itemListArray = JSON.parse(localStorage.getItem("userList"));

//user input object constructor
function itemObjectConstruct(id, input, complete)
{
	this.id=id;
	this.item=input;
	this.complete=complete;
}
//completeTask function - apply line-through css to item
function completeTask(thisValue, thisID, newItem){
	for(var i=0;i<itemListArray.length;i++){
		var objectItem = itemListArray[i];
   		if(objectItem.item === thisValue && (objectItem.id.toString()) === thisID){
   			//set 'complete' variable in object: objectItem to the opposite state.
   			if(objectItem.complete === false){ 
   				objectItem.complete = true;
   			}else{
   				objectItem.complete = false;
   			}
   			localStorage.setItem("userList", JSON.stringify(itemListArray));
   			return true;
   		}
	}
}
//delete function
function deleteItem(thisValue, thisID){
	for(var i=0;i<itemListArray.length;i++){
		var objectItem = itemListArray[i];
   		if(objectItem.item === thisValue && (objectItem.id.toString()) === thisID){ 
   			itemListArray.splice(i,1);
   			localStorage.setItem("userList", JSON.stringify(itemListArray));
   			return true;
   		}
	}
}
//edit function
function editItem(thisValue, thisID, newItem){
	for(var i=0;i<itemListArray.length;i++){
		var objectItem = itemListArray[i];
   		if(objectItem.item === thisValue && (objectItem.id.toString()) === thisID){ 
   			//changes the 'item' value in the object to a new value (the edited content).
   			objectItem.item = newItem;
   			localStorage.setItem("userList", JSON.stringify(itemListArray));
   			return true;
   		}
	}
}

	//executed once "Add" button is clicked
	$('#addToList').submit(function(){

		var userInput = $('#userInput').val();
		$('#userInput').val("");

		if(userInput === ""){
			return false;
		}else{
				
			var newItem = new itemObjectConstruct(currentCountInc, userInput, false);

			var currentItemArray = JSON.parse(localStorage.getItem("userList"));
			currentItemArray.push(newItem);
			localStorage.setItem("userList", JSON.stringify(currentItemArray));

			$('<li><span class="listText">' +newItem.item+ '</span> <span id="hiddenItemID">'+newItem.id+'</span> <button id="strikeOff">&#10003;</button> <button id="delete">&#10007;</button> <button id="edit">EDIT</button> </li>').appendTo('#list');

			//return false; //<-- disables refresh
		};
	});

	//scrach off completed items / Toggle CSS class
	$("#strikeOff").live('click', function(){
		var thisValue = $(this).parent('li').children('.listText').text();
		var thisID = $(this).parent('li').children('#hiddenItemID').text();

		completeTask(thisValue, thisID);

		$(this).parent('li').toggleClass('done');
	});

	//delete item if clicked
	$("#delete").live('click', function(){
		//the text in the list that was clicked
		var thisValue = $(this).parent('li').children('.listText').text();
		var thisID = $(this).parent('li').children('#hiddenItemID').text();
		//call the delete function above
		deleteItem(thisValue, thisID);

		$(this).parent('li').remove();
	});

	//executes once "edit" button is clicked
	$("#edit").live('click', function(){
		//check if another "edit" textbox is already open.
		if($('#editBox').length === 0){
			var thisValue = $(this).parent('li').children('.listText').text();
			var thisID = $(this).parent('li').children('#hiddenItemID').text();

			$('<form id="editForm"><textarea id="editBox">' + thisValue + '</textarea> <button id="confirmButton">Confirm</button> <input type="button" id="cancelButton" value="Cancel"></input></form>').insertAfter(this).parent('li');

			//edit contents
			$('#editForm').submit(function(){
				var newItem = $('#editBox').val();
				editItem(thisValue, thisID, newItem);
				$(this).parent('li').children('span').html(newItem);

				//remove edit form
				$('#editForm').remove();
			});

			$('#cancelButton').click(function(){
				$('#editForm').remove();
			});
		}else{
    		//A textbox already out; do nothing.
    	}
    });
});
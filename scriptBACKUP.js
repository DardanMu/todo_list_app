jQuery(document).ready(function($) {
	//global variables/functions
	var currentCountInc = JSON.parse(localStorage.getItem("userList")).length + 1;
	var secondsVar = new Date().getTime() / 1000;0
	var itemListArray = JSON.parse(localStorage.getItem("userList"));


//user Input object constructor
function itemObjectConstruct(id, item, complete)
{
	this.id=id;
	this.item=item;
	this.complete=complete;
}

function deleteItem(thisValue){
	for(var i=0;i<itemListArray.length;i++){
		var objectItem = itemListArray[i];
   		if(objectItem.item === thisValue){ 
   			itemListArray.splice(i,1);
   			localStorage.setItem("userList", JSON.stringify(itemListArray));
   			return true;
   		}

	}
}


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

			//window.localStorage.setItem(secondsVar, userInput);
			$('<li><span class="listText">' +newItem.item+ '</span> <button id="strikeOff">&#10003;</button> <button id="delete">&#10007;</button> <button id="edit">EDIT</button> </li>').appendTo('#list');

			//return false;
		};
	});

	//scrach off completed items / Toggle CSS class
	$("#strikeOff").live('click', function(){
		$(this).parent('li').toggleClass('done');
	});

	//delete items
	$("#delete").live('click', function(){
		//the text in the list that was clicked
		var thisValue = $(this).parent('li').children('span').text();
		//call the delete function above
		deleteItem(thisValue);


		$(this).parent('li').remove();
	});

	//edit items
	$("#edit").live('click', function(){

		if($('#editBox').length === 0){
			var currentItem = $(this).parent('li').children('span').text();

			$('<form id="editForm"><textarea id="editBox">' + currentItem + '</textarea> <button id="confirmButton">Confirm</button> <input type="button" id="cancelButton" value="Cancel"></input></form>').insertAfter(this).parent('li');

			//edit contents
			$('#editForm').submit(function(){
				var newItem = $('#editBox').val();

				$(this).parent('li').children('span').html(newItem);



				//remove edit form
				$('#editForm').remove();

				return false;
			});

			$('#cancelButton').click(function(){
				$('#editForm').remove();
			});

		}else{
    		//Textbox already out, do nothing.
    	}
    });

});
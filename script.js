jQuery(document).ready(function($) {
	$('#addToList').submit(function(){

		var userInput = $('#userInput').val();
		$('#userInput').val("");

		if(userInput === ""){
			return false;
		}else{

			$('<li><span class="listText">' +userInput+ '</span> <button id="strikeOff">&#10003;</button> <button id="delete">&#10007;</button> <button id="edit">EDIT</button> </li>').appendTo('#list');

			return false;
		};
	});

	//scrach off completed items
	$("#strikeOff").live('click', function(){
		$(this).parent('li').toggleClass('done');
	});

	//delete items
	$("#delete").live('click', function(){
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
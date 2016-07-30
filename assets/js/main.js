var mousePosition = {x: -1, y: -1};

function addStickyNote(boardElem) {
	var newNote = $("<div/>").addClass('sticky');

	var noteTitle = $("<textarea/>").prop("placeholder", "Title").addClass('sticky-title');
	var noteContent = $("<textarea/>").prop("placeholder", "Write Something").addClass('sticky-content')
	var deleteButton = $("<a/>").text("x").addClass("sticky-delete-button");
	deleteButton.click(function(e) {
		newNote.fadeOut('200', function() {
			newNote.remove(); 
		});
	});
	noteTitle.appendTo(newNote);
	deleteButton.appendTo(newNote);
	noteContent.appendTo(newNote);

	newNote.appendTo(boardElem);
}


function init() {
	//initiate styles
	var numPanels = $(".board-elem").length;
	$(".board-elem").css('width', "" + 99/numPanels + "%");

	//mouse tracking init : http://stackoverflow.com/questions/4517198/how-to-get-mouse-position-in-jquery-without-mouse-events
	$( document ).mousemove(function(event) {
		mousePosition.x = event.pageX;
		mousePosition.y = event.pageY;
	});

	//http://www.kidsil.net/2011/05/jquery-click-excluding-child/
	$( ".board-elem" ).click(function(data, handler) {
		if (data.target === this) {
			addStickyNote($(this));
		}
	});
}   



$( document ).ready(function () {
	init();
});
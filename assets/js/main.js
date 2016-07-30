var mousePosition = {x: -1, y: -1};

function getBoardWidth() {
	return $(".board").width();
}

function getBasePixels() {
	return parseFloat($("body").css("font-size"));
}

function pixelsToRem(pixels) {
	return pixels/getBasePixels();
}

function remToPixels(rem) {
	return rem*getBasePixels();
}

function addStickyNote(boardElem) {
	var newNote = $("<div/>").addClass('sticky');

	var noteTitle = $("<textarea/>").prop("placeholder", "Title").addClass('sticky-title');
	var noteContent = $("<textarea/>").prop("placeholder", "Write Something").addClass('sticky-content')
	var deleteButton = $('<a/>').addClass("sticky-delete-button");
	$('<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>').appendTo(deleteButton);
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


function resizeBoardElements() {
	var numPanels = $(".board-elem").length;
	var offset = remToPixels(0.2);
	// var offset = 0;
	var boardElementWidthInPixels = (getBoardWidth() - offset)/numPanels;
	// console.log(offset, getBoardWidth(), boardElementWidthInPixels);
	$(".board-elem")
	.css({
		'width': boardElementWidthInPixels
 	});
}

function init() {
	//initiate styles
	resizeBoardElements();

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

$( window ).resize( function() {
	resizeBoardElements(); 
});

$( document ).ready(function () {
	init();
});


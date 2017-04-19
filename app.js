var state = {
    items: [],
};

// State modification functions
var addItem = function(state, item) {
    state.items.push(item);
};

// Render functions
var renderList = function(state, element) {
	var shoppingControls = '<div class="shopping-item-controls"><button class="shopping-item-toggle"><span class="button-label">check</span></button><button class="shopping-item-delete"><span class="button-label">delete</span></button></div>';
    var itemsHTML = state.items.map(function(item) {
        return '<li><span class="shopping-item">' + item + '</span>' + shoppingControls + '</li>';
    });
    element.append(itemsHTML);
};

var toggleItem = function(element, toggledClass) {
	element.closest("li").find(".shopping-item").toggleClass(toggledClass);
};

var deleteItem = function(state, element) {
	var index = state.items.indexOf(element.closest("li").find(".shopping-item").text());
	if(index > -1) {
		state.items.splice(index, 1);
	}
	element.closest("li").remove();
};

// Event listeners
$('#js-shopping-list-form').submit(function(event) {
    event.preventDefault();
    addItem(state, $('#shopping-list-entry').val());
    renderList(state, $('.shopping-list'));
});

$('.shopping-list').on("click",".shopping-item-toggle",function(event) {
	toggleItem($(this),"shopping-item__checked");
});

$('.shopping-list').on("click",".shopping-item-delete",function(event) {
	deleteItem(state, $(this));
});
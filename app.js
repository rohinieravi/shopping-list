var state = {
    items: [],
};

// State modification functions
var addItem = function(state, item) {
	var itemObj = {
		itemName: item,
		checked: false
	};
    state.items.push(itemObj);
};

var toggleItem = function(state, item) {
	var index = getItemIndex(state, item);
	if(index > -1) {
		state.items[index].checked = !state.items[index].checked;
	}
};

var deleteItem = function(state, item) {
	var index = getItemIndex(state, item);
	if(index > -1) {
		state.items.splice(index, 1);
	}
};

var getItemIndex = function(state, item) {
	var items = state.items.map(function(val) { return val.itemName;});
	return items.indexOf(item);
};

// Render functions
var renderList = function(state, element) {
	var shoppingControls = 
	'<div class="shopping-item-controls">'+
	'	<button class="shopping-item-toggle">'+
	'		<span class="button-label">check</span>'+
	'	</button>'+
	'	<button class="shopping-item-delete">'+
	'		<span class="button-label">delete</span>'+
	'	</button>'+
	'</div>';
    var itemsHTML = state.items.map(function(item) {
        var newElem = $('<li><span class="shopping-item">' + item.itemName + '</span>' + shoppingControls + '</li>');
        newElem.find(".shopping-item").toggleClass('shopping-item__checked',item.checked);
        return newElem;
    });
    element.html(itemsHTML);
};

var renderToggledItem = function(element, toggledClass) {
	element.closest("li").find(".shopping-item").toggleClass(toggledClass);
};

var renderDeletedItem = function(element) {
	element.closest("li").remove();
};

// Event listeners
$('#js-shopping-list-form').submit(function(event) {
    event.preventDefault();
    addItem(state, $('#shopping-list-entry').val());
    renderList(state, $('.shopping-list'));
});

$('.shopping-list').on("click",".shopping-item-toggle",function(event) {
	toggleItem(state, $(this).closest("li").find(".shopping-item").text());
	renderToggledItem($(this),"shopping-item__checked");
});

$('.shopping-list').on("click",".shopping-item-delete",function(event) {
	deleteItem(state, $(this).closest("li").find(".shopping-item").text());
	renderDeletedItem($(this));
});
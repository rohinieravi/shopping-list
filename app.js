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

// Render functions
var renderList = function(state, element) {
	var shoppingControls = '<div class="shopping-item-controls">'+
		'<button class="shopping-item-toggle">'+
		'<span class="button-label">check</span>'+
		'</button>'+
		'<button class="shopping-item-delete">'+
		'<span class="button-label">delete</span>'+
		'</button></div>';
    var itemsHTML = state.items.map(function(item) {
        var newElem = $('<li><span class="shopping-item">' + item.itemName + '</span>' + shoppingControls + '</li>');
        newElem.find(".shopping-item").toggleClass('shopping-item__checked',item.checked);
        return newElem;
    });
    element.html(itemsHTML);
};

var toggleItem = function(state, element, toggledClass) {
	var item = element.closest("li").find(".shopping-item").text();
	var index = state.items.map(function(val) { return val.itemName;}).indexOf(item);
	//var index = state.items.indexOf(element.closest("li").find(".shopping-item").text());
	if(index > -1) {
		state.items[index].checked = !state.items[index].checked;
	}
	element.closest("li").find(".shopping-item").toggleClass(toggledClass);
};

var deleteItem = function(state, element) {
	var item = element.closest("li").find(".shopping-item").text();
	var index = state.items.map(function(val) { return val.itemName;}).indexOf(item)
	//var index = state.items.indexOf(element.closest("li").find(".shopping-item").text());
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
	toggleItem(state, $(this),"shopping-item__checked");
});

$('.shopping-list').on("click",".shopping-item-delete",function(event) {
	deleteItem(state, $(this));
});

function newIngredient() {
	var $group = $('#group-ingredients');

	$group.append('<input type="text" name="ingredients1[]" placeholder="Ingredient Name">');
	$group.append('<input type="text" name="ingredients2[]" placeholder="Quantity, and other details"><br>')
}

function removeIngredient() {
	var $group = $('#group-ingredients');

	$group.find('input:last').remove();
	$group.find('input:last').remove();
	$group.find('br:last').remove();
}
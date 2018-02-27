
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

//write validation that a recipe with this name does not already exist.
//by default, set() overwrites any data in that path.
// include username and imageUrl

function writeUserData(recipeName, ingredients1[], ingredients2[]) {
  firebase.database().ref('Recipes/' + recipeName + '/Instructions').set({
    //posted by: username,
    //profile_picture : imageUrl
	ingredients1[0]: ingredients2[0]
  });
}
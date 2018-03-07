var numberOfInstructions = 1;

function newIngredient() {
	var $group = $('#group-ingredients');

	$group.append('<input type="text" name="ingredients1[]" placeholder="Ingredient Name"> ');
	$group.append('<input type="text" name="ingredients2[]" placeholder="Quantity, and other details"><br>')
}

function newInstruction() {
	var $group = $('#group-instructions');

	numberOfInstructions += 1;
	$group.append('<input type="text" name="instructions[]" placeholder="Step ' + numberOfInstructions + '"><br>')
}

function removeIngredient() {
	var $group = $('#group-ingredients');

	$group.find('input:last').remove();
	$group.find('input:last').remove();
	$group.find('br:last').remove();
}

function removeInstruction() {
	var $group = $('#group-instructions');

	$group.find('input:last').remove();
	$group.find('br:last').remove();
	if(numberOfInstructions > 0)
		numberOfInstructions -= 1; 
}

//write validation that a recipe with this name does not already exist.
//by default, set() overwrites any data in that path.

function writeUserData(recipeName, ingredients1, ingredients2, instructions, meal_type) {		// ingredients and instructions are node list objects
	  
	for(i = 0; i < ingredients1.length; i++)
	{
		firebase.database().ref('Recipes/' + recipeName + '/Ingredients').child(ingredients1[i].value).set(ingredients2[i].value);
	}

	for(i = 0; i < instructions.length; i++)
	{
		var temp = "Instruction " + (i+1);
		firebase.database().ref('Recipes/' + recipeName + '/Instructions').child(temp).set(instructions[i].value);
	}

	firebase.database().ref('Recipes/' + recipeName).child("Meal Type").set(meal_type);
	//firebase.database().ref('Recipes/' + recipeName).child("Ethnicity").set(ethnicity[0].value);


	var user = firebase.auth().currentUser;
	firebase.database().ref('Recipes/' + recipeName).child("Posted by").set(user.displayName);

      //profile_picture : imageUrl
}
var numberOfInstructions = 1;
//This will put the user's made recipes into the listbox for editing.
function getUserRecipes(){

	var userRef = firebase.database().ref().child('User Profiles/');
	var userEmail;

	console.log('HOOH');
	firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
		console.log(user.email);
		userEmail = user.email;
		userRef.orderByChild('Email').equalTo(userEmail).once("value", function(snapshot) {
			snapshot.forEach(function(uname) {
				 console.log(uname.child("displayName").val());
				  listOptions(uname.child("displayName").val());
			 });
		});
  } else {
    // No user is signed in.
	console.log('nah');
  }
});
}
function listOptions(name){
	var $group = $('#group-recipelist');
	var dfRecipeObject = firebase.database().ref().child('Recipes/');
	dfRecipeObject.orderByChild('Posted by').equalTo(name).once('value', snap =>{
		snap.forEach(function(child){
			console.log('Made it inside '+child.key);

			$group.append(
				$(document.createElement('option')).html(child.key)
				//'<option value="'+child.key+'">'+child.key+'</option>'
			);
		});
	});
}

function loadRecipe(){
	var selected = document.getElementById("group-recipelist");
	var recipe = selected.options[selected.selectedIndex].value;

	freshPullIngredients(recipe);

}

function checkRecipe(){
	var selected = document.getElementById("group-recipelist");
	var recipe = selected.options[selected.selectedIndex].value;

	return recipe;
}

function freshPullIngredients(recipe){
	resetIngredients();
	pullIngredient(recipe);
	resetInstructions();
	pullInstruction(recipe);
}

function newIngredient(){
	var $group = $('#group-ingredients');

	$group.append('<input type="text" name="ingredients1[]" placeholder="Ingredient Name"> ');
	$group.append('<input type="text" name="ingredients2[]" placeholder="Quantity, and other details"><br>');
}

function pullIngredient(recipe){
	var $group = $('#group-ingredients');
	var dfIngreObject = firebase.database().ref().child('Recipes/').child(recipe).child('Ingredients/');
	dfIngreObject.once('value', snap =>{
		snap.forEach(function(child){
			console.log('Made it inside '+child.key);
			$group.append('<input type="text" name="ingredients1[]" placeholder="Ingredient Name" value="'+child.key+'"> ');
			$group.append('<input type="text" name="ingredients2[]" placeholder="Quantity, and other details" value="'+child.val()+'"><br>');
		});
	});
}

function pullInstruction(recipe){
	var $group = $('#group-instructions');
	var dfInstObject = firebase.database().ref().child('Recipes/').child(recipe).child('Instructions/');
	dfInstObject.once('value', snap =>{
		snap.forEach(function(child){
			console.log('Made it inside '+child.key);
			numberOfInstructions += 1;
			$group.append('<input type="text" name="instructions[]" placeholder="Step '+ numberOfInstructions +'" value="'+child.val()+'"><br>');
		});
	});
}
function resetIngredients(){
	var $group = $('#group-ingredients');
	$group.empty();
}

function resetInstructions(){
	numberOfInstructions = 0;
	var $group = $('#group-instructions');
	$group.empty();
}

function newInstruction() {
	var $group = $('#group-instructions');

	numberOfInstructions += 1;
	$group.append('<input type="text" name="instructions[]" placeholder="Step ' + numberOfInstructions + '"><br>');
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

function writeUserData(recipeName, ingredients1, ingredients2, instructions, meal_type, servings, img) {		// ingredients and instructions are node list objects
	//firebase.database().ref('Recipes/' + recipeName + 'Ingredients').remove();
	//firebase.database().ref('Recipes/' + recipeName + 'Instructions').remove();
	
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
	firebase.database().ref('Recipes/' + recipeName).child("Servings").set(servings);

	var user = firebase.auth().currentUser;
	firebase.database().ref('Recipes/' + recipeName).child("Posted by").set(user.displayName);
	console.log(user.displayName);
	console.log(user.email);
	console.log(user.uid);
	
	if(document.getElementById("img").value != "") {
		var fileName = recipeName + '.jpg';
		fileName = fileName.toLowerCase();
		fileName = fileName.replace( / /g, "_");
		firebase.database().ref('Recipes/' + recipeName).child("picRef").set(fileName);

		var ref = firebase.storage().ref('Recipes/').child(fileName);
		ref.put(img.files[0]);
	}

}

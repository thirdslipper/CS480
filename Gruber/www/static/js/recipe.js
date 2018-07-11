// const $thumbnails = $('.thumbnails');
var thumbnails = document.getElementById("thumbnails");
//default directory
var recipe_directory = "Recipes/";
var searchType = "recipe_search";
//array of button searches
var button_array = [];
var newFilter = "";

//recipe search on 'enter' functions
var searchBar = document.getElementById("recipe_search");
searchBar.addEventListener("keyup", function(event) {
  event.preventDefault();
  if (event.keyCode === 13)
    document.getElementById("recipe_search_button").click();
});
var ingredientSearch = document.getElementById("ingredient_search");
ingredientSearch.addEventListener("keyup", function(event) {
  event.preventDefault();
  if (event.keyCode === 13) {
    newFilter = ingredientSearch.value;
    //tag handling
    var tags_element = document.getElementById('tags');
    var tag_button = $('<button type="button" class="'+newFilter+'" onclick="removeButton(\''+newFilter+'\')">'+newFilter+' &#x274C </button>').appendTo(tags_element);
    button_array.push(newFilter);

    searchType = "ingredient_search";
    newSearch();
    searchType = "recipe_search";
  }
});

function organizedDisplay(){
  var isDisplayPage = false;
  if (thumbnails.innerHTML == "Show Here!") {
    isDisplayPage = true;
    recipe_directory = getQuerystring('recipe').replace(/%20/g," ").toString();
    thumbnails.innerHTML = "";
  }
  var dbRefObject = firebase.database().ref().child(recipe_directory);
  var hold = recipe_directory;

  var div = $('<div onclick="passTitle(\''+ hold +'\')" style="width:220px;">').appendTo(thumbnails);
  var pic = $('<img src="""/>').appendTo(div);
  var title = $('<h2 style="text-align:center; color:#243010;">').appendTo(div);

  if (isDisplayPage) {
	var ultitle = $('<h3>').appendTo(thumbnails);
    var ul = $('<ul>').appendTo(thumbnails);
	var ulnontitle = $('<h3>').appendTo(thumbnails);
    var ulnon = $('<ul style="list-style-type:none">').appendTo(thumbnails);
  }

  inOrderDisplay(
    function(){
  var dbPicObject = dbRefObject.child('picRef/');
  var stPicObject = firebase.storage().ref('Recipes/');
  var fileURL = dbPicObject.on('value', function(snap){
    // console.log("snap val is: " + snap.val());

  stPicObject.child(snap.val()).getDownloadURL().then(function(url){
    var key = ('<img src="'+ url +'" style="display:block; max-width:200px;max-height:200px;border:5px solid #243010; margin-left:auto; margin-right:auto;">');
    // console.log("here is key: "+key);
    pic.replaceWith(key);
    hold = hold.substring(0, hold.length-1);
    title.append(hold.substring(8));

  }).catch(function(error){});
  });
},function(){
  if (isDisplayPage) {
  var dbIngreObject = dbRefObject.child('Ingredients/');
  ul.prepend(ultitle);
  ultitle.append("Ingredients: ");
  dbIngreObject.on('value', snap => {
    snap.forEach(function(child){
      ul.append(
        $(document.createElement('li')).html(child.key + ": " + child.val())
      );
    });
  });
}},function(){
  if (isDisplayPage) {
  var dbInstrObject = dbRefObject.child('Instructions/');
  ulnon.prepend(ulnontitle);
  ulnontitle.append('Instructions: ');
  dbInstrObject.on('value', snap => {
    snap.forEach(function(child){
      ulnon.append(
        $(document.createElement('li')).html(child.key.substring(12) +": "+child.val())
      );
    });
  });
}}
)}

function inOrderDisplay() {
    var items = arguments;
    if (items.length <= 0)
        return;
    (function linkTogether(i) {
        if (i >= items.length || typeof items[i] !== 'function'){
            return;}
        window.setTimeout(function() {
            items[i]();
            linkTogether(i + 1);}, 500);
	})(0);
}

function newSearch() {
  emptyScreen();
  //console
  for (i = 0; i < button_array.length; i++) {
    console.log("b_a["+i+"]: "+button_array[i]);
  }
  document.getElementById(searchType).select();
  if (searchType == "recipe_search")
    var searchWord = document.getElementById(searchType).value.toLowerCase();
  else {
    var searchWord = newFilter.toLowerCase();
  }
  var dbRefObject = firebase.database().ref().child('Recipes/');
  dbRefObject.on('value', snap => {
    //search each recipe
    snap.forEach(function(child){
      var dbRecipeObj = dbRefObject.child(child.key + "/");
      var dbIngreObject = dbRecipeObj.child('Ingredients/');
      var recipe_loaded = false;
      //create tag organizer
      var tags_matched = [];
      var num_ingredients = 0;
      var num_matched = 0;
      for (i=0;i<button_array.length;i++)
        tags_matched[i] = false;
      //search each ingredient
      dbIngreObject.on('value', snap => {
        snap.forEach(function(child){
          num_ingredients++;//ADD
          ingredient_matched = "false";//ADD
          if (searchType == "recipe_search"){
            var search_result = child.key.toLowerCase().search(searchWord);
            recipe_loaded = processSearch(recipe_loaded, search_result, dbRecipeObj.key);
          }
          //if using filters
          else {
            //check each ingredient in filter list
            for (i = 0; i < button_array.length; i++) {
              var search_result = child.key.toLowerCase().search(button_array[i]);
              //if found first time - [tag] in [ingredient description]
              if (search_result != -1){
                ingredient_matched = "true";//ADD
                if (tags_matched[i] != "true") {
                  tags_matched[i] = "true";
                  console.log("Found '"+button_array[i]+"' in: "+child.key+"["+dbRecipeObj.key+"]");
                }
              }
            }
            if (ingredient_matched == "true")
              num_matched++;
          }
        });
      });
      // if (searchType == "ingredient_search") {
      //   var complete = "true";
      //   for (i=0;i<tags_matched.length;i++) {
      //     console.log("checking if tag["+i+"] is matched in: "+dbRecipeObj.key);
      //     if(tags_matched[i] != "true"){
      //       complete = "false";
      //       console.log(dbRecipeObj.key+": is incomplete.");
      //     }
      //   }
      //   if (complete == "true") {
      //     organizedDisplay();
      //   }
      // }
      if (searchType == "ingredient_search") {
        if (num_matched == button_array.length){
          recipe_directory = "Recipes/" + dbRecipeObj.key + "/";
          organizedDisplay();
        }
      }
      if (searchType == "recipe_search") {
        //search recipe names
        var n = dbRecipeObj.key.toLowerCase().search(searchWord);
        recipe_loaded = processSearch(recipe_loaded, n, dbRecipeObj.key);
        //search meal type
        var meal_type = dbRecipeObj.child('Meal Type/');
        meal_type.on('value', snap => {
          var mt = snap.val();
          var n = mt.toLowerCase().search(searchWord);
          // console.log("meal type value: "+mt);
          recipe_loaded = processSearch(recipe_loaded, n, dbRecipeObj.key);
        });
      }
    });
  });
}

function uploadRecipe() {
  var loader = document.getElementById('loader');
  loader.innerHTML = "";
}

function emptyScreen() {
  document.getElementById("loader").innerHTML = "";
  document.getElementById("thumbnails").innerHTML = "";
}

function passTitle(p) {
  window.location = "recipeDisplay.html?recipe=" + p;
}

function getQuerystring(key, default_) {
  if (default_==null) default_="";
  key = key.replace(/[\\[]/,"\\\\\\[").replace(/[\\]]/,"\\\\\\]");
  var regex = new RegExp("[\\\\?&]"+key+"=([^&#]*)");
  var qs = regex.exec(window.location.href);
  if(qs == null)
    return default_;
  else
    return qs[1];
}

function processSearch(recipe_loaded, n, key) {
  if (recipe_loaded == true) {
    //if recipe already loaded, do nothing
  } else {
    if (n != -1) {
      //if matched, display
      recipe_directory = "Recipes/" + key + "/";
      organizedDisplay();
      recipe_loaded = true;
    } else {
      //recipe name didn't match
    }
  }
  return recipe_loaded;
}

function processFilter(recipe_loaded, n, key) {
  if (recipe_loaded == true) {
    //if recipe already loaded, do nothing
  } else {
    if (n != -1) {
      //if matched, display
      // recipe_directory = "Recipes/" + key + "/";
      // organizedDisplay();
      recipe_loaded = true;
    } else {
      //recipe name didn't match
    }
  }
  return recipe_loaded;
}

function removeButton(string) {
  console.log("removing: " + string);
  $("button").remove("." + string);
  //remove from array of search terms
  var count = 0;
  var replace_array = [];
  for (i = 0; i < button_array.length; i++) {
    if (button_array[i] != string) {
      //if tag is not being removed, transfer
      replace_array[count] = button_array[i];
      count++;
    }
  }
  button_array = replace_array;
  //reload page
  searchType = "ingredient_search";
  newSearch();
  searchType = "recipe_search";
}

function profileSearch() {
  emptyScreen();
  //console
  var dbRefObject = firebase.database().ref().child('Recipes/');
  dbRefObject.on('value', snap => {
    //search each recipe
    snap.forEach(function(child){
      var dbRecipeObj = dbRefObject.child(child.key + "/");
      var dbIngreObject = dbRecipeObj.child('Ingredients/');
      var recipe_loaded = false;


      if (searchType == "ingredient_search") {
          recipe_directory = "Recipes/" + dbRecipeObj.key + "/";
          organizedDisplay();
      }
    });
  });
}

function getProfile(){
	var userRef = firebase.database().ref().child('User Profiles/');
	var userEmail;

	firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
		console.log(user.email);
		userEmail = user.email;
		userRef.orderByChild('Email').equalTo(userEmail).once("value", function(snapshot) {
			snapshot.forEach(function(uname) {
				 console.log(uname.child("displayName").val());
				 document.getElementById("tags").innerHTML = "<h2>"+uname.child("displayName").val()+"'s Profile Page</h2>";
				 document.getElementById("loader").innerHTML = "<h2>"+uname.child("displayName").val()+"'s Recipes</h2>";
				  listProfileRecipes(uname.child("displayName").val());
			 });
		});
  } else {
    // No user is signed in.
	console.log('nah');
  }
});
}
function listProfileRecipes(name){
	var dfRecipeObject = firebase.database().ref().child('Recipes/');
	dfRecipeObject.orderByChild('Posted by').equalTo(name).once('value', snap =>{
		snap.forEach(function(child){
			console.log('Made it inside '+child.key);
			recipe_directory = "Recipes/" + child.key + "/";
			profileDisplay();
		});
	});
}

function profileDisplay(){

  var dbRefObject = firebase.database().ref().child(recipe_directory);
  var hold = recipe_directory;

  var div = $('<div onclick="passTitle(\''+ hold +'\')" style="width:220px;">').appendTo(thumbnails);
  var pic = $('<img src="""/>').appendTo(div);
  var title = $('<h2 style="text-align:center; color:#243010;">').appendTo(div);

  var dbPicObject = dbRefObject.child('picRef/');
  var stPicObject = firebase.storage().ref('Recipes/');
  var fileURL = dbPicObject.on('value', function(snap){
    // console.log("snap val is: " + snap.val());

  stPicObject.child(snap.val()).getDownloadURL().then(function(url){
    var key = ('<img src="'+ url +'" style="display:block; max-width:200px;max-height:200px;border:5px solid #243010; margin-left:auto; margin-right:auto;">');
    // console.log("here is key: "+key);
    pic.replaceWith(key);
    hold = hold.substring(0, hold.length-1);
    title.append(hold.substring(8));

  }).catch(function(error){});
  });
}

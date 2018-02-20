// create data dump

//loader element <p>
const preObject = document.getElementById("loader");

//default search term
var searchTerm = "Recipes/";
//var searchTerm1 = "";


//recipe search on 'enter' function
var searchInput = document.getElementById("recipe_search");
searchInput.addEventListener("keyup", function(event) {
  event.preventDefault();
  if (event.keyCode === 13)
    document.getElementById("recipe_search_button").click();
});

//onclick function
function displayFunction() {
  //firebase object
  var dbRefObject = firebase.database().ref().child(searchTerm);
  // dbRefObject.on('value', snap => {
  //   preObject.innerHTML = JSON.stringify(snap.val(), null, 5);
  // });
  var dbIngreObject = dbRefObject.child('Ingredients/');
  var dbInstrObject = dbRefObject.child('Instructions/');
  var hold;
  //$(preObject).remove();
  //var json = { items: ['item 1', 'item 2', 'item 3'] };
  var title = $('<p>').appendTo(preObject);
    title.append(searchTerm.substring(8));
  var picurl = $('<p>').appendTo(preObject);
      picurl.append("Picture of tasty food go here.");
  var ul = $('<ul>').appendTo(preObject);
  var ulnon = $('<ul style="list-style-type:none">').appendTo(preObject);

  dbIngreObject.on('value', snap => {
    snap.forEach(function(child){
      ul.append(
        $(document.createElement('li')).html(child.val())
      );
    });
  });
  dbInstrObject.on('value', snap => {
    snap.forEach(function(child){
      ulnon.append(
        $(document.createElement('li')).html(child.key +": "+child.val())
      );
	  if (child.key == "Instruction 1") {
        // document.getElementById("loader").innerHTML = "DETECTED!";
      }
    });
  });
  // $(dbIngreObject).forEach(function(snapshot) {
  //   ul.append(
  //     $(document.createElement('li')).text(snapshot)
  //   );
  // });
  //preObject.innerHTML = ul;
}

/* Change index.html file onclick to SearchRecipes or searchRecipes1. 
	Currently set to searchRecipes1, which searches for an ingredient. 
*/

// search recipes by name
function searchRecipes() {
  searchTerm += document.getElementById("recipe_search").value;
  displayFunction();
  searchTerm = "Recipes/"
}

// search recipes by ingredients
function searchRecipes1() {
  document.getElementById("loader").innerHTML = "";
  var searchWord = document.getElementById("recipe_search").value;
  var dbRefObject = firebase.database().ref().child('Recipes/');
  dbRefObject.on('value', snap => {
    snap.forEach(function(child){
      var dbRecipeObj = dbRefObject.child(child.key + "/");
      var dbIngreObject = dbRecipeObj.child('Ingredients/');
      var flag = false;
      dbIngreObject.on('value', snap => {
        snap.forEach(function(child){
          var n = child.val().search(searchWord);
          if (flag != false) {
            //if 'found' true, do nothing
          } else {
            if (n != -1) {
              searchTerm = "Recipes/" + dbRecipeObj.key + "/";
              displayFunction();
              // document.getElementById("loader").innerHTML = "Detected!";
              flag = true;
            } else {
              // document.getElementById("loader").innerHTML = "Nothing!";
            }
          }
        });
      });
    });
  });
  // searchTerm1 += document.getElementById("recipe_search").value;
  // displayFunction();
  // searchTerm1 = "Recipes/";
}
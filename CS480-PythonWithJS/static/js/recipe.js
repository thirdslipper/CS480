//loader element <p>
var webPage = document.getElementById("loader");
const $thumbnails = $('.recipe_display');
//default search term
var searchTerm = "Recipes/";

//recipe search on 'enter' function
var searchBar = document.getElementById("recipe_search");
searchBar.addEventListener("keyup", function(event) {
  event.preventDefault();
  if (event.keyCode === 13)
    document.getElementById("recipe_search_button").click();
});

//onclick function
function displayFunction() {
  //firebase object
  var dbRefObject = firebase.database().ref().child(searchTerm);
  var dbIngreObject = dbRefObject.child('Ingredients/');
  var dbInstrObject = dbRefObject.child('Instructions/');
  var hold;
  //$(preObject).remove();
  var title = $('<p>').appendTo(webPage);
      title.append(searchTerm.substring(8));
  var picurl = $('<p>').appendTo(webPage);
      picurl.append("Picture of tasty food go here.");
  var ul = $('<ul>').appendTo(webPage);
  var ulnon = $('<ul style="list-style-type:none">').appendTo(webPage);

  dbIngreObject.on('value', snap => {
    snap.forEach(function(child){
      ul.append(
        $(document.createElement('li')).html(child.key + ": " + child.val())
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

function display_thumbnail() {
  $thumbnails.append('<img src="firebase-storage/img1"/>');
}

function searchRecipes1() {
  emptyScreen();
  var searchWord = document.getElementById("recipe_search").value.toLowerCase();
  var dbRefObject = firebase.database().ref().child('Recipes/');
  dbRefObject.on('value', snap => {
    snap.forEach(function(child){
      var dbRecipeObj = dbRefObject.child(child.key + "/");
      var dbIngreObject = dbRecipeObj.child('Ingredients/');
      var flag = false;
      dbIngreObject.on('value', snap => {
        snap.forEach(function(child){
          // var n = child.val().search(searchWord);
          var n = child.key.toLowerCase().search(searchWord);
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
}

function uploadRecipe() {
  var loader = document.getElementById('loader');
  loader.innerHTML = "";
}

function emptyScreen() {
  document.getElementById("loader").innerHTML = "";
}

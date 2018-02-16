// create data dump

//loader element <p>
const preObject = document.getElementById("loader");

//default search term
var searchTerm = "Recipes/";

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
  dbRefObject.on('value', snap => {
    preObject.innerHTML = JSON.stringify(snap.val(), null, 5);
  });
}

function searchRecipes() {
  searchTerm += document.getElementById("recipe_search").value;
  displayFunction();
  searchTerm = "Recipes/"
}

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
  // dbRefObject.on('value', snap => {
  //   preObject.innerHTML = JSON.stringify(snap.val(), null, 5);
  // });
  var dbIngreObject = dbRefObject.child('Ingredients/');
  var oiegm;
  var ul = $('<ul>').appendTo('body');
  //var json = { items: ['item 1', 'item 2', 'item 3'] };
  dbIngreObject.on('value', snap => {
    snap.forEach(function(child){
      ul.append(
        $(document.createElement('li')).text(child.key +": "+child.val())
      );

    });
  });
  // $(dbIngreObject).forEach(function(snapshot) {
  //   ul.append(
  //     $(document.createElement('li')).text(snapshot)
  //   );
  // });
  //preObject.innerHTML = ul;
}

function searchRecipes() {
  searchTerm += document.getElementById("recipe_search").value;
  displayFunction();
  searchTerm = "Recipes/"
}

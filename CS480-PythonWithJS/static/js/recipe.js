//loader element <p>
var webPage = document.getElementById("loader");
// const $thumbnails = $('.thumbnails');
var thumbnails = document.getElementById("thumbnails");
//default search term
var searchTerm = "Recipes/";

//recipe search on 'enter' function
var searchBar = document.getElementById("recipe_search");
searchBar.addEventListener("keyup", function(event) {
  event.preventDefault();
  if (event.keyCode === 13)
    document.getElementById("recipe_search_button").click();
});

function organizedDisplay(){
  var dbRefObject = firebase.database().ref().child(searchTerm);
  var hold = searchTerm;
  var pic = $('<img src="" style="width:200px;height:200px;"/>').appendTo(thumbnails);
  var title = $('<p>').appendTo(thumbnails);
  // var ul = $('<ul>').appendTo(webPage);
  // var ulnon = $('<ul style="list-style-type:none">').appendTo(webPage);

  loop(
    function(){
  var dbPicObject = dbRefObject.child('picRef/');
  var stPicObject = firebase.storage().ref('Recipes/');
  var fileURL = dbPicObject.on('value', function(snap){
    console.log("snap val is: " + snap.val());

  stPicObject.child(snap.val()).getDownloadURL().then(function(url){
    // var key = ('<a onclick="passTitle(' + searchTerm + ')" href="recipeDisplay.html"><img src="'+ url +'" style="width:200px;height:200px;"></a>');
    // var key = ('<a onclick="passTitle("Jorge")" href="recipeDisplay.html"><img src="'+ url +'" style="width:200px;height:200px;"></a>');
    var key = ('<img src="'+ url +'" onclick="passTitle(\''+ hold +'\')" style="width:200px;height:200px;">');
    console.log("here is key: "+key);
    //$(key).appendTo(webPage);
    pic.replaceWith(key);
    hold = hold.substring(0, hold.length-1);
    title.append(hold.substring(8));

    //var picurl = $(key).appendTo(webPage);
  }).catch(function(error){});
  });
},function(){

  var dbIngreObject = dbRefObject.child('Ingredients/');
  dbIngreObject.on('value', snap => {
    snap.forEach(function(child){
      ul.append(
        $(document.createElement('li')).html(child.key + ": " + child.val())
      );
    });
  });
},function(){

  var dbInstrObject = dbRefObject.child('Instructions/');

  dbInstrObject.on('value', snap => {
    snap.forEach(function(child){
      ulnon.append(
        $(document.createElement('li')).html(child.key +": "+child.val())
      );
    });
  });
}
)}

function loop() {
    var args = arguments;
    if (args.length <= 0)
        return;
    (function chain(i) {
        if (i >= args.length || typeof args[i] !== 'function')
            return;
        window.setTimeout(function() {
            args[i]();
            chain(i + 1);
        }, 1000);
    })(0);
}

function searchRecipes() {
  emptyScreen();
  document.getElementById("recipe_search").select();
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
              organizedDisplay();
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
  document.getElementById("thumbnails").innerHTML = "";
}

function passTitle(p) {
  window.location = "recipeDisplay.html?recipe=" + p;
}

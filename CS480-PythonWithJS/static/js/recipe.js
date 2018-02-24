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
function displayFunction(){
  //firebase object
  var dbRefObject = firebase.database().ref().child(searchTerm);
  var dbIngreObject = dbRefObject.child('Ingredients/');
  var dbInstrObject = dbRefObject.child('Instructions/');
  //Added this to access the filename in database. Jorge
  var dbPicObject = dbRefObject.child('picRef/');
  //Added this to traverse the Recipe directory in the storage system. Jorge
  var stPicObject = firebase.storage().ref('Recipes/');
  //This is to get the value from picRef in database. Jorge

  //This gets the getDownloadURL for the filename from searching in storage, if it worked. Jorge
  //stPicObject.child(fileURL).getDownloadURL().then(function(url){
  //}).catch(function(error){});

  //$(preObject).remove();
  var title = $('<p>').appendTo(webPage);
      title.append(searchTerm.substring(8));
  //This is the line that actually has the info, if you go to storage and get the download url, replace it with hold, it works. Jorge
  // var key = '<img src="'+ hold +'" style="width:100px;height:100px;">';
  // var picurl = $(key).appendTo(webPage);
  var picurl = $('').appendTo(webPage);
  var fileURL = dbPicObject.on('value', function(snap){
    console.log("snap val is: " + snap.val());

  stPicObject.child(snap.val()).getDownloadURL().then(function(url){
    console.log(url);
    var key = ('<img src="'+ url +'" style="width:200px;height:200px;">');
    console.log("here key: "+key);
    $(key).appendTo(webPage);

    //var picurl = $(key).appendTo(webPage);
  }).catch(function(error){});
  });
      //picurl.append("Picture of tasty food go here.");
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

function organizedDisplay(){
  var dbRefObject = firebase.database().ref().child(searchTerm);
  var hold = searchTerm;
  var pic = $('<img src="" style="width:200px;height:200px;"/>').appendTo(webPage);
  var title = $('<p>').appendTo(webPage);
  var ul = $('<ul>').appendTo(webPage);
  var ulnon = $('<ul style="list-style-type:none">').appendTo(webPage);

  loop(
    function(){
  var dbPicObject = dbRefObject.child('picRef/');
  var stPicObject = firebase.storage().ref('Recipes/');
  var fileURL = dbPicObject.on('value', function(snap){
    console.log("snap val is: " + snap.val());

  stPicObject.child(snap.val()).getDownloadURL().then(function(url){
    console.log(url);
    var key = ('<img src="'+ url +'" style="width:200px;height:200px;">');
    console.log("here key: "+key);
    //$(key).appendTo(webPage);
    pic.replaceWith(key);
    console.log("PIC: "+pic);
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
function organizedIngredients(callback){
  var dbRefObject = firebase.database().ref().child(searchTerm);
  var dbIngreObject = dbRefObject.child('Ingredients/');
  var ul = $('<ul>').appendTo(webPage);
  dbIngreObject.on('value', snap => {
    snap.forEach(function(child){
      ul.append(
        $(document.createElement('li')).html(child.key + ": " + child.val())
      );
    });
  });

  callback();
}
function organizedInstructions(callback){
  var dbRefObject = firebase.database().ref().child(searchTerm);
  var dbInstrObject = dbRefObject.child('Instructions/');

  var ulnon = $('<ul style="list-style-type:none">').appendTo(webPage);
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
  callback();
}
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
              //displayFunction();
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
}

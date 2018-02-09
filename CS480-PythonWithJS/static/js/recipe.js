// create data dump

//loader element <pre>
const preObject = document.getElementById("loader");

//firebase object
var dbRefObject = firebase.database().ref().child('User Profiles');

//onclick function
function displayFunction() {
  dbRefObject.on('value', snap => {
    preObject.innerHTML = JSON.stringify(snap.val(), null, 5);
  });
}


//loader element <pre>
//const preObject = document.getElementById("loader");


//onclick function
function displayProfile() {
  dbRefObject.on('value', snap => {
    preObject.innerHTML = JSON.stringify(snap.val(), null, 5);
  });
}

function createProfile() {
		//get user/pass from creation text boxes in home page
	var username = document.getElementById("createusername").value;
	var password = document.getElementById("createpassword").value;

function displayAllProfile() {
    var dbRefObject = firebase.database().ref().child('User Profiles');   //firebase object

    dbRefObject.on('value', snap => {
        preObject.innerHTML = JSON.stringify(snap.val(), null, 5);
    });
}

function displayProfile(name) {
    var query = "User Profiles/";
    query += name;

    var dbRefObject = firebase.database().ref().child(query);

    dbRefObject.on('value', snap => {
        preObject.innerHTML = JSON.stringify(snap.val(), null, 5);
    });
}
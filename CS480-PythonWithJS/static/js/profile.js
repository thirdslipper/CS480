
//loader element <pre>
//const preObject = document.getElementById("loader");


//onclick function
function displayProfile() {
  dbRefObject.on('value', snap => {
    preObject.innerHTML = JSON.stringify(snap.val(), null, 5);
  });
}

function createProfile() {
	var email = document.getElementById("createEmail").value;
	var password = document.getElementById("createPassword").value;
	firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error)){
		//handle error
		var errorCode = error.code;
		var errorMessage = error.message;
		//https://firebase.google.com/docs/reference/js/firebase.auth.Auth?authuser=0#createUserAndRetrieveDataWithEmailAndPassword
	}
}

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
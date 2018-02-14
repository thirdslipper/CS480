
//loader element <pre>
//const preObject = document.getElementById("loader");
var user;

//onclick function
function displayProfile() {
  dbRefObject.on('value', snap => {
    preObject.innerHTML = JSON.stringify(snap.val(), null, 5);
  });
}

function createProfile() {
	var email = document.getElementById("createEmail").value;
	var password = document.getElementById("createPassword").value;

	firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error){
		//handle error
		console.log('register error', error);
		if (error.code === 'auth/email-already-in-use') {
			//handle
		}
		var errorCode = error.code;
		var errorMessage = error.message;
		document.getElementById("loader").innerHTML = (errorCode + ", " + errorMessage);
		//https://firebase.google.com/docs/reference/js/firebase.auth.Auth?authuser=0#createUserAndRetrieveDataWithEmailAndPassword
	});
}
//temp, unused
function signIn(){
	var email = document.getElementById("signInEmail").value;
	var password = document.getElementById("signInPassword").value;

	firebase.auth().signInWithEmailAndPassWord(email, password).catch(function(error) {
		var errorCode = error.code;
		var errorMessage = error.message;
		console.log('error', error);
	});
}

//use observer on auth, not used
function authStateChange(){
	firebase.auth().onAuthStateChanged(function(User) {
		if (user) {	//user placeholder ?
			//if user signed in
			var displayName = user.displayName;
			var email = user.email;
			var emailVerified = user.emailVerified;
			var photoURL = user.photoURL;
			var isAnonymous = user.isAnonymous;
			var uid = user.uid;
			var providerData = user.providerData;
		}
		else {
			//invalid login, user is signed out
		}
	});
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
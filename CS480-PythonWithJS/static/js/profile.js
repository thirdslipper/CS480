
//loader element <pre>
//const preObject = document.getElementById("loader");

//firebase object
var dbRefObject = firebase.database().ref().child('User Profiles');

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
}
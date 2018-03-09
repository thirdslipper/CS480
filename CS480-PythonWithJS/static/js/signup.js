var db = firebase.database();
var usersRef = db.ref().child('User Profiles');
var user;
var userUID;
const checkButton = document.getElementById('check-button');
const submitButton = document.getElementById('submit-button');

(function() {
  const btnSignUp = document.getElementById('signup-button');

  btnSignUp.addEventListener('click', e => {
      // does not check authenticity of email
    //var display = document.getElementById('displayname').value;
    var email = document.getElementById('login-username').value;
    var pass = document.getElementById('login-password').value;
    var pass2 = document.getElementById('login-password2').value;
    var fname = document.getElementById('firstname').value;
    var lname = document.getElementById('lastname').value;
    var age = document.getElementById('age').value;
    //partial error checking, nonempty fields, numeric age, same passwords.
    if (fname == '' || lname == '' || age == '') {
      if ((isNaN(age) || age <= 0) && fname != '' && lname != '') {
        alert("Age must be a number!");
      } else {
        alert('Fill in all fields!');
      }
    }
    else if (pass !== pass2) {
      alert('Passwords do not match!');
    }
    else {
        //sign in
      const promise = firebase.auth().createUserWithEmailAndPassword(email, pass);
        //catch error
      promise.catch(e => {
        console.log(e.message);
        alert(e);
      });
      promise.then(s => {
        var user = firebase.auth().currentUser;
        alert('Account created, check your email for verification!');
        user.sendEmailVerification().then(function() {
          //sent email
        }).catch(function(error) {
          // error
          console.log(error);
        }); 
        storeUserDetails(fname, lname, email, age);
      });
    }
  });

  checkButton.addEventListener('click', e => {
    var txtDisplay = document.getElementById('displayname').value;
    //var exist;
/*
    checkIfUserExists2(txtDisplay, function(boolean) {
      if (boolean) {
        alert('Displaycheck name already exists.');
      } else {
        alert('Display name is available!');
      }
      */
      var checkButtonPromise = checkIfUserExists3(txtDisplay);
      checkButtonPromise.then(s => {
        alert('Displaycheck name already exists.');
      });
      checkButtonPromise.catch(e => {
        alert('Display name is available!');
      });
    });
  //});

  submitButton.addEventListener('click', e => {
    var txtDisplay = document.getElementById('displayname').value;
    /*
    checkIfUserExists2(txtDisplay, function(boolean2) {
      if (!boolean2) {
        var storeDisplay = firebase.database().ref('User Profiles/' + userUID);
        storeDisplay.update({
          displayName: txtDisplay
        });
		var user = firebase.auth().currentUser;
		user.updateProfile({
			displayName: txtDisplay
		}).then(function() {
			// Update successful
		}).catch(function(error) {
			// An error hapened
		});
        alert('Display name successfully set!');
        document.location.href = '/profile.html';
      } else {
        alert('submitDisplay name already exists.');
      }
    }); */
    var submitButtonPromise = checkIfUserExists3(txtDisplay);
    submitButtonPromise.then(s => {
      console.log(s);
      alert('submitDisplay name already exists.');
    })
    submitButtonPromise.catch(e => {
      console.log(e);
      var storeDisplay = firebase.database().ref('User Profiles/' + userUID);
      storeDisplay.update({
        'Display Name': txtDisplay
      });
      alert('Display name successfully set!');
      document.location.href = '/profile.html';
    });
  });

firebase.auth().onAuthStateChanged(firebaseUser => {
  if (firebaseUser) {
    const form = document.getElementsByClassName('signupform');
    const showDisplayForm = document.getElementsByClassName('chooseDisplay');
    var i;
      //hide sign up elements
    for (i = 0; i < form.length; i++){
      form[i].style.display = "none";
    }
      //show display form
    for (i = 0; i < showDisplayForm.length; i++){
      showDisplayForm[i].style.display = "inline";
    }
    user = firebase.auth().currentUser;
    userUID = user.uid;
  } else {

  }
});

}());

  //return true if displayname already exist, else return false
function checkIfUserExists(displayName) {
  usersRef.once('value', function(snapshot) {
    if (snapshot.hasChild(displayName)) {
      return true;
    }
    else {
      return false;
    }
  });
}

function checkIfUserExists2(displayName, result) {

  usersRef.orderByChild("Display Name").equalTo(displayName).on("value", function(snapshot) {
    console.log(snapshot.val());
    if (snapshot.val() !== null) {  // if in db return true
      result(true);
    } else {  // if display not in db, return false
      result(false);
    } 
  });
}

function checkIfUserExists3(displayName) {
  var checkPromise = new Promise(
    function (resolve, reject) {
      usersRef.orderByChild("Display Name").equalTo(displayName).on("value", function(snapshot) {
        if (snapshot.val() !== null) {
          resolve(snapshot.val());  //in db
        } else {
          var reason = new Error("User name is taken");
          reject(reason);
        }
      });
  });
  console.log(checkPromise);
  return checkPromise;
}

//var usersRef2 = firebase.database().ref("User Profiles/");
function storeUserDetails(fname, lname, email, age) {
  var uid = firebase.auth().currentUser.uid;
  var ref = firebase.database().ref('User Profiles/' + uid);
  ref.set({
    'First Name': fname,
    'Last Name': lname, 
    Age: age,
    Email: email
  });
}
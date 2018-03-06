const usersRef = firebase.database().ref().child('User Profiles/');
var user;
var userUID;
var txtDisplay;
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
        // CURRENTLY WILL OVERWRITE THE PROFILE OF ANYONE WITH THE SAME DISPLAY NAME 
    else {//if (!checkIfUserExists(display)){  //if displayname  does not exist, 
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
}());

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

(function() {
    console.log('in second display');

  checkButton.addEventListener('click', e => {
      console.log('clicked check');
    txtDisplay = document.getElementById('displayname').value;
    if(checkIfUserExists(txtDisplay)) {
      alert('Display name already exists.');
    } else {
      alert('Display name is available!');
    }
  });

  submitButton.addEventListener('click', e => {
    console.log('submit');
    txtDisplay = document.getElementById('displayname').value;
    if (!checkIfUserExists(txtDisplay)) {
      var storeDisplay = firebase.database().ref('User Profiles/' + userUID);
      storeDisplay.update({
        'Display Name': txtDisplay
      });
      alert('Display name successfully set!');
      document.location.href = '/profile.html';
    } else {
      alert('Display name already exists.');
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
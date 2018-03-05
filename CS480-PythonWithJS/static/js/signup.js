var dbRefObject = firebase.database().ref();
var usersRef = dbRefObject.child('User Profiles/');

(function() {
  const btnSignUp = document.getElementById('signup-button');

  btnSignUp.addEventListener('click', e => {
      // does not check authenticity of email
    var display = document.getElementById('displayname').value;
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
    else if (!checkIfUserExists(display)){
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
        storeUserDetails(display, fname, lname, email, age);
        document.location.href = '/profile.html';
      });
    } else {
      console.log('fell through');
    }
    
  });
}());

function checkIfUserExists(userId) {
  usersRef.once('value', function(snapshot) {
    if (snapshot.hasChild(userId)) {
      alert('display name already exist');
      return true;
    }
    else {
      //remove after test
      //alert('display name open');
      return false;
    }
  });
}

//var usersRef2 = firebase.database().ref("User Profiles/");
function storeUserDetails(displayname, fname, lname, email, age) {

  var ref = firebase.database().ref('User Profiles/' + displayname);
  ref.set({
    'First Name': fname,
    'Last Name': lname, 
    Email: email,
    Age: age
  });
}

firebase.auth().onAuthStateChanged(firebaseUser => {
  if (firebaseUser) {

  } else {

  }
})
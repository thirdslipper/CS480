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
    var age = document.getElementById('numArea').value;
    //partial error checking, nonempty fields, numeric age, same passwords.
    if (fname == '' || lname == '' || age == '') {
      if (isNaN(age) && fname != '' && lname != '') {
        alert("Age must be a number!");
      } else {
        alert('Fill in all fields!');
      }
    }
    else if (pass !== pass2) {
      alert('Passwords do not match!');
    }
    else if (!checkIfUserExists(display)){
        //sign in
      const promise = firebase.auth().createUserWithEmailAndPassword(email, pass);
        //catch error
      promise.catch(e => {
        console.log(e.message);
        alert(e);
      });
      promise.then(s => {
        alert('Account created!');
        
        document.location.href = '/profile.html';
      });
    }
    
  });
}());

var dbRefObject = firebase.database().ref();
var usersRef = dbRefObject.child("User Profiles");

function checkIfUserExists(userId) {
  usersRef.once('value', function(snapshot) {
    if (snapshot.hasChild(userId)) {
      alert('already exist');
      return true;
    }
    else {
      //remove after test
      alert('id open');
      return false;
    }
  })
}
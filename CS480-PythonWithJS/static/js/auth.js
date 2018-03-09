
(function() {

  var txtEmail = document.getElementById('login-username');
  var txtPassword = document.getElementById('login-password');
  const btnLogin = document.getElementById('login-button');
  //const btnSignUp = document.getElementById('signup-button');
  const btnLogout = document.getElementById('logout-button');
  const profileLink = document.getElementById('viewProfile');
  const displayLink = document.getElementById('setdisplayname');

  profileLink.innerHTML = "View Profile";

  btnLogin.addEventListener('click', e => {
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();
      //sign in
    const promise = auth.signInWithEmailAndPassword(email, pass);
      //catch error
    promise.then(s => {
      console.log(s);
      alert('Logged in successfully!');
    });
    promise.catch(e => {
      console.log(e.message);
      alert(e);
    })
  });

  /*btnSignUp.addEventListener('click', e => {
      // does not check authenticity of email
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();
      //sign in
    const promise = auth.createUserWithEmailAndPassword(email, pass);
    
      //catch error
    promise.catch(e => {
      console.log(e.message);
      alert(e);
    });
  });
  */
  btnLogout.addEventListener('click', e => {
    firebase.auth().signOut();
  });

  profileLink.addEventListener('click', e => {
    document.location.href = '/profile.html';
  });


    //firebaseUser can be populated or null if not logged in
  firebase.auth().onAuthStateChanged(firebaseUser => {
    var forms = document.getElementsByClassName("sign-in-form");
    var i;
      //var loggedin = document.getElementsByClassName("signed-in");
      //log if logged in
    if (firebaseUser){
      profileLink.style.display = "inline";
      displayLink.style.display = "inline";

      console.log("logged in", firebaseUser);
      //alert('Logged in successfully!'); //change to only if pressed login button
      btnLogout.classList.toggle("btn-action-hide", false);
      for (i = 0; i < forms.length; i++){
        forms[i].style.display = "none";
      }
    } 
    else {
      
      profileLink.style.display = "none";
      displayLink.style.display = "none";

      console.log('not logged in');
      btnLogout.classList.toggle("btn-action-hide", true);
      txtPassword.value = '';
      for (i = 0; i < forms.length; i++){
        forms[i].style.display = "inline";
      }
    }
  });
}());
/* to hide set display after display name already set
(function() {
  var uid = firebase.auth().currentUser.uid;
  var dbRef = firebase.auth().ref("User Profiles/"+ uid);
  ref.once("value")
    .then(function(snapshot) {
      if (snapshot.hasChild("Display Name")) {
        displayLink.style.display = "none"
      }
    });
}());
*/


(function() {
  const txtEmail = document.getElementById('login-username');
  const txtPassword = document.getElementById('login-password');
  const btnLogin = document.getElementById('login-button');
  const btnSignUp = document.getElementById('signup-button');
  const btnLogout = document.getElementById('logout-button');

  btnLogin.addEventListener('click', e => {
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();
      //sign in
    const promise = auth.signInWithEmailAndPassword(email, pass);
      //catch error
    promise.catch(e => console.log(e.message));
  });

  btnSignUp.addEventListener('click', e => {
      // does not check authenticity of email
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();
      //sign in
    const promise = auth.createUserWithEmailAndPassword(email, pass);
      //catch error
    promise.catch(e => console.log(e.message));
  });

  btnLogout.addEventListener('click', e => {
    firebase.auth().signOut();
  });

    //firebaseUser can be populated or null if not logged in
  firebase.auth().onAuthStateChanged(firebaseUser => {
    var forms = document.getElementsByClassName("sign-in-form");
    var i;
      //var loggedin = document.getElementsByClassName("signed-in");
      //log if logged in
    if (firebaseUser){
      console.log("logged in", firebaseUser);
      btnLogout.classList.toggle("btn-action-hide", false);
      for (i = 0; i < forms.length; i++){
        forms[i].style.display = "none";
      }
    } 
    else {
      console.log('not logged in');
      btnLogout.classList.toggle("btn-action-hide", true);
      for (i = 0; i < forms.length; i++){
        forms[i].style.display = "inline";
      }
    }
  });
}());
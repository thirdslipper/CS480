// This class hides or shows the login forms and logout button conditionally

(function() {

  var txtEmail = document.getElementById('login-username');
  var txtPassword = document.getElementById('login-password');
  const btnLogin = document.getElementById('login-button');
  const btnLogout = document.getElementById('logout-button');
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

  btnLogout.addEventListener('click', e => {
    firebase.auth().signOut();
    document.location.href = '/index.html';
  });
  firebase.auth().onAuthStateChanged(firebaseUser => {
    var forms = document.getElementsByClassName("sign-in-form");
    var i;
      //var loggedin = document.getElementsByClassName("signed-in");
      //log if logged in
    if (firebaseUser){
      console.log("logged in", firebaseUser);
      //alert('Logged in successfully!'); //change to only if pressed login button
      btnLogout.classList.toggle("btn-action-hide", false);
      for (i = 0; i < forms.length; i++){
        forms[i].style.display = "none";
      }
    } 
    else {
      console.log('not logged in');
      btnLogout.classList.toggle("btn-action-hide", true);
      txtPassword.value = '';
      for (i = 0; i < forms.length; i++){
        forms[i].style.display = "inline";
      }
    }
  });
}());
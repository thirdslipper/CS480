firebase.auth().onAuthStateChanged(function(user){
  if (user) { //signed in
    document.getElementById('firebaseui-auth-container').style.display = 'none';
    document.getElementById('loaded').style.display = 'block';
  }
  else {
      document.getElementById('firebaseui-auth-container').style.display = 'block';
    document.getElementById('loaded').style.display = 'none';
  }
});

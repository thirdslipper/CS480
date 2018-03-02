(function() {
  const btnSignUp = document.getElementById('signup-button');

  btnSignUp.addEventListener('click', e => {
      // does not check authenticity of email
    const displayname = document.getElementById('displayname');
    const display = document.getElementById('displayname');
    const email = document.getElementById('login-username');
    const pass = document.getElementById('login-password');
    const fname = document.getElementById('firstname');
    const lname = document.getElementById('lastname');
    const age = document.getElementById('numArea');

    const auth = firebase.auth();
      //sign in
    const promise = auth.createUserWithEmailAndPassword(email, pass);
    
      //catch error
    promise.catch(e => {
      console.log(e.message);
      alert(e);
    });
  });
}());
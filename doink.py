from firebase import firebase
firebase = firebase.FirebaseApplication('https://seproj-9d508.firebaseio.com/', None)
result = firebase.get('/Recipe', None)
print( result)
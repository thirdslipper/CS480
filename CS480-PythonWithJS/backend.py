from flask import Flask, flash, redirect, render_template, request, session, abort
#from firebase import firebase
#from random import randint

app = Flask(__name__, static_url_path='/static')
#firebase = firebase.FirebaseApplication('https://gruberdb-d230e.firebaseio.com/')
#array of stuff in database portion, not yet modifying, anything from database, should work on

@app.route('/index.html')
@app.route("/")
def index():
#	result = firebase.get('/Recipes/Banana Pancake/Ingredients', None)	
	return render_template(
		'index.html') #**locals())

@app.route('/profile.html')
def profile():
	return render_template(
		'profile.html')

if __name__ == "__main__":
	app.run(host='0.0.0.0', port=80)

#def display():
#	if request.form['displaydata'] == "Let's Get Started!":
#		print ("test")

#def formatRecipe():
#	result = firebase.get('/Recipes/Banana Pancake/Ingredients', None)
#	size = len(result)
#	print (size)

#return "Flask App!"
 
#@app.route("/hello/<string:name>/")
#def hello(name):
#    quotes = [ "'If people do not believe that mathematics is simple, it is only because they do not realize how complicated life is.' -- John Louis von Neumann ",
#               "'Computer science is no more about computers than astronomy is about telescopes' --  Edsger Dijkstra ",
#               "'To understand recursion you must first understand recursion..' -- Unknown",
#               "'You look at things that are and ask, why? I dream of things that never were and ask, why not?' -- Unknown",
#               "'Mathematics is the key and door to the sciences.' -- Galileo Galilei",
#               "'Not everyone will understand your journey. Thats fine. Its not their journey to make sense of. Its yours.' -- Unknown"  ]
#    randomNumber = randint(0,len(quotes)-1) 
#    quote = quotes[randomNumber] 
 
#    return render_template(
#		'index.html',
#       'test.html',**locals())
#       'test.html',name=name)
 
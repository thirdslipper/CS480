from flask import Flask, flash, redirect, render_template, request, session, abort

app = Flask(__name__, static_url_path='/static')

@app.route('/index.html')
@app.route("/")
def index():
	return render_template(
		'index.html') 

@app.route("/profile.html/<string:name>/")
def userProfile(name):
    return render_template(
        'profile.html', name=name)

@app.route("/addRecipe.html")
def addRecipe():
    return render_template(
        'addRecipe.html')

@app.route('/profile.html')
def profile():
	return render_template(
		'profile.html')

if __name__ == "__main__":
	app.run(host='0.0.0.0', port=80)

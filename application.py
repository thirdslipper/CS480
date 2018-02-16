from flask import Flask, flash, redirect, render_template, request, session, abort

application = Flask(__name__, static_url_path='/static')

@application.route('/index.html')
@application.route("/")
def index():	
	return render_template(
		'index.html') #**locals())

@application.route('/profile.html')
def profile():
	return render_template(
		'profile.html')

if __name__ == "__main__":
	application.run()


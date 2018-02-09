from flask import Flask, render_template
app = Flask(__name__)

@app.route("/")
def homepage():
    return render_template(
        'index.html')

@app.route("/profile.html")
def profile():
    return render_template(
        'profile.html')

@app.route("/profile.html/<string:name>/")
def userProfile(name):
    return render_template(
        'profile.html', name=name)

if __name__ == "__main__":
    app.run()

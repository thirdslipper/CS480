from flask import Flask, flash, redirect, render_template, request, session, abort

application = Flask(__name__)


@application.route("/")
def index():
    return render_template(
        'test.html',name='friend')
 
@application.route("/hello/<string:name>/")
def hello(name):
    return render_template(
        'test.html',name=name)

if __name__ == "__main__":
    application.run()
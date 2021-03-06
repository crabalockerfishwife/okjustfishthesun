# ZPaths
# Soft Dev Pd 6
# Spring Final Project

from flask import Flask, render_template
app=Flask(__name__)

@app.route("/")
def index():
    return render_template("home.html")

# @app.route("/heat")
# def heat():
#     return render_template("heat.html")

@app.route("/heat/<mapnum>")
def heat(mapnum):
  	return render_template("heat.html",mapnum=mapnum)

if __name__ == "__main__":
   app.debug = True
   app.run(host="0.0.0.0", port=8000)

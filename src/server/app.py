from genericpath import exists
from msilib import Table
from tkinter import N
from flask import Flask, render_template 
from flask import request, jsonify
import sqlite3
from sqlite3 import Error
from flask_cors import CORS
import pandas as pd
# import content
#import genre

app = Flask(__name__) 
CORS(app)

@app.route('/',methods=['GET'])
def getHome():
    return 'App Working', 200

@app.route('/register',methods=['POST'])
def register():
    data=request.get_json()
    print(data)
    #---------------form--------------
    # username=request.form.get('username')# email=request.form.get('email')# password=request.form.get('password')
    username=data['user']
    email=data['email']
    password=data['password']
    conn=create_connection()
    cur = conn.cursor()
    cur.execute('CREATE TABLE IF NOT EXISTS register (name VARCHAR, email VARCHAR, password VARCHAR)')
    user=conn.execute('SELECT * FROM register WHERE name = ?',(username,)).fetchone()
    # print('user detail',user)
    # (name, email_id, passw) = user
    # print('name, username',name,username)
    if user is None:
        cur.execute('INSERT INTO register (name, email,password) values (?,?,?)', (username, email, password))
        conn.commit()
        print('new user added')
    else:
        (name, email_id, passw) = user
        if username != name:
            cur.execute('INSERT INTO register (name, email,password) values (?,?,?)', (username, email, password))
            conn.commit()
            print("success")
        else:
            return {"msg": "User already exists!"}, 409
    posts = conn.execute('SELECT * FROM register').fetchall()
    print(posts)
    conn.close()
    result={"username":username,"email":email,"password":password}
    return result, 200

def create_connection():
    conn = sqlite3.connect(r"C:\Users\7000027560\Desktop\First challenge\db\pythonsqlite.db")
    print(sqlite3.version)
    return conn

@app.route('/login',methods=['POST'])
def login():
    body=request.get_json()
    username=body['user']
    password=body['password']
    print("user-pass",username,password)
    conn = sqlite3.connect(r"C:\Users\7000027560\Desktop\First challenge\db\pythonsqlite.db")
    user=conn.execute('SELECT * FROM register WHERE name = ?',(username,)).fetchone()
    conn.close()
    if user is None:
        return {"msg": "Invalid User. This user doesn't exist!"}, 404
    else:
        (name, email, passw) = user
        if password == passw:
            result={"username":username,"password":password}
            return result, 200
        else:
            return {"msg":"Username or Password is inccorect"}, 401
    # conn.close()
    # return "OK", 200

@app.route('/upload',methods=['POST'])
def upload():
    uploaded_file = request.files['file']
    if uploaded_file.filename != '':
        uploaded_file.save(uploaded_file.filename)
        wb = pd.read_excel(uploaded_file,sheet_name = None)
        cxn = sqlite3.connect(r"C:\Users\7000027560\Desktop\First challenge\db\mydb.db")
        for sheet in wb:
            wb[sheet].to_sql(sheet,cxn,index=False)
        cxn.commit()
        cxn.close()
        return 'OK', 200
    else:
        return 'NOT OK', 500


@app.route('/home', methods=['GET'])
def get_data():
    cursor = sqlite3.connect(r"C:\Users\7000027560\Desktop\First challenge\db\mydb.db")
    data=cursor.execute("SELECT * FROM Sheet1").fetchall()
    # data = cursor.fetchall() 
    return_data = jsonify(data)
    print(return_data)
    return return_data, 200

# @app.route('/movie', methods=['POST'])
# def recommend_movies():
#     print(request.args.get('data'))
#     res=content.recommend_movies_based_on_plot(request.args.get('data'))
#     print(res)
#     return res

# @app.route('/genre', methods=['POST'])
# def genre_chart():


if __name__ ==  "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
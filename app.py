from flask import Flask, render_template, request, jsonify
app = Flask(__name__)

from pymongo import MongoClient
client = MongoClient('mongodb+srv://:@cluster0.vygyl.mongodb.net/?retryWrites=true&w=majority')
db = client.dbsparta

import requests
from bs4 import BeautifulSoup

headers = {'User-Agent' : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36'}



@app.route('/')
def home():
   return render_template('index.html')



@app.route('/save_url', methods=['POST'])
def save_post():
   url_receive = request.form['url_give']

   data = requests.get(url_receive, headers=headers)
   soup = BeautifulSoup(data.text, 'html.parser')


   og_img = soup.select_one('meta[property="og:image:secure_url"]')

   og_info = soup.select_one('meta[property="og:title"]')
   og_title = og_info['content'].split('/')[0]
   og_artist = og_info['content'].split('/')[1].split('- genie')[0]
   print(og_info,og_title,og_artist)
   image = og_img['content']
   title = og_title
   artist = og_artist

   doc = {
      'img':image,
      'title':title,
      'artist':artist
   }
   db.music.insert_one(doc)
   return jsonify({'result':'success', 'msg': '등록완료'})

@app.route('/get_list', methods=['GET'])
def get_list():
   all_music = list(db.music.find({}, {'_id': False}))
   return jsonify({'result': 'success', 'list': all_music})

if __name__ == '__main__':
   app.run('0.0.0.0', port=5000, debug=True)



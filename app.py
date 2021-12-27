from flask import Flask, render_template, request, jsonify
from pymongo import MongoClient
from bson.json_util import dumps

app = Flask(__name__)
app.config['JSON_AS_ASCII'] = False
# jsonify 한글 인코딩 깨짐을 방지 하기위해 기존 ascii 인코딩 방식을 utf-8로 변경하기 위한 설정

client = MongoClient('localhost', 27017)  # db에서 데이터를 받아오기 위해 db 연결
db = client.vegan
collection = db['vegan']


@app.route('/data', methods=['POST'])  # POST 요청을 위해 methods=['POST'] 추가
def shop_region():
    region = request.form['region']  # 페이지에서 POST 요청한 값을 받아오기 위해 request.form['보내온 데이터 이름'] 추가
    users = collection.find({"자치구": region},
                            {'_id': False, '판매메뉴': False, 'index': False})
    data = dumps(users, ensure_ascii=False)  # 현재 pymongo 로 불러온 cursor 타입 데이터를 json으로 변환
    # 한글 인코딩 깨짐을 막기위해 ensure_ascii = False 추가
    return data


@app.route('/')
def index():
    """route 데코레이션을 통해 어떤 URL 이 우리가 작성한 함수를 실행시키는지 알려준다."""
    return render_template('main.html')


@app.route('/map/')
def kakao_map():
    return render_template('test.html')


if __name__ == '__main__':
    """
    run() 함수를 사용해서 우리가 개발한 어플리케이션을 로컬서버로 실행한다. 
    소스파일을 모듈이 아닌 python 인터프리터를 이용해서 직접 실행한다면 
    if __name__ == '__main__': 이 문장은 우리가 실행한 서버가 현재 동작되는 유일한 서버라는 것을 보장한다.
    """
    app.run(debug=True)

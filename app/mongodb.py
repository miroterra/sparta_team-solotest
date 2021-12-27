# import pandas as pd
# from pymongo import MongoClient
import pandas as pd
from pymongo import MongoClient

data = pd.read_csv('VeganMap.csv')
data.reset_index(inplace=True) ## index 생성
data_dict = data.to_dict("records") ## 데이터를 사전형으로 변환 to_dict

client = MongoClient('localhost', 27017)
db = client.vegan
collection = db['vegan']
collection.insert_many(data_dict)


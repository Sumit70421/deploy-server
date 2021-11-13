from bs4 import BeautifulSoup
import requests
import pymongo
import os
import dns
import urllib.parse




def get_data():
    url = 'https://inshorts.com/en/read'

    get_data = requests.get(url)
    soup = BeautifulSoup(get_data.content, 'html.parser')

    total_news = len(soup.find_all('div', class_=["news-card-image"]))
    print('TOTAL: ', total_news)
    news_data  = []

    for index in range(total_news):
        curr_news = {
            'index': index,
            'news_title': '',
            'news_content': '',
            'news_image': '',
            'news_url': ''
        }
        
        news_image = soup.find_all('div', class_=["news-card-image"])[index]
        curr_news['news_image'] += news_image['style'].split('url(')[1].split(')')[0]

        news_title = soup.find_all(attrs={"itemprop": "headline"})[index].text
        curr_news['news_title'] += news_title

        news_content = soup.find_all(attrs={"itemprop": "articleBody"})[index].text
        curr_news['news_content'] += news_content

        try: 
            news_url = soup.find_all('div', class_=["news-card-footer"])[index].find('a')['href']
            curr_news['news_url'] += news_url
        except Exception as e:
            print(e)

        news_data.append(curr_news)

    return news_data

news = get_data()

username = "rohini"
password = "p_Tp6Yf@wSJ@PRP"

try:
    url = f"mongodb+srv://{username}:"+urllib.parse.quote(password) + "@inshorts-news-scraper.s3hct.mongodb.net/db?retryWrites=true&w=majority"
    client = pymongo.MongoClient(url)
    db = client.db.NewsDB
except Exception as e:
    print(e)

try:
    db.insert_many(news)
    print(f'inserted {len(news)} articles')
except:
    print('an error occurred quotes were not stored to db')


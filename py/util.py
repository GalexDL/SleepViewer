import json
import os
from PIL import ImageOps
import requests
import unitypack
from io import BytesIO
import re

# conf
option = {
    # will skip resources that already downloaded.
    "skipExistingDownloadedResource": True,
    # will skip assets that already exists.
    "skipExistingAssets": True
}
ba_ps = "https://play.google.com/store/apps/details?id=com.nexon.bluearchive&hl=in&gl=US"
ba_api = "https://api-pub.nexon.com/patch/v1.1/version-check"
ba_api_data = {
    "market_game_id": "com.nexon.bluearchive",
    "language": "en",
    "advertising_id": "636a7b75-5516-427b-b140-45318d3d51f0",
    "market_code": "playstore",
    "country": "US",
    "sdk_version": "187",
    "curr_build_version": "1.36.120365",
    "curr_build_number": 120365,
    "curr_patch_version": 0
}
# 1digit, 2digit, 6digit, might change
regex_version = r"\d{1}\.\d{2}\.\d{6}"


def downloadFile(url, full_path):
    '''
    Download file from url
    '''
    src = requests.get(url).content
    with open(full_path, 'wb') as f:
        f.write(src)


def update():
    '''
    Update ba_api_data.
    '''
    global ba_api_data

    src = requests.get(ba_ps).text
    # idk, should need another workaround for version detection
    r1 = re.findall(regex_version, src)
    ver = r1[0]
    ba_api_data["curr_build_version"] = ver
    ba_api_data["curr_build_number"] = int(ver.split(".")[-1])


def getVersion():
    '''
    Get Blue Archive version
    '''
    return ba_api_data["curr_build_version"]


def getResourceURL():
    '''
    Return resource url for Blue Archive
    '''
    data = requests.post(ba_api, json=ba_api_data).json()
    print(json.dumps(data))
    return data["patch"]["resource_path"]


update()

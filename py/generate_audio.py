import os
import json
import requests
from util import getResourceURL, downloadFile

option = {
    # 1 to download audio, 0 to fetch directly instead, but cors issue.
    "type": 1,
    # Will skip existing
    "skipExisting": True
}

data = {}


def main():
    os.makedirs("./data", exist_ok=True)

    # Get base url for downloading audios
    resource_url = getResourceURL()
    base_url = '/'.join(resource_url.split("/")[0:-1])
    assets = requests.get(resource_url).json()["resources"]
    for asset in assets:
        # Filter audio
        if "Audio/VOC_JP/" in asset["resource_path"]:
            keyEvent = ''.join(
                asset["resource_path"].split("/")[-1].split(".")[:-1])
            fname = ''.join(asset["resource_path"].split("/")[-1])

            # Download audio
            if option["type"]:
                path = f"./assets/audio/{fname}"
                print("="*30)
                print(fname)
                if os.path.isfile(path):
                    print("Already downloaded. Skipping.")
                    data[keyEvent] = path
                    continue
                if not(os.path.isdir("./assets/audio")):
                    os.mkdir("./assets/audio/")
                downloadFile(base_url + "/" + asset["resource_path"], path)
                data[keyEvent] = path
            else:
                # Online version
                data[keyEvent] = base_url + "/" + asset["resource_path"]

    with open("./data/audio.json", "w") as f:
        json.dump(data, f, indent=4)
    print("="*30)
    print("Done!")


main()

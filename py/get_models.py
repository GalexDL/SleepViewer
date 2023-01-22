from io import BytesIO
import unitypack
import requests
from PIL import ImageOps
import os
import json
from util import getVersion, getResourceURL, downloadFile

# Configuration
option = {
    # Skip resources that already downloaded.
    "skipExistingDownloadedResource": True,
    # Skip assets that already exists / extracted.
    "skipExistingAssets": True,
    # Force download even no version update.
    "forceVersion": False,
    # Download limit, mainly debug purpose since doesn't need to download all of them. Set to 0 to download all.
    "downloadLimit": 0,
    # Directory configuration
    "path": {
        # Download directory
        "download": "./assets/download/"
    }
}


def getModels():
    '''
    Return list of Blue Archive characters url path.
    '''
    data = []
    res_url = getResourceURL()
    res = requests.get(res_url).json()
    for asset in res["resources"]:
        if "spinecharacters-" in asset["resource_path"] or "spinelobbies-" in asset["resource_path"]:
            # append url and path
            data.append('/'.join(res_url.split("/")
                        [0:-1]) + "/" + asset["resource_path"])
    return data


def extractTextAsset(object, dest):
    data = object.read()
    if(type(data.script) == bytes):
        with open(f"{dest}/{data.name}", "wb") as f:
            f.write(data.script)
    elif(type(data.script) == str):
        with open(f"{dest}/{data.name}", "wb") as f:
            f.write(bytes(str(data.script), 'utf-8'))
    else:
        raise Exception("Not handled")


def extractTexture2D(object, dest):
    data = object.read()
    img = ImageOps.flip(data.image)
    output = BytesIO()
    img.save(output, format="png")
    with open(f"{dest}/{data.name}.png", "wb") as f:
        f.write(output.getvalue())


def extractModel(src, dest):
    with open(src, "rb") as f:
        bundle = unitypack.load(f)
        for asset in bundle.assets:
            # print("%s: %s:: %i objects" % (bundle, asset, len(asset.objects)))
            for id, object in asset.objects.items():
                # print(id, object)
                # Extract skel & atlas
                if object.type == "TextAsset":
                    data = object.read()
                    if ".atlas" in data.name or ".skel" in data.name:
                        print(data.name)
                        extractTextAsset(object, dest)
                # Extract texture
                elif object.type == "Texture2D":
                    data = object.read()

                    print(data.name + ".png")
                    extractTexture2D(object, dest)


def main():
    # Create directories
    directories = [
        "./assets/spine",
        "/data",
        option["path"]["download"]
    ]
    for dir in directories:
        os.makedirs(dir, exist_ok=True)

    # Compare version
    ver = getVersion()
    if not(option["forceVersion"]):
        if(os.path.isfile("./data/version.txt")):
            with open("./data/version.txt", "r") as f:
                ver_temp = f.read()
            if ver == ver_temp:
                print(f"[{ver}] No new update. Stopping.")
                exit()
            print(f"Update {ver_temp} -> {ver}")
    with open("./data/version.txt", "w") as f:
        f.write(ver)

    # Download models
    models = getModels()
    is_limit = option["downloadLimit"] != 0
    for index, model in enumerate(models):
        print("="*30)
        if is_limit:
            if(index >= option["downloadLimit"]):
                break
            print(f"{index+1}/{option['downloadLimit']}")
        else:
            print(f"{index+1}/{len(models) + 1}")
        file_name = model.split("/")[-1]
        download_destination = f"{option['path']['download']}/{file_name}"
        print(file_name)

        # Skip if already downloaded
        if option["skipExistingDownloadedResource"] and os.path.isfile(download_destination):
            print("Already downloaded. Skipping.")
            continue

        # Download only spinecharacters & spinelobbies
        character_name = ''.join(file_name.split("spinecharacters-")[1].split("-")[
                                 0] if "spinecharacters" in file_name else file_name.split("spinelobbies-")[1].split("-")[0])
        extract_destination = f"./assets/spine/{character_name}"

        # Skip if already extracted
        if option["skipExistingAssets"] and os.path.isfile(extract_destination):
            print("Already extracted. Skipping.")
            continue

        # Create directory for extract destination
        os.makedirs(extract_destination, exist_ok=True)

        # Download model
        downloadFile(url=model, full_path=download_destination)
        # Extract model
        extractModel(src=download_destination, dest=extract_destination)


main()

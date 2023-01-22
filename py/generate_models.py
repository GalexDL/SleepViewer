import os
import json

spines = os.listdir("assets/spine/")

data = {}


def main():
    # Iterate spine directories
    for spine_dir in spines:
        print(spine_dir)
        # Filter for .skel files
        file = [x for x in (os.listdir(
            f"assets/spine/{spine_dir}")) if ".skel" in x]
        # Completely forgot about this one, probably filtering & naming files
        # Check if .skel exists
        if len(file) > 1:
            for spine_file in file:
                if spine_file[0] == "_":
                    continue
                data[spine_file[:-5]
                     ] = f"assets/spine/{spine_dir}/{spine_file}"
        # Check for atlas ?
        else:
            if spine_dir[0] == "_":
                continue
            data[spine_dir] = f"assets/spine/{spine_dir}/" + ''.join(file)
    os.makedirs("./data/", exist_ok=True)
    with open("./data/models.json", "w") as f:
        json.dump(data, f, indent=4, sort_keys=True)


main()

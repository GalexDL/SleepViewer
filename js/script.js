//Functions for Switching Models/Skins
function setSkinByName(skinName) {
    //skeleton = char.skeleton;
    char.skeleton.setSkin(null);
    char.skeleton.setSkinByName(skinName);
    char.skeleton.setSlotsToSetupPose();
    char.state.apply(char.skeleton);
}
function setNewCostume(CostumeName) {
    if (option.models.options && option.skins.options.length > 0) {
        option.models.value = CostumeName;
        loadChar(option.models.value);
    }
}
function setDefaultSkin(MySkinName) {
    if (option.skins.options && option.skins.options.length > 0) {
        option.skins.value = MySkinName;
        setSkinByName(option.skins.value);
    }
}
function toggleShiny() {
    const iconContain = document.querySelector(".Icon-Contain");
    const divs = iconContain.querySelectorAll("div[style*='display:']");

    divs.forEach((div) => {
      if (div.style.display === "flex") {
        div.style.display = "none";
      } else {
        div.style.display = "flex";
      }
    });
}
function toggleFemale() {
    setTimeout(function() {
        setSkinByName("female-normal");
    }, 5);
    setSkinByName("female");
}
function toggleMale() {
    setTimeout(function() {
        setSkinByName("male-normal");
    }, 5);
    setSkinByName("male");
}
function toggleDefault() {
    setSkinByName("default");
    setSkinByName("normal");
}
////////////////////////////////////////
///////////////////////////////////////
//////////////////////////////////////

// Change Models
function PokemonModel(filename) {
    setNewCostume("../SleepData/"+filename+"/Normal/move.skel");
    setTimeout(function() {
        toggleDefault();
    }, 350);

}

function ShinyPokemonModel(paragraphText) {
    var checkBox = document.getElementById("checkbox");

    // Pokemon Moving
    if(option.models.value == "../SleepData/"+paragraphText+"/Normal/move.skel"){
        if(checkBox.checked == true){
            setNewCostume("../SleepData/"+paragraphText+"/Shiny/move.skel");
            setTimeout(function() {
                toggleDefault();
            }, 310);
        }
    }
    if(option.models.value == "../SleepData/"+paragraphText+"/Shiny/move.skel"){
        if(checkBox.checked == false){
            setNewCostume("../SleepData/"+paragraphText+"/Normal/move.skel");
            setTimeout(function() {
                toggleDefault();
            }, 310);
        }
    }
    // Sleep Style Drowse
    if(option.models.value == "../SleepData/"+paragraphText+"/Normal/sleep-drowse.skel"){
        if(checkBox.checked == true){
            setNewCostume("../SleepData/"+paragraphText+"/Shiny/sleep-drowse.skel");
            setTimeout(function() {
                toggleDefault();
            }, 310);
        }
    }
    if(option.models.value == "../SleepData/"+paragraphText+"/Shiny/sleep-drowse.skel"){
        if(checkBox.checked == false){
            setNewCostume("../SleepData/"+paragraphText+"/Normal/sleep-drowse.skel");
            setTimeout(function() {
                toggleDefault();
            }, 310);
        }
    }
    // Sleep Style Normal
    if(option.models.value == "../SleepData/"+paragraphText+"/Normal/sleep-normal.skel"){
        if(checkBox.checked == true){
            setNewCostume("../SleepData/"+paragraphText+"/Shiny/sleep-normal.skel");
            setTimeout(function() {
                toggleDefault();
            }, 310);
        }
    }
    if(option.models.value == "../SleepData/"+paragraphText+"/Shiny/sleep-normal.skel"){
        if(checkBox.checked == false){
            setNewCostume("../SleepData/"+paragraphText+"/Normal/sleep-normal.skel");
            setTimeout(function() {
                toggleDefault();
            }, 310);
        }
    }
    // Sleep Style Stand
    if(option.models.value == "../SleepData/"+paragraphText+"/Normal/stand.skel"){
        if(checkBox.checked == true){
            setNewCostume("../SleepData/"+paragraphText+"/Shiny/stand.skel");
            setTimeout(function() {
                toggleDefault();
            }, 310);
        }
    }
    if(option.models.value == "../SleepData/"+paragraphText+"/Shiny/stand.skel"){
        if(checkBox.checked == false){
            setNewCostume("../SleepData/"+paragraphText+"/Normal/stand.skel");
            setTimeout(function() {
                toggleDefault();
            }, 310);
        }
    }
}

/////////////////

function SleepStyleMove(paragraphText) {
    setNewCostume("../SleepData/"+paragraphText+"/Normal/move.skel");
    setTimeout(function() {
        toggleDefault();
    }, 350);
}
function SleepStyleDrowse(paragraphText) {
    setNewCostume("../SleepData/"+paragraphText+"/Normal/sleep-drowse.skel");
    setTimeout(function() {
        toggleDefault();
    }, 350);
}
function SleepStyleNormal(paragraphText) {
    setNewCostume("../SleepData/"+paragraphText+"/Normal/sleep-normal.skel");
    setTimeout(function() {
        toggleDefault();
    }, 350);
}
function SleepStyleStand(paragraphText) {
    setNewCostume("../SleepData/"+paragraphText+"/Normal/stand.skel");
    setTimeout(function() {
        toggleDefault();
    }, 350);
}
function SleepStyleMove(paragraphText) {
    setNewCostume("../SleepData/"+paragraphText+"/Normal/move.skel");
    setTimeout(function() {
        toggleDefault();
    }, 350);
}



function showWhiteBox() {
    const whitButton = document.getElementById("WhiteBoxx");
    whitButton.style.display = "block";
    const UICloseB = document.getElementById("UICloseBTN");
    UICloseB.style.display = "block";
    const UICloseMCBTN = document.getElementById("UICloseMCBTN");
    UICloseMCBTN.style.display = "block";

    const UICloseGMBTN = document.getElementById("UICloseGMBTN");
    UICloseGMBTN.style.display = "block";
    const UICloseGFBTN = document.getElementById("UICloseGFBTN");
    UICloseGFBTN.style.display = "block";
    const UICloseGUBTN = document.getElementById("UICloseGUBTN");
    UICloseGUBTN.style.display = "block";
    const UICloseShiny = document.getElementById("UICloseShiny");
    UICloseShiny.style.display = "block";
    const UIScreen = document.getElementById("screen");
    UIScreen.style.display = "block";
    const UISave = document.getElementById("optionExport");
    UISave.style.display = "block";
    const ModelBGDE = document.getElementById("ModelBGD");
    ModelBGDE.style.display = "block";

}

function CloseModelUI() {
    const whitButton = document.getElementById("WhiteBoxx");
    whitButton.style.display = "none";
    const UICloseB = document.getElementById("UICloseBTN");
    UICloseB.style.display = "none";
    const UICloseMCBTN = document.getElementById("UICloseMCBTN");
    UICloseMCBTN.style.display = "none";

    const UICloseGMBTN = document.getElementById("UICloseGMBTN");
    UICloseGMBTN.style.display = "none";
    const UICloseGFBTN = document.getElementById("UICloseGFBTN");
    UICloseGFBTN.style.display = "none";
    const UICloseGUBTN = document.getElementById("UICloseGUBTN");
    UICloseGUBTN.style.display = "none";

    const UICloseShiny = document.getElementById("UICloseShiny");
    UICloseShiny.style.display = "none";
    const UIScreen = document.getElementById("screen");
    UIScreen.style.display = "none";
    const UISave = document.getElementById("optionExport");
    UISave.style.display = "none";
    const ModelBGDE = document.getElementById("ModelBGD");
    ModelBGDE.style.display = "none";


}

function mailtest() {
    document.getElementById('mailconnect').click()
}








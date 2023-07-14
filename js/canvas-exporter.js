import gif from "gif.js";

function exportAnimation(FPS = 24) {
  let exportCanvas = document.createElement("canvas");
  exportCanvas.id = "export-canvas";
  exportCanvas.style.display = "none";
  document.body.appendChild(exportCanvas);
  let exportVideo = document.createElement("video");
  exportVideo.controls = true;
  exportVideo.id = "export-video";

  let appExport = new PIXI.Application({
    width: window.innerWidth,
    height: window.innerHeight,
    view: exportCanvas,
  });
  appExport.loader
    .add("char", `./${option.models.value}`)
    .load(function (loader, res) {
      let exportChar = new PIXI.spine.Spine(res.char.spineData);
      exportChar.scale.x = exportChar.scale.y = char.scale.x;
      exportChar.x = char.x;
      exportChar.y = char.y;
      exportChar.state.setAnimation(0, option.animations.value, 0);

      // Apply skin
      exportChar.skeleton.setSkin(null);
      exportChar.skeleton.setSkinByName(option.skins.value);
      exportChar.skeleton.setSlotsToSetupPose();
      exportChar.state.apply(exportChar.skeleton);

      appExport.stage.addChild(exportChar);

      // Export Section
          

      let videoStream = exportCanvas.captureStream(FPS); //default to 60
      let gif = new gif.GIF();
      gif.ondataavailable = function (e) {
        // Do something with the data
      };

      // Record
      gif.captureStream(videoStream);
      setTimeout(function () {
        // Stop recording and save the GIF data to a file
        gif.save("animation.gif");
      }, animLength * 1000);
    });
  let downloadButton = document.createElement("button");
  downloadButton.id = "download-button";
  downloadButton.textContent = "Download Video";
  document.getElementById("result").appendChild(downloadButton);
  downloadButton.addEventListener("click", function () {
    downloadVideo(exportVideo.src);
  });
}


function downloadVideo(videoURL) {
  const a = document.createElement("a");
  a.href = videoURL;
  a.download = "animation.mp4";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

// Main
function exportAnimation(FPS = 60) {
  let exportCanvas = document.createElement("canvas");
  exportCanvas.id = "export-canvas";
  exportCanvas.style.display = "none";
  document.body.appendChild(exportCanvas);
  let exportVideo = document.createElement("video");
  exportVideo.controls = true;
  exportVideo.id = "export-video";
  exportCanvas.style.backgroundColor = "transparent";


  let appExport = new PIXI.Application({
    width: window.innerWidth,
    height: window.innerHeight,
    view: exportCanvas,
    backgroundColor: 0x00000000,
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
      let mediaRecorder = new MediaRecorder(videoStream);
      //EYOW
      //EOOOOW
      let chunks = [];
      mediaRecorder.ondataavailable = function (e) {
        chunks.push(e.data);
      };

      mediaRecorder.onstop = function (e) {
        let blob = new Blob(chunks, {
          type: option.exportType.value,
        });
        chunks = [];
        let videoURL = URL.createObjectURL(blob);
        exportVideo.src = videoURL;
      };
      mediaRecorder.ondataavailable = function (e) {
        chunks.push(e.data);
      };
      // Get Animation Length
      let animLength = 0;
      for (var i in char.spineData.animations) {
        if (char.spineData.animations[i].name == option.animations.value) {
          animLength = char.spineData.animations[i].duration;
          break;
        }
      }

      //Modal Popup
      document.getElementById("rendering").style.display = "block";
      document.getElementById("complete").style.display = "none";
      UIkit.modal(document.getElementById("modal-exporter")).show();
      // Progressbar
      document.getElementById("export-progress").value = 0;
      let progress = setInterval(function () {
        document.getElementById("export-progress").value += 1;
      }, animLength * 10);

      // Record
      mediaRecorder.start();
      setTimeout(function () {
        mediaRecorder.stop();
        //Free Resources
        appExport.stage.children.pop();
        appExport.loader.resources = {};
        exportCanvas.remove();
        clearInterval(progress);

        //Update modal
        document.getElementById("rendering").style.display = "none";
        document.getElementById("complete").style.display = "block";
        document.getElementById("result").appendChild(exportVideo);
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
// char.state.setAnimation(0, "Idle_01", false);
// mediaRecorder.start();
// setTimeout(function (){ mediaRecorder.stop(); }, 4000);


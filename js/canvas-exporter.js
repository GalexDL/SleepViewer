// Main
function isMobileDevice() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

function exportAnimation(FPS = 60) {
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

      appExport.stage.addChild(exportChar);

      // Export Section
      let canvasStream = exportCanvas.captureStream(FPS); // default to 60
      let mediaRecorder = new MediaRecorder(canvasStream);
      let gifChunks = [];

      mediaRecorder.ondataavailable = function (e) {
        gifChunks.push(e.data);
      };

      mediaRecorder.onstop = function (e) {
        let exportType = option.exportType.value;

        if (exportType === "image/gif") {
          let gif = new GIF({
            workers: 2,
            quality: 10,
          });

          gif.on("finished", function (blob) {
            let gifURL = URL.createObjectURL(blob);
            exportVideo.src = gifURL;
          });

          let frames = [];
          for (let i = 0; i < gifChunks.length; i++) {
            let img = new Image();
            img.src = URL.createObjectURL(gifChunks[i]);
            frames.push(img);
          }

          frames.forEach(function (frame) {
            gif.addFrame(frame, { delay: 1000 / FPS });
          });

          gif.render();
        } else {
          let blob = new Blob(gifChunks, { type: exportType });
          let videoURL = URL.createObjectURL(blob);
          exportVideo.src = videoURL;
        }

        gifChunks = [];
      };

      // Get Animation Length
      let animLength = 0;
      for (let i in char.spineData.animations) {
        if (char.spineData.animations[i].name === option.animations.value) {
          animLength = char.spineData.animations[i].duration;
          break;
        }
      }

      // Modal Popup
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
        // Free Resources
        appExport.stage.children.pop();
        appExport.loader.resources = {};
        exportCanvas.remove();
        clearInterval(progress);

        // Update modal
        document.getElementById("rendering").style.display = "none";
        document.getElementById("complete").style.display = "block";
        document.getElementById("result").appendChild(exportVideo);
      }, animLength * 1000);
    });
}


// char.state.setAnimation(0, "Idle_01", false);
// mediaRecorder.start();
// setTimeout(function (){ mediaRecorder.stop(); }, 4000);

// Main
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
      // Export Section

      let gif = new GIF({
        workers: 2,
        quality: 10,
      });

      let frameCount = Math.ceil(FPS * animLength);
      let frameDuration = 1000 / FPS;

      function captureFrame() {
        gif.addFrame(exportCanvas, { copy: true, delay: frameDuration });
      }

      // Capture frames
      for (let i = 0; i < frameCount; i++) {
        setTimeout(captureFrame, i * frameDuration);
      }

      gif.on("finished", function (blob) {
        let gifURL = URL.createObjectURL(blob);
        exportVideo.src = gifURL;
      });

      // Record
      mediaRecorder.start();
      setTimeout(function () {
        mediaRecorder.stop();
        gif.render();
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




// char.state.setAnimation(0, "Idle_01", false);
// mediaRecorder.start();
// setTimeout(function (){ mediaRecorder.stop(); }, 4000);

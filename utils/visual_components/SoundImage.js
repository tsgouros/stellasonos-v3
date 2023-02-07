import React from "react";
// import Synthesizer from "../sonic_components/Synthesizer";
import Haptic from "../sonic_components/Haptic";
import instrumentList from "../sonic_components/instrumentList";
import { Constants } from "../data_processing/Constants";
import SoundImageLayer from "./SoundImageLayer";

/**
 * This class models a sonified image. Some main functions:
 * - Constructs different Sound Image Layers that represent the main image and its sub-layers.
 * - Use the image features received from each layer to the Synthesizer to play sounds accordingly.
 * - Draws a circle following user's cursor location; uses red/blue to differentiate between bright/dark pixels.
 */


class SoundImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPixelObjectId: 0,
      horizontal: false,
      synthMap: {},
      layers: {}, // stores the SoundImageLayer object for each layer
      baseLayer: null,
      showSoundInfo: false,
      showLocation: false
    };
    this.cursorSize = ls.get("cursor-size") || Constants.CURSOR_NEIGHBOR_BOX_SIZE;
    // When the horizontal and vertical sizes are not the same,
    // the cursor can be made into an ellipse instead of a circle. 
    this.cursorSizeHorizontal = this.cursorSize;
    this.cursorSizeVertical = this.cursorSize;

    this.imageRef = React.createRef();
    this.canvasRef = React.createRef();
    this.openCvRef = React.createRef();
    this.currKeys = React.createRef();
    this.commandEntered = React.createRef();
    this.withinImage = React.createRef();
    this.currX = React.createRef();
    this.currY = React.createRef();
    this.currentlyScanning = React.createRef();
    this.currX.current = 0;
    this.currY.current = 0;
    this.commandEntered.current = false;
    this.withinImage.current = false;
    this.currentlyScanning.current = false;
    this.currKeys.current = "";
    this.isCursorOnEdge = false;
    this.hapticTools = {}; // Each image layer has its own haptic tool
  }

  componentDidMount() {
    // this.props.exitSound.current = this.exitClean;
    // this.addClickListenerToStartButton();

    const layers = {}
    for (const layer of this.props.layers) {
      // TODO: make this more general later. Right now there are only 4 possible
      // layer names.
      let layerName = layer["layer"];
      if (!["xray", "optical", "ir", "radio"].includes(layerName)) {
        continue; 
      }
      layers[layerName] = new SoundImageLayer(layerName, this.props.soundEffects);
      layers[layerName].build(layer.src, null, null, true, this.openCvRef.current, this.props.description);
      this.hapticTools[layerName] = new Haptic(this.props.soundEffects);
    }

    let baseLayer; 
    // If the image has no qualified sub-layers, pass in "composite-only" 
    // as the main layer's name so that the main composite layer 
    // is used to create sound output.
    if (Object.keys(layers).length === 0) {
      baseLayer = new SoundImageLayer(Constants.IMAGE_TYPE_COMPOSITE_ONLY, this.props.soundEffects);
      layers[Constants.IMAGE_TYPE_COMPOSITE_ONLY] = baseLayer;
      this.hapticTools[Constants.IMAGE_TYPE_COMPOSITE_ONLY] = new Haptic(this.props.soundEffects);
    } else {
      baseLayer = new SoundImageLayer(Constants.IMAGE_TYPE_COMPOSITE, this.props.soundEffects);
    }  
    baseLayer.build(this.props.src, this.imageRef.current, this.canvasRef.current, true, this.openCvRef.current, this.props.description);

    this.setState({
      layers: layers,
      baseLayer: baseLayer
    });
  }

  // addClickListenerToStartButton() {
  //   // Initialize Tone and all the synthesizers after an user event 
  //   document.querySelector('#start-audio-context-button')?.addEventListener('click', async () => {
  //     this.startTone();
  //   });
  // }

  /* 
   * [@Ashley: I'm only commenting out this function for now, which should remove all keyboard
   * commands we have built. I wanted to leave the original code in this file so that you could
   * see the logic when you are adding the new code in. 
   * When you're done, please feel free to delete these commented-out code as needed. -- Holly]
   */
  // addKeyListenerToStartButton() {
  //   window.addEventListener("keydown", async(event) => {
  //     // Disable scrolling behavior from up and down arrow keys.
  //     event.preventDefault(); 

  //     if (event.metaKey) {
  //       this.commandEntered.current = true;
  //       this.currKeys.current = "";
  //     }
  //     switch (event.key) {
  //       case "Enter":
  //         this.startTone();
  //         break;
  //       case "Tab":
  //         this.readImageDescription();
  //         break;
  //       case "g":
  //         this.readKeyboardGuide();
  //         break;
  //       default:
  //         if (event.key !== "Meta" && this.commandEntered.current) {
  //           this.currKeys.current += event.key;
  //         }
  //     }

  //     if (!this.withinImage.current) {
  //       return;
  //     }

  //     // Add cursor-moving feature to four arrow keys.
  //   }); 
  // }

  // readImageDescription() {
  //   const imageDescription = document.getElementById("image-description-section").innerHTML;
  //   this.screenReader.cancel(); // Stop reading the previous instruction
  //   this.screenReader.speak(
  //       new SpeechSynthesisUtterance("Image description: " + imageDescription));
  // }

  // readKeyboardGuide() {
  //   const keyboardGuide = Constants.IMAGE_PAGE_KEYBOARD_GUIDE;
  //   this.screenReader.cancel(); // Stop reading the previous instruction
  //   this.screenReader.speak(new SpeechSynthesisUtterance(keyboardGuide));
  // }

  // enterCenter = async () => {
  //   this.revertCursorDimension();
  //   this.currentlyScanning.current = false;
  //   const currImg = document.querySelector(".audio-image");
  //   this.commandEntered.current = false;
  //   this.currKeys.current = "";
  //   this.withinImage.current = true;
  //   this.currX.current = Math.floor(currImg.clientWidth / 2);
  //   this.currY.current = Math.floor(currImg.clientHeight / 2);
  //   this.drawCursorCircle(this.currX.current, this.currY.current);
  //   await this.soundFromCursorVicinity(this.currX.current, this.currY.current);
  // }

  // play = async () => {
  //   this.drawCursorCircle(this.currX.current, this.currY.current);
  //   this.continueSound = true;
  //   await this.continueScan();
  //   await this.soundFromCursorVicinity(this.currX.current, this.currY.current);
  // }

  // continueScan = async () => {
  //   const currImg = document.querySelector(".audio-image");
  //   while (this.currentlyScanning.current && this.continueSound) {
  //     this.currX.current += 1;
  //     if (this.currX.current > currImg.clientWidth) {
  //       this.currX.current = 0;
  //       this.currY.current += this.cursorSizeVertical * 2;
  //     }
  //     if (this.currY.current > currImg.clientHeight) {
  //       this.currentlyScanning.current = false;
  //       this.continueSound = false;
  //     }
  //     this.drawCursorCircle(this.currX.current, this.currY.current);
  //     await this.soundFromCursorVicinity(this.currX.current, this.currY.current);
  //     await new Promise(r => setTimeout(r, 0.2));
  //   }
  // }

  scanImage = async () => {
    this.currX.current = 0;
    this.currY.current = 0;
    this.continueSound = true;
    // Long, thin cursor for horizontal scans
    if (!this.currentlyScanning.current) {
      // Only stretch the cursor size one time, regardless of how many
      // times the start scanning keystroke is pressed.
      this.updateCursorDimensions(Constants.IMAGE_SCAN_DIRECTION_HORIZONTAL);
    }
    this.currentlyScanning.current = true;
    await this.continueScan();
  }

  startTone() {
    Tone.start().then(() => {
      // Uses the Instrument List to create a map of instrument id to Synthesizer objects
      let synthMap = {};
      for (let instrumentId in instrumentList) {
        // synthMap[instrumentId] = new Synthesizer(
        //   instrumentList[instrumentId].id,
        //   instrumentList[instrumentId].name,
        //   instrumentList[instrumentId].baseOctave,
        //   instrumentList[instrumentId].baseNote,
        //   instrumentList[instrumentId].range,
        //   this.props.soundEffects
        // );
      }
      this.setState({synthMap: synthMap});
      document.getElementById("start-audio-context-button-overlay").style.display = "none";
    });
  }

  /*
   * Handles using arrow keys to move the cursor.
   * Input: destination coordinates to move the cursor toward on the image.
   */
  async useArrowKeyToMove(destX, destY) {
    this.revertCursorDimension();
    this.currentlyScanning.current = false;
    this.drawCursorCircle(destX,destY);
    await this.soundFromCursorVicinity(destX,destY);
  }

  /*
   * Modify cursor's horizontal or vertical dimensions to sktretch or contract it. 
   */ 
  updateCursorDimensions(direction) {
    if (direction == Constants.IMAGE_SCAN_DIRECTION_VERTICAL) {
      this.cursorSizeHorizontal *= 3;
    } else if (direction == Constants.IMAGE_SCAN_DIRECTION_HORIZONTAL) {
      this.cursorSizeVertical *= 3;
    }
  }

  revertCursorDimension() {
    this.cursorSizeHorizontal = this.cursorSize;
    this.cursorSizeVertical = this.cursorSize;
  }

  /*
   * Plays sound based on the cursor's box of neighbors.
   * Loop through all the layers (exclusing the base layer "composite" layer,
   * because only the individual layers should determin what sounds get played.)
   */
  async soundFromCursorVicinity(x, y) {
    let synthsToPlay = {}; 
    const cursorHorizontalRatio = this.getCursorLocationHorizontalRatio(); 
    for (let [layerName, layer] of Object.entries(this.state.layers)) {
      // Accumulate the total number of pixels that belong to an object.
      let totalNumPixelWithObject = 0; 
      let instrumentsForThisLayer = new Set(); // stores instrument ids for this layer
      let triggerHaptic = false; // flag that decides whether haptic response is triggered for the current cursor's location
      for (let i = -this.cursorSizeHorizontal; i < this.cursorSizeHorizontal; i++) {
        for (let j = -this.cursorSizeVertical; j < this.cursorSizeVertical; j++) {       
          let [chosenInstrumentId, avgPixel] = layer.chooseInstrumentForPixel(
            x + i,
            y + j
          );
          // If chosenInstrumentId is returned to be 0,
          // then the (x+i, y+j) location is outside the image.
          if (chosenInstrumentId > 0) {
            instrumentsForThisLayer.add(chosenInstrumentId);
            const distance = Math.sqrt(i ** 2 + j ** 2);
            if (chosenInstrumentId != Constants.INSTRUMENT_ID_BASS) {
              totalNumPixelWithObject += 1;
            }
            synthsToPlay[chosenInstrumentId] = {
              avgPixel: avgPixel,
              distance: distance,
              horizontalRatio: cursorHorizontalRatio,
              onEdge: false // placeholder, updated below
            };
          }
          // Only trigger haptic feedback when cursor is on an object instead of in the background
          if (chosenInstrumentId != 0 && chosenInstrumentId != Constants.INSTRUMENT_ID_BASS) {
            triggerHaptic = true; 
          }
        }
      }

      if (triggerHaptic) {
        this.hapticTools[layerName].start(layerName);
      } else {
        await this.hapticTools[layerName].stop();
      }

      // If the total number of pixels that belong to any object is less than 50%
      // of the total number of pixels within the cursor, this cursor is considered
      // to be at an edge location. 
      // If isCursorOnEdge is being flipped, set the crossingEdge flag to true 
      // so that the synths currently playing will be stopped and get restarted to 
      // reflect the edge status. 
      const cursorArea = Math.PI * this.cursorSizeHorizontal * this.cursorSizeVertical;
      const objectPixelRatio = totalNumPixelWithObject / cursorArea;
      if (objectPixelRatio < 0.5 && objectPixelRatio > 0) {
        for (let instrumentId of instrumentsForThisLayer) {
          if (instrumentId !== Constants.INSTRUMENT_ID_XYLOPHONE) {
            synthsToPlay[instrumentId]['onEdge'] = true;
          }
        }
      }   
    }

    // Stops the other previously playing synths first.
    // Also, if the a synth is currently playing but the updated sound
    // requires a new note, stop this synth too. 
    for (let instrumentId in this.state.synthMap) {
      if (!synthsToPlay.hasOwnProperty(instrumentId) || 
        !this.state.synthMap[instrumentId].isSameNote(synthsToPlay[instrumentId])) {
        await this.state.synthMap[instrumentId].stopPlayer();
      }
    }

    // Begins playing the sound in a loop (this loop is ended separately)
    for (let instrumentId of Object.keys(synthsToPlay)) {
      const chosenInstrumentSynth = this.state.synthMap[
        instrumentId.toString()
      ];
      await chosenInstrumentSynth.startPlayer(synthsToPlay[instrumentId]);
    }
  }

  /*
   * Turn off haptic tool for each image layer.
   */ 
  async stopAllHapticResponse() {
    for (const [layerName, layerHapticTool] of Object.entries(this.hapticTools)) {
      await layerHapticTool.stop();
    }
  }

  /* 
   * Calculate what percentage is the cursor's location relative to left edge.
   * Adjust this ratio onto a [-1, 1] scale so that the ratio aligns with the 
   * scale that the panner uses in the synths. 
   */ 
  getCursorLocationHorizontalRatio() {
    const [imageRenderedWidth, imageRenderedHeight] = this.state.baseLayer.getImageRenderedSize(); 
    const ratio = (1.0) * this.currX.current / imageRenderedWidth; // this result is in [0, 1] range.
    const adjustedRatio = ratio * 2 - 1;
    return Math.max(-1, Math.min(1, adjustedRatio)); // making sure the range is [-1, 1]...
  }

  /*
   * Gets x and y, the coordinate location of the item within the canvas's context
   * (i.e., for the top left corner of the canvas, x = 0 and y = 0)
   */
  getXY(e) {
    let offsets = this.state.baseLayer.ctx.canvas.getBoundingClientRect();
    let x = e.clientX || e.screenX;
    let y = e.clientY || e.screenY;
    if (!x && e.changedTouches[0]) {
      x = e.changedTouches[0].pageX;
      y = e.changedTouches[0].pageY;
    }
    return [Math.floor(x - offsets.left), Math.floor(y - offsets.top)];
  }

  /*
   * Checks if the coordiante offset (i,j) leads to a point that
   * lies inside the boundary that is dictated by the
   * cursor dimensions. Check by the equation for an ellipse. 
   */ 
  isWithinCursorBoundary(i,j) {
    return (i ** 2 / (this.cursorSizeHorizontal ** 2)) +
      (j ** 2 / (this.cursorSizeVertical ** 2)) <= 1;
  }

  /* Draw a circle around the cursor. */
  drawCursorCircle(x, y) {
    if (this.state.baseLayer == null)
      return;
    this.currX.current = x;
    this.currY.current = y;
    this.state.baseLayer.ctx.clearRect(
      0,
      0,
      this.state.baseLayer.ctx.canvas.width,
      this.state.baseLayer.ctx.canvas.height
    );

    for (let i = -this.cursorSizeHorizontal; i < this.cursorSizeHorizontal; i++) {
      for (let j = -this.cursorSizeVertical; j < this.cursorSizeVertical; j++) {
        if (!this.isWithinCursorBoundary(i,j)) {
          continue;
        }
        let rgb = this.state.baseLayer.getRGBColorsOfPixelAt(x + i, y + j, this.state.baseLayer);
        if (rgb) {
          // Draw a blue vs. red stripe based on brightness of the current pixel.
          const isValidPixel = this.state.baseLayer.isValidPixel(rgb);
          const context = this.state.baseLayer.ctx;
          context.fillStyle = isValidPixel ? "red" : "blue";
          context.beginPath();
          context.fillRect(x + i, y + j, 1, 1);
          context.closePath();
          context.stroke();
        }
      }
    }
  }

  continueSound = true;
  /* The function that gets called whenever the cursor moves. */
  imageHover = async (e) => {
    this.currentlyScanning.current = false;
    if (!this.state.baseLayer.ctx) {
      return;
    }
    const [x, y] = this.getXY(e);
    // Revert cursor size into what is set by the cursor size picker
    // (or the default one), because the cursor size might have changed
    // during scan line overview.
    this.revertCursorDimension();
    this.drawCursorCircle(x, y);
    if (!this.continueSound) return;
    await this.soundFromCursorVicinity(x, y);
  };

  exitClean = async () => {
    await this.stopAllHapticResponse();
    this.continueSound = false;
    for (let instrumentId in instrumentList) {
      this.state.synthMap[instrumentId].stopPlayer();
    }
    this.withinImage.current = false;
    document.querySelector("body").style.overflow = "auto";
  };

  toggleInfo = () => {
    this.setState({
      showSoundInfo: !this.state.showSoundInfo
    })
  }

  showLocation = () => {
    this.setState({
      showLocation: !this.state.showLocation
    })
  }

  locationString = () => {
    const currImg = document.querySelector(".audio-image");
    const xLoc = (this.currX.current / currImg.clientWidth);
    const yLoc = (this.currY.current / currImg.clientHeight);
    let splitX = (xLoc.toString() + "0000").split(".");
    let splitY = (yLoc.toString() + "0000").split(".");
    if (splitX.length === 0) {
      splitX = [splitX, "0000"]
    }
    if (splitY.length === 0) {
      splitY = [splitY, "0000"]
    }
    const x = `${splitX[1].slice(0, 2)}.${splitX[1].slice(2, 4)}%`
    const y = `${splitY[1].slice(0, 2)}.${splitY[1].slice(2, 4)}%`
    return `You are ${x} to the right and ${y} to the bottom of the image`
  }

  render() {
    return (
      <div className={"sound-image-wrapper"}>
        <div id={"start-audio-context-button-overlay"}>
          <button
            id="start-audio-context-button"
            type="primary">
            Loading ...
          </button>
          <div id="start-audio-instruction" hidden>
            {/* If user is on mobile device, don't show the screen reader and 
                keyboard related instructions. */}
            {Constants.IS_MOBILE_SESSION ? 
              Constants.IMAGE_PAGE_START_INSTRUCTION_MOBILE : 
              Constants.IMAGE_PAGE_START_INSTRUCTION}
          </div>
        </div>
        <img
            className={"audio-image"}
            crossOrigin="anonymous"
            ref={this.imageRef}
            src={this.props.src}
        />
        <canvas
          ref={this.canvasRef}
          onMouseOver={() => {
            this.continueSound = true;
            this.withinImage.current = true;
            document.querySelector("body").style.overflow = "hidden";
          }}
          onTouchStart={() => {
            this.continueSound = true;
            this.withinImage.current = true;
            document.querySelector("body").style.overflow = "hidden";
          }}
          onMouseMove={this.imageHover}
          onTouchMove={this.imageHover}
          onMouseLeave={this.exitClean}
          onTouchEnd={this.exitClean}
          className={"image-canvas"}
          id={" " + this.props.id.toString()}
        />
        <div className={"opencv-section"}>
          <div ref={this.openCvRef} className={"opencv-output"}>
          </div>
        </div>
        <div className={"button-console"}>
          <Button shape="circle" icon={<CaretRightOutlined />} onClick={this.play}/>
          <Button shape="circle" icon={<PauseOutlined />} onClick={this.exitClean} />
          <Button shape="circle" icon={<InfoCircleOutlined />} onClick={this.toggleInfo} />
          <Button shape="circle" icon={<ArrowLeftOutlined />} onClick={() => this.useArrowKeyToMove(this.currX.current - this.cursorSizeHorizontal, this.currY.current)} />
          <Button shape="circle" icon={<ArrowUpOutlined />} onClick={() => this.useArrowKeyToMove(this.currX.current, this.currY.current - this.cursorSizeVertical)} />
          <Button shape="circle" icon={<ArrowRightOutlined />} onClick={() => this.useArrowKeyToMove(this.currX.current + this.cursorSizeHorizontal, this.currY.current)} />
          <Button shape="circle" icon={<ArrowDownOutlined />} onClick={() => this.useArrowKeyToMove(this.currX.current, this.currY.current + this.cursorSizeVertical)} />
          <Button shape="circle" icon={<BorderOuterOutlined />} onClick={this.showLocation}/>
          <Button onClick={this.scanImage} type="primary">Scan Image</Button>
        </div>
        <div className={"sound-info-box"}>
            {this.state.showSoundInfo ? this.props.imageDescription : ""}
        </div>
        <div className={"location-box"}>
          {this.state.showLocation ? this.locationString() : ""}
        </div>
      </div>
    );
  }
}

export default SoundImage;
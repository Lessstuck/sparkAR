
const Scene = require('Scene');
const AudioObject = require("sparkar-audio-object")
// const Audio = require("Audio"); // necessary?
// const Time = require("Time");  // necessary?
const TouchGestures = require("TouchGestures");
const Patches = require('Patches');
export const Diagnostics = require('Diagnostics');
const EventHelpers = require("sparkar-event-helpers");



const drumLoop = AudioObject.new({
  speakerName: "drumLoop_speaker",
  controllerName: "drumLoop_controller",
});
drumLoop.volume = 1.;

// const p = Patches.outputs.BoolSignal.monitor.subscribe('editorToScriptVar');
const p = Patches.outputs.getBool;
 // () => {
  drumLoop.play();
  Diagnostics.log('playDrumLoop: ');
// }

 // version 85 sdk



// Subscribe to tap gestures

TouchGestures.onTap().subscribe(function (gesture) {
    drumLoop.play();
    Diagnostics.log('tap gesture detected');
});

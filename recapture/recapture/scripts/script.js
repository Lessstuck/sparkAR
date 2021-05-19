/**
 * (c) Facebook, Inc. and its affiliates. Confidential and proprietary.
 */

//==============================================================================
// Welcome to scripting in Spark AR Studio! Helpful links:
//
// Scripting Basics - https://fb.me/spark-scripting-basics
// Reactive Programming - https://fb.me/spark-reactive-programming
// Scripting Object Reference - https://fb.me/spark-scripting-reference
// Changelogs - https://fb.me/spark-changelog
//
// For projects created with v87 onwards, JavaScript is always executed in strict mode.
//==============================================================================

// How to load in modules
const Scene = require('Scene');

const Patches = require('Patches');

// Use export keyword to make a symbol available in scripting debug console
export const Diagnostics = require('Diagnostics');


(async function () {  // Enables async/await in JS [part 1]
  let fromScriptBoolean = true;
  let toScriptNumber = 99;
  let toScriptTrigger;
  let fromScriptPitches = 7;
  
  await Patches.inputs.setBoolean('fromScriptBoolean', fromScriptBoolean);
  await Patches.inputs.setScalar('fromScriptPitches', fromScriptPitches);
  // await Patches.outputs.getScalar('toScriptNumber', toScriptNumber);
  fromScriptPitches = await Patches.outputs.getScalar('toScriptNumber', toScriptNumber);
  

  // To access scene objects
  // const [directionalLight] = await Promise.all([
  //   Scene.root.findFirst('directionalLight0')
  // ]);

  // To access class properties
  // const directionalLightIntensity = directionalLight.intensity;

  // To log messages to the console
  // Diagnostics.log('Console message logged from the script.');

})(); // Enables async/await in JS [part 2]

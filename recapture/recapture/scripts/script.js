const Scene = require('Scene');
const Patches = require('Patches');
const Diagnostics = require('Diagnostics');
const Time = require('Time');
const Reactive = require('Reactive');

(async function() { 

  // inputs from patches
  let toScriptNumber = await Patches.outputs.getScalar('toScriptNumber');
  let toScriptBoolean = await Patches.outputs.getBoolean('toScriptBoolean');
  let toScriptPulse = await Patches.outputs.getPulse('toScriptPulse')

  let fromScriptPulse;
  let fromScriptBoolean;
  let fromScriptNumber;
  
  await Patches.inputs.setBoolean('fromScriptBoolean', toScriptBoolean);
  await Patches.inputs.setPulse('fromScriptPulse', toScriptPulse);
  await  Patches.inputs.setScalar('fromScriptNumber', toScriptNumber);


  // To access scene objects
  // const [directionalLight] = await Promise.all([
  //   Scene.root.findFirst('directionalLight0')
  // ]);

  // To access class properties
  // const directionalLightIntensity = directionalLight.intensity;

  // To log messages to the console
  // Diagnostics.log('Console message logged from the script.');
})(); 

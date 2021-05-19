const Scene = require('Scene');
const Patches = require('Patches');
const Diagnostics = require('Diagnostics');
const Time = require('Time');

(async function () { 

  const toScriptNumber = await Patches.outputs.getScalar('toScriptNumber');
  const toScriptBoolean = await Patches.outputs.getBoolean('toScriptBoolean');
  const toScriptPulse = await Patches.outputs.getPulse('toScriptPulse')

  let fromScriptPulse;
  let fromScriptBoolean;
  let fromScriptPitches;
  
  await Patches.inputs.setScalar('fromScriptPitches', toScriptNumber);
  await Patches.inputs.setBoolean('fromScriptBoolean', toScriptBoolean);
  await Patches.inputs.setPulse('fromScriptPulse', toScriptPulse);
 

  // fromScriptPitches =  await Patches.outputs.getScalar('toScriptNumber');

  // Diagnostics.watch('toScriptNumber =>', toScriptNumber);
  // Diagnostics.log(fromScriptPitches);

  // To access scene objects
  // const [directionalLight] = await Promise.all([
  //   Scene.root.findFirst('directionalLight0')
  // ]);

  // To access class properties
  // const directionalLightIntensity = directionalLight.intensity;

  // To log messages to the console
  // Diagnostics.log('Console message logged from the script.');
})(); 

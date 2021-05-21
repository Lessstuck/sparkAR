const Scene = require('Scene');
const Patches = require('Patches');
const Diagnostics = require('Diagnostics');
const Time = require('Time');

// let i = 888;
// function loop() {
//   // i = 999;
//   Diagnostics.log(i);
//   i = i + 1;
//   Time.setTimeout(loop, 1000);
//   return i;
// }
// loop();

(async function () { 

  // inputs from patches
  const toScriptNumber = await Patches.outputs.getScalar('toScriptNumber');
  const toScriptBoolean = await Patches.outputs.getBoolean('toScriptBoolean');
  const toScriptPulse = await Patches.outputs.getPulse('toScriptPulse')

  let fromScriptPulse;
  let fromScriptBoolean;
  let fromScriptNumber;
  
  // const scalarSignal = Reactive.val(999);

  //outputs to patches
  await Patches.inputs.setScalar('fromScriptNumber', toScriptNumber);
  await Patches.inputs.setBoolean('fromScriptBoolean', toScriptBoolean);
  await Patches.inputs.setPulse('fromScriptPulse', toScriptPulse);
 
  Diagnostics.watch('toScriptNumber =>', toScriptNumber);
  Diagnostics.watch('fromScriptNumber =>', fromScriptNumber);



  // To access scene objects
  // const [directionalLight] = await Promise.all([
  //   Scene.root.findFirst('directionalLight0')
  // ]);

  // To access class properties
  // const directionalLightIntensity = directionalLight.intensity;

  // To log messages to the console
  // Diagnostics.log('Console message logged from the script.');
})(); 

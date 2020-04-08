
const Scene = require('Scene');
const AudioObject = require("sparkar-audio-object");
// const Audio = require("Audio"); // necessary?
const TouchGestures = require("TouchGestures");
const Patches = require('Patches');
const Time = require('Time')
const CANNON = require('cannon');
export const Diagnostics = require('Diagnostics');
// const EventHelpers = require("sparkar-event-helpers");

// Reference SphereObject from Scene
Promise.all([
Scene.root.findFirst('SphereObject')
]).then(function (objects) {
  const sphere = objects[0];

  // Create cannon world and setting gravity
  const world = new CANNON.World();
  world.gravity.set(0, -9.82, 0);

  // Create sphere body and setting its shape and properties
  const radius = 1;
  const sphereProps = {
    mass: 5,
    position: new CANNON.Vec3(0, 10, 0),
    radius: radius,
    shape: new CANNON.Sphere(radius),
  }

  const  sphereBody= new CANNON.Body(sphereProps);
  world.addBody(sphereBody);
  console.log('transform ", sphere.transform.y');

  // Create ground body and settings its shape and properties
  const groundProps = {
    mass: 0,
    position: new CANNON.Vec3(0, -sphereProps.radius, 0),
    shape: new CANNON.Plane(),
  }
  const groundBody = new CANNON.Body(groundProps);

  // Rotate the ground so it is flat (facing upwards)
  const angle = -Math.PI / 2;
  const xAxis = new CANNON.Vec3(1, 0, 0);
  groundBody.quaternion.setFromAxisAngle(xAxis, angle);

  world.addBody(groundBody);

  // Configure time step for Cannon
  const fixedTimeStep = 1.0 / 60.0;
  const maxSubSteps = 3;
  const timeInterval = 30;
  let lastTime;

  // Create time interval loop for cannon 
  Time.setInterval(function (time) {
    if (lastTime !== undefined) {
      let dt = (time - lastTime) / 1000;
      world.step(fixedTimeStep, dt, maxSubSteps)

      sphere.transform.x = sphereBody.position.x;
      sphere.transform.y = sphereBody.position.y;
      sphere.transform.z = sphereBody.position.z;
      console.log("sphere.transform.y = " + sphere.transform.y);
    }

    lastTime = time
  }, timeInterval);
})
.catch(error => console.log(`Error in promises ${error}`));




const drumLoop = AudioObject.new({
  speakerName: "drumLoop_speaker",
  controllerName: "drumLoop_controller",
});
drumLoop.volume = 1.;

// const p = Patches.outputs.BoolSignal.monitor.subscribe('editorToScriptVar');
const p = Patches.outputs.getBool;
 // () => {
  drumLoop.play();
  Diagnostics.log('playDrumLoop: ' + p);
// }

 // version 85 sdk



// Subscribe to tap gestures

TouchGestures.onTap().subscribe(function (gesture) {
  drumLoop.play();
  // Diagnostics.log('tap gesture detected');
});

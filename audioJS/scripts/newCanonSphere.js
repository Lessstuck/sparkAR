// script.js

const Scene = require('Scene');
const Time = require('Time')
const CANNON = require('cannon');
const Diagnostics = require('Diagnostics');
const Patches = require('Patches');
const AudioObject = require("sparkar-audio-object");

const fallTime = 1000;
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
    const sphereBody = new CANNON.Body(sphereProps);
    world.addBody(sphereBody);

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
    let freeFalling = 1;
    let lastFallTime;
    let fallTime = 10000;
    
    const drumLoop = AudioObject.new({
    speakerName: "drumLoop_speaker",
    controllerName: "drumLoop_controller",
    });
    drumLoop.volume = 1.;

    sphereBody.addEventListener("collide", function (event) {
        drumLoop.play();
    })

    Time.setInterval(function (time2) {

        // drumLoop.play();
        // Time.clearInterval(idInterval);
        // freeFalling == 1;
        // sphereBody.position.x = 0;
        // sphereBody.position.y = 10;
        // sphereBody.position.z = 0;
        // sphere.transform.x = sphereBody.position.x;
        // sphere.transform.y = sphereBody.position.y;
        // sphere.transform.z = sphereBody.position.z;


        Diagnostics.log('play 10 sec loop: ');
        // Create time interval loop for cannon 
        var idInterval = Time.setInterval(function (time) {
            if (lastTime !== undefined) {
                let dt = (time - lastTime) / 1000;
                world.step(fixedTimeStep, dt, maxSubSteps)
                sphere.transform.x = sphereBody.position.x;
                sphere.transform.y = sphereBody.position.y;
                sphere.transform.z = sphereBody.position.z;
                // // const patchSend = Patches.outputs.getScalar('editorToScriptVar');
                // patchSend.then(function () {
                //     if (freeFalling == 1) {
                        // Diagnostics.log("freeFalling: " + freeFalling);
                    //     // drumLoop.play();
                    //     freeFalling = 0;
                    // }
                // });

            };
            lastTime = time
        }, timeInterval);
    }, fallTime);
});        

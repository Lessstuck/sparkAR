const Scene = require('Scene');
const Time = require('Time')
const CANNON = require('cannon');
const Patches = require('Patches');
const AudioObject = require("sparkar-audio-object");
const TouchGestures = require('TouchGestures');
const Diagnostics = require('Diagnostics');

Diagnostics.log("run");

const fallTime = 1000;

(async function () {
    // Reference Sphere object from Scene
    const sphere = await Scene.root.findFirst('SphereObject');
    Diagnostics.log("post-sphere");
    // Create cannon world and setting gravity
    const world = new CANNON.World();
    world.gravity.set(0, -9.82, 0);
    

    // Create sphere body and setting its shape and properties
    var mat1 = new CANNON.Material();
    let radius = 1;
    const sphereProps = {
        mass: 5,
        position: new CANNON.Vec3(0, 10, 0),
        radius: radius,
        shape: new CANNON.Sphere(radius),
        material: mat1,
        linearDamping: .01
    }
    const sphereBody = new CANNON.Body(sphereProps);
    world.addBody(sphereBody);

    // Create ground body and settings its shape and properties
    var groundMaterial = new CANNON.Material();
    const groundProps = {
        mass: 0,
        position: new CANNON.Vec3(0, -sphereProps.radius, 0),
        shape: new CANNON.Plane(),
        material: groundMaterial
    }
    const groundBody = new CANNON.Body(groundProps);


    // Rotate the ground so it is flat (facing upwards)
    const angle = -Math.PI / 2;
    const xAxis = new CANNON.Vec3(1, 0, 0);
    groundBody.quaternion.setFromAxisAngle(xAxis, angle);
    var mat1_ground = new CANNON.ContactMaterial(groundMaterial, mat1, { friction: 0.0, restitution: 0.0 });
    world.addBody(groundBody);

    world.addContactMaterial(mat1_ground);

    // Configure time step for Cannon
    const fixedTimeStep = 1.0 / 60.0;
    const maxSubSteps = 3;
    const timeInterval = 30;
    let lastTime;
    
    const drumLoop = AudioObject.new({
    speakerName: "drumLoop_speaker",
    controllerName: "drumLoop_controller",
    volume: 1
    });


    sphereBody.addEventListener("collide", function (event) {
        drumLoop.play();
    });

    TouchGestures.onTap().subscribe(function (event) {
        sphereBody.position.x = 0;
        sphereBody.position.y = 10;
        sphereBody.position.z = 0;
    });


    var idInterval = Time.setInterval(function (time) {
        if (lastTime !== undefined) {
            let dt = (time - lastTime) / 1000;
            world.step(fixedTimeStep, dt, maxSubSteps)
            sphere.transform.x = sphereBody.position.x;
            sphere.transform.y = sphereBody.position.y;
            sphere.transform.z = sphereBody.position.z;
        };
        lastTime = time
    }, timeInterval);

})();






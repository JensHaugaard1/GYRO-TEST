



import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";
import { DeviceOrientationControls } from 'https://unpkg.com/three@0.126.0/examples/jsm/controls/DeviceOrientationControls.js';



startButton.addEventListener( 'click', function () {

    const overlay = document.getElementById( 'overlay' );
    overlay.remove();
    init();
    animate();
    fade();
} );


//Create a Three.JS Scene
const scene = new THREE.Scene();
//create a new camera with positions and angles
const camera = new THREE.OrthographicCamera( 1080 / - 5, 1080 / 5, 1080 / 5, 1080 / - 5, 1, 1000 );

//Keep the 3D object on a global variable so we can access it later
let object;

//OrbitControls allow the camera to move around the scene
//let controls;

//Set which object to render
let objToRender = 'coming';


//Instantiate a loader for the .gltf file
const loader = new GLTFLoader();


function init() {

//Load the file
loader.load(
  `models/eye/scene.gltf`,
  function (gltf) {
    //If the file is loaded, add it to the scene
    object = gltf.scene;
    scene.add(object);
  },
  function (xhr) {
    //While it is loading, log the progress
    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
  },
  function (error) {
    //If there is an error, log it
    console.error(error);
  }
);

//Instantiate a new renderer and set its size
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true }); //Alpha: true allows for the transparent background
renderer.setSize(2160, 2160);

window.addEventListener('deviceorientation', function(e) {
  var gammaRotation = e.gamma ? e.gamma * (Math.PI / 180) : 0;
  object.rotation.y = gammaRotation;

  var betaRotation = e.beta ? e.beta * (Math.PI / 180) : 0;
  object.rotation.x = betaRotation;
});

//Add the renderer to the DOM
document.getElementById("container3D").appendChild(renderer.domElement);

//Set how far the camera will be from the 3D model
camera.position.z = objToRender === "coming" ? 750 : 500;

//Add lights to the scene, so we can actually see the 3D model
const topLight = new THREE.DirectionalLight(0xffffff, 5); // (color, intensity)
topLight.position.set(500, 250, 1000) //top-left-ish
topLight.castShadow = true;
scene.add(topLight);


//This adds controls to the camera, so we can rotate / zoom it with the mouse


 
 //controls = new DeviceOrientationControls(scene, renderer.domElement);
//controls = new OrbitControls(camera, renderer.domElement);
 




//Render the scene
function animate() {
  requestAnimationFrame(animate);
  //Here we could add some code to update the scene, adding some automatic movement
  window.addEventListener("resize", function () {
    camera.aspect = 1080 / 1080;
    camera.updateProjectionMatrix();
    renderer.setSize(1080, 1080);
  });
 // object.rotation.x = 1.55;

 
// controls.update();


  renderer.render(scene, camera);
}



//Add a listener to the window, so we can resize the window and the camera




//add mouse position listener, so we can make the eye move
//document.onmousemove = (e) => {
//  var mouseX = e.clientX;
//  var mouseY = e.clientY;

 //  object.rotation.y = (-0.5 + mouseX / window.innerWidth) / 2;
 //  object.rotation.x = (-0.5 + mouseY / window.innerHeight) / 2;
 //  console.log(mouseX)
//}


//Start the 3D rendering


animate();

}

//---------------------------------------------------



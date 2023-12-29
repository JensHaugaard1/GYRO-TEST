



import * as THREE from 'https://unpkg.com/three@0.126.0/build/three.module.js';
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";
import { DeviceOrientationControls } from 'https://unpkg.com/three@0.126.0/examples/jsm/controls/DeviceOrientationControls.js';


//Create a Three.JS Scene
const scene = new THREE.Scene();
//create a new camera with positions and angles
const camera = new THREE.PerspectiveCamera(40, 2160 / 2160, 0.1, 2000);

//Keep track of the mouse position, so we can make the eye move
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

//Keep the 3D object on a global variable so we can access it later
let object;

//OrbitControls allow the camera to move around the scene
let controls;


//Set which object to render
let objToRender = 'dino';


//Instantiate a loader for the .gltf file
const loader = new GLTFLoader();

//Load the file
loader.load(
  `models/${objToRender}/scene.gltf`,
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


//Add the renderer to the DOM
document.getElementById("container3D").appendChild(renderer.domElement);

//Set how far the camera will be from the 3D model
camera.position.z = objToRender === "eye" ? 500 : 500;

//Add lights to the scene, so we can actually see the 3D model
const topLight = new THREE.DirectionalLight(0xffffff, 4); // (color, intensity)
topLight.position.set(1000, 1000, 1000) //top-left-ish
topLight.castShadow = true;
scene.add(topLight);

const ambientLight = new THREE.AmbientLight(0xffffff, objToRender === "eye" ? 5 : 1);
scene.add(ambientLight);

//This adds controls to the camera, so we can rotate / zoom it with the mouse
if (objToRender === "dino") {
 controls = new OrbitControls(camera, renderer.domElement);
 
}



//Render the scene
function animate() {
  requestAnimationFrame(animate);
  //Here we could add some code to update the scene, adding some automatic movement
  scene.rotation.y = 1;
  

  //Make the eye move
  if (object && objToRender === "eye") {
    //I've played with the constants here until it looked good 
  
    //object.rotation.x = -1 + mouseY * 1 / window.innerHeight;
    //object.rotation.y += 0.01;
    //object.rotation.y += 0.01;
   // object.rotation.y = scrollY * 1 / window.innerHeight;
    //object.rotation.y = tiltX * 1 / window.innerHeight;


 
  }



  renderer.render(scene, camera);
}



//Add a listener to the window, so we can resize the window and the camera
window.addEventListener("resize", function () {
  camera.aspect = 1080 / 1080;
  camera.updateProjectionMatrix();
  renderer.setSize(1080, 1080);
});

//add mouse position listener, so we can make the eye move
document.onmousemove = (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;


  
}




let scrollY = window.scrollY


window.addEventListener('scroll', () =>
{
    scrollY = window.scrollY

    console.log(scrollY)
})



if (window.DeviceOrientationEvent) {
  window.addEventListener('deviceorientation', function (eventData) {


      var tiltX = Math.round(eventData.gamma * 2 );


      var tiltY =  Math.round(eventData.beta * 2);

      deviceOrientationHandler(tiltX,tiltY);

  }, false);
}

function deviceOrientationHandler(tiltX, tiltY){

 mouseX = tiltX;
 mouseY = tiltY;
}




//Start the 3D rendering
animate();



//---------------------------------------------------



    
import * as THREE from 'https://unpkg.com/three@0.126.0/build/three.module.js';
import { DeviceOrientationControls } from 'https://unpkg.com/three@0.126.0/examples/jsm/controls/DeviceOrientationControls.js';

let camera, scene, renderer, controls;

const startButton = document.getElementById( 'startButton' );
var fadingText = document.getElementById('thing').style;
fadingText.opacity = 1;
function fade()
{
  (fadingText.opacity-=.01)<0?fadingText.display="none":setTimeout(fade,100)
}


startButton.addEventListener( 'click', function () {

const overlay = document.getElementById( 'overlay' );
overlay.remove();
init();
animate();
fade();
} );

function init() {

camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1100 );

controls = new DeviceOrientationControls( camera );

scene = new THREE.Scene();

const geometry = new THREE.SphereGeometry( 500, 60, 40 );
// invert the geometry on the x-axis so that all of the faces point inward
geometry.scale( - 1, 1, 1 );
//https://mir-s3-cdn-cf.behance.net/project_modules/fs/211e3a77589717.603e6e5607c60.jpg
const material = new THREE.MeshBasicMaterial( {
  map: new THREE.TextureLoader().load( 'banka-aliance-min.jpg' )
} );

const mesh = new THREE.Mesh( geometry, material );
scene.add( mesh );

// const helperGeometry = new THREE.BoxGeometry( 100, 100, 100, 4, 4, 4 );
// const helperMaterial = new THREE.MeshBasicMaterial( { color: 0xff00ff, wireframe: true } );
// const helper = new THREE.Mesh( helperGeometry, helperMaterial );
// scene.add( helper );

//

renderer = new THREE.WebGLRenderer( { antialias: true } );
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

//

window.addEventListener( 'resize', onWindowResize );


}

function animate() {

window.requestAnimationFrame( animate );
controls.update();
renderer.render( scene, camera );

}

function onWindowResize() {

camera.aspect = window.innerWidth / window.innerHeight;
camera.updateProjectionMatrix();
renderer.setSize( window.innerWidth, window.innerHeight );

}



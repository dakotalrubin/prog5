// prog5: Feel Good JS
// main.js
// Written by Kimberly Ho (Student ID: 1812644)
// and Dakota Rubin (Student ID: 1595408)
// CSE 160 (Winter 2024)

import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

import * as HELPERS from "./helpers.js";

// =============================================================================
// HELPER FUNCTIONS ============================================================
// =============================================================================


// Introduce variables to control camera animation
let startCameraPosition = new THREE.Vector3(0, 600, 0); // Initial position for the camera
let targetCameraPosition = new THREE.Vector3(0, 600, -1.45); // Final position for the camera
let animationDuration = 9; // Duration of the animation in seconds
let animationStartTime; // Time when the animation started

// This function loads the windmill island model
async function loadWindmillIsland() {
  // Instantiate a GLTFLoader for this model
  const loader = new GLTFLoader();

  // Load this model
  await loader.load("./public/models/windmill_island.gltf", (gltf) => {
    // Unique animations for this model
    windmillMixer = new THREE.AnimationMixer(gltf.scene);
    windmill = windmillMixer.clipAction(gltf.animations[0]);

    // Add this model into the scene
    scene.add(gltf.scene);

    // Unique transformations for this model
    gltf.scene.position.x = 0;
    gltf.scene.position.y = 0;
    gltf.scene.position.z = 0;
    gltf.scene.rotation.y = 5;
  });
}

// This function loads the laughing head model
async function loadLaughingHead() {
  // Instantiate a GLTFLoader for this model
  const loader = new GLTFLoader();

  // Load this model
  await loader.load("./public/models/AnimatedLaugh.gltf", (gltf) => {
    // Unique animations for this model
    laughMixer = new THREE.AnimationMixer(gltf.scene);
    laugh = laughMixer.clipAction(gltf.animations[0]);
    laugh.setLoop(THREE.LoopOnce, 1);
    laugh.timeScale = 1; // Change this to adjust the animation playback speed

    // Add this model into the scene
    scene.add(gltf.scene);

    // Unique transformations for this model
    gltf.scene.position.x = 0;
    gltf.scene.position.y = 600;
    gltf.scene.position.z = -1;
    // gltf.scene.rotation.y = 0;
  });
}

// Introduce boolean flag for camera movement
let moveCameraForward = true;

// This function redraws the main scene every time the screen refreshes
function animate() {
  // Update time passed since last frame
  deltaSeconds = (Date.now() - lastFrame) / 1000;
  // Calculate elapsed time since the animation started
  let elapsed = (Date.now() - animationStartTime) / 1000;

  // Check if the animation duration has elapsed
  if (elapsed >= animationDuration) {
    // Animation complete, set the camera to the final position
    camera.position.copy(targetCameraPosition);
    return;
  }

  // Update the animation for each mixer every frame
  if (laughMixer) {
    laughMixer.update(deltaSeconds);
  }
  if (windmillMixer) {
    windmillMixer.update(deltaSeconds);
  }
  // // Move the camera forward if the flag is active
  // if (moveCameraForward) {
  //   while (camera.position.z > -0.9) {
  //   //   camera.translateZ(-0.1); // Adjust the amount of forward movement
  //     camera.translateZ(-0.00001);
  //   }
  //   moveCameraForward = false;
  // }
  // Interpolate camera position based on elapsed time
  let progress = elapsed / animationDuration;
  let currentPosition = startCameraPosition.clone().lerp(targetCameraPosition, progress);

  // Check if the current position is within the delta distance of the target position
  let deltaDistanceSquared = currentPosition.distanceToSquared(targetCameraPosition);
  if (deltaDistanceSquared <= 0.0001 * 0.0001) {
    // Animation complete, set the camera to the final position
    camera.position.copy(targetCameraPosition);
    return;
  }

  // Set the camera position to the current position
  camera.position.copy(currentPosition);

  // Incrementally rotate the sky sphere mesh along the y-axis
  skySphereMesh.rotation.y += 0.0001;

  // Update the time of the most recent frame
  lastFrame = Date.now();

  // Retrieve the next frame to show after the screen refreshes
  requestAnimationFrame(animate);

  // Required for certain OrbitControls settings
  if (controls) {
    controls.update();
  }

  // Draw the updated scene
  renderer.render(scene, camera);
}

// This function plays out the main scene
function playScene() {
  // Begin playing music
  music.play();

  // Trigger all animations here when the main scene starts
  laugh.play();
  windmill.play();

  // Start the animation for the camera movement
  animationStartTime = Date.now();

  // // Allow the camera controls to orbit around the windmill island
  // controls = new OrbitControls(camera, document.body);

  // // Set and update default camera controls
  // controls.target.set(0, 600, 0);
  // controls.keyPanSpeed = 20;
  // controls.enableDamping = true;
  // controls.update();

  // // Allow the arrow keys to pan the camera
  // controls.listenToKeyEvents(document.body);
}

// =============================================================================
// SCENE SETUP =================================================================
// =============================================================================

// Set up the three.js scene
const scene = new THREE.Scene();

// Use a perspective camera with field of view (in degrees), aspect ratio, and
// near and far boundaries (objects closer than 'near' or further than 'far'
// won't be rendered)
const camera = new THREE.PerspectiveCamera(
  45, window.innerWidth / window.innerHeight, 0.1, 1000
);

// Set the default camera position and viewing target
camera.position.set(0, 600, 0);
// camera.lookAt(0, 0, 0);

// Create a renderer instance and set the width and height as the browser size
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

// Add the renderer element to the HTML document
document.body.appendChild(renderer.domElement);

// Create a variable that will allow dynamic camera movement with OrbitControls
var controls;

// Show the loading screen while waiting for models to load
const loadingManager = HELPERS.showLoadingScreen();

// =============================================================================
// LOADING ASSETS ==============================================================
// =============================================================================

// LOAD AUDIO ==================================================================
// Create a new HTMLAudioElement to hold music
const music = new Audio("./public/audio/feelgoodinc.mp3");

// Adjust music settings
music.volume = 0.6;
music.loop = false;

// LOAD LIGHTING ===============================================================
// White directional light at the given intensity shining from above
const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 3);
scene.add(directionalLight);

// LOAD THE SKY SPHERE =========================================================
// The parameters of SphereGeometry: radius, widthSegments and heightSegments
const skySphere = new THREE.SphereGeometry(500, 32, 16);

// Instantiate a texture loader and wait for sky sphere texture to load
const skySphereTexture =
  await new THREE.TextureLoader().loadAsync("./public/textures/skySphereTexture.jpeg");

// Use the sky sphere texture for material creation 
const skySphereMaterial = new THREE.MeshBasicMaterial({ map:skySphereTexture });

// Place the texture on the inside of the sky sphere
skySphereMaterial.side = THREE.BackSide;

// Create a mesh of the sky sphere using its geometry and material
const skySphereMesh = new THREE.Mesh(skySphere, skySphereMaterial);

// The sky sphere is placed at (0, 0, 0) by default
skySphereMesh.rotation.y = 4;
scene.add(skySphereMesh);

// LOAD MODELS =================================================================
// Create a mixer for each model to play animations
var windmillMixer, laughMixer;

// Create a variable for each model to trigger animations
var windmill, laugh;

// Create variables to track the time passed since the most recent frame
var deltaSeconds, lastFrame;

// Load all models into the main scene
loadWindmillIsland();
loadLaughingHead();

// LOAD THE MAIN SCENE =========================================================
// Transition from the loading screen to the main scene after loading all assets
loadingManager.onLoad();

// =============================================================================
// MAIN CODE ===================================================================
// =============================================================================

// Redraw the main scene every time the screen refreshes
animate();

// Wait for loading screen to transition then show play button
setTimeout(HELPERS.showPlayButton, 850);

// Add an event listener to the play button that plays the main scene
document.getElementById("playButton").addEventListener("click", () => {
  // Remove the play button after clicking
  document.getElementById("playButton").remove();

  // Play out the main scene
  playScene();
});
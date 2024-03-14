// prog5: Feel Good JS
// main.js
// Written by Kimberly Ho (Student ID: 1812644)
// and Dakota Rubin (Student ID: 1595408)
// CSE 160 (Winter 2024)

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

import * as HELPERS from "./helpers.js";

// =============================================================================
// HELPER FUNCTIONS ============================================================
// =============================================================================

// This function loads the windmill island model
function loadWindmillIsland() {
  // Instantiate a GLTFLoader for this model
  const windmillIslandLoader = new GLTFLoader();

  // Load the model into the scene
  windmillIslandLoader.load("./public/models/windmill_island.gltf", (gltf) => {
    const windmillIsland = gltf.scene;
    scene.add(windmillIsland);

    // Default transformations for this model
    windmillIsland.position.x = 0;
    windmillIsland.position.y = 0;
    windmillIsland.position.z = 0;
    windmillIsland.rotation.y = -30;
  });
}

// This function loads the windmill island model
function loadLaughingHead() {
  // Instantiate a GLTFLoader for this model
  const laughingHeadLoader = new GLTFLoader();

  // Load the model into the scene
  laughingHeadLoader.load("./public/models/AnimatedLaugh.gltf", (gltf) => {
    const laughingHead = gltf.scene;
    scene.add(laughingHead);

    // Default transformations for this model
    laughingHead.position.x = 0;
    laughingHead.position.y = 0;
    laughingHead.position.z = 4;
  });
}

// This function loads all GLTF models into the main scene
function loadGLTFModels() {
  // Call a new function to load each model here
  loadWindmillIsland();
  loadLaughingHead();
}

// This function redraws the main scene every time the screen refreshes
function animate() {
  // Retrieve the next frame to show after the screen refreshes
  requestAnimationFrame(animate);

  // Rotate the sky sphere mesh along the y-axis by a small amount each frame
  skySphereMesh.rotation.y += 0.0001;

  // Draw the updated scene
  renderer.render(scene, camera);
}

// This function plays out the main scene
function playScene() {
  // TODO: Use the OrbitControls module here to control the camera!
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
  75, window.innerWidth / window.innerHeight, 0.1, 1000
);

// Set the default camera position
camera.position.z = 5;

// Create a renderer instance and set the width and height as the browser size
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

// Add the renderer element to the HTML document
document.body.appendChild(renderer.domElement);

// Show the loading screen while waiting for models to load
const loadingManager = HELPERS.showLoadingScreen();

// =============================================================================
// LOADING ASSETS ==============================================================
// =============================================================================

// LOAD MUSIC ==================================================================
// Create a new HTMLAudioElement to hold music
const music = new Audio("./public/audio/feelgoodinc.mp3");

// Adjust music settings
music.volume = 0.4;
music.loop = true;

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
scene.add(skySphereMesh);

// LOAD GLTF MODELS ============================================================
// Load all GLTF models into the main scene
loadGLTFModels();

// LOAD THE MAIN SCENE =========================================================
// Transition from the loading screen to the main scene after loading all assets
loadingManager.onLoad();

// =============================================================================
// MAIN CODE ===================================================================
// =============================================================================

// Redraw the main scene every time the screen refreshes
animate();

// Wait for loading screen to transition then show play button
setTimeout(HELPERS.showPlayButton, 900);

// Add an event listener to the play button that plays the main scene
document.getElementById("playButton").addEventListener("click", () => {
  // Remove the play button after clicking
  document.getElementById("playButton").remove();

  // Play out the main scene
  music.play(); // You can comment this line out to mute the audio while we test!
  playScene();
});
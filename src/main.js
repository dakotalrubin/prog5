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

// This function redraws the main scene every time the screen refreshes
function animate() {
  // Retrieve the next frame to show after the screen refreshes
  requestAnimationFrame(animate);



  // Rotate the cube along the y-axis by a small amount each frame
  cube.rotation.y += 0.01;

  // Draw the updated scene
  renderer.render(scene, camera);
}

// This function loads and plays music
function playAudio() {
  // Create an AudioListener and add it to the camera
  const listener = new THREE.AudioListener();
  camera.add(listener);

  // Create a global Audio source
  const sound = new THREE.Audio(listener);

  // Load a sound and set it as the Audio object's buffer
  const audioLoader = new THREE.AudioLoader();

  // Load an mp3 file into the scene
  audioLoader.load("./public/audio/feelgoodinc.mp3", function(buffer) {
    sound.setBuffer(buffer);
    sound.setLoop(true);
    sound.setVolume(0.4);
    sound.play();
  });
}

// This function plays out the main scene
function playScene() {
  // Play music
  playAudio();

  // Move the camera
  camera.position.z = 20;
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



// LOAD A CUBE =================================================================
// Create a cube mesh using the given vertices and material color
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);

// The cube is placed at coordinates (0, 0, 0) by default
scene.add(cube);

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
  playScene();
});
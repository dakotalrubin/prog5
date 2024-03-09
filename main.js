// prog5: Feel Good JS
// Written by Kimberly Ho (Student ID: 1812644)
// and Dakota Rubin (Student ID: 1595408)
// CSE 160 (Winter 2024)

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

// ============================================================================
// HELPER FUNCTIONS ===========================================================
// ============================================================================

// This function redraws the scene every time the screen refreshes
function animate() {
  // Retrieve the next frame to show after the screen refreshes
  // Pauses animation when the user clicks away from this tab in their browser
  requestAnimationFrame(animate);

  // Rotate the cube by a small amount every frame
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  // Draw the updated scene
  renderer.render(scene, camera);
}

// This function makes a sky sphere that will contain the windmill scene
function createSkySphere() {
  // The parameters of SphereGeometry: radius, widthSegments and heightSegments
  const skySphere = new THREE.SphereGeometry(1000, 32, 16);

  // Instantiate a texture loader and load the sky sphere texture
  const skySphereTexture = new THREE.TextureLoader().load("./images/skytown.png");

  // Use the sky sphere texture for material creation 
  const skySphereMaterial = new THREE.MeshBasicMaterial({ map:skySphereTexture });

  // Create a mesh of the sky sphere using its geometry and material
  const skySphereMesh = new THREE.Mesh(skySphere, skySphereMaterial);

  // Place the texture on the inside of the sky sphere
  skySphereMesh.material.side = THREE.BackSide;

  // The sky sphere is placed at (0, 0, 0) by default
  scene.add(skySphereMesh);
}
// this is not a test


// ============================================================================
// MAIN CODE ==================================================================
// ============================================================================

// Set up the three.js scene
const scene = new THREE.Scene();

// Use a perspective camera with field of view (in degrees), aspect ratio, and
// near and far boundaries (objects closer than 'near' or further than 'far'
// won't be rendered)
const camera = new THREE.PerspectiveCamera(
  75, window.innerWidth / window.innerHeight, 0.1, 1000
);

// Creare a renderer instance and set the width and height as the browser size
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

// Add the renderer element to the HTML document
document.body.appendChild(renderer.domElement);

// Make a sky sphere that will contain the windmill scene
createSkySphere();

// Create a cube mesh using the given vertices and material color
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);

// The cube is placed at coordinates (0, 0, 0) by default
scene.add(cube);

// Move the camera to show different parts of the map and objects
camera.position.z = 5;

// Call the main loop to redraw the scene every time the screen refreshes
animate();
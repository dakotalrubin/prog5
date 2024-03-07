// prog5: Feel Good JS
// Written by Dakota Rubin (Student ID: 1595408)
// CSE 160 (Winter 2024)

import * as THREE from "https://unpkg.com/three@v0.162.0/build/three.module.js";
import { OrbitControls }
  from "https://unpkg.com/three@v0.162.0/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader }
  from "https://unpkg.com/three@v0.162.0/examples/jsm/loaders/GLTFLoader.js";

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

// Create a cube mesh using the given vertices and material color
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);

// The cube is placed at coordinates (0, 0, 0) by default
scene.add(cube);

// Move the camera outward to show the cube
camera.position.z = 5;

// Call the main loop to redraw the scene every time the screen refreshes
animate();
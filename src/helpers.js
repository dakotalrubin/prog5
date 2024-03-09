// prog5: Feel Good JS
// helpers.js
// Written by Kimberly Ho (Student ID: 1812644)
// and Dakota Rubin (Student ID: 1595408)
// CSE 160 (Winter 2024)

import * as THREE from 'three';

// =============================================================================
// HELPER FUNCTIONS ============================================================
// =============================================================================

// This function removes a loader from the DOM via event listener
export function onTransitionEnd(event) {
  event.target.remove();
}

// This function shows the loading screen while waiting for models to load
export function showLoadingScreen() {
  // Create a loading screen manager
  const loadingManager = new THREE.LoadingManager(() => {

    // Fetch the loading screen HTML element
    const loadingScreen = document.getElementById('loading-screen');
    loadingScreen.classList.add('fade-out');

    // Remove the loader from the DOM via event listener
    loadingScreen.addEventListener('transitionend', onTransitionEnd);
  });

  return loadingManager;
}
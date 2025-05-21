import * as THREE from 'three';
import { setupControls } from './controls.js';
import { Player } from './player.js';

let renderer, scene, camera, player;

function init() {
  scene = new THREE.Scene();

  camera = new THREE.OrthographicCamera(
    window.innerWidth / -2,
    window.innerWidth / 2,
    window.innerHeight / 2,
    window.innerHeight / -2,
    0.1,
    1000
  );
  camera.position.set(0, 100, 0);
  camera.lookAt(0, 0, 0);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  player = new Player();
  scene.add(player.mesh);

  window.addEventListener('resize', onWindowResize);
  document.addEventListener('mousemove', onMouseMove);
  setupControls();

  animate();
}

function onWindowResize() {
  camera.left = window.innerWidth / -2;
  camera.right = window.innerWidth / 2;
  camera.top = window.innerHeight / 2;
  camera.bottom = window.innerHeight / -2;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function onMouseMove(event) {
  const mouse = new THREE.Vector2(
    (event.clientX / window.innerWidth) * 2 - 1,
    -(event.clientY / window.innerHeight) * 2 + 1
  );
  const raycaster = new THREE.Raycaster();
  raycaster.setFromCamera(mouse, camera);
  const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
  const intersect = new THREE.Vector3();
  raycaster.ray.intersectPlane(plane, intersect);
  const angle = Math.atan2(intersect.x - player.mesh.position.x, intersect.z - player.mesh.position.z);
  player.mesh.rotation.y = angle;
}

function animate() {
  requestAnimationFrame(animate);
  player.update();
  renderer.render(scene, camera);
}

window.addEventListener('DOMContentLoaded', init);

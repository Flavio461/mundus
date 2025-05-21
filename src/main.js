let renderer, scene, camera, player;
let velocity = new THREE.Vector2();
const keys = {};
const acceleration = 0.2;
const maxSpeed = 2;
const friction = 0.9;

function init(){
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

  const geometry = new THREE.CircleGeometry(10, 32);
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  player = new THREE.Mesh(geometry, material);
  player.rotation.x = -Math.PI / 2;
  scene.add(player);

  window.addEventListener('resize', onWindowResize);
  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('keydown', (e)=> keys[e.key.toLowerCase()] = true);
  document.addEventListener('keyup', (e)=> keys[e.key.toLowerCase()] = false);

  animate();
}

function onWindowResize(){
  camera.left = window.innerWidth / -2;
  camera.right = window.innerWidth / 2;
  camera.top = window.innerHeight / 2;
  camera.bottom = window.innerHeight / -2;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function onMouseMove(event){
  const mouse = new THREE.Vector2(
    (event.clientX / window.innerWidth) * 2 - 1,
    -(event.clientY / window.innerHeight) * 2 + 1
  );
  const raycaster = new THREE.Raycaster();
  raycaster.setFromCamera(mouse, camera);
  const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
  const intersect = new THREE.Vector3();
  raycaster.ray.intersectPlane(plane, intersect);
  const angle = Math.atan2(intersect.x - player.position.x, intersect.z - player.position.z);
  player.rotation.y = angle;
}

function update(){
  const dir = new THREE.Vector2(
    (keys['d'] ? 1 : 0) - (keys['a'] ? 1 : 0),
    (keys['s'] ? 1 : 0) - (keys['w'] ? 1 : 0)
  );

  if(dir.lengthSq() > 0){
    dir.normalize().multiplyScalar(acceleration);
    velocity.add(dir);
    velocity.clampLength(0, maxSpeed);
  } else {
    velocity.multiplyScalar(friction);
  }

  player.position.x += velocity.x;
  player.position.z += velocity.y;
}

function animate(){
  requestAnimationFrame(animate);
  update();
  renderer.render(scene, camera);
}

init();

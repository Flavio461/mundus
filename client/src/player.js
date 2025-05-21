import * as THREE from 'three';
import { keys } from './controls.js';

export class Player {
  constructor() {
    this.mesh = new THREE.Mesh(
      new THREE.CircleGeometry(10, 32),
      new THREE.MeshBasicMaterial({ color: 0x00ff00 })
    );
    this.mesh.rotation.x = -Math.PI / 2;
    this.velocity = new THREE.Vector2();
    this.acceleration = 0.2;
    this.maxSpeed = 2;
    this.friction = 0.9;
  }

  update() {
    const dir = new THREE.Vector2(
      (keys['d'] ? 1 : 0) - (keys['a'] ? 1 : 0),
      (keys['s'] ? 1 : 0) - (keys['w'] ? 1 : 0)
    );

    if (dir.lengthSq() > 0) {
      dir.normalize().multiplyScalar(this.acceleration);
      this.velocity.add(dir);
      this.velocity.clampLength(0, this.maxSpeed);
    } else {
      this.velocity.multiplyScalar(this.friction);
    }

    this.mesh.position.x += this.velocity.x;
    this.mesh.position.z += this.velocity.y;
  }
}

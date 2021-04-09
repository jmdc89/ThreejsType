import * as THREE from "/build/three.module.js";
import { OrbitControls } from "/jsm/controls/OrbitControls";
const scene = new THREE.Scene();
const camera1 = new THREE.PerspectiveCamera(75, 1, 2, 10);
// const camera2: THREE.OrtographicCamera = new THREE.OrtographicCamera(
//   -2,
//   2,
//   2,
//   -2,
//   0.1,
//   10
// );
const canvas1 = (document.getElementById("c1"));
const canvas2 = (document.getElementById("c2"));
const renderer1 = new THREE.WebGLRenderer({
    canvas: canvas1,
});
renderer1.setSize(200, 200);
const renderer2 = new THREE.WebGLRenderer({
    canvas: canvas2,
});
renderer2.setSize(200, 200);
// document.body.appendChild(renderer.domElement);
const controls = new OrbitControls(camera1, renderer1.domElement);
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({
    color: 0x00ff00,
    wireframe: true,
});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);
camera1.position.z = 2;
// camera2.position.z = 2;
var animate = function () {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    controls.update();
    renderer1.render(scene, camera1);
    // renderer2.render(scene, camera2);
};
animate();

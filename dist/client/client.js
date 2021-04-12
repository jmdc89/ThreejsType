// If using Relative Import References
import * as THREE from "/build/three.module.js";
import { OrbitControls } from "/jsm/controls/OrbitControls";
import Stats from "/jsm/libs/stats.module";
import { GUI } from "/jsm/libs/dat.gui.module";
// If using Module Specifiers
//import * as THREE from 'three'
//import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
//import Stats from 'three/examples/jsm/libs/stats.module'
//import { GUI } from 'three/examples/jsm/libs/dat.gui.module'
const scene = new THREE.Scene();
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
const controls = new OrbitControls(camera, renderer.domElement);
//controls.addEventListener('change', render)
const boxGeometry = new THREE.BoxGeometry();
const sphereGeometry = new THREE.SphereGeometry();
const icosahedronGeometry = new THREE.IcosahedronGeometry(1, 0);
const planeGeometry = new THREE.PlaneGeometry();
const torusKnotGeometry = new THREE.TorusKnotGeometry();
const material = new THREE.MeshBasicMaterial(); //{ color: 0x00ff00, wireframe: true })
const texture = new THREE.TextureLoader().load("img/grid.png");
material.map = texture;
// const envTexture = new THREE.CubeTextureLoader().load(["img/px_50.png", "img/nx_50.png", "img/py_50.png", "img/ny_50.png", "img/pz_50.png", "img/nz_50.png"])
// envTexture.mapping = THREE.CubeReflectionMapping
// envTexture.mapping = THREE.CubeRefractionMapping
// material.envMap = envTexture
const cube = new THREE.Mesh(boxGeometry, material);
cube.position.x = 5;
scene.add(cube);
const sphere = new THREE.Mesh(sphereGeometry, material);
sphere.position.x = 3;
scene.add(sphere);
const icosahedron = new THREE.Mesh(icosahedronGeometry, material);
icosahedron.position.x = 0;
scene.add(icosahedron);
const plane = new THREE.Mesh(planeGeometry, material);
plane.position.x = -2;
scene.add(plane);
const torusKnot = new THREE.Mesh(torusKnotGeometry, material);
torusKnot.position.x = -5;
scene.add(torusKnot);
camera.position.z = 3;
window.addEventListener("resize", onWindowResize, false);
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    render();
}
const stats = Stats();
document.body.appendChild(stats.dom);
var options = {
    side: {
        FrontSide: THREE.FrontSide,
        BackSide: THREE.BackSide,
        DoubleSide: THREE.DoubleSide,
    },
    combine: {
        MultiplyOperation: THREE.MultiplyOperation,
        MixOperation: THREE.MixOperation,
        AddOperation: THREE.AddOperation,
    },
};
const gui = new GUI();
const materialFolder = gui.addFolder("THREE.Material");
materialFolder.add(material, "transparent");
materialFolder.add(material, "opacity", 0, 1, 0.01);
materialFolder.add(material, "depthTest");
materialFolder.add(material, "depthWrite");
materialFolder
    .add(material, "alphaTest", 0, 1, 0.01)
    .onChange(() => updateMaterial());
materialFolder.add(material, "visible");
materialFolder
    .add(material, "side", options.side)
    .onChange(() => updateMaterial());
materialFolder.open();
var data = {
    color: material.color.getHex(),
};
var meshBasicMaterialFolder = gui.addFolder("THREE.MeshBasicMaterial");
meshBasicMaterialFolder.addColor(data, "color").onChange(() => {
    material.color.setHex(Number(data.color.toString().replace("#", "0x")));
});
meshBasicMaterialFolder.add(material, "wireframe");
//meshBasicMaterialFolder.add(material, 'wireframeLinewidth', 0, 10);
//meshBasicMaterialFolder.add(material, 'combine', options.combine).onChange(() => updateMaterial())
//meshBasicMaterialFolder.add(material, 'reflectivity', 0, 1);
//meshBasicMaterialFolder.add(material, 'refractionRatio', 0, 1);
meshBasicMaterialFolder.open();
function updateMaterial() {
    material.side = Number(material.side);
    material.combine = Number(material.combine);
    material.needsUpdate = true;
}
var animate = function () {
    requestAnimationFrame(animate);
    render();
    stats.update();
};
function render() {
    renderer.render(scene, camera);
}
animate();

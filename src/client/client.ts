import * as THREE from "/build/three.module.js";
import { OrbitControls } from "/jsm/controls/OrbitControls";
import { GLTFLoader } from "/jsm/loaders/GLTFLoader";
import Stats from "/jsm/libs/stats.module";
import { TWEEN } from "/jsm/libs/tween.module.min";

const scene: THREE.Scene = new THREE.Scene();
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

const camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 2;

const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer();
renderer.physicallyCorrectLights = true;
renderer.shadowMap.enabled = true;
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
//controls.addEventListener('change', render) //this line is unnecessary if you are re-rendering within the animation loop

let sceneMeshes = new Array();

const loader = new GLTFLoader();
loader.load(
  "models/monkey_textured.glb",
  function (gltf) {
    gltf.scene.traverse(function (child) {
      if ((<THREE.Mesh>child).isMesh) {
        let m = <THREE.Mesh>child;
        m.receiveShadow = true;
        m.castShadow = true;
        //(<THREE.MeshStandardMaterial>m.material).flatShading = true
        sceneMeshes.push(m);
      }
      if ((<THREE.Light>child).isLight) {
        let l = <THREE.Light>child;
        l.castShadow = true;
        l.shadow.bias = -0.003;
        l.shadow.mapSize.width = 2048;
        l.shadow.mapSize.height = 2048;
      }
    });
    scene.add(gltf.scene);
  },
  (xhr) => {
    console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
  },
  (error) => {
    console.log(error);
  }
);

window.addEventListener("resize", onWindowResize, false);
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  render();
}

const raycaster = new THREE.Raycaster();

renderer.domElement.addEventListener("dblclick", onDoubleClick, false);
function onDoubleClick(event: MouseEvent) {
  const mouse = {
    x: (event.clientX / renderer.domElement.clientWidth) * 2 - 1,
    y: -(event.clientY / renderer.domElement.clientHeight) * 2 + 1,
  };
  raycaster.setFromCamera(mouse, camera);

  const intersects = raycaster.intersectObjects(sceneMeshes, false);

  if (intersects.length > 0) {
    const p = intersects[0].point;
    //controls.target.set(p.x, p.y, p.z)

    // new TWEEN.Tween(controls.target)
    //     .to({
    //         x: p.x,
    //         y: p.y,
    //         z: p.z
    //     }, 500)
    //     //.delay (1000)
    //     .easing(TWEEN.Easing.Cubic.Out)
    //     //.onUpdate(() => render())
    //     .start();
  }
}

const stats = Stats();
document.body.appendChild(stats.dom);

const clock: THREE.Clock = new THREE.Clock();

var animate = function () {
  requestAnimationFrame(animate);

  controls.update();

  TWEEN.update();

  render();

  stats.update();
};

function render() {
  renderer.render(scene, camera);
}
animate();

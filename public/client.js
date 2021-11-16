import * as THREE from '/build/three.module.js';
import { OrbitControls } from '/jsm/controls/OrbitControls.js';
import Stats from '/jsm/libs/stats.module.js';
const canvas = document.querySelector('.webgl');

let scene;
let camera;
let renderer;

scene = new THREE.Scene();


const fov = 20;
const aspect = window.innerWidth / window.innerHeight;
const near = 0.1;
const far = 1000;

camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 20;
scene.add(camera);


renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.autoClear = false;
renderer.setClearColor(0x000000, 0.0);

const controls = new OrbitControls(camera, renderer.domElement);

const earthGeometry = new THREE.SphereGeometry(0.6, 32, 32);

const earthMaterial = new THREE.MeshPhongMaterial({
    roughness: 1,
    metalness: 0,
    map: THREE.ImageUtils.loadTexture('texture/earthmap1k.jpg'),
    bumpMap: THREE.ImageUtils.loadTexture('texture/earthbump.jpg'),
    bumpScale: 0.15
});


const earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
scene.add(earthMesh);


const moon = new THREE.SphereGeometry(0.2, 32, 32);

const moon2 = new THREE.MeshPhongMaterial({
    roughness: 1,
    metalness: 0,
    map: THREE.ImageUtils.loadTexture('texture/moonmap1k.jpg'),
    bumpScale: 0.02
});


const moon3 = new THREE.Mesh(moon, moon2);
moon3.position.x += 2;
moon3.position.y += .5;
scene.add(moon3);










const starGeometry = new THREE.SphereGeometry(10, 64, 64);

const starMaterial = new THREE.MeshBasicMaterial({
    map : THREE.ImageUtils.loadTexture('texture/galaxy.png'),
    side: THREE.BackSide
});

const starMesh = new THREE.Mesh(starGeometry, starMaterial);
scene.add(starMesh); 

const cloudGeometry = new THREE.SphereGeometry(0.63, 32, 32);

const cloudMetarial = new THREE.MeshPhongMaterial({
    map: THREE.ImageUtils.loadTexture('texture/earthCloud.png'),
    transparent: true,
});

const cloudMesh = new THREE.Mesh(cloudGeometry, cloudMetarial);
scene.add(cloudMesh);

const ambientlight = new THREE.AmbientLight(0xffffff, 0.2);
scene.add(ambientlight);

const pointLight = new THREE.PointLight(0xffffff, 1)
pointLight.position.set(5, 3, 5);
scene.add(pointLight);

let tmp = 0.01;
const animate = () => {
    requestAnimationFrame(animate);
    earthMesh.rotation.y -= 0.0050;
    cloudMesh.rotation.y -= 0.003;
    starMesh.rotation.y -= 0.002;
    moon3.rotation.y  -= 0.0020;
    moon3.position.x = Math.cos(tmp) * 5;
    moon3.position.z = Math.sin(tmp) * 5;
    controls.update();
    render();
    tmp -= 0.004;
};

const render = () => {
    renderer.render(scene, camera);
}


animate();


















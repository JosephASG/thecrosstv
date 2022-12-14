import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import gsap from 'gsap';
/*import React from 'react';
import { render } from 'react-dom';

const App = () => {
    return <h1>
        hello world
    </h1>
}

render(
    <App />,
    document.getElementById('app')
);*/

const glftLoader = new GLTFLoader();

let tl = gsap.timeline();

//Loading 

const texruealoader = new THREE.TextureLoader();

const normalTexture = texruealoader.load('/textures/worldMap.png')

// Debug
// const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Our hammer

// glftLoader.load('/objects/robot_samurai/scene.gltf', (gltf) => {

//     //gltf.scene.scale.set(0.05, 0.05, 0.05)
//     scene.add(gltf.scene)

//     gui.add(gltf.scene.rotation, 'x').min(0).max(9);
//     gui.add(gltf.scene.rotation, 'y').min(0).max(9);
//     gui.add(gltf.scene.rotation, 'z').min(0).max(9);

//     //tl.to(gltf.scene.rotation, { y: 6, duration: 1 })
// },
//     () => {
//         console.log("Progress")
//     },
//     () => {
//         console.log("Error")
//     }
// )

//Material

const material = new THREE.MeshStandardMaterial({ color: 0x292929, metalness: 0.7, roughness: 0.2, wireframe: true });
material.normalMap = normalTexture;

//Geometry

const geometry = new THREE.SphereBufferGeometry(0.9, 64, 64);


// Mesh
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

// Lights

const pointLight = new THREE.PointLight(0xffffff, 0.1)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)

//Ligth 1

const pointLight2 = new THREE.PointLight(0x8e0000, 2)
pointLight2.position.set(-1.07, 1.05, 0.6);
pointLight2.intensity = 8.98;
scene.add(pointLight2)

/*const lights1 = gui.addFolder('Light 1');

lights1.add(pointLight2.position, 'y').min(-3).max(3).step(0.01);
lights1.add(pointLight2.position, 'x').min(-6).max(6).step(0.01);
lights1.add(pointLight2.position, 'z').min(-3).max(3).step(0.01);
lights1.add(pointLight2, 'intensity').min(0).max(10).step(0.01);

const lights1Color = {
    color: 0xff0000
}

lights1.addColor(lights1Color, 'color')
    .onChange(() => {
        pointLight2.color.set(lights1Color.color)
    })*/

//const pointLightHelper = new THREE.PointLightHelper(pointLight2, 1);
//scene.add(pointLightHelper);

//Ligth 2

const pointLight3 = new THREE.PointLight(0xffffff, 2)
pointLight3.position.set(1.07, -1.05, 0.6);
pointLight3.intensity = 7.65;
scene.add(pointLight3)

/*const lights2 = gui.addFolder('Light 2');

lights2.add(pointLight3.position, 'y').min(-3).max(3).step(0.01);
lights2.add(pointLight3.position, 'x').min(-6).max(6).step(0.01);
lights2.add(pointLight3.position, 'z').min(-3).max(3).step(0.01);
lights2.add(pointLight3, 'intensity').min(0).max(10).step(0.01);

const lights2Color = {
    color: 0xff0000
}

lights2.addColor(lights2Color, 'color')
    .onChange(() => {
        pointLight3.color.set(lights2Color.color)
    })*/

//const pointLightHelper2 = new THREE.PointLightHelper(pointLight3, 1);
//scene.add(pointLightHelper2);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

window.addEventListener('resize', () => {
  // Update sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  // Update camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  // Update renderer
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

// Controls
//const controls = new OrbitControls(camera, canvas)
//controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */

/*document.addEventListener('mousemove', onDocumentMouseMove);

let mouseX = 0;
let mouseY = 0;

let targetX = 0;
let targetY = 0;

const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;


onDocumentMouseMove = (event) => {
    mouseX = (event.clientX - windowHalfX)
    mouseY = (event.clientY - windowHalfY)
}*/

document.addEventListener('mousemove', onDocumentMouseMove);

let mouseX = 0;
let mouseY = 0;

let targetX = 0;
let targetY = 0;

const windowX = window.innerWidth / 2;
const windowY = window.innerHeight / 2;


function onDocumentMouseMove(event) {
  mouseX = (event.clientX - windowX)
  mouseY = (event.clientY - windowY)
}

window.addEventListener('scroll', updateSphere);

function updateSphere(event) {
  sphere.position.y = window.scrollY * .001;
}

const clock = new THREE.Clock()

const tick = () => {

  targetX = mouseX * .001;
  targetY = mouseY * .001;

  const elapsedTime = clock.getElapsedTime()

  // Update objects
  sphere.rotation.y = .5 * elapsedTime;

  sphere.rotation.y += .5 * (targetX - sphere.rotation.y);
  sphere.rotation.x += .05 * (targetX - sphere.rotation.x);
  sphere.position.z += -.05 * (targetX - sphere.rotation.x);

  // Update Orbital Controls
  // controls.update()

  // Render
  renderer.render(scene, camera)

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}

tick()

<template>
    <div class="example">
        <div id="dom_chap03_ex03" style="width:100%; height:100%"></div>
    </div>
</template>

<script setup>
import { ThreeLayer } from '../ThreeLayer_'
import { onMounted } from 'vue';
import * as THREE from 'three';
import { createMultiMaterialObject } from 'three/examples/jsm/utils/SceneUtils';
import { GUI } from 'dat.gui'

let threeLayer = null;
let cube = null;
let sphere = null;

// used to determine the switch point for the light animation
var invert = 1;
var phase = 0;
let sphereLightMesh = null;
let spotLight = null;
let pointLight = null

let rotationSpeed = 0.03;

onMounted(()=>{
    const container = document.getElementById('dom_chap03_ex03');
    if(!container)
        return;

    threeLayer = new ThreeLayer(container);
    threeLayer.addPlane();

    let cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
    let cubeMaterial = new THREE.MeshLambertMaterial({color: 'red'});
    cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.castShadow = true;
    cube.position.x = -4;
    cube.position.y = 3;
    cube.position.z = 0;
    threeLayer.scene.add(cube);

    let sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
    let sphereMaterial = new THREE.MeshLambertMaterial({color: 'blue'});
    sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.position.x = 20;
    sphere.position.y = 4;
    sphere.position.z = 2;
    sphere.castShadow = true;
    threeLayer.scene.add(sphere);

    // add subtle ambient lighting
    let ambiColor = "#ffffff";
    let ambientLight = new THREE.AmbientLight(ambiColor, 0.1);
    threeLayer.scene.add(ambientLight);

    // add spotLight
    let spotLightColor = "#ffffff";
    let spotLightIntensity = 50;
    let spotLightDist = 100;
    let spotLightAngle = 0;
    let spotLightVisible = true;
    spotLight = new THREE.SpotLight(spotLightColor, 100);
    spotLight.position.set(-20, 20, -10);
    spotLight.castShadow = true;
    threeLayer.scene.add(spotLight);

    let spotLightHelper = new THREE.CameraHelper( spotLight.shadow.camera );
    threeLayer.scene.add( spotLightHelper ); 
    
    // gui
    let gui = new GUI({ autoPlace: false } );
    threeLayer.container.appendChild(gui.domElement);
    gui.domElement.style.position = 'absolute';
    gui.domElement.style.right = '0px';
    gui.domElement.style.top = '0px';

    let controls = new function() {
        this.ambientColor = ambiColor;  
        this.spotLightColor = spotLightColor;
        this.spotLightIntensity = spotLightIntensity;
        this.spotLightDist = spotLightDist;
        this.spotLightAngle = spotLightAngle;
        this.spotLightVisible = spotLightVisible;
    };

    gui.addColor(controls, 'ambientColor').onChange(function (e) {
        ambientLight.color = new THREE.Color(e);
    });
    gui.addColor(controls, 'spotLightColor').onChange(function (e) {
        spotLight.color = new THREE.Color(e);
    });
    gui.add(controls, 'spotLightIntensity', 0, 1000).onChange(function (e) {
        spotLight.intensity = e;
    });
    gui.add(controls, 'spotLightDist', 0, 200).onChange(function (e) {
        spotLight.distance = e;
    });
    gui.add(controls, 'spotLightAngle', 0, Math.PI*2).onChange(function (e) {
        spotLight.angle = e;
    });
    gui.add(controls, 'spotLightVisible').onChange(function (e) {
        spotLight.visible = e;
        spotLightHelper.visible = e;
    });
    
    renderScene();
})

let step = 0;
function renderScene() {
    cube.rotation.x += 0.02;
    cube.rotation.y += 0.02;
    cube.rotation.z += 0.02;
    
    requestAnimationFrame(renderScene);
    threeLayer.renderFrame();
}
</script>

<style>
.example {
    position: relative;
    width: 100%;
    height: 300px;
    padding: 0px;
}
</style>

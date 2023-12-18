<template>
    <div class="example">
        <div id="dom_chap03_ex02" style="width:100%; height:100%"></div>
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
    const container = document.getElementById('dom_chap03_ex02');
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
    let ambientLight = new THREE.AmbientLight(ambiColor, 1);
    threeLayer.scene.add(ambientLight);
    
    // add pointLight
    let pointLightColor = "#ccffcc";
    pointLight = new THREE.PointLight(pointLightColor,15,200);
    pointLight.distance = 10;
    threeLayer.scene.add(pointLight);
    let pointLightVisible = true;

    // small sphere for light
    let sphereLight = new THREE.SphereGeometry(0.2);
    let sphereLightMaterial = new THREE.MeshBasicMaterial({color: 0xac6c25});
    sphereLightMesh = new THREE.Mesh(sphereLight, sphereLightMaterial);
    sphereLightMesh.castShadow = true;
    sphereLightMesh.position.set(3, 0, 3)
    threeLayer.scene.add(sphereLightMesh);

    // gui
    let gui = new GUI({ autoPlace: false } );
    threeLayer.container.appendChild(gui.domElement);
    gui.domElement.style.position = 'absolute';
    gui.domElement.style.right = '0px';
    gui.domElement.style.top = '0px';

    let controls = new function() {
        this.ambientColor = ambiColor;  
        this.pointLightColor = pointLightColor;
        this.pointLightVisible = pointLightVisible;
    };

    gui.addColor(controls, 'ambientColor').onChange(function (e) {
        ambientLight.color = new THREE.Color(e);
    });
    gui.addColor(controls, 'pointLightColor').onChange(function (e) {
        pointLight.color = new THREE.Color(e);
    });
    gui.add(controls, 'pointLightVisible').onChange(function (e) {
        pointLight.visible = e;
    });
    
    renderScene();
})

let step = 0;
function renderScene() {
    cube.rotation.x += 0.02;
    cube.rotation.y += 0.02;
    cube.rotation.z += 0.02;

    step += 0.04;
    sphere.position.x = 20 + (10*(Math.cos(step)));

    // move the light simulation
    if (phase > 2 * Math.PI) {
        invert = invert * -1;
        phase -= 2 * Math.PI;
    } else {
        phase += rotationSpeed;
    }
    
    sphereLightMesh.position.set(+(14 * (Math.cos(phase))), 5, +(7 * (Math.sin(phase))))

    if (invert < 0) {
        var pivot = 14;
        sphereLightMesh.position.x = (invert * (sphereLightMesh.position.x - pivot)) + pivot;
    }

    pointLight.position.copy(sphereLightMesh.position);

    
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

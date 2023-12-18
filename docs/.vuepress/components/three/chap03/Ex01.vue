<template>
    <div class="example">
        <div id="dom_chap03_ex01" style="width:100%; height:100%"></div>
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

onMounted(()=>{
    const container = document.getElementById('dom_chap03_ex01');
    if(!container)
        return;

    threeLayer = new ThreeLayer(container);
    threeLayer.addPlane();

    let cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
    let cubeMaterial = new THREE.MeshLambertMaterial({color: 0xff0000});
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
    var ambiColor = "#0c0c0c";
    var ambientLight = new THREE.AmbientLight(ambiColor);
    threeLayer.scene.add(ambientLight);

    // gui
    var gui = new GUI({ autoPlace: false } );
    threeLayer.container.appendChild(gui.domElement);
    gui.domElement.style.position = 'absolute';
    gui.domElement.style.right = '0px';
    gui.domElement.style.top = '0px';
    
    let ambiControls = new function() {
        this.ambientColor = ambiColor;
    };

    gui.addColor(ambiControls, 'ambientColor').onChange(function (e) {
        ambientLight.color = new THREE.Color(e);
        //ambientLight.color = new THREE.Color(e.r/255, e.g/255, e.b/255);

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

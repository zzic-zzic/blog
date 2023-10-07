<template>
    <div class="example">
        <div id="dom" style="width:100%; height:100%"></div>
    </div>
</template>

<script setup>
//import { ThreeLayer } from '../ThreeLayer'
import { onMounted, ref } from 'vue';
import * as THREE from 'three';

onMounted(()=>{
    const container = document.getElementById('dom');
    if(!container)
        return;

    const threeLayer = new ThreeLayer('chap01-ex01', container);
    
    let planeGeometry = new THREE.PlaneGeometry(60, 20, 1, 1);
    let planeMaterial = new THREE.MeshBasicMaterial({color: 0xcccccc});
    let plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.x = 15;
    threeLayer.scene.add(plane);

    let cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
    let cubeMaterial = new THREE.MeshBasicMaterial({color: 0xff0000, wireframe: true});
    let cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.position.x = -4;
    cube.position.y = 3;
    cube.position.z = 0;
    threeLayer.scene.add(cube);

    let sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
    let sphereMaterial = new THREE.MeshBasicMaterial({color: 0x7777ff, wireframe: true});
    let sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.position.x = 20;
    sphere.position.y = 4;
    sphere.position.z = 2;
    threeLayer.scene.add(sphere);


    threeLayer.renderFrame();
})
</script>

<style>
.example {
    position: relative;
    width: 100%;
    height: 300px;
    padding: 0px;
}

.dg {
    position: absolute !important;
    right: 0px;
}

</style>

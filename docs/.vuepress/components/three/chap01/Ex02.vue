<template>
    <div class="example">
        <div id="dom_chap01_ex02" style="width:100%; height:100%"></div>
    </div>
</template>

<script setup>
import { ThreeLayer } from '../ThreeLayer'
import { onMounted, ref } from 'vue';
import * as THREE from 'three';

onMounted(()=>{
    const container = document.getElementById('dom_chap01_ex02');
    if(!container)
        return;

    const threeLayer = new ThreeLayer('chap01-ex02', container);
    
    let planeGeometry = new THREE.PlaneGeometry(60, 20, 1, 1);
    let planeMaterial = new THREE.MeshLambertMaterial({color: 0xcccccc});
    let plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.x = 15;
    plane.receiveShadow = true;
    threeLayer.scene.add(plane);

    let cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
    let cubeMaterial = new THREE.MeshLambertMaterial({color: 0xff0000});
    let cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.castShadow = true;
    cube.position.x = -4;
    cube.position.y = 3;
    cube.position.z = 0;
    threeLayer.scene.add(cube);

    let sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
    let sphereMaterial = new THREE.MeshLambertMaterial({color: 'blue'});
    let sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.position.x = 20;
    sphere.position.y = 4;
    sphere.position.z = 2;
    sphere.castShadow = true;
    threeLayer.scene.add(sphere);

    threeLayer.camera.position.x = -30;
    threeLayer.camera.position.y = 40;
    threeLayer.camera.position.z = 30;
    threeLayer.camera.lookAt(threeLayer.scene.position);

    const spotLight = new THREE.SpotLight( 0xffffff, 1000 );
    spotLight.position.set( -10, 50,-10 );
    spotLight.castShadow = true;
    threeLayer.scene.add(spotLight);

    const spotLightHelper = new THREE.SpotLightHelper( spotLight );
    threeLayer.scene.add( spotLightHelper );

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
</style>

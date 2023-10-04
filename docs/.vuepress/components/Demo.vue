<template>
    <div class="page">
        <div id="dom" style="width:100%; height:100%"></div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

onMounted(()=>{
    const container = document.getElementById('dom');
    if(!container)
        return;

    
    const width = container.getBoundingClientRect().width;
    const height = container.getBoundingClientRect().height;

    console.log(width, height)

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 1, 1000);
    camera.position.set(2,3,20);
    camera.lookAt(0,0,0);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    renderer.render(scene, camera);

    const controller = new OrbitControls(camera, renderer.domElement);
    controller.addEventListener("change", function(){
        renderer.render(scene, camera);
    })

    let axes = new THREE.AxesHelper(1000);
    scene.add(axes);

    container.appendChild(renderer.domElement);
    renderer.render(scene, camera);
})
</script>

<style scoped>
.page {
    width: 100%;
    height: 500px;
    padding: 0px;
}
</style>
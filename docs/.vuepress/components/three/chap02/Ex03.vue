<template>
    <div class="example">
        <div id="dom_chap02_ex03" style="width:100%; height:100%"></div>
    </div>
</template>

<script setup>
import { ThreeLayer } from '../ThreeLayer_'
import { onMounted } from 'vue';
import * as THREE from 'three';
import { createMultiMaterialObject } from 'three/examples/jsm/utils/SceneUtils';

onMounted(()=>{
    const container = document.getElementById('dom_chap02_ex03');
    if(!container)
        return;

    const threeLayer = new ThreeLayer(container);
    threeLayer.addPlane();
    threeLayer.addLight();

    threeLayer.renderFrame();

    // 정점 배열
    let vertices = [
        new THREE.Vector3(1, 3, 1),
        new THREE.Vector3(1, 3, -1),
        new THREE.Vector3(1, -1, 1),
        new THREE.Vector3(1, -1, -1),
        new THREE.Vector3(-1, 3, -1),
        new THREE.Vector3(-1, 3, 1),
        new THREE.Vector3(-1, -1, -1),
        new THREE.Vector3(-1, -1, 1)
    ];

    // 면 배열
    let faces = [
        0, 2, 1,
        2, 3, 1,
        4, 6, 5,
        6, 7, 5,
        4, 5, 1,
        5, 0, 1,
        7, 6, 2,
        6, 3, 2,
        5, 7, 0,
        7, 2, 0,
        1, 3, 4,
        3, 6, 4,
    ];

    let geometry = new THREE.BufferGeometry();
    geometry.setFromPoints(vertices);
    geometry.setIndex(faces);
    geometry.computeVertexNormals();

    var materials = [
        new THREE.MeshLambertMaterial({opacity: 0.6, color: 0x44ff44, transparent: true}),
        new THREE.MeshBasicMaterial({color: 0x000000, wireframe: true})
    ];

    var mesh = createMultiMaterialObject(geometry, materials);
    mesh.children.forEach(function (e) {
        e.castShadow = true
    });
    mesh.position.y = 1;

    threeLayer.addObject(mesh);

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

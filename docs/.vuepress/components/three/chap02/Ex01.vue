<template>
    <div class="example">
        <div id="dom_chap02_ex01" style="width:100%; height:100%"></div>
    </div>
</template>

<script setup>
import { ThreeLayer } from '../ThreeLayer'
import { onMounted } from 'vue';
import * as THREE from 'three';
import { makePlane } from '../util'

onMounted(()=>{
    const container = document.getElementById('dom_chap02_ex01');
    if(!container)
        return;

    const threeLayer = new ThreeLayer('chap02-ex01', container);
    
    makePlane(threeLayer);

    /*var vertices = [
        new THREE.Vector3(1, 3, 1),
        new THREE.Vector3(1, 3, -1),
        new THREE.Vector3(1, -1, 1),
        new THREE.Vector3(1, -1, -1),
        new THREE.Vector3(-1, 3, -1),
        new THREE.Vector3(-1, 3, 1),
        new THREE.Vector3(-1, -1, -1),
        new THREE.Vector3(-1, -1, 1)
    ];*/

    /*var faces = [
        new THREE.Face3(0, 2, 1),
        new THREE.Face3(2, 3, 1),
        new THREE.Face3(4, 6, 5),
        new THREE.Face3(6, 7, 5),
        new THREE.Face3(4, 5, 1),
        new THREE.Face3(5, 0, 1),
        new THREE.Face3(7, 6, 2),
        new THREE.Face3(6, 3, 2),
        new THREE.Face3(5, 7, 0),
        new THREE.Face3(7, 2, 0),
        new THREE.Face3(1, 3, 4),
        new THREE.Face3(3, 6, 4),
    ];*/
    
    const geometry = new THREE.BufferGeometry();
    const vertices = new Float32Array( [
        -1.0, -1.0,  1.0, // v0
        1.0, -1.0,  1.0, // v1
        1.0,  1.0,  1.0, // v2
        -1.0,  1.0,  1.0, // v3
    ] );
    const indices = [
        0, 1, 2,
        2, 3, 0,
    ];
    geometry.setIndex( indices );
    geometry.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
    const material = new THREE.MeshLambertMaterial( { color: 0xff0000 } );
    const mesh = new THREE.Mesh( geometry, material );
    threeLayer.scene.add(mesh);

    const spotLight = new THREE.SpotLight( 0xffffff, 1000 );
    spotLight.position.set( -10, 50,-10 );
    spotLight.castShadow = true;
    threeLayer.scene.add(spotLight);

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

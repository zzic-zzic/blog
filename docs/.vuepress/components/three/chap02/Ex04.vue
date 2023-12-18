<template>
    <div class="example">
        <div id="dom_chap02_ex04" style="width:100%; height:100%"></div>
    </div>
</template>

<script setup>
import { ThreeLayer } from '../ThreeLayer_'
import { onMounted } from 'vue';
import * as THREE from 'three';
import { GUI } from 'dat.gui'
import { createMultiMaterialObject } from 'three/examples/jsm/utils/SceneUtils';


let threeLayer;

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

onMounted(()=>{
    const container = document.getElementById('dom_chap02_ex04');
    if(!container)
        return;

    threeLayer = new ThreeLayer(container);
    threeLayer.addPlane();
    threeLayer.addLight();

    threeLayer.renderFrame();

    

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

    var gui = new GUI({ autoPlace: false } );
    threeLayer.container.appendChild(gui.domElement);
    for(let i=0; i<vertices.length; i++) {
        let verticesFolder = gui.addFolder('vertices' + i);
        let vertice = vertices[i];
        verticesFolder.add(vertice, 'x', -10, 10).onChange(
            function() {
                updateMesh(mesh, i)
            }
        );
        verticesFolder.add(vertice, 'y', -10, 10).onChange(
            function() {
                updateMesh(mesh, i)
            }
        );
        verticesFolder.add(vertice, 'z', -10, 10).onChange(
            function() {
                updateMesh(mesh, i)
            }
        );
        verticesFolder.close();
    }
    let positionFolder = gui.addFolder('position');
    positionFolder.add(mesh.position, 'x', -10, 10).onChange(function() {threeLayer.renderFrame()});
    positionFolder.add(mesh.position, 'y', -4, 20).onChange(function() {threeLayer.renderFrame()});
    positionFolder.add(mesh.position, 'z', -10, 10).onChange(function() {threeLayer.renderFrame()});
    positionFolder.close();

    let rotationFolder = gui.addFolder('rotation');
    rotationFolder.add(mesh.rotation, 'x', -10, 10).onChange(function() {threeLayer.renderFrame()});
    rotationFolder.add(mesh.rotation, 'y', -10, 10).onChange(function() {threeLayer.renderFrame()});
    rotationFolder.add(mesh.rotation, 'z', -10, 10).onChange(function() {threeLayer.renderFrame()});
    rotationFolder.close();

    // Align top-left
    gui.domElement.style.position = 'absolute';
    gui.domElement.style.right = '0px';
    gui.domElement.style.top = '0px';

    threeLayer.renderFrame();
})

function updateMesh(mesh, i) {
    for(let child of mesh.children) {
        let positionAttribute = child.geometry.getAttribute( 'position' );
        positionAttribute.setXYZ(i, vertices[i].x, vertices[i].y, vertices[i].z);
        //child.geometry.setFromPoints(vertices);
        positionAttribute.needsUpdate = true; 
    }
    threeLayer.renderFrame();
}
</script>

<style scoped>
.example {
    position: relative;
    width: 100%;
    height: 500px;
    padding: 0px;
}
.dg {
    position: absolute !important;
    top: 0 !important;
    right: 0 !important;
}
</style>

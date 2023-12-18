<template>
    <div class="example">
        <div id="dom_chap03_ex05" style="width:100%; height:100%"></div>
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
    const container = document.getElementById('dom_chap03_ex05');
    if(!container)
        return;

    threeLayer = new ThreeLayer(container);
    //threeLayer.addPlane();

    threeLayer.renderer.shadowMapEnabled = true;

    threeLayer.scene.fog = new THREE.Fog(0xaaaaaa, 0.010, 200);

    //var textureGrass = new THREE.TextureLoader().load("img/three/assets/grasslight-big.jpg");
    //console.loge(new URL("@/assets/img/texture-grasslight-big.jpg"))
    console.log(new URL("./"))
    //console.loge(new URL("texture-grasslight-big.jpg"))
    var textureGrass = new THREE.TextureLoader().load("@/assets/img/texture-grasslight-big.jpg");
    console.log(textureGrass);
    textureGrass.wrapS = THREE.RepeatWrapping;
    textureGrass.wrapT = THREE.RepeatWrapping;
    textureGrass.repeat.set(4, 4);

    var planeGeometry = new THREE.PlaneGeometry(1000, 200, 20, 20);
        var planeMaterial = new THREE.MeshLambertMaterial({map: textureGrass});
//        var planeMaterial = new THREE.MeshLambertMaterial();
        var plane = new THREE.Mesh(planeGeometry, planeMaterial);
        plane.receiveShadow = true;

        // rotate and position the plane
        plane.rotation.x = -0.5 * Math.PI;
        plane.position.x = 15;
        plane.position.y = 0;
        plane.position.z = 0;

        // add the plane to the scene
        threeLayer.scene.add(plane);

    console.log(textureGrass)

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

    // add directionalLight
   /* let pointColor = "#ff5808";
    let lightIntensity = 1;
    let lightDist = 1;
    let lightVisible = true;
    let directionalLight = new THREE.DirectionalLight(pointColor);
    directionalLight.position.set(-20, 60, -10);
    directionalLight.castShadow = true;
    directionalLight.distance = 10;
    threeLayer.scene.add( directionalLight ); */

    const light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );
    threeLayer.scene.add( light );
    let lightIntensity = 1;

   // let lightHelper = new THREE.CameraHelper( directionalLight.shadow.camera );
   // threeLayer.scene.add( lightHelper ); 
    
    // gui
    let gui = new GUI({ autoPlace: false } );
    threeLayer.container.appendChild(gui.domElement);
    gui.domElement.style.position = 'absolute';
    gui.domElement.style.right = '0px';
    gui.domElement.style.top = '0px';

    let controls = new function() {
        this.ambientColor = ambiColor;  
        this.lightIntensity = lightIntensity;
      /*  this.lightColor = pointColor;
        
        this.lightDist = lightDist;
        this.lightVisible = lightVisible;
        this.target = 'cube'*/
    };

    gui.add(controls, 'lightIntensity',0,25).onChange(function (e) {
        light.intensity = e;
    });

   /* g/ui.addColor(controls, 'ambientColor').onChange(function (e) {
        ambientLight.color = new THREE.Color(e);
    });
    gui.addColor(controls, 'lightColor').onChange(function (e) {
        directionalLight.color = new THREE.Color(e);
    });
  
    gui.add(controls, 'lightVisible').onChange(function (e) {
        directionalLight.visible = e;
    });
    gui.add(controls, 'target', ['Sphere', 'Cube']).onChange(function (e) {
        console.log(e);
        switch (e) {
            case "Sphere":
                directionalLight.target = sphere;
                break;
            case "Cube":
                directionalLight.target = cube;
                break;
        }

    });

    directionalLight.target = cube;*/

    /*gui.addColor(controls, 'spotLightColor').onChange(function (e) {
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
    });*/
    
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

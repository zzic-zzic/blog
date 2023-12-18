import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Stats from 'three/examples/jsm/libs/stats.module'
import WebGL from 'three/examples/jsm/capabilities/WebGL.js';

export class ThreeLayer {
    constructor(container) {
        this.name = 'choco'
        this.container = container;

        this.width = container.getBoundingClientRect().width;
        this.height = container.getBoundingClientRect().height;

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(45, this.width / this.height, 0.1, 1000);
        this.camera.position.set(-30,20,30);
        this.camera.lookAt(0,0,0);

        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.shadowMap.enabled = true;
        this.renderer.setClearColor(0xFFE4C4, 0.5);
        this.renderer.setSize(this.width, this.height);

        this.controller = new OrbitControls(this.camera, this.renderer.domElement);
        let scope = this;
        this.controller.addEventListener("change", function(){
            scope.renderFrame();
        });

        // stats
        this.stats = new Stats();
        this.stats.dom.style.position = 'absolute';
        this.stats.dom.style.bottom = '0px';
        this.stats.dom.style.right = '0px';
        this.stats.dom.style.top = '';
        this.stats.dom.style.left = '';
        this.container.appendChild(this.stats.dom);

        // dats
        let axes = new THREE.AxesHelper(1000);
        this.scene.add(axes);

        this.container.appendChild(this.renderer.domElement);
        this.renderFrame();

        window.addEventListener("resize", this.resizeWindow.bind(this));
    }

    renderFrame() {
        this.renderer.render(this.scene, this.camera);
        this.stats.update();
    }

    resizeWindow() {
        this.width = this.container.getBoundingClientRect().width;
        this.height = this.container.getBoundingClientRect().height;

        this.camera.aspect = this.width/this.height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(this.width, this.height);
    }

    addPlane() {
        let planeGeometry = new THREE.PlaneGeometry(60, 20, 1, 1);
        let planeMaterial = new THREE.MeshLambertMaterial({color: 0xcccccc});
        let plane = new THREE.Mesh(planeGeometry, planeMaterial);
        plane.rotation.x = -0.5 * Math.PI;
        plane.position.x = 15;
        plane.receiveShadow = true;
        this.scene.add(plane);
    }

    addLight() {
        const spotLight = new THREE.SpotLight( 0xffffff, 1000 );
        spotLight.position.set( -10, 50,-10 );
        spotLight.castShadow = true;
        this.scene.add(spotLight);

        /*
        const spotLightHelper = new THREE.SpotLightHelper( spotLight );
        this.scene.add( spotLightHelper );
        */
    }

    addObject(object) {
        this.scene.add(object);
        this.renderFrame();
    }
}
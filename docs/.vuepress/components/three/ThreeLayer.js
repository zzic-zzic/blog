import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Stats from 'three/examples/jsm/libs/stats.module'
import WebGL from 'three/examples/jsm/capabilities/WebGL.js';

let threeLayers = {};

export class ThreeLayer {
    constructor(name, container) {
        threeLayers[name] = this;

        console.log(WebGL.isWebGLAvailable())

        this.name = name;
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
        this.controller.addEventListener("change", function(){
            threeLayers[name].renderFrame();
        })


        // stats
        this.stats = new Stats();
        this.stats.dom.style.position = 'absolute';
        this.stats.dom.style.bottom = '0px';
        this.stats.dom.style.right = '0px';
        this.stats.dom.style.top = '';
        this.stats.dom.style.left = '';
        this.container.appendChild(this.stats.dom);

        // dats
       // this.gui = new Dat.GUI({autoPlace: false});        

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
}
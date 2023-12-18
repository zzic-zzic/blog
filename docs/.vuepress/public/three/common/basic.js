let stats = null;
let scene = null;
let camera = null;
let renderer = null;

function init() {
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set(0,30,30);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.setClearColor(0xFFE4C4, 0.5);
    document.body.appendChild(renderer.domElement);

    window.addEventListener("resize", event => {
        camera.aspect = innerWidth / innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(innerWidth, innerHeight);
    })
 
    initStats();

    var controls = new THREE.OrbitControls(camera, renderer.domElement);
    const that = this;
    controls.addEventListener("change", function () {
        that.render();
    });

    render();
}

function render() {
    stats.update();
    renderer.render(scene, camera);
}

function initStats() {
    stats = new Stats();

    stats.setMode(0); // 0: fps, 1: ms

    // Align top-left
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0px';
    stats.domElement.style.top = '0px';

    document.getElementById("Stats-output").appendChild(stats.domElement);

    return stats;
}

function addAxis() {
    var axes = new THREE.AxesHelper(20);
    scene.add(axes);
}

function initGui() {
    var gui = new dat.GUI();
}

function addPlane() {
    var planeGeometry = new THREE.PlaneGeometry(60, 40, 1, 1);
    var planeMaterial = new THREE.MeshLambertMaterial({color: 0xffffff});
    var plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.receiveShadow = true;

    plane.rotation.x = -0.5 * Math.PI;
    plane.position.x = 0;
    plane.position.y = 0;
    plane.position.z = 0;
    plane.name = 'plane';

    scene.add(plane);
}

function addLights() {
    // add subtle ambient lighting
    var ambientLight = new THREE.AmbientLight(0x0c0c0c);
    scene.add(ambientLight);

    // add spotlight for the shadows
    var spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(-40, 60, -10);
    spotLight.castShadow = true;
    scene.add(spotLight);
}
let stats = null;
let scene = null;
let camera = null;
let renderer = null;

function init() {
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
  camera.position.set(0, 5, 10);

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  window.addEventListener("resize", event => {
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(innerWidth, innerHeight);
  })
 
  var grid = new THREE.GridHelper(10, 10, "aqua", "gray");
  scene.add(grid);
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

function initGui() {
  var gui = new dat.GUI();
}
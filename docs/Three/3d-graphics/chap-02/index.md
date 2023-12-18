---
title: 2. Three.js 장면 구성 요소
meta:
  - name: description
    content: 3D 장면 제작2
  - property: og:title
    content: 3D 장면 제작2
  - property: og:description
    content: 3D 장면 제작2
  - property: og:url
    content: https://zzic-zzic.github.io/blog/three/3d-graphics/chap-02/
tags: ["three"]
---

# 02. three js 장면의 기본 구성요소

**이번 포스팅에서는 three.js 의 기본 구성요소에 대해 알아보겠습니다.<br>
장면을 생성하고 객체를 장면에 추가해봅시다.**

- Three.js 장면에서 사용되는 구성요소들
- THREE.Scene 객체로 할 수 있는 것
- Geometry 와 Mesh 의 연관성
- 직교`Orthographic`카메라와 원근`Perspective`카메라의 차이

## 장면의 기본 기능

장면에 기본 구성 요소들 (카메라, 조명, 객체) 를 추가하겠습니다.
- 카메라(Camera): 화면에 어떤 것이 렌더링될 것인지 결정합니다.
- 조명(Lights): 그림자 효과를 만들 때 물질이 어떻게 보일지 효과를 줍니다.
- 객체(Objects): 정육면체, 구체 등 카메라 관점에서 표현되는 메인 객체입니다.

::: tip
THREE.Scene 은 종종 **Scene graph** 라고도 불립니다.
장면 그래프는 그래픽 장면에 필요한 모든 정보를 담을 수 있는 구조체입니다.
Scene 이 객체와 조명, 그리고 렌더링에 필요한 다른 모든 객체를 포함할 수 있고, 장면 그래프트는 트리 구조 노드들의 집합으로 구성됩니다.
심지어, THREE.Scene 자체에 추가할 수 있는 각각의 객체는 THREE.Object3D 라는 기반 객체에서 확장되었으며, THREE.Obejct3D 객체는 자식도 가질 수 있습니다.
:::

먼저 기본 구성요소를 추가합니다.
::: details 소스코드를 보려면 클릭하세요!
```js
// Scene 추가
let scene = new THREE.Scene();

// Camera 추가
let camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.set(0, 30, 30);

// Renderer 추가
let renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.setClearColor(0xFFE4C4, 0.5);
document.body.appendChild(renderer.domElement);

// Plane 추가
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


// Lights 추가
var ambientLight = new THREE.AmbientLight(0x0c0c0c);
scene.add(ambientLight);

var spotLight = new THREE.SpotLight(0xffffff);
spotLight.position.set(-40, 60, -10);
spotLight.castShadow = true;
scene.add(spotLight);
```
:::

그리고 컨트롤 패널을 이용해 정육면체를 추가/마지막으로 추가된 정육면체를 삭제하는 기능을 구현하겠습니다.
컨트롤 패널은 dat.gui 를 이용할건데, 이 라이브러리는 cdn, npm, script import 등 다양한 방법으로 추가하시면 됩니다.

::: details 소스코드를 보려면 클릭하세요!
```js
let controls = new function () {
  this.rotationSpeed = 0.02;
  this.numberOfObjects = scene.children.length;

  this.removeCube = function () {
    var allChildren = scene.children;
    var lastObject = allChildren[allChildren.length - 1];
    // 만약 THREE.Mesh 객체이면 삭제한다.
    if (lastObject instanceof THREE.Mesh) {
        scene.remove(lastObject);
        this.numberOfObjects = scene.children.length;
    }
    render();
  };

  this.addCube = function () {
    var cubeSize = Math.ceil((Math.random() * 3));
    var cubeGeometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
    var cubeMaterial = new THREE.MeshLambertMaterial({color: Math.random() * 0xffffff});
    var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.castShadow = true;
    cube.name = "cube-" + scene.children.length;
    cube.position.x = -30 + Math.round((Math.random() * 60));
    cube.position.y = Math.round((Math.random() * 5));
    cube.position.z = -20 + Math.round((Math.random() * 40));

    // Plane 안의 랜덤 위치, 랜덤 색상의 객체를 추가한다.
    scene.add(cube);
    this.numberOfObjects = scene.children.length;
    render();
  };

  this.outputObjects = function () {
    console.log(scene.children);
  }
};

let gui = new dat.GUI();
gui.add(controls, 'rotationSpeed', 0, 0.5);
gui.add(controls, 'addCube');
gui.add(controls, 'removeCube');
gui.add(controls, 'outputObjects');
gui.add(controls, 'numberOfObjects').listen();

function render_() {
  stats.update();

  scene.traverse(function (e) {
    if (e instanceof THREE.Mesh && e.name != 'plane') {
      e.rotation.x += controls.rotationSpeed;
      e.rotation.y += controls.rotationSpeed;
      e.rotation.z += controls.rotationSpeed;
    }
  });
  requestAnimationFrame(render_);

  renderer.render(scene, camera);
}

render_();
```
:::


여기서 장면 기본 함수는 아래와 같습니다.
- **THREE.Scene.Add**: Scene에 객체를 추가한다.
- **THREE.Scene.Remove**: Scene에서 객체를 삭제한다.
- **THREE.Scene.children**: Scene에 있는 모든 자식들의 목록을 가져온다.
- **THREE.Scene.getObjectByName**: 이름으로 특정한 객체를 찾는다.
- **THREE.Scene.traverse()**: Scene의 모든 객체를 순회한다.

그럼, 아래 예제에서 우측 상단의 컨트롤 패널을 이용해 다양한 상호작용을 수행할 수 있습니다. (AddCube를 눌러보세요.)

<iframe :src="$withBase('/three/cahper-02/02-01.html')" width="100%" height="350" frameborder="0">
</iframe>

### overrideMaterial 속성 사용
overrideMaterial 속성을 사용하면 장면의 모든 객체는 overrideMaterial 속성에 설정된 Material 을 사용하고, 객체 자신에 설정된 물질은 무시합니다.

```js
scene.overrideMaterial = new THREE.MeshLambertMaterial({color: 0xffffff});
```

<iframe :src="$withBase('/three/cahper-02/02-02.html')" width="100%" height="350" frameborder="0">
</iframe>

## 지오메트리(Geometry)와 메시(Mesh)
객체를 생성할때 Geometry와 Material, Mesh가 사용되었습니다. 예를 들어, Scene에 구체를 추가할 때 다음처럼 했습니다.

```js
let sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
let sphereMaterial = new THREE.MeshBasicMaterial({color: 0x7777ff, wireframe: true});
let sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
```
Geometry는 객체의 형상을 정의하고, Material은 객체가 어떻게 보이는지를 정의합니다.
Mesh는 이 둘을 조합하여 장면에 추가하였습니다.

### 지오메트리의 속성과 함수
Three.js는 방대한 Geometry를 제공합니다.
물질을 추가하고, 메시를 생성하는 것만으로 작업이 거의 끝납니다.
이에 대한 추가적인 설명은 5, 6장에서 할 것입니다.
이번에는 지오메트리가 도대체 무엇인지 먼저 살펴보겠습니다.

지오메트리는 기본적으로 3D 라이브러리에서 3D 공간에서의 점들과 이 점을 연결하는 면들의 집합을 말합니다. 예를 들어 
- 정육면체는 8개의 모서리를 갖습니다. 각각의 모서리는 x,y,z 축으로 정의될 수 있으며, 따라서 정육면체는 3D 공간에서 8개의 꼭지점을 갖습니다.
- 정육면체는 각 모서리에 꼭지점에 있는 6개의 면으로 구성됩니다. Three.js에서 면은 항상 삼각형(세 꼭지점)으로 구성되므로, 정육면체의 경 우 각 면은 두 개의 삼각형으로 구성됩니다. 

Three.js가 제공하는 지오메트리를 사용할 경우 꼭지점과 면들을 정의할 필요가 없습니다. 정육면체의 경우 너비와 높이, 깊이만 지정하면 됩니다. 이 정보를 이용해 Three.js 는 12개(6*2)의 면, 8개의 꼭지점을 가지는 지오메트리를 생성합니다. 일반적으로 Three.js가 제공하는 지오메트리를 사용해 자동으로 만들겠지만, 꼭지점과 면을 사용해 수동으로 지오메트리를 생성하는 것도 가능합니다.


```js
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

var mesh = new THREE.Mesh(geometry, materials[0]);
scene.add(mesh);
mesh.position.y = 1;

var meshWireframe = new THREE.Mesh(geometry, materials[1]);
scene.add(meshWireframe);
meshWireframe.position.y = 1;
```

<three-chap02-Ex04/>

위 코드는 간단한 정육면체를 만드는 방법을 보여줍니다.
vertices 배열을 통해 정육면체를 만드는 점들을 정의하고, 이 점들이 모여서 삼각형 면을 만들고 face 배열에 저장됩니다. 
예를 들어, face 배열의 0,2,1 은 vertices 배열의 0, 2, 1의 점을 이용해 삼각형 면을 만듭니다. 
전방을 향하는 면은 시계방향, 후방을 향하는 면은 반시계방향으로 꼭지점들을 배열하면 됩니다.

꼭지점과 면을 이용하면 새로운 THREE.BufferGeometry 인스턴스를 생성할 수 있습니다.
그리고 computeVertexNormals를 호출하면 Three.js 는 각 면에 대한 normal 벡터(법선벡터)를 결정합니다. 
이 정보를 통해 다양한 조명에 따른 장면에서의 면의 색상을 결정할 수 있습니다.

또한, 컨트롤 패널에 아래 요소를 설정할 수 있도록 했습니다. 
- 정육면체의 각 꼭지점 위치 (vertice 0~7)
- 정육면체의 위치 (position)
- 정육면체의 회전 (rotation)
 

::: details 소스코드를 보려면 클릭하세요!
```js
var gui = new GUI();
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

function updateMesh(mesh, i) {
    for(let child of mesh.children) {
        let positionAttribute = child.geometry.getAttribute( 'position' );
        positionAttribute.setXYZ(i, vertices[i].x, vertices[i].y, vertices[i].z);
        //child.geometry.setFromPoints(vertices);
        positionAttribute.needsUpdate = true; 
    }
    threeLayer.renderFrame();
}
```
:::


위 예제처럼 position 속성을 직접 설정할 수도 있지만, translate 함수를 사용하면 상대적으로 객체의 이동할 위치를 정의할 수 있습니다. 

|함수/속성|설명|
|---|---|
|position|이 속성은 객체의 위치를 부모의 위치에 상대적인 위치로 결정했다. 대부분의 객체의 부모는 THREE.Scene 혹은 THREE.Object3D 객체다.|
|rotation|이 속성으로는 객체의 회전을 설정할 수 있다. 또한, 각 축별로 회전을 설정할 수 있는 rotateX(), rotateY(), rotateZ() 함수도 있다.|
|translateX(amount)|이 속성은 객체를 x축으로 amount 만큼 이동한다.|
|translateY(amount)|이 속성은 객체를 y축으로 amount 만큼 이동한다.|
|translateZ(amount)|이 속성은 객체를 z축으로 amount 만큼 이동한다.|

<br>
Chapter 2 에서는 THREE.Scene 의 함수와 속성에 대해서 알아봤습니다. 
또한, Geometry 생성에 대해서도 알아보고, 커스텀하게 생성하는 방법도 설명되어 있습니다.
Chapter 3 에서는 다양한 광원의 종류와 동작방법, 그리고 이러한 광원이 어떻게 Material 에 영향을 주는지 알아보겠습니다.

::: tip
Source: Learn Three.js - By Jos Dirksen
:::

<br>
<Comment />

---
title: 1. 3D 장면 제작
date: 2023-10-07 12:00
meta:
  - name: description
    content: 3D 장면 제작
  - property: og:title
    content: 3D 장면 제작
  - property: og:description
    content: 3D 장면 제작
  - property: og:url
    content: https://zzic-zzic.github.io/blog/three/3d-graphics/chap-01/
tags: ["three"]
---

# 1. Three.js 로 첫 번째 장면 제작
**오늘날 자바스크립트로 직접 웹GL을 이용해 3D 애니메이션을 제작하는 것은 매우 복잡한 작업이며 오류가 발생하기 쉽다. Three.js는 이런 일들을 아주 쉽게 해 주는 라이브러리이며, 아래와 같은 특징이 있다.**
- 간단하고 복잡한 3D Geometry 생성
- 3D Scene 에서 오브젝트의 애니메이션과 이동하기
- 오브젝트에 Texture 와 Material 적용하기
- 장면을 조명하는 다양한 광원을 사용하기
- 3D 모델링 소프트웨어에서 오브젝트 로딩하기
- 3D 장면에 진보된 후처리 효과 적용하기
- custom shader 로 작업하기
- point cloude 생성하기

**이번 챕터에서는 몇 개의 객체와 카메라를 추가하여 장면을 구성한 후, 애니메이션 효과를 줄 것이다.**

## 3D 객체의 렌더링과 표시
이제 Three.js 장면을 만들고 몇 개의 객체와 카메라를 추가해 본다. <br>
Three.js 에서 가장 기본이 되는 구조는 Scene, Camera, Renderer 이다. <br>
Scene (장면) 을 만들고, 그 안에 3D 객체 (Mesh) 를 배치한 후, 카메라로 그것을 비추고 렌더러를 통해 canvas 라는 HTML 안에 렌더링을 해서 사용자에게 보여준다.

```js
var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer();
renderer.setClearColorHex();
renderer.setClearColor(new THREE.Color(0xEEEEEE));
renderer.setSize(window.innerWidth, window.innerHeight);
```

Axes : 객체가 3D 공간에서 렌더링 되는 위치를 확인할 수 있는 디버깅 툴로, X 축은 빨간색, Y 축은 초록색, Z 축은 파란색으로 표시된다.
```js
var axes = new THREE.AxesHelper(20);
scene.add(axes);
```

Plane 생성 : 2차원 사각형으로 회색으로 렌더링 된다
```js
// 폭 60, 높이 20 평면 생성
var planeGeometry = new THREE.PlaneGeometry(60, 20);
var planeMaterial = new THREE.MeshBasicMaterial({color: 0xcccccc});
var plane = new THREE.Mesh(planeGeometry, planeMaterial);

plane.rotation.x = -0.5 * Math.PI;
plane.position.x = 15;
plane.position.y = 0;
plane.position.z = 0;
scene.add(plane);
```

Cube 생성 : 3차원 정육면체로 빨간색으로 렌더링 된다
```js
var cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
var cubeMaterial = new THREE.MeshBasicMaterial({color: 0xff0000, wireframe: true});
var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

cube.position.x = -4;
cube.position.y = 3;
cube.position.z = 0;

scene.add(cube);
```

Sphere : 3차원 구체로 파란색으로 렌더링 된다
```js
var sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
var sphereMaterial = new THREE.MeshBasicMaterial({color: 0x7777ff, wireframe: true});
var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

sphere.position.x = 20;
sphere.position.y = 4;
sphere.position.z = 2;

scene.add(sphere);
```

이제 결과물을 비추는 카메라를 추가하고, 장면을 렌더링한다.
```js
camera.position.x = -30;
camera.position.y = 40;
camera.position.z = 30;
camera.lookAt(scene.position);

document.getElementById("WebGL-output").appendChild(renderer.domElement);

renderer.render(scene, camera);
```

잘 따라했다면 아래와 같은 결과물이 나온다.
<three-chap01-Ex01/>

## Material, light, shadow 추가
Three.js 에서 새로운 Material(물질), light(광원), shadow(그림자) 의 추가는 매우 간단하다.
```js
// 그림자 렌더링 활성화
renderer.shadowMap.enabled = true;
...
plane.receiveShadow = true;
...
cube.castShadow = true;
...
sphere.castShadow = true;

// 광원 추가
const spotLight = new THREE.SpotLight( 0xffffff, 1000 );
spotLight.position.set( -10, 50,-10 );
spotLight.castShadow = true;
scene.add(spotLight);

const spotLightHelper = new THREE.SpotLightHelper( spotLight );
scene.add( spotLightHelper );
```
<three-chap01-Ex02/>

## 애니메이션 추가
장면에 애니메이션을 추가하려면 특정한 간격으로 장면을 리렌더링 해야한다. setInterval 함수는 정해진 간격으로 호출될 수 있다. 하지만 setInterval 의 문제점은 브라우저에서 일어나는 상황을 고려하지 않는 것이다. 만약 다른 탭을 사용 중이더라도 setInterval 함수는 계속 호출되므로 CPU 사용량이 높아지게 된다.

**requestAnimationFrame** <br>
다행이 위 문제에 대한 해결책으로 브라우저들은 requestAnimationFrame 함수를 지원한다. 해당 함수는 브라우저에서 정해진 간격으로 함수가 호출될 수 있도록 지정할 수 있으며, 효율적으로 그려지도록 보장한다.

```js
renderFrame();

let step = 0;
function renderScene() {
    cube.rotation.x += 0.02;
    cube.rotation.y += 0.02;
    cube.rotation.z += 0.02;

    step += 0.04;
    sphere.position.x = 20 + (10*(Math.cos(step)));
    
    requestAnimationFrame(renderScene);
    threeLayer.renderFrame();
}
```

<three-chap01-Ex03/>

## 브라우저 크기 변경에 따라 자동으로 캔버스 크기 조정

브라우저 창의 크기 변화에 따라 카메라를 변경하는 것은 꽤 간단하다. 브라우저 창의 크기가 변하면 resizeWindow 가 호출되고, 카메라와 렌더러를 업데이트한다.

```js
window.addEventListener("resize", resizeWindow);

resizeWindow() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
```

<br>
이번 장에서는 기본적인 Three js 의 사용법을 알아봤다. 다음 장에서는 빌딩 블록 (Building block) 에 대해 알아보겠다.

::: tip
Source: Learn Three.js - By Jos Dirksen
:::

<Comment />
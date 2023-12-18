---
title: 3. Three.js 의 다양한 광원 (Light)
meta:
  - name: description
    content: Three.js 의 다양한 광원 (Light)
  - property: og:title
    content: Three.js 의 다양한 광원 (Light)
  - property: og:description
    content: Three.js 의 다양한 광원 (Light)
  - property: og:url
    content: https://zzic-zzic.github.io/blog/three/3d-graphics/chap-03/
tags: ["three"]
---

# 03. Three.js 의 다양한 광원 (Light)

** 광원이 없다면 Object가 제대로 렌더링 되는 것을 볼 수 없습니다. <br>
이번 장에서는 다양한 광원에 대해 자세히 알아보겠습니다. **

::: tip
WebGL 자체는 광원을 지원하지 않습니다. Three.js 가 없다면 이런 광원을 흉내낼 수 있는 셰이더 프로그램을 작성해야 합니다.
:::

- Three.js 에서 사용할 수 있는 광원들
- 특정 광원의 사용이 필요할 때
- 광원 값 조절
- 렌즈 플레어(lens flare) 효과 / 햇빛 효과

## Three.js 가 제공하는 다양한 광원들
Three.js 는 다양한 광원들 제공합니다.

### 1. THREE.AmbientLight
이 광원은 가장 기본으로 Scene의 모든 객체들에게 균일하게 조명을 제공합니다.
이 광원은 방향이 없기 때문에, 그림자를 만들지는 못합니다. 일반적으로 단독으론 이용하지 않으며, SpotLight나 DirectionalLight와 함께 사용하며 그림자를 부드럽게 하거나 추가 색상을 더하는데 사용합니다. 

<three-chap03-Ex01/>

PointLight와 SpotLight, DirectionalLight 는 아래 그림과 같이 빛을 방출합니다.

<img :src="$withBase('/img/three-3-1.png')" alt="foo">

### 2. THREE.PointLight

PointLight 는 특정 지점에서 모든 방향으로 빛을 방출합니다. 밤하늘에 쏘아 올린 조명탄과 비슷하지요. 

<three-chap03-Ex02/>

### 3. THREE.SpotLight

<three-chap03-Ex03/>

### 4. THREE.DirectionalLight

<three-chap03-Ex04/>

<three-chap03-Ex05/>
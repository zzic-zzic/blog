---
title: vuePress Google Search Console 등록하기
date: 2023-10-07 12:00
meta:
  - name: description
    content: vuePress Google Search Console 등록하기
  - property: og:title
    content: vuePress Google Search Console 등록하기
  - property: og:description
    content: vuePress Google Search Console 등록하기
  - property: og:url
    content: https://zzic-zzic.github.io/blog/Vue/vuePress/seo/
tags: ["vue"]
---

# vuePress Google Search Console 등록하기 :cheese:

## SEO
SEO(Search Engine Optimization)는 검색엔진 최적화란 뜻입니다.
검색 엔진(Google)은 웹페이지가 어떤 콘텐츠를 포함하고 있는지, 무엇에 대한 것인지를 판단하기 위해 웹페이지를 크롤링하는 로봇인 웹 크롤러를 사용합니다. 웹 크롤러는 소스 코드를 스캔하여 정보를 얻고, 해당 내용이 검색 엔진을 이용하는 사용자에게 유용하다고 판단하면 해당 페인지를 색인에 추가합니다. 검색 알고리즘에 대해 자세한 사항은 공개되지 않았지만, SEO 가 높을 수록 검색 우선순위에서 높아지게 됩니다.

## sitemap
사이트맵(sitemap)은 도메인 내의 웹사이트의 페이지 목록입니다. 
Vue Press 에서는 sitemap 생성을 위한 플러그인을 제공하고 있습니다.
- pulgin 설치
```
$ npm install vuepress-plugin-sitemap
```
- 소스코드
```js
// .vuepress/config.js
module.export = {
  plugins: [["sitemap", { hostname: "https://zzic-zzic.github.io/blog/" }]]
};
```
- hostname 에서 url 부분은 본인의 주소를 넣어주시기 바랍니다.
- 배포 하신 후, 'https://zzic-zzic.github.io/blog/sitemap.xml'(https://본인주소/sitemap.xml) 를 주소창에 치시면 같이 사이트맵 정보가 나와야합니다.

이제 <a href="https://search.google.com/search-console">Google Search Console</a> 로 이동하시기 바랍니다. 구글 서치 콘솔(Google Search Console)에서 사이트 등록 후 사이트맵(Sitemap)을 제출하면 됩니다.

<img :src="$withBase('/1.png')" alt="foo">

- 'URL 접두어' 선택 후 주소에는 본인 사이트 주소를 입력해주세요. (https://zzic-zzic.github.io/blog/)

- 그 후 소유권 확인창이 뜨는데, 저는 **HTML 태그 방법**을 이용했습니다.
```js
// .vuepress/config.js
module.export = {
   head: [
    ['meta', { name: 'google-site-verification', content: '본인 ' }]
  ],
};
```

- 그 후 좌측 메뉴의 'Sitemaps' 로 이동 후 sitemap.xml 을 제출해주시기 바랍니다.

## robots
robots.txt 파일은 검색엔진에게 노출 여부를 알려주는 역할을 합니다.
검색 엔진의 웹 크롤러가 자료를 스캔하는 주기는 일정하진 않지만, 구글을 기준으로 구글봇이 대략적으로 1일 1회 이상 robots.txt 와 sitemap.xml 을 기준으로 사이트 정보를 크롤링해 구글 검색엔진의 DB 에 저장합니다.

.vuepress/public/robots.txt 위치에 파일을 생성합니다.
```js
// .vuepress/public/robots.txt
User-agent: *
Allow: /
Sitemap: https://zzic-zzic.github.io/blog/sitemap.xml
```

- Sitemap 은 본인의 주소로 바꿔줍니다.
- Allow 에는 허용할 path 를, Disallow 에는 허용하지 않을 path를 입력합니다.

위 단계까지 모두 수행하고 배포가 완료되었다면 아래 주소로 robots.txt 에 접근가능합니다.

`https://zzic-zzic.github.io/blog/robots.txt` (예시) <br>
`https://[본인 주소]/robots.txt`

## sitmeap 가져올 수 없음 에러
구글 서치 콘솔에 sitemap을 등록했는데 상태가 '가져올 수 없음'으로 나타나고 있습니다. 비슷한 문제를 겪는 사람이 많으며, 가장 흔한 원인은 개설한지 얼마 되지 않기 때문이라고 합니다. 🤔 

<img :src="$withBase('/2.png')" alt="foo">

'사이트맵 열기' 버튼을 눌렀을때 정상적으로 사이트맵이 보이면 특별한 이상이 있을 확률은 적기 때문에 한 번 기다려보도록 하겠습니다.

## Reference
1. https://ko.wix.com/blog/post/what-is-seo
2. https://kyounghwan01.github.io/blog/Vue/vuepress/seo/#sitemap
3. https://julynine2.tistory.com/entry/Google-Search-Console-Sitemap-couldnt-fetch#google_vignette
4. https://brunch.co.kr/@webbible/5

<br />
<Comment />
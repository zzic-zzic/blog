<template>
    <div>
      <div class="main-container">
        <!--<img :src="'/blog/img/icon.png'" 
        alt="logo"
        style="width:40px;height:40px"
        >-->
          안녕하세요!👋 <br>
          이 곳은 제가 공부하는 것을 기록/공유하고자 만든 블로그입니다. 🐭
          <div style="margin-top: 5px">
            <a class="icon" href="https://github.com/zzic-zzic">
              Github
            </a>
        </div>
      </div>
    </div>
  </template>
  
  <script>

  </script>
  
  <style>
  @import "https://fonts.googleapis.com/css?family=Amatic+SC:wght@700";

  .navbar .site-name {
    color: black;
    font-family: "Amatic SC";
    font-weight: 900;
    font-size: 25px;
  }
  
  .main-container {
    text-align: center;
    align-items: right
  }

  .main-header {
    font-family: "Gugi", cursive;
    font-weight: 500;
    border-bottom: 17px solid #ffd816;
    word-break: keep-all;
    font-size: 5rem;
  }

  .icon {
    background-color: #ffd816;
    padding: 3px;
    border-radius: 10px;
    cursor: pointer;
  }

  .name {
    font-weight: 900;
    font-size: 2rem;
  }
  ul {
    list-style: none;
    line-height: 1.5rem;
  }
  
  @media (max-width: 550px) {
    h1 {
      font-size: 4.4rem;
    }
  
    .name {
      font-size: 1.7rem;
    }
  }
  
  @media (max-width: 430px) {
    h1 {
      font-size: 3.4rem;
    }
  }

  .logo {
       margin: 0 45px 0 10px;


      a {
        display: flex;
        .title-wrapper {
            display: grid;
            position: block;
            align-items: center;
            justify-content: center;
            transform: skew(0, -8deg);
          }
          
          .top-title {
            order: 1;
            text-align: center;
            display: block;
            color: #fff;
            font-size: clamp(0.5rem, 2vw, 1rem);
            margin-bottom: 1rem;
            padding-right: 2rem;
          }
          
          .bottom-title {
            order: 3;
            text-align: center;
            display: block;
            color: #fff;
            font-size: clamp(1rem, 4vw, 1.5rem);
            margin-top: 2rem;
            padding-left: 2rem;
          }
          
          .sweet-title {
            order: 2;
            color: #fde9ff;
            text-transform: uppercase;
            font-size: clamp(2rem, 2vw, 3rem);
            text-align: center;
        
            text-shadow: 3px 1px 1px #00ff95, 2px 2px 1px #5dffbb, 4px 2px 1px #5dffbb,
              3px 3px 1px #5dffbb, 5px 3px 1px #00ff95, 4px 4px 1px #5dffbb,
              6px 4px 1px #00ff95, 5px 5px 1px #5dffbb, 7px 5px 1px #5dffbb,
              6px 6px 1px #5dffbb, 8px 6px 1px #00ff95, 7px 7px 1px #5dffbb,
              9px 7px 1px #00ff95;
          
            span {
              display: block;
              position: relative;
              line-height: 0.8 !important;
          
              &:before {
                content: attr(data-text);
                position: absolute;
                text-shadow: 3px 3px 2px #e94aa1, -1px -1px 1px #ff00dd,
                  -2px 2px 1px #e94aa1, 1px -1px 1px #ff00dd;
                z-index: 1;
              }
          
              &:nth-child(1) {
                padding-right: 2.25rem;
              }
          
              &:nth-child(2) {
                padding-left: 2.25rem;
              }
            }
          }
      }
    }
  </style>
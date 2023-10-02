const { description } = require('../../package')

module.exports = {
  title: 'ZZIC ZZIC',
  description: description,
  head: [
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }]
  ],
  themeConfig: {
    repo: '',
    editLinks: false,
    docsDir: '',
    editLinkText: '',
    lastUpdated: false,
    logo: '/img/icon.png',
    nav: [
      {
        text: 'Guide',
        link: '/guide/',
      },
      {
        text: 'VUE',
        link: '/vue/',
      },
      {
        text: 'TS',
        link: '/ts/'
      },
      {
        text: 'THREE',
        link: '/three/'
      },
      {
        text: 'STUDY',
        link: '/study/'
      }
    ],
    sidebar: {
      '/guide/': [
        {
          title: 'Guide',
          collapsable: false,
          children: [
            '',
            'using-vue',
          ]
        }
      ],
    }
  },
  plugins: [
    '@vuepress/plugin-back-to-top',
    '@vuepress/plugin-medium-zoom',
  ],
  base: "/blog/",
  configureWebpack: {
    resolve: {
      alias: {
        '@img': '/docs/Tools/'
      }
    }
  }
}

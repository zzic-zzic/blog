const { description } = require('../../package')

const routes = [
 // "Guide",
  "Vue",
  "Three"
];

const createSidebar = () => {
  const sidebar = {};
  for (const route of routes) {
    Object.assign(sidebar, require("../" + route));
  }
  return sidebar;
};

module.exports = {
  title: 'ZZIC ZZIC',
  description: description,
  head: [
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    ['meta', { name: 'google-site-verification', content: 'n9YufvdIskY_43ONwJe0Iz7yOPP29kk3AuR1digdzE4' }]
  ],
  themeConfig: {
    repo: '',
    editLinks: false,
    docsDir: '',
    editLinkText: '',
    lastUpdated: false,
    logo: '/img/icon.png',
    nav: [
     /* {
        text: 'Guide',
        link: '/Guide/',
      },*/
      {
        text: 'Vue',
        link: '/Vue/',
      },
      {
        text: 'Three',
        link: '/Three/'
      }
    ],
    sidebar: createSidebar()/*{
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
    }*/
  },
  plugins: [
    '@vuepress/plugin-back-to-top',
    '@vuepress/plugin-medium-zoom',
    '@vuepress/last-updated',
    ['sitemap', { hostname: "https://zzic-zzic.github.io/blog/"} ]
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

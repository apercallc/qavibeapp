/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'QAVibe Documentation',
  tagline: 'Comprehensive documentation for TestFlux and StackHealth',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://qavibe.com',
  baseUrl: '/docs/',

  // GitHub pages deployment config.
  organizationName: 'qavibeapp',
  projectName: 'qavibeapp',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          routeBasePath: '/',
          // Remove this to remove the "edit this page" links.
          // editUrl: 'https://github.com/qavibeapp/qavibeapp/tree/main/documentation/',
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/qavibe-social-card.jpg',
      navbar: {
        title: 'QAVibe Docs',
        logo: {
          alt: 'QAVibe Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'testfluxSidebar',
            position: 'left',
            label: 'TestFlux',
          },
          {
            type: 'docSidebar',
            sidebarId: 'stackhealthSidebar',
            position: 'left',
            label: 'StackHealth',
          },
          {
            href: '/',
            label: 'Back to QAVibe',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Products',
            items: [
              {
                label: 'TestFlux',
                to: '/testflux/intro',
              },
              {
                label: 'StackHealth',
                to: '/stackhealth/intro',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'LinkedIn',
                href: 'https://linkedin.com/company/qavibeapp',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/qavibeapp',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'QAVibe Home',
                href: '/',
              },
              {
                label: 'Changelog',
                href: '/changelog.html',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} QAVibe. Built with Docusaurus.`,
      },
      prism: {
        theme: require('prism-react-renderer').themes.github,
        darkTheme: require('prism-react-renderer').themes.dracula,
      },
      algolia: {
        // The application ID provided by Algolia
        appId: 'YOUR_APP_ID',
        
        // Public API key: it is safe to commit it
        apiKey: 'YOUR_SEARCH_API_KEY',
        
        indexName: 'qavibe-docs',
        
        // Optional: see doc section below
        contextualSearch: true,
        
        // Optional: Specify domains where the navigation should occur through window.location instead on history.push.
        externalUrlRegex: 'external\\.com|domain\\.com',
        
        // Optional: Replace parts of the item URLs from Algolia. Useful when using the same search index for multiple deployments using a different baseUrl.
        replaceSearchResultPathname: {
          from: '/docs/', // or as RegExp: /\/docs\//
          to: '/',
        },
        
        // Optional: Algolia search parameters
        searchParameters: {},
        
        // Optional: path for search page that enabled by default (`false` to disable it)
        searchPagePath: 'search',
      },
    }),
};

module.exports = config;

import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/docs/__docusaurus/debug',
    component: ComponentCreator('/docs/__docusaurus/debug', 'e58'),
    exact: true
  },
  {
    path: '/docs/__docusaurus/debug/config',
    component: ComponentCreator('/docs/__docusaurus/debug/config', '2ce'),
    exact: true
  },
  {
    path: '/docs/__docusaurus/debug/content',
    component: ComponentCreator('/docs/__docusaurus/debug/content', '11b'),
    exact: true
  },
  {
    path: '/docs/__docusaurus/debug/globalData',
    component: ComponentCreator('/docs/__docusaurus/debug/globalData', 'f13'),
    exact: true
  },
  {
    path: '/docs/__docusaurus/debug/metadata',
    component: ComponentCreator('/docs/__docusaurus/debug/metadata', 'bff'),
    exact: true
  },
  {
    path: '/docs/__docusaurus/debug/registry',
    component: ComponentCreator('/docs/__docusaurus/debug/registry', '830'),
    exact: true
  },
  {
    path: '/docs/__docusaurus/debug/routes',
    component: ComponentCreator('/docs/__docusaurus/debug/routes', '13e'),
    exact: true
  },
  {
    path: '/docs/search',
    component: ComponentCreator('/docs/search', '320'),
    exact: true
  },
  {
    path: '/docs/',
    component: ComponentCreator('/docs/', '62f'),
    routes: [
      {
        path: '/docs/',
        component: ComponentCreator('/docs/', '7f1'),
        routes: [
          {
            path: '/docs/',
            component: ComponentCreator('/docs/', '736'),
            routes: [
              {
                path: '/docs/stackhealth/',
                component: ComponentCreator('/docs/stackhealth/', '4d7'),
                exact: true,
                sidebar: "stackhealthSidebar"
              },
              {
                path: '/docs/stackhealth/contributing',
                component: ComponentCreator('/docs/stackhealth/contributing', '598'),
                exact: true,
                sidebar: "stackhealthSidebar"
              },
              {
                path: '/docs/stackhealth/development',
                component: ComponentCreator('/docs/stackhealth/development', '431'),
                exact: true,
                sidebar: "stackhealthSidebar"
              },
              {
                path: '/docs/stackhealth/frontend-troubleshooting',
                component: ComponentCreator('/docs/stackhealth/frontend-troubleshooting', '7c8'),
                exact: true,
                sidebar: "stackhealthSidebar"
              },
              {
                path: '/docs/stackhealth/intro',
                component: ComponentCreator('/docs/stackhealth/intro', '8b6'),
                exact: true,
                sidebar: "stackhealthSidebar"
              },
              {
                path: '/docs/stackhealth/organization-summary',
                component: ComponentCreator('/docs/stackhealth/organization-summary', '6bd'),
                exact: true,
                sidebar: "stackhealthSidebar"
              },
              {
                path: '/docs/stackhealth/project-overview',
                component: ComponentCreator('/docs/stackhealth/project-overview', '792'),
                exact: true,
                sidebar: "stackhealthSidebar"
              },
              {
                path: '/docs/stackhealth/security',
                component: ComponentCreator('/docs/stackhealth/security', '24b'),
                exact: true,
                sidebar: "stackhealthSidebar"
              },
              {
                path: '/docs/stackhealth/user-guide',
                component: ComponentCreator('/docs/stackhealth/user-guide', '08e'),
                exact: true,
                sidebar: "stackhealthSidebar"
              },
              {
                path: '/docs/stackhealth/v2-features',
                component: ComponentCreator('/docs/stackhealth/v2-features', 'b44'),
                exact: true,
                sidebar: "stackhealthSidebar"
              },
              {
                path: '/docs/stackhealth/vscode-setup',
                component: ComponentCreator('/docs/stackhealth/vscode-setup', 'a44'),
                exact: true,
                sidebar: "stackhealthSidebar"
              },
              {
                path: '/docs/testflux/architecture',
                component: ComponentCreator('/docs/testflux/architecture', 'e89'),
                exact: true,
                sidebar: "testfluxSidebar"
              },
              {
                path: '/docs/testflux/deployment',
                component: ComponentCreator('/docs/testflux/deployment', '64c'),
                exact: true,
                sidebar: "testfluxSidebar"
              },
              {
                path: '/docs/testflux/enterprise-tools',
                component: ComponentCreator('/docs/testflux/enterprise-tools', 'cc5'),
                exact: true,
                sidebar: "testfluxSidebar"
              },
              {
                path: '/docs/testflux/intro',
                component: ComponentCreator('/docs/testflux/intro', '2a4'),
                exact: true,
                sidebar: "testfluxSidebar"
              },
              {
                path: '/docs/testflux/monitoring',
                component: ComponentCreator('/docs/testflux/monitoring', '26d'),
                exact: true,
                sidebar: "testfluxSidebar"
              },
              {
                path: '/docs/testflux/setup-complete',
                component: ComponentCreator('/docs/testflux/setup-complete', '15f'),
                exact: true,
                sidebar: "testfluxSidebar"
              },
              {
                path: '/docs/testflux/test-results-dashboard-spec',
                component: ComponentCreator('/docs/testflux/test-results-dashboard-spec', '612'),
                exact: true,
                sidebar: "testfluxSidebar"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];

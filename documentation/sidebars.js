/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  // TestFlux sidebar
  testfluxSidebar: [
    {
      type: 'doc',
      id: 'testflux/intro',
      label: 'Introduction',
    },
    {
      type: 'category',
      label: 'Getting Started',
      items: [
        'testflux/setup-complete',
        'testflux/architecture',
        'testflux/deployment',
      ],
    },
    {
      type: 'category',
      label: 'Features',
      items: [
        'testflux/test-results-dashboard-spec',
        'testflux/monitoring',
      ],
    },
    {
      type: 'category',
      label: 'Enterprise',
      items: [
        'testflux/enterprise-tools',
      ],
    },
  ],

  // StackHealth sidebar
  stackhealthSidebar: [
    {
      type: 'doc',
      id: 'stackhealth/intro',
      label: 'Introduction',
    },
    {
      type: 'category',
      label: 'Getting Started',
      items: [
        'stackhealth/project-overview',
        'stackhealth/organization-summary',
        'stackhealth/development',
        'stackhealth/vscode-setup',
      ],
    },
    {
      type: 'category',
      label: 'User Guide',
      items: [
        'stackhealth/user-guide',
        'stackhealth/v2-features',
      ],
    },
    {
      type: 'category',
      label: 'Troubleshooting',
      items: [
        'stackhealth/frontend-troubleshooting',
      ],
    },
    {
      type: 'category',
      label: 'Community',
      items: [
        'stackhealth/contributing',
        'stackhealth/security',
        'stackhealth/readme',
      ],
    },
  ],
};

module.exports = sidebars;

export const menu = [
  {
    id: 'solutions',
    multilevel: true,
    name: 'solutions.title',
    to: '/solutions',
  },
  {
    id: 'support',
    name: 'support.title',
    children: [
      {
        id: 'marketing',
        name: 'support.marketing',
        children: [
          {
            id: 'pos',
            name: 'support.posMaterials.title',
            to: '/support/pos',
          },
          {
            id: 'presentations',
            name: 'support.presentations.title',
            to: '/support/presentations',
          },
          {
            id: 'videos',
            name: 'about.video',
            to: '/about/video',
          },
        ],
      },
      {
        id: 'libraries',
        name: 'support.libraries.title',
        to: '/support/libraries',
      },
      {
        id: 'calculators',
        name: 'calculators.title',
        to: '/calculators',
      },
      {
        id: 'software',
        name: 'support.software.title',
        to: '/support/software',
      },
      {
        id: 'estimates',
        name: 'support.estimates.title',
        to: '/support/estimates',
      },
      {
        id: 'developers',
        name: 'support.developers',
        children: [
          { id: 'api', name: 'support.api.title', to: '/support/api' },
          { id: 'csv', name: 'support.csv.title', to: '/support/csv' },
          { id: 'bitrix', name: 'support.bitrix.title', to: '/support/bitrix' },
        ],
      },
      {
        id: 'documentation',
        name: 'support.documentation.title',
        to: '/support/documentation',
      },
      {
        id: 'warranty',
        name: 'support.warranty.title',
        to: '/support/warranty',
      },
      {
        id: 'feedback',
        name: 'support.feedback',
        children: [
          {
            id: 'support',
            name: 'feedback.getFeedback',
            to: '/support/feedback',
          },
          {
            id: 'estimate',
            name: 'feedback.estimateProject',
            to: '/support/project',
          },
          {
            id: 'report',
            name: 'feedback.reportError',
            to: '/support/report',
          },
          {
            id: 'question',
            name: 'feedback.askQuestion',
            to: '/support/question',
          },
        ],
      },
    ],
  },
  {
    id: 'calculators',
    multilevel: true,
    name: 'calculators.title',
    to: '/calculators',
  },
  // {
  //   id: 'partners',
  //   multilevel: true,
  //   name: 'distribution.partners.title',
  //   to: '/distribution/partners',
  // },
  {
    id: 'about',
    name: 'about.title',
    children: [
      {
        id: 'company',
        name: 'about.company',
        to: '/about/company',
      },
      {
        id: 'production',
        name: 'about.production',
        to: '/about/production',
      },
      {
        id: 'projects',
        name: 'about.projects',
        to: '/about/news/category/projects',
      },
      {
        id: 'events',
        name: 'about.events',
        href: 'https://events.ekfgroup.com/',
      },
      {
        id: 'press',
        name: 'about.news',
        to: '/about/news',
      },
      {
        id: 'video',
        name: 'about.video',
        to: '/about/video',
      },
      {
        id: 'career',
        name: 'about.career',
        to: '/about/career',
      },
      {
        id: 'esg',
        name: 'about.esg',
        to: '/about/esg',
      },
      {
        id: 'fair-position',
        name: 'about.fairPosition',
        to: '/about/fair-position',
      },
      {
        id: 'qms',
        name: 'about.qms',
        to: '/about/qms',
      },
      {
        id: 'blog',
        name: 'blog.title',
        to: '/blog',
      },
      {
        id: 'contacts',
        name: 'about.contacts',
        to: '/about/contacts',
      },
    ],
  },
  {
    id: 'distribution',
    multilevel: true,
    name: 'distribution.title',
    to: '/distribution/buy',
  },
]

export const mobileMenu = [
  {
    id: 'b2b',
    name: 'B2B',
    icon: 'sync-24',
    href: 'https://ims3.ekf.su/',
    rel: 'nofollow',
    external: true,
    ymEvent: 'CLKURLB2BHEADER',
  },
  {
    id: 'education',
    name: 'global.education',
    icon: 'education-24',
    href: 'https://univer.ekfgroup.com/',
    external: true,
    ymEvent: 'CLKURLUNIVERHEADER',
  },
  {
    id: 'eshop',
    name: 'global.onlineStore',
    icon: 'shop-24',
    href: 'https://market.ekfgroup.com/',
    external: true,
    ymEvent: 'CLKURLMARKETHEADER',
  },
  {
    id: 'callback',
    name: 'feedback.requestCallback',
    icon: 'phone-24',
    action: 'callback',
  },
  {
    id: 'support',
    name: 'feedback.getFeedback',
    icon: 'headset-24',
    to: '/support/feedback',
  },
  {
    id: 'estimate',
    name: 'feedback.estimateProject',
    icon: 'calculator-24',
    to: '/support/project',
  },
  {
    id: 'report',
    name: 'feedback.reportError',
    icon: 'warning-24',
    to: '/support/report',
  },
  {
    id: 'question',
    name: 'feedback.askQuestion',
    icon: 'question-24',
    to: '/support/question',
  },
]

export default {}

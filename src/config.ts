type SiteConfig = {
  title: string;
  description: string;
  author: string;
  siteUrl: string;
  logo?: string;
  ogImage: string;
  locale: string;
  twitter: {
    site: string;
  };
};

type Link = {
  text: string;
  href: string;
};

type Action = {
  href: string;
  text: string;
  icon?: string;
};

type FooterLinkGroup = {
  title: string;
  links: Link[];
};

type SocialLink = {
  ariaLabel: string;
  icon: string;
  href: string;
};

type NavigationConfig = {
  header: {
    links: Link[];
    actions: Action[];
  };
  footer: {
    links: FooterLinkGroup[];
    secondaryLinks: Link[];
    socialLinks: SocialLink[];
    footNote: string;
  };
};

export const SITE = (): SiteConfig => {
  return {
    title: 'miseo AI - Automate your SEO with AI',
    description:
      'miseo AI is a tool that helps you automate your SEO content creation with AI in seconds.',
    author: 'Daniel García',
    siteUrl: 'https://miseo.ai/',
    ogImage: '/src/assets/images/og-image.webp', // Needs to be an absolute path /src/...
    locale: 'en_US',
    twitter: {
      site: '@miseoai',
    },
  };
};

export const NAVIGATION = (): NavigationConfig => ({
  header: {
    links: [],
    actions: [
      {
        href: `/#hero`,
        text: 'Start ranking higher 🚀',
        // icon: 'tabler:rocket',
      },
    ],
  },

  footer: {
    links: [
      {
        title: 'Support',
        links: [
          { text: 'Contact', href: `/contact/` },
          { text: 'Blog', href: `/blog/` },
          { text: 'Guides', href: `/guides/` },
        ],
      },
      {
        title: 'miseo AI',
        links: [
          { text: 'How it works', href: `/#how-it-works` },
          { text: 'Features', href: `/#features` },
          { text: 'Changelog', href: `/changelog/` },
          { text: 'GitHub', href: `https://github.com/dontic/postifyai` },
        ],
      },
      {
        title: 'GearShift Universe',
        links: [
          { text: 'GearShift', href: 'https://gearshift.es/' },
          { text: 'miseo AI', href: 'https://miseo.ai/' },
          { text: 'Estavia', href: 'https://estavia.ai/' },
          { text: 'AutoIPC', href: 'https://autoipc.es/' },
          { text: 'SynCal', href: 'https://syncal.app/' },
        ],
      },
    ],
    secondaryLinks: [
      { text: 'Terms and conditions', href: `/terms/` },
      { text: 'Privacy policy', href: `/privacy/` },
    ],
    socialLinks: [
      {
        ariaLabel: 'X',
        icon: 'tabler:brand-x',
        href: 'https://x.com/miseoai',
      },
      {
        ariaLabel: 'Instagram',
        icon: 'tabler:brand-instagram',
        href: 'https://instagram.com/miseoai',
      },
      {
        ariaLabel: 'LinkedIn',
        icon: 'tabler:brand-linkedin',
        href: 'https://linkedin.com/company/miseoai',
      },
      {
        ariaLabel: 'Facebook',
        icon: 'tabler:brand-facebook',
        href: 'https://www.facebook.com/miseoai',
      },
      { ariaLabel: 'RSS', icon: 'tabler:rss', href: `/rss.xml` },
    ],
    footNote: `
        <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400"
        >© 2025 <a href="/" class="hover:underline"
          >miseo AI</a
        >
      </span>
        `,
  },
});

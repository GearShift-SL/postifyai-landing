import { getPermalink, getBlogPermalink, getAsset } from './utils/permalinks';

export const headerData = {
  links: [
    {
      text: 'How it works',
      href: '/#transformation',
    },
    {
      text: 'FAQ',
      href: '/#faq',
    },
    {
      text: 'Blog',
      href: getBlogPermalink(),
    }
  ],
  actions: [{
    text: 'Start writing now', variant: "primary",
    icon: 'tabler:rocket',
    href: '/pricing/',
    // target: '_blank'
  }],
  showGithub: true,
};

export const footerData = {
  links: [
    {
      title: 'Support',
      links: [
        { text: 'Contact', href: getPermalink('/contact/') },
        { text: 'Blog', href: getBlogPermalink() },
        { text: 'Guides', href: getPermalink('/category/guides/') },
      ],
    },
    {
      title: 'postifyAI',
      links: [
        { text: 'Features', href: '/#features' },
        { text: 'About us', href: '/#about' },

      ],
    },
  ],
  secondaryLinks: [
    { text: 'Terms and Conditions', href: getPermalink('/terms') },
    { text: 'Privacy Policy', href: getPermalink('/privacy') },
  ],
  socialLinks: [
    // { ariaLabel: 'X', icon: 'tabler:brand-x', href: 'https://x.com/autovisita' },
    { ariaLabel: 'GitHub', icon: 'tabler:brand-github', href: 'https://github.com/dontic/postifyai' },
    { ariaLabel: 'RSS', icon: 'tabler:rss', href: getAsset('/rss.xml') },
  ],
  footNote: `
  <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400"
  >© 2024 <a href="https://postifyai.com/" class="hover:underline"
    >postifyAI</a
  >
</span>
  `,
};

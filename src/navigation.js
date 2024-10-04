import { getPermalink, getBlogPermalink, getAsset } from './utils/permalinks';

export const headerData = {
  links: [
    {
      text: 'Descúbrelo',
      href: '/#transformation',
    },
    {
      text: 'FAQ',
      href: '/#faq',
    },
    {
      text: 'Blog',
      href: getBlogPermalink(),
    },
    {
      text: 'Precios',
      href: '/#pricing',
    }
  ],
  actions: [{
    text: 'Pruébalo gratis', variant: "primary",
    icon: 'tabler:rocket',
    href: '/signup/',
    // target: '_blank'
  }],
};

export const footerData = {
  links: [
    {
      title: 'Soporte',
      links: [
        { text: 'Contacto', href: getPermalink('/contact/') },
        { text: 'Blog', href: getBlogPermalink() },
        { text: 'Guías', href: getPermalink('/category/guias/') },
      ],
    },
    {
      title: 'Compañía',
      links: [
        { text: 'Cómo funciona autovisita', href: '/#features' },
        { text: 'Sobre nosotros', href: '/#about' },

      ],
    },
  ],
  secondaryLinks: [
    { text: 'Términos y condiciones', href: getPermalink('/terms') },
    { text: 'Política de privacidad', href: getPermalink('/privacy') },
  ],
  socialLinks: [
    // { ariaLabel: 'X', icon: 'tabler:brand-x', href: 'https://x.com/autovisita' },
    { ariaLabel: 'RSS', icon: 'tabler:rss', href: getAsset('/rss.xml') },
  ],
  footNote: `
  <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400"
  >© 2024 <a href="https://autovisita.es/" class="hover:underline"
    >AutoVisita</a
  >
</span>
  `,
};

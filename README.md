# Landing Page Astro Code

## How to set this up

### 1. Set up the site's meta

Go to /src/config.ts and modify everything that's in there

### 2. Update branding

1. Under `/src/assets/favicon/` , update the 3 favicons in there
2. Under `/src/icons/`, update `main-logo.svg`
3. In `/src/styles/global.css`, update the brand's colors

### 3. Blog

1. For the blog you just need to substitute the articles in content with the following structure:

   ```
   src/
   ├─ content/
   ├─ blog/
       ├─ article-1/
           ├─ index.mdx
           ├─ cover.png
   ```

2. Also update the `/src/components/blog/articleCTA.tsx` to whatever you want.

### 4. Update the landing and other stuff

Update `/src/pages/index.astro` with whatever content you want.

`/src/components/landing/` has a list of useful components used here.

### 5. ntfy functionality

Under `/src/utils/` there is `ntfy.ts`, you can use this wherever to send alerts if a user does something.

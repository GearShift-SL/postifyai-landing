# Landing page based on AstroWind

Just clone this repo and follow the setup instructions below.

## Setup

### 1. Config

1. Update the `src/config.yaml` file with the site's information.

### 2. Assets

1. Replace the favicons in `src/assets/favicons` with your own.
2. Replace the `src/assets/og_image.webp` with whatever OG image you want. The size of this image should be 1200 x 628.
3. The logo should be placed in `src/assets/icons/logos/logo.svg`.

#### Note on Blog cover images and assets

1. Cover image should be placed in `src/assets/images/blog/<blog slug>/cover.png`
2. Subsequent images should be placed in `src/assets/images/blog/<blog slug>/` with the naming convention `image-1.png`, `image-2.png`, etc.

#### 3. Index

Update all the copy in `src/pages/index.astro`.

### 4. Header & Footer

Go to `src/navigation.js` and update the header and footer links.

### 5. APIs and forms

There are 3 premade forms with their API endpoints. You can find the endpoints in `src/pages/api/`.

Remove or add forms as needed.

> Remember to update the `.env` file with the relevant API keys and variables.

### 6. Personalisation

Customize the brand colors in `src/components/CustomStyles.astro`.

#### Note on customizing config.yaml

If you want to add any variable to `config.yaml`, you will need to modify `configBuilder.ts` so that it's aware of the new variable.

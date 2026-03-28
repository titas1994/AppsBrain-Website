# AppsBrain Website

Static marketing website for AppsBrain Technologies.

## Deploy on Netlify

1. Push this repository to GitHub/GitLab/Bitbucket.
2. In Netlify, select **Add new site** → **Import an existing project**.
3. Choose the repository and use these settings:
   - Build command: *(leave empty)*
   - Publish directory: `.`
4. Deploy the site.

`netlify.toml` is already configured with publish settings and caching/security headers.

## Netlify Form Setup

The contact form in `index.html` is configured with:
- `data-netlify="true"`
- hidden `form-name` field
- honeypot spam field

After the first successful deploy, submit the form once so it appears under **Forms** in Netlify.

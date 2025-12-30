# Static Asset Handling

All static assets (favicon, logo, etc.) are placed in the `public/` directory. These files are served at the root URL and are referenced in your app as `/favicon.ico`, `/logo.svg`, etc.

## Example Usage
- Favicon: `<link rel="icon" href="/favicon.ico" />`
- Logo: `<img src="/logo.svg" alt="App Logo" />`

Add new assets to `public/` and reference them using the root-relative path.

## Installation Command:
Clone the repository and run
```bash
npm install
```
## File details:
### /middleware.ts:
The middleware.ts file is used to specify which pages and functions are accessible only by authorized users who have the hidden token.
The token is in the environment variables file with the name, AUTH_TOKEN.

### /app/sitemap.ts
The sitemap.ts file is the sitemap of this project and every new page that is added has to be added to the sitemap as well.

### /app/about/page.tsx
The about page is not finished yet.

### /app/api/admin
Any fetch requests to this directory have to include the hidden token as a parameter to be accessible. (Only admins have access to these functions)

### /sanity
Inside this directory you can run
```bash
npm run dev
```
to access the sanity studio to change the product data or add new products
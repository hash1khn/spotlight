# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/c9dda9d6-0588-46a9-bb34-18dba270d426

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/c9dda9d6-0588-46a9-bb34-18dba270d426) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Next.js 15 (App Router)
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/c9dda9d6-0588-46a9-bb34-18dba270d426) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)

## Admin Panel

This project includes a simple admin panel that allows you to manage upcoming shows with a lightweight SQLite-compatible database (powered by libSQL/Turso).

### Features

- **SQLite Storage**: Show data is stored in a persistent SQLite database that works locally and in production
- **Easy to Use**: Simple interface to add, edit, or delete shows
- **Password Protected**: Secure access with password authentication

### How to Access

1. Navigate to `/admin/login` in your browser
2. Enter the admin password (default: `admin123`)
3. You'll be redirected to the admin dashboard

### Setting a Custom Password

To set a custom admin password, create a `.env.local` file in the root directory and add:

```
ADMIN_PASSWORD=your-secure-password-here
```

**Important**: Make sure to add `.env.local` to your `.gitignore` file to keep your password secure.

### Managing Shows

Once logged in, you can:
- **Add Shows**: Click the "Add Show" button and fill in the show details
- **Edit Shows**: Click the "Edit" button next to any show to modify its information
- **Delete Shows**: Click the "Delete" button to remove a show (with confirmation)

All changes are saved immediately to the SQLite database and will be reflected on your website.

### Database Setup

The API routes connect to SQLite via the [`@libsql/client`](https://github.com/tursodatabase/libsql-client) driver. You can point the app either at a local file database or at a hosted Turso/libSQL database.

Create `.env.local` (and configure the same values in your deployment platform):

```
ADMIN_PASSWORD=your-secure-password-here
DATABASE_URL=libsql://<your-db>.turso.io
DATABASE_AUTH_TOKEN=<your-db-auth-token>
```

For local development you can use Turso’s local replica (`turso dev --db show-spotlight`) or any libSQL-compatible URL. The API layer automatically creates the `shows` table if it does not exist.

# Setup Guide

Follow these steps to set up the **Favs** project locally.

## Prerequisites

- **Node.js** (Latest LTS recommended)
- **Bun** (Required for package management and script execution)

## Installation

1.  **Clone the repository:**
    ```sh
    git clone <repository-url>
    cd favs
    ```

2.  **Install dependencies:**
    ```sh
    bun install
    ```

## Environment Variables

Create a `.env` file in the root directory and populate it with the following variables:

```sh
# Turso Database (Server-side)
TURSO_DATABASE_URL="libsql://<your-db>.turso.io"
TURSO_AUTH_TOKEN="<your-auth-token>"

# Turso Database (Client-side - if needed, though typically db access is server-side)
NEXT_PUBLIC_TURSO_DATABASE_URL="libsql://<your-db>.turso.io"
NEXT_PUBLIC_TURSO_AUTH_TOKEN="<your-auth-token>"

# Better Auth
BETTER_AUTH_SECRET="<generate-a-random-secret>"
BETTER_AUTH_URL="http://localhost:3000" # or your production URL

# Google OAuth (for Better Auth)
GOOGLE_CLIENT_ID="<your-google-client-id>"
GOOGLE_CLIENT_SECRET="<your-google-client-secret>"
```

## Database Setup

This project uses **Drizzle ORM** with **Turso (LibSQL)**.

1.  **Generate migrations:**
    ```sh
    bun run db:generate
    ```

2.  **Push changes to the database:**
    ```sh
    bun run db:migrate
    ```

3.  **Open Drizzle Studio (Optional):**
    For a GUI to manage your database:
    ```sh
    bun run db:studio
    ```

## Running the App

Start the development server:

```sh
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

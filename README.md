This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Overview

This project implements authentication using middleware. User authentication status is managed through cookies. Upon accessing any page, the middleware automatically checks if the user is authenticated. If the user is not authenticated, they will be redirected to the login or registration page.

Currently, the project includes functions to create and update user accounts. However, a logout function has not been implemented yet. If required, I can add it. For testing purposes, you can manually remove the authentication cookie via the Application tab in your browser’s developer console.

## Features

### Character List and Details:

On the home page, you will find a paginated list of characters. Clicking on a character will take you to its detail page.

### Pagination with Direct Linking:

The pagination system allows you to browse through the list of characters. Additionally, you can directly navigate to a specific page using a URL (e.g., ?page=2).

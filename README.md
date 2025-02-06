This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Set up environment variables
Create a .env.local file in the root of the project and set the following environment variables:

```
# Cassandra connection settings
DB_URL=cassandra-db-hostname       # Replace with your Cassandra host URL
DB_USERNAME=cassandra-user         # Replace with your Cassandra username
DB_PASSWORD=cassandra-password     # Replace with your Cassandra password
CASSANDRA_LOCAL_DATACENTER=datacenter1  # Replace with your Cassandra data center name
CASSANDRA_KEYSPACE=college         # Replace with your Cassandra keyspace name
```

## Run the development server
Start the Next.js development server:

```bash
npm run dev
```
This will start the server at http://localhost:3000. You can now interact with the API.

## Testing the API
You can test the following CRUD operations through the API:

- Create a word (POST /api/words):
Request body: { "word": "example" }
Creates a new word entry in Cassandra.

- Get all words (GET /api/words):
Returns all words stored in Cassandra.

- Get a specific word by ID (GET /api/words?word_id=<id>):
Fetch a specific word by its ID.

- Update a word (PUT /api/words?word_id=<id>):
Request body: { "word": "updated-example" }
Updates the word with the given ID.

- Delete a word (DELETE /api/words?word_id=<id>):
Deletes a specific word by ID.

## Health check API
The project also provides a health check endpoint to verify if Cassandra is connected:

Health Check (GET /api/health):
Returns { "status": "healthy" } if the Cassandra connection is working, or { "status": "unhealthy", "details": "Error message" } if it is not.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

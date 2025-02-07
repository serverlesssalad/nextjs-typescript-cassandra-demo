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

## Set up Environment Variables
Create a .env.local file in the root of the project and set the following environment variables based on whether you're connecting to a local Cassandra instance or AWS Keyspaces.

### For Local Cassandra:
```env
# Local Cassandra connection settings
DB_IS_AWS_KEYSPACES=false        # Set to 'false' for local Cassandra, 'true' for AWS Keyspaces
DB_CONTACT_POINTS=localhost      # Replace with your local Cassandra host URL or Docker container IP
DB_LOCAL_DATACENTER=datacenter1  # Replace with your Cassandra data center name (typically 'datacenter1')
DB_KEYSPACE=your_keyspace        # Replace with your Cassandra keyspace name
DB_USERNAME=cassandra            # Replace with your Cassandra username (if applicable)
DB_PASSWORD=cassandra            # Replace with your Cassandra password (if applicable)
```
### For AWS Keyspaces:
```env
# AWS Keyspaces connection settings
DB_IS_AWS_KEYSPACES=true         # Set to 'true' for AWS Keyspaces
DB_CONTACT_POINTS=cassandra.us-east-1.amazonaws.com  # AWS Keyspaces endpoint (replace with your region if necessary)
DB_LOCAL_DATACENTER=us-east-1    # Replace with your AWS region (e.g., 'us-east-1')
DB_KEYSPACE=your_keyspace        # Replace with your AWS Keyspace name
AWS_ACCESS_KEY_ID=your_access_key_id  # Your AWS access key ID
AWS_SECRET_ACCESS_KEY=your_secret_access_key  # Your AWS secret access key
AWS_SESSION_TOKEN=your_session_token  # (Optional) Your AWS session token if using temporary credentials
```

Note: Set DB_IS_AWS_KEYSPACES to true if you're using AWS Keyspaces, and false if you're connecting to a local Cassandra instance. The rest of the environment variables will adjust accordingly based on this setting.

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

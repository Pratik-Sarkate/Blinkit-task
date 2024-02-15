# Image Dumper Website

## Backend


- **In backend/**

    ```bash
    npm install
    ```

- **Create a .env file in backend/**

    ```bash
    SUPABASE_URL = "Project-URL"
    SUPABASE_API_KEY = "Non-RLS-Project-API-Key"
    PORT = <PORT> #eg PORT = 3000
    JWT_SECRET = "JWT_Secret"
    DATABASE_URL="db-connection-string"
    ```

- **Generate models**
    ```bash
    npx prisma migrate
    npx prisma generate
    ```
- **Run the server**
    ```bash
    node index.js
    ```

## Frontend


- **In frontend/**

    ```bash
    npm install
    ```


- **Run the frontend server**
    ```bash
    npm run dev
    ```


# Country Info API

This is a backend application built with NestJS that provides information about countries, including borders, population data, flags, and national holidays. It allows users to add a country's national holidays to a calendar.

## Prerequisites

Before you begin, ensure you have the following installed on your local machine:

- **Node.js** (v18 or later recommended)
- **Docker** and **Docker Compose** (for running the PostgreSQL database)
- **npm** (comes with Node.js)

## Installation

1.  **Clone the repository:**

    ```bash
    git clone git@github.com:illiakornyk/Country-Info-App.git
    cd country-info-app
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

## Configuration

This application uses environment variables for configuration.

1.  **Create a `.env` file:**
    Create a new file named `.env` in the root of the project by copying the example file.

    ```bash
    # For macOS / Linux
    cp .env.example .env

    # For Windows
    copy .env.example .env
    ```

2.  **Update `.env` variables:**
    Open the newly created `.env` file and update the `DB_USERNAME` and `DB_PASSWORD` to match the credentials you want to use for your database.

## Running the Application

Follow these steps in order to get the application running.

### 1. Start the Database (Docker)

This project includes a `docker-compose.yml` file to easily run a PostgreSQL database in a Docker container.

```bash
docker-compose up -d
```

This command will start a PostgreSQL container in the background and create a database named `country_info_app`.

### 2. Apply Database Migrations

Before starting the app for the first time, you need to set up the database schema by running the TypeORM migrations.

```bash
npm run typeorm:run
```

This command will create the necessary tables (e.g., `calendar_event`) in your database.

### 3. Start the Application Server

Now you can start the NestJS application in development mode.

```bash
npm run start:dev
```

The application will be running on `http://localhost:3000`

## Database Migrations

Database schema changes are managed through TypeORM migrations. This ensures that schema updates are version-controlled and can be applied consistently across all environments.

### Generating a New Migration

After you make a change to a TypeORM entity (e.g., add a new column), you must generate a new migration file.

````bash
# The '--' separates npm arguments from the command's arguments
npm run typeorm:generate -- -n AddDescriptionToEvent```
Replace `AddDescriptionToEvent` with a descriptive name for your change. This command will compare your entities with the database schema and create a new migration file in `src/typeorm/migrations/`.

### Running Migrations

To apply all pending migrations, use the `run` command. This is the same command used during the initial setup.

```bash
npm run typeorm:run
````

### Reverting a Migration

To undo the most recently applied migration, use the `revert` command.

```bash
npm run typeorm:revert
```

## Code Quality

This project uses ESLint and Prettier to maintain consistent code quality and formatting.

### Formatting Code

To automatically format all files according to the Prettier rules:

```bash
npm run format
```

### Linting Code

To check for code quality issues and style errors with ESLint:

```bash
npm run lint
```

## Running Tests

The application includes configurations for both unit and end-to-end (e2e) tests.

### Unit Tests

To run the unit tests using Jest:

```bash
npm run test
```

### End-to-End (E2E) Tests

To run the e2e tests, which test the API endpoints in a true-to-life scenario:

```bash
npm run test:e2e
```

## API Documentation

Once the application is running, you can view the interactive API documentation (provided by Swagger) by navigating to:

[**http://localhost:3000/api**](http://localhost:3000/api)

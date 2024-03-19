# Railway Playground

## Description

Railway Playground offers a straightforward dashboard for monitoring and managing projects within Railway.app. It provides a clear overview of your account's projects, detailing each one's services and deployments across various environments.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started / Installation Instructions](#getting-started--installation-instructions)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Running the Tests](#running-the-tests)
- [Deployment](#deployment)

## Features

- **Access Token Integration**: Users can easily integrate their Railway account by navigating to "Account Settings" -> "Tokens" on their Railway dashboard to obtain an access token. This token is then used to authenticate and populate their Railway Playground dashboard with their projects.

- **Dynamic Project List**: Once authenticated, the dashboard dynamically populates with a list of the user's Railway projects.

- **Color-Coded Deployments**: To offer at-a-glance insights into deployment health, each deployment is color-coded based on its status.

- **Environment Selection**: For added granularity, users can select the specific environment (e.g., development, staging, production) they wish to view services and deployments for.

## Technologies Used

Railway Playground is structured as a `pnpm` monorepo and leverages TypeScript throughout to ensure code reliability. Here’s a straightforward overview of the technologies and tools incorporated:

### Frontend

- **TypeScript**: Used for its strong typing features.
- **CSS Modules**: Allows for CSS to be modularized and scoped locally to components.
- **Webpack**: A module bundler that compiles and optimizes the assets and modules for production.
- **Jest**: For unit testing the frontend components.

### Backend

- **Node.js with TypeScript**: Provides a scalable and efficient backend, enhanced by TypeScript's type safety.
- **Express.js**: A minimalistic framework for creating API.
- **Joi**: Utilized for validating API request data.
- **Pino**: A lightweight logging tool.
- **Jest and Supertest**: Jest for unit tests and Supertest for API integration tests.

### Deployment and CI/CD

- **Docker**: Docker is used to containerize both the server and UI applications.
- **GitHub Actions**: Automates the continuous integration (CI) workflow, running tests and checks on every commit to the master branch. If these checks pass, GitHub Actions signals Railway to deploy the latest version.
- **Railway**: For deploying the monorepo.

### Package Management

- **pnpm**: The package management within the monorepo setup.

## Getting Started / Installation Instructions

Before diving into Railway Playground, there are a few things you'll need to get sorted. This section will guide you through the prerequisites necessary to get your environment ready for running the project.

### Prerequisites

- **Node.js**: The runtime environment for executing the backend code. Make sure you have Node.js installed; version 18.x or later is recommended. You can download it from [nodejs.org](https://nodejs.org/).

- **pnpm**: As Railway Playground is a pnpm monorepo, you'll need pnpm for managing the packages. If you haven't got pnpm yet, install it by running `npm install -g pnpm`.

- **Railway Account**: You'll need a Railway access token in order to use the application. Sign up at [railway.app](https://railway.app/) if you haven't already and obtain an API token from "Account Settings" -> "Tokens".

With these prerequisites in place, you're all set to move on to installing and running Railway Playground locally.

### Installation

Here’s how to get Railway Playground running locally:

`Now that you've got all the prerequisites out of the way, let's get Railway Playground up and running on your machine. Follow these steps to install the project:

1. **Clone the Repository**
   First, clone the repository to your local machine using Git. Open a terminal and run the following command:
   ```bash
   git clone https://github.com/pankyriazo/railway-playground.git
   ```
2. **Install Dependencies**:

   - Open a terminal and ensure you're in the project's root directory.
   - Run `pnpm install` to install all required dependencies for both the frontend and backend.

3. **Start the Development Server**:

   - Once the installation is complete, you can start the development server by running `pnpm run dev` from the root directory.
   - This command will concurrently start both the frontend and backend servers in development mode. Watch for any output in the terminal for a success message indicating that the servers are running correctly.

4. **Accessing the Dashboard**:
   - With the servers up and running, open your web browser and navigate to `http://localhost:3000` (or whichever port is specified in your environment variables) to view the Railway Playground dashboard.
   - You should now be able to interact with your Railway projects directly from the dashboard.

And that’s it! You’ve successfully set up Railway Playground on your local machine.

## Running the Tests

Testing is an integral part of maintaining the reliability of Railway Playground. Thanks to the monorepo setup with pnpm, running tests is streamlined and flexible, whether you're focusing on a specific app or checking everything all at once.

### How to Run Tests

Within the Railway Playground monorepo, you have the flexibility to run tests for a specific app or for all apps together, directly from the root directory. Here's how you can do it:

- **Running Tests for a Specific App**
  To run tests for just one part of the application, like the server app, you don't need to navigate into its directory. Simply use this command at the root of the monorepo:
  ```bash
  pnpm -F @monorepo/server run test
  ```

This tells pnpm to focus on the `@monorepo/server` package and run its `test` script. Adjust `@monorepo/server` to match the package name of the app you're testing.

- **Running Tests for All Apps** If you want to run tests across all apps within the monorepo you can do so with a single command:

  `pnpm run test`

  This command executes the `test` script for each app.

## Deployment

Deploying updates to Railway Playground is smooth and automated, thanks to the integration of GitHub Actions and Railway. This setup ensures that every new commit pushed to the master branch of the GitHub monorepo triggers the CI workflow. Here's a brief overview of how deployment works:

### Continuous Integration and Deployment Workflow

1. **GitHub Actions CI Workflow**: Whenever a new commit is made to the master branch, the GitHub Actions `CI` workflow kicks off. This workflow runs the tests to ensure that the new changes don't introduce any errors.

2. **Railway Deployment**: If the GitHub Actions `CI` workflow concludes successfully, Railway picks up the result. Based on this success signal, Railway proceeds to redeploy the app, incorporating the latest changes from the commit.

3. **Selective Redeployment**: Within the monorepo, each app is treated independently in terms of deployment. That means if changes are committed that only affect a specific app, Railway will only redeploy that particular app.

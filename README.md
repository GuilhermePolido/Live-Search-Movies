# Live Search Movies

## Description

This is a movie search application using TMDB API.

## Functionalities

- Movie search, using live search component
- You can use the arrow keys to use the shortcuts in the live search component
- List of all favorites

## Live demo
https://live-search-movies.vercel.app/

## Technologies Used

-   TypeScript
-   React js
-   Node js
-   React Router Dom
-   Cypress

## Installation

```bash
git clone https://github.com/GuilhermePolido/Live-Search-Movies.git
cd Live-Search-Movies
yarn
yarn dev
```

Open in browser http://localhost:5173

## Environments
You will need to configure the variable VITE_API_READ_ACCESS_TOKEN in the .env file. You can get the token in https://developer.themoviedb.org/docs/getting-started.

## Build

```bash
yarn build
```

## Run e2e Cypress in terminal

Before run e2e in terminal run the project:

```bash
yarn dev
```

Then

```bash
yarn cypress:run
```

## Run e2e Cypress in a UI

Before run e2e in terminal run the project:

```bash
yarn dev
```

Then

```bash
yarn cypress:open
```

Choose E2E Testing

Choose a browser

Click in searchMovies.cy.js to run the spec

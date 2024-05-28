## Description

This repository demonstrates a CI/CD pipeline setup for deploying two applications on [Render.com](https://render.com/). The first application is a client app created using Vite, and the second is an Express.js server app deployed as a Docker container. The CI/CD pipelines, configured using GitHub Actions, incorporate several key features to ensure efficient and reliable deployments.
Besides unit tests, the workflow integrates Cypress for API and end-to-end testing. Deployments are managed using the Render.com API, which streamlines the deployment process. Render API is utilized to triger deployments via webhooks and for checking the status of deployments.



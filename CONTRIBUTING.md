# Contributing

Thank you for considering contributing to Alfredo!

We use Docker in development. 

First, you need to have Docker installed in your machine. 
Then, you can run the following command to build the base image:
```
docker compose build
```

After that, you can run the following command to start the development environment:
```
docker compose run --rm alfredo
```

## Maintainers only

Build the base image workflow, manually dispatch from the GH cli.
```
npm run build-base-image-workflow
```

# Connecting to an Editori API

In order for the Editori frontend to function, it needs to be connected to an
Editori API.  There are three options for connecting to an API:

## Option 1: Connect to the hosted development API server
For development purposes, you can connect your Editori instance to the
hosted development API server.

1. Create a `.env` file in the root of your editori-frontend project, with the
following contents:
```
API_URL=https://dev.api.editori.io
BACKEND_URL=https://dev.api.editori.io/graphql
CLIENT_BASE_URL=http://localhost:3000
```

That's it!  Your Editori instance should now be connected to the hosted
development API server.

## Option 2: Connect to your local development API server
If you are making changes to how the backend processes or stores data at the
same time as changes to the frontend, you will need to connect to a local copy
of the development API server.

1. Check out the [editori-api](https://github.com/nikomi-llc/editori-api)
project using Git.
2. Install its dependencies
3. Start the local server

If you started the server on a custom port, you will additionally need to
create a `.env` file in the root of your editori-frontend project, with the
following contents (replacing `1337` with the port number you have selected):
```
API_URL=http://localhost:1337
BACKEND_URL=http://localhost:1337/graphql
CLIENT_BASE_URL=http://localhost:3000
```

## Option 3: Connect to the production API server
In rare cases, you may wish to test specific scenarios that exist in
production.  If it is difficult to replicate the data in the development
environment, it is also possible to connect your Editori instance to the
production API server.

1. Create a `.env` file in the root of your editori-frontend project, with the
following contents:
```
API_URL=https://api.editori.io
BACKEND_URL=https://api.editori.io/graphql
CLIENT_BASE_URL=http://localhost:3000
```

Your Editori instance should now be connected to the production API server.
Note that the production API server should be used sparingly, and it lacks
certain features useful for development, such as the GraphQL playground.

# Using the GraphQL playground

On the **local development API server** and **hosted development API server**,
it is possible to access the GraphQL playground, which allows creating test
queries.

To do this, you will need to follow a few steps:

1. Using the UI, log in as the user that you would like to perform test queries
as.
2. Once logged in, inspect the cookies for the application.  If using Google
Chrome, this can be done in the "Application" tab of Chrome's developer tools:
![Screenshot of Application tab in Chrome developer tools](img/cookie.png)
3. Copy the value of the `apollo-token` cookie.
4. Navigate to the GraphQL playground for the API server you are using
5. Under HTTP headers, set the authorization token, including the literal string
`Bearer` to indicate the authorization scheme, followed by the token copied from
step 3.  For example:
```
{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjA3Mjk1OTA3LCJleHAiOjE2MDk4ODc5MDd9.dJ0fOQXVR9o_EC_qW-HWXm24NGX515wgDFU2p0xb_YE"
}
```
6. Create your query (or copy one from [/queries][1])
7. Ensure that any variables (e.g. `$workspaceSlug`) used in the query are
populated
8. Execute your query!
![Screenshot of GraphQL playground with executed query](img/graphql.png)

[1]: https://github.com/nikomi-llc/editori-frontend/tree/master/queries

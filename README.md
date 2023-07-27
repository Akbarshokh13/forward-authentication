# forward-authentication
This repository contains backend code which execute forward authentication requests to the backend written in Node Js, Express framework. 
The Apache APISIX Forward Auth plugin simplifies authentication within API gateways by delegating the authentication process to a separate authentication service. In this step-by-step guide, we will walk through the process of integrating and configuring the Apache APISIX Forward Auth plugin to secure your API gateway.
# how does it work? 
As an example here were are using node js backend server request to perform forward-auth logic. 
### The Apache APISIX Forward Auth plugin will intercept the request, forward it to the authentication service for validation, and allow it to proceed if the authentication is successful.
You can use this plugin if you want to leverage your own service as an authentication provider.
Assume that you send a request to the protected route (api.example.com/protected) with the required authentication credentials (e.g., JWT token, OAuth token). The Apache APISIX Forward Auth plugin will intercept the request, forward it to the authentication NodeJS service for validation, and allow it to proceed if the authentication is successful from NodeJS /auth path. 
# How to run it? 
### Prerequisites 
Note that you need to install necessary dependencies of the Node JS project such as express framework to have a simple backend server running.
Commands to install dependencies to adopt the project: after npm start 1) npm install express. 2) npm init -y,
3) Start the server by running the following command in the terminal:
node app.js 

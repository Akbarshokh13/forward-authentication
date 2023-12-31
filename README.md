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
#### Before you start, it is good to have a basic understanding of APISIX. Familiarity with API gateway, and its key concepts such as [routes](https://docs.api7.ai/apisix/key-concepts/routes), [upstream](https://docs.api7.ai/apisix/key-concepts/upstreams), [Admin API](https://apisix.apache.org/docs/apisix/admin-api/), [plugins](https://docs.api7.ai/apisix/key-concepts/plugins), and HTTP protocol will also be beneficial. [Docker](https://docs.docker.com/get-docker/) is used to install the containerized etcd and APISIX. 
First of all, install Docker desktop app with the specified version depending on your laptop.  
### Let’s have a look at how we can execute forward authentication requests to the backend: 
This repo contains necessary forward-authentication logic for the execution of authentication. Here you have an Upstream and server configured.  
Here is the curl command to test whether the backend authentication working or not: 
##### `curl -X POST -H "Content-Type: application/json" -d '{"username": "your_username", "password": "your_password"}' http://localhost:80/auth`
Depending on the username and password you will receive the appropriate message to see if it’s working. 
##### `curl -X POST -H "Content-Type: application/json" -d '{"username": "yourName", "password": "yourPassword"}' http://localhost/auth {"message":"Authentication successful"}`
### Next include Docker: 
Next, to include docker into the project, build your Docker image to include the updated dependencies. You can do this by running the `docker-compose build` command. After that run `docker-compose up` to create new containers and images inside the docker desktop app. 

Inside the Docker Desktop you can see the following: 

![GitHub Logo](assets/Docker.png)

### Validate 
Once APISIX is running on Docker, you can use curl to send a request to see if APISIX is working properly: 
##### `curl-I "http://127.0.0.1:9080" | grep Server` 
If everything is ok, you will get the following response:
Server:APISIX/3.3.0.   
APISIX is now installed and running

##### Once APISIX is running and all the Docker instructions are done configure routes to execute forward-authentication logic, run this command:
``` 
curl -I "http://127.0.0.1:9180/apisix/admin/routes/nodejs" -H 'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1'-X PUT -d
{
  "uri": "/auth",
     "upstream": {
      "type": "roundrobin",
      "nodes": {
        "localhost:80": 1
	} }
}'
```
You will receive an HTTP/1.1 201 OK response, if the route was created successfully.  
##### Next, you create the plugin using this curl command: 
```
curl http://127.0.0.1:9180/apisix/admin/routes/nodejs -H 'X-API-KEY: edd1c9f034335f136f87ad84b625c8f1' -X PUT -d '
{ 
    "plugins": {
        "forward-auth": {
           "uri":"http:localhost:80/auth",
             "address": "http://127.0.0.1:9080/auth",
              "request_headers": ["username", "password"], 
              "upstream_headers": ["X-User-ID"],
             "client_headers": ["Location"]

}  },   "uri": "/auth"}'

```
After running this Curl command you are able to see the following. 




 



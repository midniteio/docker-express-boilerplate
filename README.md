##Simple dockerized expressjs server boilerplate

Includes dynamic clustered workers, simple basic docker npm scripts, and very basic static boilerplate.

####Using this repository:
Getting setup with a node app (in this case, providing an express server to serve static files) is incredibly simple.

0.  Ensure your docker VM is running
1.  Clone this repository
2.  `npm install`
3.  `npm run build`
4.  `npm run deploy`

An express server will spin up inside the docker container at port 8080, which will be forwarded to what you have defined as the hostPart environment variable, or if one doesn't exist- defaults to 3005, allowing you to see the content being served at `<your-docker-vm-ip>:3005`. Your docker vm ip can be found using `docker-machine ls`.


####TODO: 
- Create optimized production build with minification
- Mount volumes other than static content in public 
- Include and configure nginx in dockerfile to serve as a reverse proxy
- Define boilerplate implementing Backbone/Marionette/Etc.


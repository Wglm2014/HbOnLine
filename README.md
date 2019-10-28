# Home Budget On Line 
Is the first version of a web app, to settup the line items amounts for a year home budget, it is just to control the limit of espences and the projected income for the year, the movements can be entered manually as they happen or when having time. The amount settup for the line item can be pass by the real total of the details movements, as the budget is just informational. As the project progresses more features will be added to make it more usefull to the users.

## Getting Started
* Before starting with you need to install Nodejs and have basic understanding of it and npm (node package manager) this is the official line for the documentation [Nodejs Docs](https://nodejs.org/en/docs/), also know how to clone repositories from Github to your local machine [Git Reference](https://www.git-scm.com/docs). 
* You need to install MongoDb and Mongo Compas, you can find all the necesary information at [MongoDb Documentation](https://docs.mongodb.com/)

## Installing and Starting the app locally

Clone the app from this repository to you local drive of you PC (previously I recomended to have knowledge of how to clone repositories and where to find the information) and go to the root directory of the project, then run the command

```
npm install
```
This will take a while, but should install node modules within the server and the client folder.

Make sure Mongodb is running, if it is not running the Express server still will run, but it will throw an error and the database for the project will not be created. 

After both installations complete, run the following command in your terminal:

```
npm start
```

Your app should now be running on <http://localhost:3000>. The Express server should intercept any AJAX requests from the client.

## Deployment (Heroku)

To deploy, simply add and commit your changes, and push to Heroku. As is, the NPM scripts should take care of the rest.

## Built With

### for the back end server and data persistance
* Visual Studio Code
* Nodejs 
* Express 
* MongoDb and Mongoose. 

### client side for the user interface.
* Passport, passport-local, JWT 
* React 
* React-redux 

# Author
* Wilson Linares 

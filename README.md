# Home Budget On Line 
Is the first version of a web app, to settup the line items amounts for a year home budget, it is just to control the limit of espences and the projected income for the year, the movements can be entered manually as they happen or when having time. The amount settup for the line item can be pass by the real total of the details movements, as the budget is just informational. As the project progresses more features will be added to make it more usefull to the users.

## Technology Used
Nodejs, Express, MongoDb and Mongoose, for the back end server and data persistance. the packages Passport and passport-local are use for validation as well as JWT to generate a token that allowes to know if a user has login and can have access to use the features of the app. React and React-redux is use on the client side for the user interface.

## Starting the app locally

Clone the app from this repository and then run the command
```
npm install
```

This should install node modules within the server and the client folder.

After both installations complete, run the following command in your terminal:

```
npm start
```

Your app should now be running on <http://localhost:3000>. The Express server should intercept any AJAX requests from the client.

## Deployment (Heroku)

To deploy, simply add and commit your changes, and push to Heroku. As is, the NPM scripts should take care of the rest.

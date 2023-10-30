## Welcome the Coffee selection app

    - This application consists of two parts:
        1. backend
        2. frontend

### Backend - backend folder

    - To configure the backend:
        1. npm install
        2. Add .env file to make a configuration for the application to be able to start without errors, needed environment variables:
            - PORT=?your-server-port?
            - MONGO_USERNAME=?your-mongo-username?
            - MONGO_PASSWORD=?your-mongo-password?
            - MONGO_DB=?your-db-name?
        3. npm start - compiles the tsc code to /dist and starts the application
        4. npm test - to test the CRUD enpoints with jest

    * Note, there are CRUD endpoints, but not all are used for the sake of simplicity

### Frontend - frontend folder

    - To configure frontend:
        1. npm install
        2. npm start

    - The frontend consists only of one component `App.tsx` where the logic is implemented and a little design also. I would not explain the flow assuming it is intiutive.

### Cloud services from AWS

    - I would implement my CRUD operations as AWS Lambda functions. AWS Lambda allows me to run code without managing servers, and it's cost-effective for small workloads as for this Coffee app.

# TaskManagementClient

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.2.13.

## Functionality

1. Register user
2. Login with JWT authentication
3. view/add/edit/delete tasks and manage priority and status of task
4. view user details and reset password

## Serve the Angular Application 

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Database

1. Import Database from SQL File:
Execute the command below to import the schema from the `master.sql` file located at `taskManagementClient/server/dump/` into your MySQL database:
    `psql -U username -f taskManagementClient/server/dump/` OR 
    `\i taskManagementClient/server/dump/`

## Initialize the Server

1. `taskManagementClient/server/` is a Node.js application that includes the required API endpoints for task management. 

2. Start the server with `node .` command. It will be available at `http://localhost:3000/`

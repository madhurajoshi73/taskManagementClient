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



## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

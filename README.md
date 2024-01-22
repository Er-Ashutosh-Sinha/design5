# 2FA Authentication

This project is built to demonstrate the basic authentication using [Speakeasy](https://www.npmjs.com/package/speakeasy) library.
It also includes the role-based authorization for three(user's APIs mentioned below).

## Table of Contents

- [Description](#Description)
- [Prerequisites](#Prerequisites)
- [Installation](#Installation)
- [Additional Details](#additional-details)
- [Author](#author)

## Description

This project routes' are divided into two categories, first are Auth Routes and User's Routes, as follows:

### Auth Routes

- ` /login(POST) - Login API(API to send the OTP/OTP_URI to client)`
- ` /otp-verify(POST) - Verification API(API to verify the OTP received from the client)`

### User Routes

- ` /user(GET) - Get the list of all the Users, this API has AUthentication & Authorization for Admin Only`
- ` /user/:id(GET) - Fetch the details of the User, this API has AUthentication & Authorization for All(Admin+Users)`
- ` /user(POST) - Add the users to the DB, an API 'Without' Authentication & Role-based Authorization`

## Prerequisites

To run this application/project you must have these prerequisites installed on your machine

- Operating System(Ubuntu, MAC, Windows)
- Node JS
- NPM
- MongoDB(Local/Atlas)
- Postman

## Installation

Once you have all the above prerequisites installed on your machine, you have to follow the following steps in order to run the application on your machine.

- Clone the Repository - Run this command in your terminal `git clone URL`
- Go to the root directory of the cloned Repository - Run the command `cd design5`
- Add the required values in .env file(attached in root directory of application)
- Install the application dependencies - Run the command `npm install`
- Now Run/Start the application - Run the command `npm start`

Now you are good to go(test the APIs).

## Additional Details

We have attached the postman collection `postman_collection.json`. You can use(import) this JSON file inside your postman to test these application.

## Author

- Name - Ashutosh Sinha
- Designation - Software Engineer
- Email - ashutosh.sw.dev555@gmail.com

Note : In case of any assitance while running the application, please contact the [Author](#Author)

# TODO

## Front-end

- [x] Create client Angular project
- [x] Bring in Bulma CSS
  - npm install --save bulma
  - modify angular.json and add "node_modules/bulma/css/bulma.min.css"
- [x] Create Header
- [x] Create form component
  - [x] Name
  - [x] Content
- [x] Listen for form submit
- [x] Show loading spinner
- [x] Get data from form and log it

## Back-end

- [x] Create server folder
- [x] npm init
- [x] npm install express morgan
- [x] npm i --save-dev nodemon
- [x] Setup index.js
- [x] Add GET / route
- [x] Add POST /beeps route
  - [x] log out req.body

## Front-end

- [x] fetch POST /beeps with form data
- [x] See the CORS error and revel in this moment

## Back-end

- [x] npm install cors
- [x] Make sure the server is recieving the data
- [x] Add JSON body parser middleware
- [x] Validate name and content
  - [x] Must be a string
  - [x] Cannot be empty
- [x] If not valid
  - [x] Error code 422
  - [x] Invalid beep, must contain name and content
- [x] Setup DB Connection
  - [x] Create a local MongoDB database
  - [x] npm install monk
  - [x] Connect to db
  - [x] Create document collection (beeps)
- [x] If Valid
  - [x] Create beep object with
    - [x] name, content, created_date
  - [x] Insert into DB
  - [x] Respond with created beep object

## Front-end

- [x] Log out created beep after POST request
- [x] Show the form
- [x] Hide loading spinner

## Back-end

- [x] GET /beeps
  - [x] Respond with beeps from DB

## Front-end

- [x] fetch GET /beeps
  - [x] Iterate over array
  - [x] Append each to page
  - [x] Reverse before appending
  - [x] Show the form
  - [x] Hide loading spinner
- [x] fetch GET /beeps after creating a beep
- [x] Make beeps an observable

## Back-end

- [x] Install TypeScript dependencies
- [x] Configure TypeScript

## Front-end

- [x] Load beeps ten by ten and appear on scroll
  - [x] npm install ngx-infinite-scroll --save

## Back-end

- [x] Add POST /auth/signup route
- [x] Add POST /auth/login route

## Front-end

- [x] Add navbar with Signup and Login

## Refactoring

- [x] Reorganize Angular project files and tree folder

## Front-end

- [x] Rework Burger Menu for small devices
- [x] Manage error messages on login/signup

## Back-end

- [x] Add POST /auth/userid route
- [x] Add DELETE /auth//delete/:id route

## Front-end

- [x] Add delete account option

## Back-end

- [x] Configure dotenv
- [x] Migrate mongoDB localhost to atlas
- [x] Deploy on Heroku

## Front-end

- [x] Configure environment
- [x] Deploy on Surge

## What's next?

- Complete delete account option
- Add comments/replies to a beep
- Only show beeps from a given user
- Search beeps
- Sort beeps
- Pictures in a beep
- Subscribe system
- Like/Unlike system
- Dark theme
- Hashtags
- User @mentions
- Realtime feed of beeps

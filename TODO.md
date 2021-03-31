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
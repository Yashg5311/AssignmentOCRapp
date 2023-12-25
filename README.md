# Problem Statement

Develop an application that utilizes Optical Character Recognition (OCR) to analyze thai id cards and extract relevant data. This app should integrate with Google Vision API for OCR processing and then parse the response to interpret the OCR results, returning the final data in JSON format.
Along with this we would like you to choose a database of your choice and save the results in the db. We would need a CRUD api to create the ocr data, if needed we can modify some data, filter them or delete certain id cards(soft delete).
Sample Thai ID Card Data:
The id cards you'll be analyzing can contain various data fields such as:

# Solution to Problem: Thai ID OCR App

This React application uses Tesseract.js for OCR (Optical Character Recognition) of Thai ID cards. It allows users to upload an image of a Thai ID card, extract the relevant information, and save it to a database. The app also includes a filter feature to search for specific OCR records.

# Demo Link Video
 Please see the demo link:
 
https://drive.google.com/file/d/1Q5FhVovcw8AaEKoLGs5lUN-EegLCyJ5a/view?usp=sharing


## Prerequisites

- Node.js and npm
- Tesseract.js (version 5 or higher) (Earlier I wanted to use Google Vision API but it is paid means we have to pay i.e prepayment option)
- ImageJS (version 2 or higher)
- A backend server with a REST API to handle OCR data (e.g., Express.js)
- Libaries like cors, multer, react-drop, image-js and tesseract.js

## Setup

1. Clone the repository.
   
2. Go to the assignmentocr folder and install the dependencies:   
npm install

3. Run the React app: 
npm start


## How to Use

1. Drag and drop an image of a Thai ID card onto the dropzone, or click to select one.
2. The app will automatically process the image and extract the relevant information.
3. The extracted fields will be displayed in the "Extracted Fields" section.
4. You can edit the extracted fields if needed.
5. Click the "Save" button to save the extracted data to the database.
6. You can also filter the OCR history by name or identification number.

# OCR API with Express and MongoDB

This project provides a simple RESTful API for managing OCR (Optical Character Recognition) data using Express and MongoDB. It includes routes for creating, updating, retrieving, and deleting OCR records.

## Prerequisites

- Node.js and npm installed
- MongoDB installed and running

## Database Setup

1. Create a MongoDB database named ocr-db.
2. Create a collection named ocr-records in the ocr-db database.

## API Routes

The API provides the following routes:

- /api/ocr:
  - *POST*: Create a new OCR record.
  - *GET*: Retrieve all OCR records with optional filtering by name or identification number.
  - *PUT*: Update an existing OCR record.
  - *DELETE*: Delete an OCR record by ID.
- /api/ocr/:id:
  - *GET*: Retrieve a specific OCR record by ID.

## Usage

To use the API, you can send HTTP requests to the specified routes. For example, to create a new OCR record, you can send a POST request to /api/ocr with the following JSON payload:

json
{
  "name": "John Doe",
  "Identification_Number": "123456789",
  "date_of_birth": "1990-01-01",
  "date_of_issue": "2023-01-01",
  "date_of_expiry": "2025-01-01"
}


The API will respond with a JSON object containing the result of the operation. In this case, it will return the newly created OCR record with an assigned ID.

##  The OcrRecordSchema

The OcrRecordSchema object defines the structure of the OcrRecord model. Each property in the schema represents a field in the MongoDB document.


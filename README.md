# Problem Statement

- Develop an application that utilizes Optical Character Recognition (OCR) to analyze thai id cards and extract relevant data. This app should integrate with Google Vision API for OCR processing and then parse the response to interpret the OCR results, returning the final data in JSON format.
- Along with this we would like you to choose a database of your choice and save the results in the db. We would need a CRUD api to create the ocr data, if needed we can modify some data, filter them or delete certain id cards(soft delete).


# Solution to Problem: Thai ID OCR App

This React application uses Tesseract.js for OCR (Optical Character Recognition) of Thai ID cards. It allows users to upload an image of a Thai ID card, extract the relevant information, and save it to a database. The app also includes a filter feature to search for specific OCR records.

Website Link:
https://ocridapp.onrender.com/

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

The OcrRecordSchema object defines the structure of the OcrRecord model. Each property in the schema represents a field in the MongoDB document.the Mongoose library is utilized to define an OCR record schema for MongoDB, encapsulating fields such as name, last name, identification number, dates of issue, expiry, and birth, along with a status field constrained to 'success' or 'failure'. The schema also includes a timestamp reflecting the record's creation time. The schema is then converted into a Mongoose model named OcrRecord. This model, representing a MongoDB collection, is equipped with features like data validation and query building. The defined schema ensures a structured format for OCR records, and the resulting model is exported for use throughout the application. This integration with MongoDB facilitates organized and type-safe interactions with the database, adhering to a predefined data structure.

##  Preprocessing and Tesseract.js 

We have implemented  features like comprehensive image processing pipeline within a React application for Optical Character Recognition (OCR). The preprocessImage function employs the ImageJS library to enhance image quality through brightness and contrast adjustments, size increase, noise removal, and DPI standardization. The handleImageDrop function, triggered upon image drop, utilizes this preprocessing before employing Tesseract.js for OCR in English. It logs the recognized text, parses OCR results, and updates the application state with the extracted data. Additionally, it communicates with a server to store the OCR data and manages the state of the application, including handling errors and maintaining the record ID. This integrated approach ensures robust text recognition from images while providing a user-friendly interface in a React environment.

## Screenshots of some Functionality

1. Main Screen
    ![Screenshot (273)](https://github.com/Yashg5311/AssignmentOCRapp/assets/91370994/cf3a9586-753b-4c18-a843-99166dc8886c)

   
2. Uploading Image
   ![Screenshot (274)](https://github.com/Yashg5311/AssignmentOCRapp/assets/91370994/443792e0-3054-49b5-ae8b-fd2c03713cda)


3. Extraction of Fields
   ![Screenshot (275)](https://github.com/Yashg5311/AssignmentOCRapp/assets/91370994/361122fb-4cf9-4032-837f-7bd94250de68)


4. Editting of Fields
   ![Screenshot (276)](https://github.com/Yashg5311/AssignmentOCRapp/assets/91370994/de605208-e621-4a32-8315-2a06bf19e58e)


5. Implementing Search Filter
   ![Screenshot (277)](https://github.com/Yashg5311/AssignmentOCRapp/assets/91370994/2c9a08db-f763-477d-89ba-d12da37d6522)


## Difficulties and Problems

I faced problems in Deployment and Production...The search and Save Functionality works in Local Machine but it took lot of time in doing that on Render. Also Firefox refused to establish connection to Render. 

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
  - "name": "John Doe",
  - "Identification_Number": "123456789",
  - "date_of_birth": "1990-01-01",
  - "date_of_issue": "2023-01-01",
  - "date_of_expiry": "2025-01-01"
}


The API will respond with a JSON object containing the result of the operation. In this case, it will return the newly created OCR record with an assigned ID.

##  The OcrRecordSchema

The OcrRecordSchema object defines the structure of the OcrRecord model. Each property in the schema represents a field in the MongoDB document.the Mongoose library is utilized to define an OCR record schema for MongoDB, encapsulating fields such as name, last name, identification number, dates of issue, expiry, and birth, along with a status field constrained to 'success' or 'failure'. The schema also includes a timestamp reflecting the record's creation time. The schema is then converted into a Mongoose model named OcrRecord. This model, representing a MongoDB collection, is equipped with features like data validation and query building. The defined schema ensures a structured format for OCR records, and the resulting model is exported for use throughout the application. This integration with MongoDB facilitates organized and type-safe interactions with the database, adhering to a predefined data structure.

##  Preprocessing and Tesseract.js 

We have implemented  features like comprehensive image processing pipeline within a React application for Optical Character Recognition (OCR). The preprocessImage function employs the ImageJS library to enhance image quality through brightness and contrast adjustments, size increase, noise removal, and DPI standardization. The handleImageDrop function, triggered upon image drop, utilizes this preprocessing before employing Tesseract.js for OCR in English. It logs the recognized text, parses OCR results, and updates the application state with the extracted data. Additionally, it communicates with a server to store the OCR data and manages the state of the application, including handling errors and maintaining the record ID. This integrated approach ensures robust text recognition from images while providing a user-friendly interface in a React environment.

## Screenshots of some Functionality

1. Main Screen
    ![Screenshot (273)](https://github.com/Yashg5311/AssignmentOCRapp/assets/91370994/cf3a9586-753b-4c18-a843-99166dc8886c)

   The main Screen consists of a Drop Box and Heading wherev you can drop the image and features can be Extracted.

   
2. Uploading Image
   ![Screenshot (274)](https://github.com/Yashg5311/AssignmentOCRapp/assets/91370994/443792e0-3054-49b5-ae8b-fd2c03713cda)


   You can Upload the image and see the extracted json object and fileds.

3. Extraction of Fields
   ![Screenshot (275)](https://github.com/Yashg5311/AssignmentOCRapp/assets/91370994/361122fb-4cf9-4032-837f-7bd94250de68)

  You can see the fields such as Name, Identification No, Dtae of Expiry, Date of Birth etc.

4. Editting of Fields
   ![Screenshot (276)](https://github.com/Yashg5311/AssignmentOCRapp/assets/91370994/de605208-e621-4a32-8315-2a06bf19e58e)

   You can modify these fiels and edit them dynamically anmd everything will be stored in MongoDB.
    The Edition nad Deletion will also update in MongoDB and no new field will be created.


6. Implementing Search Filter
   ![Screenshot (277)](https://github.com/Yashg5311/AssignmentOCRapp/assets/91370994/2c9a08db-f763-477d-89ba-d12da37d6522)
  The search functionality works on basis of Name and Identification Number and results get displayed.


## Tech Stack Choice and Reasons

1. React for FrontEnd
   React is a JavaScript library maintained by Facebook that is widely used for building user interfaces, especially single-page applications where dynamic content updates are crucial. 
   One of the main advantages of React is its component-based architecture, which promotes modularity and reusability of code. This makes it easier to manage and scale complex 
   applications, such as those involving OCR processing.

   React's virtual DOM (Document Object Model) allows for efficient updates to the user interface by minimizing the number of direct manipulations to the actual DOM. This results in 
   better performance and a smoother user experience, which is essential for a responsive OCR application. Additionally, React's declarative approach to building UIs simplifies the 
   process of creating interactive and dynamic interfaces, enabling you to efficiently handle the real-time updates and responses that an OCR app requires.

   Moreover, React has a vast and active community, which means there is a wealth of resources, libraries, and third-party components available. This can significantly expedite 
    development, enhance code quality, and facilitate troubleshooting through community support.


2. NodeJs and ExpressJs for Backend
   Choosing Node.js and Express.js for the OCR application's backend offers a unified JavaScript stack, allowing seamless integration with the React frontend. Node.js's asynchronous, 
   non-blocking architecture ensures efficient handling of concurrent OCR processing and multiple requests, crucial for image uploads and API interactions. Express.js simplifies API 
   development with its minimalistic yet powerful framework, providing middleware support for features like error handling and authentication. The V8 engine's fast execution makes - 
  Node.js suitable for computationally intensive tasks, such as OCR processing, while the large ecosystem and active community enhance development speed and scalability, aligning well 
   with the project's requirements.

3. MongoDB for database
Selecting MongoDB as the database for your OCR application presents several advantages. MongoDB is a NoSQL, document-oriented database that stores data in flexible, JSON-like BSON format, allowing for easy and dynamic schema modifications. This flexibility is particularly valuable when dealing with diverse OCR results and evolving data structures. MongoDB's scalability and distributed architecture make it suitable for handling growing datasets, essential for storing OCR records over time. Additionally, its support for indexing and querying facilitates efficient retrieval of specific OCR records, aligning with the filtering requirements of your REST API endpoints. The JSON-like nature of MongoDB documents also ensures a seamless integration with the JSON structure of OCR results, simplifying data storage and retrieval. Overall, MongoDB provides a scalable, flexible, and schema-less solution, well-suited for the dynamic nature of OCR data in your application.


4. Tesseract for Image Extraction
 Opting for Tesseract for image extraction in your OCR application brings several benefits. Tesseract is an open-source OCR engine with robust capabilities in text recognition from images. It supports multiple languages, including Thai, making it suitable for your specific use case. Tesseract's accuracy in extracting text from various types of images, including those with complex layouts and fonts, is noteworthy. Its flexibility and extensibility allow for fine-tuning to improve accuracy, essential for accurately extracting information from Thai ID cards. Furthermore, Tesseract can be integrated into your application with ease, and its active open-source community ensures ongoing support and improvements. In summary, Tesseract is a reliable and powerful choice for image extraction, ensuring accurate and efficient processing of Thai ID card images in your OCR application.



 5.Image-js for Preprocessing
  Image-js is a JavaScript library designed for image processing tasks, providing a range of functions for manipulating and enhancing images. Its integration seamlessly with Node.js makes it convenient for server-side preprocessing, especially when dealing with image inputs before passing them to the OCR engine. Image-js offers capabilities such as resizing, cropping, filtering, and color adjustments, which are essential for optimizing image quality and improving OCR accuracy. Leveraging Image-js for preprocessing ensures that the input images are appropriately prepared, addressing potential challenges like variations in lighting, orientation, or noise. With its intuitive API and compatibility with Node.js, Image-js facilitates efficient image preprocessing, enhancing the overall performance and reliability of your OCR application.

## Difficulties and Problems

I faced problems in Deployment and Production...The search and Save Functionality works in Local Machine but it took lot of time in doing that on Render. Also Firefox refused to establish connection to Render. It took time to load as there were some web socket connections.

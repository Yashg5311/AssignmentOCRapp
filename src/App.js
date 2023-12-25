import React, { useCallback, useState, useEffect } from 'react';
import Tesseract from 'tesseract.js';
import Dropzone from 'react-dropzone';
import styled from 'styled-components';
import axios from 'axios';
import * as ImageJS from 'image-js';




const AppContainer = styled.div`
  max-width: 100%;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
  background: rgb(171, 221, 238);
`;

const Header = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 20px;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  margin-bottom: 30px;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const DropzoneWrapper = styled.div`
  width: 80%;
  margin-bottom: 20px;
  border: 2px dashed rgb(31, 41, 44);;
  border-radius: 5px;
  padding: 20px;
  cursor: pointer;
  transition: border 0.3s ease;

  &.active {
    border: 2px dashed #4caf50;
  }

  &.reject {
    border: 2px dashed #ff3d00;
  }

  p {
    margin: 0;
  }
`;

const ResultContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  ul {
    list-style: none; /* Remove bullets */
    padding: 0;
    margin: 0;

    li {
      margin-bottom: 10px; /* Adjust the margin as needed */
    }
`;

const ResultImage = styled.div`
  margin-bottom: 20px;

  img {
    max-width: 50%;
    height: auto;
    border-radius: 5px;
  }
`;

const ResultText = styled.div`
  width: 50%;
  white-space: pre-wrap;
  font-size: 1.2rem;

  h2 {
    margin-bottom: 10px;
  }

  ul {
    list-style: none; /* Remove bullets */
    padding: 0;
    margin: 0;

    li {
      margin-bottom: 5px;
    }
  }

  div {
    margin-bottom: 10px;
  }

  input {
    padding: 5px;
    font-size: 1rem;
  }

  /* Button styles */
  button {
    margin: 5px; /* Add some margin between buttons */
    padding: 10px;
    font-size: 1rem;
    cursor: pointer;
    color: white;
    border: none;
    border-radius: 5px;
    outline: none;
  }

  /* Blue button */
  button.blue {
    background-color: #2196F3; /* Blue color */
  }
`;

const ErrorText = styled.p`
  color: red;
`;


const SearchContainer = styled.div`
  margin: 20px 0;
`;

const SearchHeading = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 10px;
`;

const SearchInput = styled.input`
  padding: 8px;
  font-size: 1rem;
`;

const SearchButton = styled.button`
  margin: 5px;
  padding: 10px;
  font-size: 1rem;
  cursor: pointer;
  color: white;
  border: none;
  border-radius: 5px;
  outline: none;
  background-color: #9e9e9e; /* Grey color */
  opacity: ${(props) => (props.disabled ? '0.5' : '1')};
`;


const FiltersContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 20px;

  h2 {
    font-size: 1.8rem;
    margin-bottom: 10px;
  }

  label {
    margin-bottom: 5px;
  }

  input {
    padding: 8px;
    font-size: 1rem;
    margin-bottom: 10px;
  }

  /* Button styles */
  button {
    margin: 5px;
    padding: 10px;
    font-size: 1rem;
    cursor: pointer;
    color: white;
    border: none;
    border-radius: 5px;
    outline: none;
  }

  /* Blue button */
  button.blue {
    background-color: #2196F3; /* Blue color */
  }

  /* Red button */
  button.red {
    background-color: #FF0000; /* Red color */
  }
`;

function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [textResult, setTextResult] = useState("");
  const [error, setError] = useState(null);
  const [ocrHistory, setOcrHistory] = useState([]);
  const [filterName, setFilterName] = useState("");
  const [filterIdentificationNo, setFilterIdentificationNo] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [extractedFields, setExtractedFields] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [selectedRecordId, setSelectedRecordId] = useState(null);
  const [filtersActive, setFiltersActive] = useState(false);


  const preprocessImage = (imageDataUrl) => {
    return new Promise(async (resolve, reject) => {
      try {
        // Convert the image to ImageJS format
        const img = await ImageJS.Image.load(imageDataUrl);

        // Apply brightness and contrast adjustments
        const adjustedImg = img
          .brightness(0.2) // Adjust the brightness value as needed (positive for increase, negative for decrease)
          .contrast(1.2); // Adjust the contrast value as needed

        // Increase size
        const enlargedWidth = adjustedImg.width * 2;
        const enlargedHeight = adjustedImg.height * 2;
        adjustedImg.resize({ width: enlargedWidth, height: enlargedHeight });

        // Apply filters (remove noise)
        adjustedImg.filter({ blur: 2 }); // Adjust the blur value as needed

        // Fix DPI
        const dpi = 300; // Adjust DPI as needed
        const scaleFactor = dpi / 96; // Assuming the default DPI is 96
        adjustedImg.resize({ width: enlargedWidth * scaleFactor, height: enlargedHeight * scaleFactor });

        // Extract the processed image as a data URL
        const processedImageDataUrl = adjustedImg.toDataURL('image/png');
        resolve(processedImageDataUrl);
      } catch (error) {
        reject(error);
      }
    });
  };





  const handleImageDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
    setError(null);

    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setError('Image size must be less than 2MB.');
        return;
      }

      setSelectedImage(file);

      const reader = new FileReader();
      reader.onload = async () => {
        try {
          // Convert the image to ImageJS format
          const img = await ImageJS.Image.load(reader.result);

          // Apply preprocessing steps (example: resize, denoise, fix illumination, fix DPI)
          const preprocessedImg = img
            .resize({ width: 800 }); // Adjust width as needed // Use a denoising method
          // Add more preprocessing steps as needed

          // Use the preprocessed image with Tesseract
          const { data: { text } } = await Tesseract.recognize(preprocessedImg.toDataURL(), 'eng');

          console.log(text);
          const extractedData = parseOCRResults(text);
          setExtractedFields(extractedData);
          setTextResult(JSON.stringify(extractedData, null, 2));

          // Send data to the server and get the returned ID
          const response = await sendExtractedDataToServer(extractedData);

          localStorage.setItem('ocrRecordId', response.data.id);

          // Set the returned ID in the state
          setSelectedRecordId(response.data.id);
        } catch (error) {
          console.error('Error:', error);
          setError('Error processing image.');
        }
      };

      reader.readAsDataURL(file);
    }
  }, []);

  // Use useEffect to log the value of selectedRecordId after it's updated
  useEffect(() => {
    console.log(selectedRecordId);
  }, [selectedRecordId]);

  const sendExtractedDataToServer = async (data) => {
    try {
      const response = await axios.post('http://localhost:5000/api/ocr', data);
      console.log('Server response:', response.data);
      return response;
    } catch (error) {
      console.error('Error sending data to the server:', error);
      return null;
    }
  };

  const parseOCRResults = (ocrText) => {
    const Identification_Number = ocrText.match(/(\d{1,2}\s?\d{4,5}\s?\d{5}\s?\d{2}\s?\d)/);
    const name = ocrText.match(/Miss\s(\w+)/);
    const Last_name = ocrText.match(/Last name\s(\w+)/);
    const date_of_birth = ocrText.match(/Date of Birth\s(\d{2}\s\w+\.\s\d{4})/);
    const date_of_issue = ocrText.match(/Date of Issue\s(\d{2}\/\d{2}\/\d{4})/);
    const date_of_expiry = ocrText.match(/Date of Expiry\s(\d{4}-\d{2}-\d{2})/);

    return {
      Identification_Number: Identification_Number ? Identification_Number[1] : "",
      name: name ? name[1] : "",
      Last_name: Last_name ? Last_name[1] : "",
      date_of_birth: date_of_birth ? date_of_birth[1] : "",
      date_of_issue: date_of_issue ? date_of_issue[1] : "",
      date_of_expiry: date_of_expiry ? (date_of_expiry[1]) : "",
    };
  };

  const fetchOcrHistory = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/ocr', {
        params: { name: filterName, identificationNo: filterIdentificationNo },
      });
      setOcrHistory(response.data);
    } catch (error) {
      console.error('Error fetching OCR history:', error);
    }
  };

  const deleteOcrRecord = async () => {
    try {
      const id = localStorage.getItem('ocrRecordId');
      await axios.delete(`http://localhost:5000/api/ocr/${id}`);
      
      // Reset state variables
      setSelectedImage(null);
      setTextResult("");
      setExtractedFields({});
      setEditMode(false);
      setSelectedRecordId(null);
      
      // Fetch updated OCR history
      fetchOcrHistory();
    } catch (error) {
      console.error('Error deleting OCR record:', error);
    }
  };

  const handleFilterChange = () => {
    fetchOcrHistory();
    setFiltersActive(true);

  };

  const handleEdit = (recordId) => {
    setSelectedRecordId(recordId);
    setEditMode(true);
  };

  const handleRemoveFilters = () => {
    // Clear OCR history and reset filter values
    setOcrHistory([]);
    setFilterName("");
    setFilterIdentificationNo("");
    setFiltersActive(false);
  };

  const handleSave = async () => {
    try {
      const id = localStorage.getItem('ocrRecordId');
      if (id !== null) {
        const existingRecordResponse = await axios.get(`http://localhost:5000/api/ocr/${id}`);
        const existingRecord = existingRecordResponse.data;
  
        if (existingRecord) {
          await axios.put(`http://localhost:5000/api/ocr/${id}`, {
            Identification_Number: extractedFields.Identification_Number,
            name: extractedFields.name,
            Last_name: extractedFields.Last_name,
            date_of_birth: extractedFields.date_of_birth,
            date_of_issue: extractedFields.date_of_issue,
            date_of_expiry: extractedFields.date_of_expiry,
          });
        } else {
          console.error('Existing record not found for editing');
        }
  
        fetchOcrHistory();
        setEditMode(false);
        setSelectedRecordId(null);
      } else {
        console.warn('selectedRecordId is null. Save request skipped.');
      }
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };
  
  return (
    <AppContainer>
      <Header>Thai OCR ID App</Header>
      <Subtitle>Get Details from ID and Modify them!</Subtitle>

      <ContentContainer>
        <Dropzone onDrop={handleImageDrop} accept="image/*" maxFiles={1} maxSize={2 * 1024 * 1024}>
          {({ getRootProps, getInputProps, isDragActive, isDragReject }) => (
            <DropzoneWrapper
              {...getRootProps()}
              className={`dropzone ${isDragActive ? 'active' : ''} ${isDragReject ? 'reject' : ''}`}
            >
              <input {...getInputProps()} />
              <p>Drag & drop an image here, or click to select one.</p>
              {isDragReject && <ErrorText>File type not supported</ErrorText>}
              {error && <ErrorText>{error}</ErrorText>}
            </DropzoneWrapper>
          )}
        </Dropzone>

        {selectedImage && (
          <ResultImage>
            <img src={URL.createObjectURL(selectedImage)} alt="thumb" />
          </ResultImage>
        )}
        {textResult && (
          <ResultText>
            <h2>Extracted JSON Object</h2>
            <pre>{textResult}</pre>
            {/* Display extracted fields */}
            <div>
              <h2>Extracted Fields</h2>
              <ul>
                {Object.entries(extractedFields).map(([key, value]) => (
                  <li key={key}>
                    <strong>{key}:</strong> {value}
                  </li>
                ))}
              </ul>
            </div>
            {editMode ? (
              <div>
                {/* Edit mode UI */}
                {Object.entries(extractedFields).map(([key, value]) => (
                  <div key={key}>
                    <strong>{key}:</strong>
                    <input
                      type="text"
                      value={value}
                      onChange={(e) => setExtractedFields({ ...extractedFields, [key]: e.target.value })}
                    />
                  </div>
                ))}
                <button className="blue" onClick={handleSave}>
                  Save
                </button>
              </div>
            ) : (
              <div>
                {/* View mode UI */}
                <button className="blue" onClick={() => handleEdit(selectedRecordId)}>
                  Edit
                </button>
                <button className="blue" onClick={() => deleteOcrRecord()}>
                  Delete
                </button>
              </div>
            )}
          </ResultText>
        )}
      </ContentContainer>

      {/* Filters */}
      <FiltersContainer>
        <h2>Search Functionality</h2>
        <label>Filter by Name:</label>
        <input type="text" value={filterName} onChange={(e) => setFilterName(e.target.value)} />
        <label>Filter by Identification Number:</label>
        <input
          type="text"
          value={filterIdentificationNo}
          onChange={(e) => setFilterIdentificationNo(e.target.value)}
        />
        <button className="blue" onClick={handleFilterChange}>
          Apply Filters
        </button>
        <button className="red" onClick={handleRemoveFilters}>
    Remove Filters
  </button>
      </FiltersContainer>

      {/* Display OCR History */}
      {filtersActive && (
        <ResultContainer>
          <h2>OCR History</h2>
          <ul>
            {ocrHistory.map((item) => (
              <li key={item._id}>
                {/* Display relevant fields */}
                <span>Name: {item.name},</span>
                <span>Last Name: {item.Last_name},</span>
                <span>Identification Number: {item.Identification_Number}</span>
                {/* Add other fields as needed */}
              </li>
            ))}
          </ul>
        </ResultContainer>
      )}
    </AppContainer>
  );
}

export default App;
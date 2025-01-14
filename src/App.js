import React, { useEffect, useState } from 'react';
import API from './api';  // Import the Axios instance
import './App.css';



function App() {
  const [message, setMessage] = useState('');  // State to store message from backend
  const [name, setName] = useState('');  // State to store patient name
  const [dietChart, setDietChart] = useState('');  // State to store patient's diet chart
  const [patients, setPatients] = useState([]);  // State to store the list of patients

  // Fetch the message from the backend when the component loads
  useEffect(() => {
    API.get('/')
      .then((response) => setMessage(response.data))  // Set the response message
      .catch((error) => console.log('Error fetching data:', error));
  }, []);

  // Fetch the list of patients from the backend
  useEffect(() => {
    API.get('/patients')
      .then((response) => setPatients(response.data))  // Set the list of patients
      .catch((error) => console.log('Error fetching patients:', error));
  }, []);

  // Handle form submission to add a new patient
  const handleSubmit = (e) => {
    e.preventDefault();  // Prevent the form from refreshing the page
    const patientData = { name, dietChart };

    // Send POST request to add the patient
    API.post('/patients', patientData)
      .then((response) => {
        console.log('Patient added:', response.data);
        setPatients([...patients, response.data]);  // Update the patients list
        setName('');  // Clear the name input field
        setDietChart('');  // Clear the diet chart input field
      })
      .catch((error) => console.log('Error adding patient:', error));
  };

  return (
    <div>
      <h1>{message}</h1>  {/* Display the message from backend */}
      
      {/* Form to add a patient */}
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}  // Update name state
            required
          />
        </label>
        <br />
        <label>
          Diet Chart:
          <input
            type="text"
            value={dietChart}
            onChange={(e) => setDietChart(e.target.value)}  // Update diet chart state
            required
          />
        </label>
        <br />
        <button type="submit">Add Patient</button>
      </form>

      {/* Display the list of patients */}
      <h2>Patients List:</h2>
      <ul>
        {patients.map((patient, index) => (
          <li key={index}>
            <strong>Name:</strong> {patient.name}, <strong>Diet Chart:</strong> {patient.dietChart}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;



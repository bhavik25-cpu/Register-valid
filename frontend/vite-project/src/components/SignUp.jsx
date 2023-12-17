import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Toast } from 'primereact/toast';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { RadioButton } from 'primereact/radiobutton';
import { Calendar } from 'primereact/calendar';

import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
function Register() {
  const navigate = useNavigate();
  const toast = useRef(null);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    country: '',
    state: '',
    city: '',
    gender: '',
    dateOfBirth: '',
    age: ''
  });

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    country: '',
    state: '',
    city: '',
    gender: '',
    dateOfBirth: '',
    age: '',
  });

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get('https://www.universal-tutorial.com/api/countries', {
          headers: {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfZW1haWwiOiJiaGF2aWtkb3NoaTI1QGdtYWlsLmNvbSIsImFwaV90b2tlbiI6InZseE1NWHpmQkRvUTdJQ24yUS13OG1YeWhzTGhLVmpUdXVWZzk4U040bEZINlp4N19vWXhXRWFXREFiaTlrQTloRE0ifSwiZXhwIjoxNzAyOTA1MTk5fQ.ywXvwURP9xIwK64TmyCNubbPDidtlX9kH8jy2u0U63k", // Replace with your API key
            "Accept": "application/json",
          },
        });
        setCountries(response.data);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    fetchCountries();
  }, []);

  const fetchStates = async (countryName) => {
    try {
      const response = await axios.get(`https://www.universal-tutorial.com/api/states/${countryName}`, {
        headers: {
          "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfZW1haWwiOiJiaGF2aWtkb3NoaTI1QGdtYWlsLmNvbSIsImFwaV90b2tlbiI6InZseE1NWHpmQkRvUTdJQ24yUS13OG1YeWhzTGhLVmpUdXVWZzk4U040bEZINlp4N19vWXhXRWFXREFiaTlrQTloRE0ifSwiZXhwIjoxNzAyOTA1MTk5fQ.ywXvwURP9xIwK64TmyCNubbPDidtlX9kH8jy2u0U63k", // Replace with your API key
        },
      });
      setStates(response.data);
    } catch (error) {
      console.error('Error fetching states:', error);
    }
  };

  const fetchCities = async (stateName) => {
    try {
      const response = await axios.get(`https://www.universal-tutorial.com/api/cities/${stateName}`, {
        headers: {
          "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfZW1haWwiOiJiaGF2aWtkb3NoaTI1QGdtYWlsLmNvbSIsImFwaV90b2tlbiI6InZseE1NWHpmQkRvUTdJQ24yUS13OG1YeWhzTGhLVmpUdXVWZzk4U040bEZINlp4N19vWXhXRWFXREFiaTlrQTloRE0ifSwiZXhwIjoxNzAyOTA1MTk5fQ.ywXvwURP9xIwK64TmyCNubbPDidtlX9kH8jy2u0U63k", // Replace with your API key
        },
      });
      setCities(response.data);
    } catch (error) {
      console.error('Error fetching cities:', error);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedFormData = { ...formData, [name]: value };

    let error = '';

    switch (name) {
      case 'firstName':
      case 'lastName':
        error = /^[a-zA-Z]+$/.test(value) ? '' : 'Must contain only alphabets.';
        break;
      case 'email':
        error = isValidEmail(value) ? '' : 'Invalid email address.';
        break;
      case 'dateOfBirth':
        error = validateDateOfBirth(value);
        updatedFormData = { ...updatedFormData, dateOfBirth: value }; // Set the correct value for dateOfBirth
        // Calculate age based on date of birth
        const age = calculateAge(value);
        updatedFormData = { ...updatedFormData, age: age.toString() };
        break;
      // Add custom validation for other fields if needed
      default:
        break;
    }

    setFormData(updatedFormData);
    setErrors({ ...errors, [name]: error });

    if (name === 'country') {
      fetchStates(value);
      setCities([]);
    } else if (name === 'state') {
      fetchCities(value);
    }
  };


  const validateDateOfBirth = (date) => {
    // Validate that the user is older than 14 years and less than 99 years
    const currentDate = new Date();
    const inputDate = new Date(date);
    const age = currentDate.getFullYear() - inputDate.getFullYear();

    if (age < 14 || age >= 99) {
      return 'Must be older than 14 years and less than 99 years.';
    }

    return '';
  };

  const calculateAge = (dateOfBirth) => {
    const currentDate = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = currentDate.getFullYear() - birthDate.getFullYear();

    // Adjust age if the birthday hasn't occurred yet this year
    if (
      currentDate.getMonth() < birthDate.getMonth() ||
      (currentDate.getMonth() === birthDate.getMonth() && currentDate.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };

  const showToastMessage = (message, severity) => {
    toast.current.show({ severity, summary: message });
  };

  const sendRequest = async () => {
    try {
      const res = await axios.post('http://127.0.0.1:3000/api/signup', {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        country: formData.country,
        state: formData.state,
        city: formData.city,
        gender: formData.gender,
        dateOfBirth: formData.dateOfBirth,
        age: formData.age,
      });

      const data = res.data;
      return data;
    } catch (error) {
      showToastMessage('Registration failed. Email already exists.', 'error');
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const data = await sendRequest();
        showToastMessage('Registration successful', 'success');
        navigate('/user-profile', { state: data.message });
      } catch (error) {
        console.error('Registration failed:', error);
      }
    }
  };

  const validateForm = () => {
    let isValid = true;

    Object.keys(formData).forEach((name) => {
      let error = '';

      switch (name) {
        case 'firstName':
        case 'lastName':
          error = /^[a-zA-Z]+$/.test(formData[name]) ? '' : 'Must contain only alphabets.';
          break;
        case 'email':
          error = isValidEmail(formData[name]) ? '' : 'Invalid email address.';
          break;
        // Add custom validation for other fields if needed
        default:
          break;
      }

      setErrors({ ...errors, [name]: error });

      if (error) {
        isValid = false;
      }
    });

    if (!isValid) {
      showToastMessage('Please fix validation errors', 'error');
    }

    return isValid;
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    return emailRegex.test(email);
  };

  return (
    <div className="register">
      <h2>Register Page</h2>
      <form onSubmit={handleSubmit}>
        <div className="p-field">
          <label htmlFor="firstName">First Name:</label>
          <InputText
            id="firstName"
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
          {errors.firstName && <span className="error">{errors.firstName}</span>}
        </div>
        <div className="p-field">
          <label htmlFor="lastName">Last Name:</label>
          <InputText
            id="lastName"
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
          {errors.lastName && <span className="error">{errors.lastName}</span>}
        </div>
        <div className="p-field">
          <label htmlFor="email">Email:</label>
          <InputText
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>
        <div className="p-field">
          <label htmlFor="country">Country:</label>
          <Dropdown
            id="country"
            name="country"
            value={formData.country}
            options={countries.map((country) => ({ label: country.country_name, value: country.country_name }))}
            onChange={handleChange}
            placeholder="Select Country"
          />
          {errors.country && <span className="error">{errors.country}</span>}
        </div>
        <div className="p-field">
          <label htmlFor="state">State:</label>
          <Dropdown
            id="state"
            name="state"
            value={formData.state}
            options={states.map((state) => ({ label: state.state_name, value: state.state_name }))}
            onChange={handleChange}
            placeholder="Select State"
          />
          {errors.state && <span className="error">{errors.state}</span>}
        </div>
        <div className="p-field">
          <label htmlFor="city">City:</label>
          <Dropdown
            id="city"
            name="city"
            value={formData.city}
            options={cities.map((city) => ({ label: city.city_name, value: city.city_name }))}
            onChange={handleChange}
            placeholder="Select City"
          />
          {errors.city && <span className="error">{errors.city}</span>}
        </div>
        <div className="p-field">
          <label>Gender:</label>
          <div className="p-formgrid p-grid">
            <div className="p-field-radiobutton p-col-6">
              <RadioButton
                id="male"
                name="gender"
                value="Male"
                checked={formData.gender === 'Male'}
                onChange={handleChange}
              />
              <label htmlFor="male">Male</label>
            </div>
            <div className="p-field-radiobutton p-col-6">
              <RadioButton
                id="female"
                name="gender"
                value="Female"
                checked={formData.gender === 'Female'}
                onChange={handleChange}
              />
              <label htmlFor="female">Female</label>
            </div>
          </div>
          {errors.gender && <span className="error">{errors.gender}</span>}
        </div>
        <div className="p-field">
          <label htmlFor="dateOfBirth">Date of Birth:</label>
          <Calendar
            id="dateOfBirth"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={(e) => handleChange({ target: { name: 'dateOfBirth', value: e.value } })}
          />
          {errors.dateOfBirth && <span className="error">{errors.dateOfBirth}</span>}
        </div>
        <div className="p-field">
          <label htmlFor="age">Age:</label>
          <InputText
            id="age"
            type="text"
            name="age"
            value={formData.age}
            onChange={handleChange}
          />
          {errors.age && <span className="error">{errors.age}</span>}
        </div>
        <button type="submit">Register</button>
      </form>
      <Toast ref={toast} />
    </div>
  );
}

export default Register;

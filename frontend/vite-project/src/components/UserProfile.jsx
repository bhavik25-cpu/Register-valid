import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

function UserDashboard() {
  const location = useLocation();
  const [userData, setUserData] = useState(location.state || {});

  useEffect(() => {
    if (!userData || Object.keys(userData).length === 0) {
      const fetchUserData = async () => {
        try {
          const response = await axios.get('http://127.0.0.1:3000/api/' + userData._id);
          setUserData(response.data.user);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };

      fetchUserData();
    }
  }, [userData]);

  return (
    <div className="user-dashboard">
      <h2>User Information</h2>
      <table className="user-info">
        <tbody>
          <tr>
            <td><strong>First Name:</strong></td>
            <td>{userData.firstName}</td>
          </tr>
          <tr>
            <td><strong>Last Name:</strong></td>
            <td>{userData.lastName}</td>
          </tr>
          <tr>
            <td><strong>Email:</strong></td>
            <td>{userData.email}</td>
          </tr>
          <tr>
            <td><strong>Country:</strong></td>
            <td>{userData.country}</td>
          </tr>
          <tr>
            <td><strong>State:</strong></td>
            <td>{userData.state}</td>
          </tr>
          <tr>
            <td><strong>City:</strong></td>
            <td>{userData.city}</td>
          </tr>
          <tr>
            <td><strong>Gender:</strong></td>
            <td>{userData.gender}</td>
          </tr>
          <tr>
            <td><strong>Date of Birth:</strong></td>
            <td>{userData.dateOfBirth}</td>
          </tr>
          <tr>
            <td><strong>Age:</strong></td>
            <td>{userData.age}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default UserDashboard;

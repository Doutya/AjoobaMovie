import React from "react"
import './SignUp.css'
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase.config";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom"
import axios from 'axios';

export default function SignUp () {
    const navigate = useNavigate();
    const [formData, setFormData]  = React.useState(
      {
        Name : "",
        Gender : "", 
        Phone_Number : 0,
        selectedDate : null,
        Country : "",
        State : "",
      }
    )
    function addToDB() {
      // Create an object with the data you want to send
      const userData = {
        Name: formData.Name,
        Gender: formData.Gender,
        Phone_Number: formData.Phone_Number,
        selectedDate: formData.selectedDate,
        Country: formData.Country,
        State: formData.State,
      };
    
      // Make an HTTP POST request to your backend
      axios
        .post('/api/users/createUser', userData) // Replace '/createUser' with the actual route on your backend
        .then((response) => {
          // Handle a successful response here, e.g., show a success message and navigate
          console.log(response);
        })
        .catch((error) => {
          // Handle errors, e.g., show an error message
          console.error('Error:', error);
        });
    }
    
    function handleChange(event) {
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [event.target.name]: event.target.value
            }
        })
    }

    function handleDateChange (date) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        selectedDate: date
      }));
    };
    
    const usersCollectionRef = collection(db, "users")
    // const handleSubmit = async (event) => {
    //     event.preventDefault();
    //     await addDoc(usersCollectionRef, {formData})
    // }

    const create_user = async (event) => {
      event.preventDefault();
      await addDoc(usersCollectionRef, {formData})
      navigate('/successfulsignup')
      
    }

    return (
        <form  onSubmit = {create_user}>
        <div className = "display_signup">
        <div  className = "welcome_message">
          <div className = "welcome_heading">New User ?</div>
          <div className = "login_message">
            Create an account before proceeding
          </div>
        </div>
      
          <div className = "sign_up_container">
            <div className = "signupdeclare">
              Create an account
            </div>
            
            <div className = "signForm">
            <div>
              <input className = "input_fld" type = "text" placeholder = "Name" onChange={handleChange} name = "Name"/>
            </div>
            <div>
              <input className = "input_fld" type = "text" placeholder = "Gender" onChange={handleChange} name = "Gender"/>
            </div>
            <div>
            <input className = "input_fld" placeholder = "Phone Number" onChange={handleChange} name = "Phone_Number"/>
            </div>
            <div>
              <DatePicker
                placeholder = 'DOB'
                selected={formData.selectedDate}
                onChange={handleDateChange}
                dateFormat="dd-MM-yyyy"
                className="datepicker-input"
            />
            </div>
            <div>
            <input className = "input_fld" type = "text" placeholder = "Country" onChange={handleChange} name = "Country"/>
            </div>
            <div>
            <input className = "input_fld" type = "text" placeholder = "State" onChange={handleChange} name = "State"/>
            </div>
            <div>
            <button className = "create_Acc" style={{ color: 'white' }} onClick={addToDB}>Create Account</button>
            </div>
            </div>

        </div>

        </div>

    </form>
    
    )
}
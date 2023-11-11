import React from "react"
import './SignUp.css'
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebaseconfig";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate,useLocation } from "react-router-dom"
import axios from 'axios';
import { format } from 'date-fns';
import logoImage from '../images/ajooba-removebg-preview.png';

export default function SignUp () {
    const navigate = useNavigate();
    const {state} = useLocation();
    console.log(state)
    const [formData, setFormData]  = React.useState(
      {
        Token: "",
        Name : "",
        Gender : "", 
        Phone_Number : "",
        selectedDate : "",
        Country : "",
        State : "",
      }
    )
    function addToDB() {
      // Create an object with the data you want to send
      const date = formData.selectedDate
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based, so add 1
      const day = date.getDate().toString().padStart(2, '0');
      const formattedDate = `${year}-${month}-${day}`;
      // const formateddate = formData.selectedDate;
      const userData = {
        Token:state.token,
        Name: formData.Name,
        Gender: formData.Gender,
        Phone_Number: formData.Phone_Number,
        selectedDate: formattedDate,
        Country: formData.Country,
        State: formData.State,
      };
    
      // Make an HTTP POST request to your backend
      axios
        .post('http://localhost:3000/api/users/createUser', userData) // Replace '/createUser' with the actual route on your backend
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

    // function handleDateChange (date) {
    //   setFormData((prevFormData) => ({
    //     ...prevFormData,
    //     selectedDate: date
    //   }));
    // };
    function handleDateChange(date) {
      console.log(date)
      if (date) {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based, so add 1
        const day = date.getDate().toString().padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
  
        // const formattedDate = new Date(date).toLocaleDateString('en-US');
        console.log(formattedDate, "after")
    
        setFormData((prevFormData) => ({
          ...prevFormData,
          selectedDate: formattedDate,
        }));
        console.log(formData, "afterrrrrr")
      } else {
        // Handle invalid date values here
        console.error('Invalid date:', date);
      }
    }
    

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
        {/* <div  className = "welcome_message">
          <div className = "welcome_heading">New User ?</div>
          <div className = "login_message">
            Create an account before proceeding
          </div>
        </div> */}
         <div className="image-container">
        <img src={logoImage} alt="Ajooba Logo" className="logoImage" />
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
                onChange={(formattedDate)=>setFormData((prevFormData) => ({
                  ...prevFormData,
                  selectedDate: formattedDate,
                }))}
                dateFormat="yy-MM-dd"
                className="datepicker-input"
                showTimeSelect={false} 
            />
            </div>
            <div>
            <input className = "input_fld" type = "text" placeholder = "Country" onChange={handleChange} name = "Country"/>
            </div>
            <div>
            <input className = "input_fld" type = "text" placeholder = "State" onChange={handleChange} name = "State"/>
            </div>
            <div>
            <button className = "create_Acc"  onClick={addToDB}>Create Account</button>
            </div>
            </div>

        </div>

        </div>

    </form>
    
    )
}
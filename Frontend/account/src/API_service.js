import axios from 'axios'
const baseUrl = 'http://localhost:3001/api'; // this is base url of the backend API


//funtion for registring a new user
export const register = async (userData)  =>{
    try {const response = await axios.post( `${baseUrl}/user/register`, userData)
    return response.data}
    catch(error){
        throw error
    }    
};

// Funtion for user login

export const login = async (userData) =>
{
    try{
       const  response = await axios.post(`${baseUrl}/user/login`, userData)
       return response.data;
    }
    catch(error)
    {
        throw error;
    }
}



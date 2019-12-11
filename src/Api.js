import React from 'react';
import axios from'axios';

const url = 'https://project-bhilt.appspot.com/api';

const getUser = async (username, password) => {
    console.log('before get request')
    const {data} = await axios.get(`${url}/users`)

    

    const user = data.users.filter(userObj => userObj.username === username && userObj.password === password );

    

    return user;


}

const postUser = async (username, email, password, currentLocation) => {

    const {data} = await axios.get(`${url}/users`);

    const user = data.users.filter(userObj => userObj.username === username && userObj.password === password );
    
    const end_location = {
        lat: 0,
         long: 0
    };

    if(!user[0].username){
        await axios.post(`${url}/users`, {
            username: `${username}`,
            email: `${email}`,
            password: `${password}`,
            current_location: `${currentLocation}`,
            end_location:`${end_location}`
        } )

    }
    else{
        return 'Username already found';
    }
}

export default getUser; postUser;


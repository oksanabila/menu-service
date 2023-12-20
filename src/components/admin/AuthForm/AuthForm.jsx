import React, {useState} from 'react';

import { Box, Button, TextField } from "@mui/material";
import { styled } from '@mui/material/styles';
import css from "./AuthForm.module.css";
import {adminService} from "../../../services/adminService";
import {useCookies} from "react-cookie";
import {SetupApiWithToken} from "../../../services/apiAdminService";


const AuthForm = () => {
    const { adminService } = SetupApiWithToken();

    const [authData, setAuthDataData] = useState({
        name: '',
        password: '',
    });
    const [tokenData, setTokenData] = useState(null);
    const [cookies, setCookie, removeCookie] = useCookies(['cookie-name']);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAuthDataData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = () => {
        adminService.token(authData)
            .then(response => {
                const newToken = response.data;

                setCookie('authToken', newToken.access_token, { path: '/', maxAge: newToken.maxAge });

                setTokenData(newToken);

                console.log('Data sent successfully:', newToken);
            })
            .catch(error => console.error('Error sending company data:', error));
    };


    // const handleSubmit = () => {
    //
    //     adminService.token(authData)
    //         .then(response => {
    //             setTokenData(response.data)
    //             console.log('Data sent successfully:', response.data);
    //         })
    //         .catch(error => console.error('Error sending company data:', error));
    // };
    console.log(tokenData);

    return (
      <div className={'container'}>
          <Box
              component="form"
              noValidate
              autoComplete="off"
              className={css.formContainer}
          >
              <TextField
                  id="outlined-basic"
                  label="name"
                  variant="outlined"
                  margin="normal"
                  name="name"
                  required
                  onChange={handleChange}
              />
              <TextField
                  id="outlined-basic"
                  label="password"
                  variant="outlined"
                  margin="normal"
                  name="password"
                  required
                  onChange={handleChange}
              />
              <Button
                  variant="contained"
                  color="success"
                  onClick={handleSubmit}
              >
                  Authorize
              </Button>
          </Box>
      </div>
    );
};

export {
    AuthForm
};
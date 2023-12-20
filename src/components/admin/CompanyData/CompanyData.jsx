import React, { useEffect, useState } from 'react';

import { Box, Button, TextField } from "@mui/material";
import css from './CompanyData.module.css';
import {adminService, SetupApiWithToken} from "../../../services/apiAdminService";
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {useCookies} from "react-cookie";
import {imgLink} from '../../../constants/index'
const CompanyData = (effect, deps) => {
    const { adminService } = SetupApiWithToken();
    const [companyData, setCompanyData] = useState(null);
    // const [treeData, setTreeData] = useState(null);
    const [initialFormData, setInitialFormData] = useState({
        id: '',
        name: '',
        img: '',
        title: '',
        description: '',
        phone: '',
        instagram: '',
        faceBook: '',
        geoTag: '',
        address: '',
    });
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        img: '',
        title: '',
        description: '',
        phone: '',
        instagram: '',
        faceBook: '',
        geoTag: '',
        address: '',
    });


    useEffect(() => {
        adminService.getAll()
            .then(response => {
                console.log('Company Data:', response.data);
                setCompanyData(response.data);

                setFormData({
                    id: response.data.id || '',
                    name: response.data.name || '',
                    img: response.data.img || '',
                    title: response.data.title || '',
                    description: response.data.description || '',
                    phone: response.data.phone || '',
                    instagram: response.data.instagram || '',
                    faceBook: response.data.faceBook || '',
                    geoTag: response.data.geoTag || '',
                    address: response.data.address || '',
                });
            })
            .catch(error => console.error('Error fetching company data:', error));
    }, []);


    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };


    const handleSubmit = () => {
        adminService.postCompanyData(formData)
            .then(response => {
                console.log('Data sent successfully:', response.data);
            })
            .catch(error => console.error('Error sending company data:', formData));
    };
    const handleReset = () => {
        // setFormData({
        //     id: '',
        //     name: '',
        //     img: '',
        //     title: '',
        //     description: '',
        //     phone: '',
        //     instagram: '',
        //     faceBook: '',
        //     geoTag: '',
        //     address: '',
        // });
        setFormData(formData);

    };


    // const handleFileChange = (event) => {
    //     const file = event.target.files[0];
    //     const formData = new FormData();
    //
    //     if (file) {
    //         formData.append('file', file, file.name);
    //         adminService.uploadFile(formData)
    //             .then(response => {
    //                 console.log('Data sent successfully:', response.data);
    //                 setDishData({
    //                     mainImg: response.data.filename
    //                 })
    //                 console.log('dishData:', dishData);
    //
    //             })
    //             .catch(error => console.error('Error sending company data:', error));
    //     }
    // };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const newFormData = new FormData();

        if (file) {
            newFormData.append('file', file, file.name);
            adminService.uploadFile(newFormData)
                .then(response => {
                    console.log('Data sent successfully:', response.data);
                    setFormData(prevData => ({
                        ...prevData,
                        img: response.data.filename
                    }));
                })
                .catch(error => console.error('Error sending company data:', error));
        }
    };


    return (
        <div className={'container container_margin'}>

            <h2>{formData.name}</h2>
            {/*<h3>edit data</h3>*/}
            <Box
                component="form"
                noValidate
                autoComplete="off"
                className={css.formContainer}
            >
                <section className={css.formColumn}>
                    <TextField
                        id="outlined-basic"
                        label="Company name"
                        variant="outlined"
                        margin="normal"
                        name="name"
                        value={formData.name}
                        required
                        onDragLeave={handleChange}
                    />

                    <TextField
                        id="outlined-multiline-static"
                        label="Short description"
                        multiline
                        rows={4}
                        margin="normal"
                        name="title"
                        value={formData.title}
                        onDragLeave={handleChange}
                    />
                    <TextField
                        margin="normal"
                        id="outlined-multiline-static"
                        label="About"
                        multiline
                        rows={7}
                        name="description"
                        value={formData.description}
                        onDragLeave={handleChange}
                    />
                    <Button component="label" variant="outlined" color="success" startIcon={<CloudUploadIcon />}>
                        Upload new photo
                        <VisuallyHiddenInput type="file" onChange={handleFileChange} name="img"/>
                    </Button>
                    <p>current photo:</p>
                    <img src={`${imgLink}${formData.img}`} alt={formData.img} className={css.companyImg}/>


                </section>
                <section className={css.formColumn}>
                    <TextField
                        id="outlined-basic"
                        label="Phone"
                        variant="outlined"
                        margin="normal"
                        name="phone"
                        required
                        value={formData.phone}
                        onDragLeave={handleChange}
                    />
                    <TextField
                        id="outlined-basic"
                        label="Address"
                        variant="outlined"
                        margin="normal"
                        name="address"
                        required
                        value={formData.address}
                        onDragLeave={handleChange}
                    />
                    <TextField
                        id="outlined-basic"
                        label="Instagram link"
                        variant="outlined"
                        margin="normal"
                        name="instagram"
                        value={formData.instagram}
                        onDragLeave={handleChange}
                    />
                    <TextField
                        id="outlined-basic"
                        label="Facebook link"
                        variant="outlined"
                        margin="normal"
                        name="faceBook"
                        value={formData.faceBook}
                        onDragLeave={handleChange}
                    />
                    <TextField
                        id="outlined-basic"
                        label="On map"
                        variant="outlined"
                        margin="normal"
                        name="geoTag"
                        value={formData.geoTag}
                        onDragLeave={handleChange}
                    />

                </section>
                <section className={css.formColumn}>
                    <Button
                        variant="outlined"
                        color="error"
                        onClick={handleReset}
                    >
                        Reset the form
                    </Button>
                </section>
                <section className={css.formColumn}>
                    <Button
                        variant="contained"
                        color="success"
                        onClick={handleSubmit}
                    >
                        Send data
                    </Button>
                </section>
            </Box>
        </div>
    );
};

export { CompanyData };

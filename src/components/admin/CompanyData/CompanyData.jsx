import React, { useEffect, useState } from 'react';

import { Box, Button, TextField } from "@mui/material";
import css from './CompanyData.module.css';
import {SetupApiWithToken} from "../../../services/apiAdminService";
import {LoadPhotoInput} from "../LoadPhotoInput/LoadPhotoInput";


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
                // console.log('Company Data:', response.data);
                console.log(response.data);

                setCompanyData(response.data);
                const initialData = {
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
                    link: response.data.link || '',
                };

                setInitialFormData(initialData);
                setFormData(initialData);
            })
            .catch(error => console.error('Error fetching company data:', error));
    }, []);

    console.log(companyData);

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
        setFormData(initialFormData);
    };

    const handleUploadSuccess = (filename) => {
        setFormData(prevData => ({
            ...prevData,
            img: filename
        }));
    };
    return (
        <div className={'container container_margin'}>
            <Box
                component="form"
                noValidate
                autoComplete="off"
                className={css.formContainer}
            >


                <section className={css.formColumn}>
                    <h2>{formData.name}</h2>
                    <TextField
                        id="outlined-basic"
                        label="Company name"
                        variant="outlined"
                        margin="normal"
                        name="name"
                        value={formData.name}
                        required
                        onChange={handleChange}
                    />
                    {/*<h4>{`http://menu-service.me/${formData.link}`}</h4>*/}
                </section>
                <section className={`${css.formColumn} ${css.qrWrap}`}>
                    {/*<div>*/}
                        <img className={css.qrImg} src={`https://barcode.tec-it.com/barcode.ashx?data=http://menu-service.me/${formData.link}&code=MobileQRCode&translate-esc=on&imagetype=Svg&eclevel=L`}/>
                    
                    {/*TODO change to https after release*/}
                    <div><a href={`http://menu-service.me/${formData.link}`} className={css.imgCapture}>{`menu-service.me/${formData.link}`}</a></div>
                        {/*<p>You can print this QR-code and use it in your restaurant to access the menu</p>*/}

                    {/*</div>*/}
                </section>
                <section className={css.formColumn}>

                    <TextField
                        id="outlined-multiline-static"
                        label="Short description"
                        multiline
                        rows={2}
                        margin="normal"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="normal"
                        id="outlined-multiline-static"
                        label="About"
                        multiline
                        rows={4}
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                    />
                    <LoadPhotoInput
                        onUploadSuccess={handleUploadSuccess}
                        label="Upload new photo"
                        currentImageUrl={formData.img}
                    />
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
                        onChange={handleChange}
                    />
                    <TextField
                        id="outlined-basic"
                        label="Address"
                        variant="outlined"
                        margin="normal"
                        name="address"
                        required
                        value={formData.address}
                        onChange={handleChange}
                    />
                    <TextField
                        id="outlined-basic"
                        label="Instagram link"
                        variant="outlined"
                        margin="normal"
                        name="instagram"
                        value={formData.instagram}
                        onChange={handleChange}
                    />
                    <TextField
                        id="outlined-basic"
                        label="Facebook link"
                        variant="outlined"
                        margin="normal"
                        name="faceBook"
                        value={formData.faceBook}
                        onChange={handleChange}
                    />
                    <TextField
                        id="outlined-basic"
                        label="On map"
                        variant="outlined"
                        margin="normal"
                        name="geoTag"
                        value={formData.geoTag}
                        onChange={handleChange}
                    />
                    </section>


                <section className={css.formColumn}>
                    <Button
                        variant="outlined"
                        color="error"
                        onClick={handleReset}
                    >
                        Cancel
                    </Button>
                </section>
                <section className={css.formColumn}>
                    <Button
                        variant="contained"
                        color="success"
                        onClick={handleSubmit}
                    >
                        Save
                    </Button>
                </section>

            </Box>
            {/*<div className={css.formContainer}>*/}

            {/*    <section className={css.formColumn}>*/}
            {/*        <h3>QR-code information</h3>*/}
            {/*        <h4>Your restaurant link:<br/>{`http://menu-service.me/${formData.link}`}</h4>*/}
            {/*        <p>You can print this QR-code and use it in your restaurant to access the menu</p>*/}
            {/*    </section>*/}
            {/*    <section className={css.formColumn}>*/}
            {/*       <div>*/}
            {/*           <div className={css.formItemWrap}>*/}
            {/*               <img className={css.qrImg} src={`https://barcode.tec-it.com/barcode.ashx?data=http://menu-service.me/${formData.link}&code=MobileQRCode&translate-esc=on&imagetype=Svg&eclevel=L`}/>*/}
            {/*           </div>*/}
            {/*       </div>*/}
            {/*    </section>*/}
            {/*</div>*/}
        </div>
    );
};

export { CompanyData };

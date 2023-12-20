import React, {useEffect, useState} from 'react';

import {Box, Button, TextField} from "@mui/material";
import css from "../CompanyData/CompanyData.module.css";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {adminService} from "../../../services/adminService";
import {styled} from "@mui/material/styles";
import {SetupApiWithToken} from "../../../services/apiAdminService";
import {useParams} from "react-router-dom";

const DishForm = () => {
    const { subsectionId, id } = useParams();
    const { adminService } = SetupApiWithToken();
    const [dishData, setDishData] = useState({
        id: 0,
        name: '',
        mainImg: '',
        // "sliderImgs": [],
        description: '',
        price: 0,
        weight: 0,
        // "ingredients": [],
        // "specialMarks": [],
        // isSpicy: 0,
        parentId: 0
    });
    const [imgData, setImgData] = useState(null);


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
        setDishData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = () => {
        adminService.createModifyDish(dishData)
            .then(response => {
                console.log('Data sent successfully:', response.data);
                console.log(dishData);

            })
            .catch(error => console.error('Error sending company data:', error));
    };
    console.log(dishData);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const formData = new FormData();

        if (file) {
            formData.append('file', file, file.name);
            adminService.uploadFile(formData)
                .then(response => {
                    console.log('Data sent successfully:', response.data);
                    setDishData({
                        mainImg: response.data.filename
                    })
                    console.log('dishData:', dishData);

                })
                .catch(error => console.error('Error sending company data:', error));
        }
    };


    return (
        <div className={'container container_margin'}>
            <h2>Edit data</h2>
            <Box
                component="form"
                noValidate
                autoComplete="off"
                className={css.formContainer}
            >
                <section className={css.formColumn}>
                    <TextField
                        id="outlined-basic"
                        label="Dish name"
                        variant="outlined"
                        margin="normal"
                        name="name"
                        // value={formData.companyName}
                        onChange={handleChange}
                    />

                    <TextField
                        margin="normal"
                        id="outlined-multiline-static"
                        label="Description"
                        multiline
                        rows={4}
                        margin="normal"
                        name="description"
                        // value={formData.shortDescription}
                        onChange={handleChange}
                    />

                    <TextField
                        id="outlined-basic"
                        label="Dish weight, g"
                        variant="outlined"
                        margin="normal"
                        name="weight"
                        type="number"
                        // value={formData.companyName}
                        onChange={handleChange}
                    />

                    <TextField
                        id="outlined-basic"
                        label="Price, €"
                        variant="outlined"
                        margin="normal"
                        name="price"
                        type="number"
                        // value={formData.companyName}
                        onChange={handleChange}
                    />



                    <Button component="label" variant="outlined" color="success" startIcon={<CloudUploadIcon />}>
                        Upload dish photo
                        <VisuallyHiddenInput type="file" onChange={handleFileChange} name="mainImg"/>
                    </Button>

                    {/*<TextField*/}
                    {/*    id="outlined-basic"*/}
                    {/*    label="Media"*/}
                    {/*    variant="outlined"*/}
                    {/*    margin="normal"*/}
                    {/*    name="socialMedia"*/}
                    {/*    // value={formData.socialMedia}*/}
                    {/*    // onChange={handleChange}*/}
                    {/*/>*/}
                    <Button
                        variant="contained"
                        color="success"
                        // onClick={handleSubmit}
                    >
fgs                    </Button>
                </section>
                <section className={css.formColumn}>
                    {/*<TextField*/}
                    {/*    id="outlined-basic"*/}
                    {/*    label="Phone"*/}
                    {/*    variant="outlined"*/}
                    {/*    margin="normal"*/}
                    {/*    name="contactPhone"*/}
                    {/*    // value={formData.contactPhone}*/}
                    {/*    // onChange={handleChange}*/}
                    {/*/>*/}
                    {/*<TextField*/}
                    {/*    id="outlined-basic"*/}
                    {/*    label="Address"*/}
                    {/*    variant="outlined"*/}
                    {/*    margin="normal"*/}
                    {/*    name="contactAddress"*/}
                    {/*    // value={formData.contactAddress}*/}
                    {/*    onChange={handleChange}*/}
                    {/*/>*/}
                    {/*<TextField*/}
                    {/*    id="outlined-basic"*/}
                    {/*    label="On map"*/}
                    {/*    variant="outlined"*/}
                    {/*    margin="normal"*/}
                    {/*    name="geoTag"*/}
                    {/*    // value={formData.geoTag}*/}
                    {/*    onChange={handleChange}*/}
                    {/*/>*/}

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

export default DishForm;


// useEffect(() => {
//     if (id) {
//         // Если есть параметр id в URL, загрузите данные из API для блюда с этим id
//         adminService.getDishById(id)
//             .then(response => {
//                 const dish = response.data; // Предположим, что API возвращает объект с данными блюда
//                 setDishData({
//                     companyId: dish.companyId,
//                     id: dish.id,
//                     name: dish.name,
//                     mainImg: dish.mainImg,
//                     description: dish.description,
//                     price: dish.price,
//                     weight: dish.weight,
//                     parentId: dish.parentId
//                 });
//             })
//             .catch(error => console.error('Error fetching dish data:', error));
//     }
// }, [id]); // Зависимость от id, чтобы обновить данные при изменении id в URL


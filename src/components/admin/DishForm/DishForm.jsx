import React, {useEffect, useState} from 'react';

import {Box, Button, TextField} from "@mui/material";
import css from "../CompanyData/CompanyData.module.css";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {styled} from "@mui/material/styles";
import {SetupApiWithToken} from "../../../services/apiAdminService";
import {useNavigate, useParams} from "react-router-dom";
import {fetchTreeData} from "../../../redux/slices/sectionsSlice";
import {useDispatch, useSelector} from "react-redux";

const DishForm = () => {
    const { dishId} = useParams();
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
    console.log(`dish id = ${dishId}`)
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const treeData = useSelector(state => state.sections.treeData);
    const isLoading = useSelector(state => state.sections.isLoading);

    // useEffect(() => {
    //     dispatch(fetchTreeData());
    // }, [dispatch]);

    useEffect(() => {
        if (dishId) {
            adminService.getDishById(dishId)
                .then(response => {
                    const dish = response.data;
                    setDishData({
                        companyId: dish.companyId,
                        id: dish.id,
                        name: dish.name,
                        mainImg: dish.mainImg,
                        description: dish.description,
                        price: dish.price,
                        weight: dish.weight,
                        parentId: dish.parentId
                    });
                    console.log(dish);
                })
                .catch(error => console.error('Error fetching dish data:', error));
        }
    }, [dishId]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!dishData) {
        return <div>No data available</div>;
    }
    console.log(dishData);
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

    const handleEGoBack = () => {
        navigate(`/admin/menu-tab`);
    };

    return (
        <div className={'container container_margin'}>
            <Button
                variant="outlined"
                color="success"
                onClick={() => handleEGoBack()}
            >Go back</Button>
            <h2>Edit dish</h2>
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
                    <Button
                        variant="contained"
                        color="success"
                        // onClick={handleSubmit}
                    >
fgs                    </Button>
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

export {DishForm};




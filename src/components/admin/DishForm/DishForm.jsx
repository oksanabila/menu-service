import React, { useEffect, useState } from 'react';

import { useSelector } from "react-redux";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {FormControl} from "@mui/base";
import {Select, MenuItem } from "@mui/material";
import {Box, Button, InputLabel, TextField} from "@mui/material";
import {SetupApiWithToken} from "../../../services/apiAdminService";
import {LoadPhotoInput} from "../LoadPhotoInput/LoadPhotoInput";
import {useUpdate} from "../../../contexts/AdminUpdateProvider";
import css from "../CompanyData/CompanyData.module.css";


const DishForm = () => {
    const location = useLocation();
    const { triggerUpdate } = useUpdate();

    const { dishId} = useParams();
    const { adminService } = SetupApiWithToken();
    const [dishData, setDishData] = useState({
        id: 0,
        name: '',
        mainImg: '',
        description: '',
        price: 0,
        weight: 0,
        // "ingredients": [],
        // "specialMarks": [],
        // isSpicy: 0,
        parentId: 0
    });
    const [initialDishData, setInitialDishData] = useState({
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
    // const [imgData, setImgData] = useState(null);
    console.log(`dish id = ${dishId}`)
    const navigate = useNavigate();
    const [treeData, setTreeData] = useState(null);


    const isLoading = useSelector(state => state.sections.isLoading);

    const getParentIdFromUrl = () => {
        const params = new URLSearchParams(location.search);
        return params.get('parentId');
    };

    useEffect(() => {
        if (dishId && dishId !== 'new') {
            adminService.getDishById(dishId)
                .then(response => {
                    setDishData(response.data);
                })
                .catch(error => console.error('Error fetching dish data:', error));
        } else {
            setDishData(prev => ({
                ...prev,
                parentId: getParentIdFromUrl() || 0
            }));
        }
    }, [dishId, location.search]);

    useEffect(() => {
        adminService.getDishTree()
            .then(response => {
                setTreeData(response.data.dataTree);
            })
            .catch(error => console.error('Error fetching company data:', error));
    }, []);


    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!dishData) {
        return <div>No data available</div>;
    }

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

    const handleUploadSuccess = (filename) => {
        setDishData(prevData => ({
            ...prevData,
            mainImg: filename
        }));
    };

    const handleReset = () => {
        setDishData(initialDishData);
    };

    const handleGoBack = () => {
        triggerUpdate();
        navigate(`/admin/menu-tab`);
    };

    // const findParentSection = (sections, parentId) => {
    //     if (!Array.isArray(sections)) {
    //         return null;
    //     }
    //
    //     for (const section of sections) {
    //         if (section.id === parentId) return section;
    //         if (section.children) {
    //             const found = section.children.find(child => child.id === parentId);
    //             if (found) return section;
    //         }
    //     }
    //     return null;
    // };
    const sectionOptions = treeData ? treeData.flatMap(section => [
        { value: section.id, label: section.title, isClickable: false},
        ...section.children.map(child => ({
            value: child.id,
            label: `${child.title}`,
            isClickable: true,
        }))
    ]) : [];


    return (
        <div className={'container container_margin'}>
          <div className={'flexWrap'}>
              <h2>Edit dish</h2>

              <Button
                  variant="outlined"
                  color="error"
                  onClick={() => handleGoBack()}
              >Go back</Button>
          </div>
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
                        value={dishData.name}
                        onChange={handleChange}
                    />

                    <TextField
                        id="outlined-multiline-static"
                        label="Description"
                        multiline
                        rows={4}
                        margin="normal"
                        name="description"
                        value={dishData.description}
                        onChange={handleChange}
                    />

                    <TextField
                        id="outlined-basic"
                        label="Dish weight, g"
                        variant="outlined"
                        margin="normal"
                        name="weight"
                        type="number"
                        value={dishData.weight}
                        onChange={handleChange}
                    />

                    <TextField
                        id="outlined-basic"
                        label="Price, €"
                        variant="outlined"
                        margin="normal"
                        name="price"
                        type="number"
                        value={dishData.price}
                        onChange={handleChange}
                    />



                </section>
                <section className={`${css.formColumn} ${css.margin}`}>
                    <FormControl margin="normal" fullwidth="true" >
                        <InputLabel id="section-select-label">Section</InputLabel>
                        <Select
                            labelId="section-select-label"
                            id="section-select"
                            value={dishData.parentId}
                            onChange={(e) => setDishData({...dishData, parentId: e.target.value})}
                            label="Section"
                        >
                            {sectionOptions.map(option => (
                                <MenuItem
                                    key={option.value}
                                    value={option.value}
                                    disabled={!option.isClickable}
                                >
                                    {option.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <LoadPhotoInput
                        onUploadSuccess={handleUploadSuccess}
                        label="Upload new photo"
                        currentImageUrl={dishData.mainImg}
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
                        Send data
                    </Button>
                </section>
            </Box>
        </div>
    );
};

export {DishForm};

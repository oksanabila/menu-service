import React, {useEffect, useState} from 'react';

import {Box, Button, InputLabel, TextField} from "@mui/material";
import css from "../CompanyData/CompanyData.module.css";
import {SetupApiWithToken} from "../../../services/apiAdminService";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {LoadPhotoInput} from "../LoadPhotoInput/LoadPhotoInput";
import {fetchTreeData} from "../../../redux";
import {FormControl, MenuItem} from "@mui/base";
import Select from "react-select";

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

    // const dispatch = useDispatch();
    // const treeData = useSelector(state => state.sections.treeData);
    const isLoading = useSelector(state => state.sections.isLoading);

    // useEffect(() => {
    //     dispatch(fetchTreeData());
    // }, [dispatch]);

    // useEffect(() => {
    //     if (treeData && !treeData.length) {
    //         dispatch(fetchTreeData());
    //     }
    //     // Загрузка данных о блюде
    // }, [dispatch, dishId]);

    useEffect(() => {
        adminService.getDishTree()
            .then(response => {
                setTreeData(response.data.dataTree);
            })
            .catch(error => console.error('Error fetching company data:', error));
    }, []);

    useEffect(() => {
        if (treeData && treeData.length > 0) {
            const parentSection = findParentSection(treeData, dishData.parentId);
            if (parentSection) {
                console.log('Найденная родительская секция:', parentSection.title);
            }
        }
    }, [treeData, dishData.parentId]);

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
                    setInitialDishData(dish);
                    console.log(dish);
                })
                .catch(error => console.error('Error fetching dish data:', error));
        }
    }, [dishId]);
    console.log(treeData);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!dishData) {
        return <div>No data available</div>;
    }
    console.log(dishData);

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

    const handleEGoBack = () => {
        navigate(`/admin/menu-tab`);
    };

    const findParentSection = (sections, parentId) => {
        if (!Array.isArray(sections)) {
            return null;
        }

        for (const section of sections) {
            if (section.id === parentId) return section;
            if (section.children) {
                const found = section.children.find(child => child.id === parentId);
                if (found) return section;
            }
        }
        return null;
    };

    const sectionOptions = treeData ? treeData.flatMap(section => [
        { value: section.id, label: section.title },
        ...section.children.map(child => ({ value: child.id, label: `-- ${child.title}` }))
    ]) : [];
    return (
        <div className={'container container_margin'}>
          <div className={'flexWrap'}>
              <h2>Edit dish</h2>

              <Button
                  variant="outlined"
                  color="error"
                  onClick={() => handleEGoBack()}
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
                <section className={css.formColumn}>
                    <FormControl margin="normal">
                        <InputLabel id="section-select-label">Section</InputLabel>
                        <Select
                            labelId="section-select-label"
                            id="section-select"
                            value={dishData.parentId}
                            label="Section"
                            onChange={(e) => setDishData({...dishData, parentId: e.target.value})}
                        >
                            {sectionOptions.map(option => (
                                <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
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




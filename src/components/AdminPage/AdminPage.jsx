// import React, {useEffect, useState} from 'react';
//
// import {Box, Button, TextField} from "@mui/material";
// import css from './AdminPage.module.css';
// import {adminService} from "../../services/adminService";
// // post  - /cmcompany
//
//
// const AdminPage = () => {
//     const [companyData, setCompanyData] = useState(null);
//
//     useEffect(() => {
//         adminService.getAll()
//             .then(response => {
//                 console.log('Company Data:', response.data);
//
//                 setCompanyData(response.data);
//             })
//             .catch(error => console.error('Error fetching company data:', error));
//     }, []);
//
//     return (
//         <div className={'container'}>
//            <h1> AdminPage</h1>
//
//
//
//                 <h3>Форма создания меню</h3>
//                 <Box
//                     component="form"
//                     // sx={{
//                     //     '& > :not(style)': { m: 1, width: '25ch' },
//                     // }}
//                     noValidate
//                     autoComplete="off"
//                     className={css.formContainer}
//                 >
//                     <section className={css.formColumn}>
//                         <TextField id="outlined-basic" label="Название компании" variant="outlined" margin="normal"/>
//                         <TextField
//                             margin="normal"
//                             id="outlined-multiline-static"
//                             label="Краткое описание"
//                             multiline
//                             rows={4}
//                             // defaultValue="Default Value"
//                             margin="normal"
//                         />
//                         <TextField
//                             id="outlined-multiline-static"
//                             label="Полное описание"
//                             multiline
//                             rows={8}
//                             // defaultValue="Default Value"
//                             margin="normal"
//                         />
//                         <Button
//                             variant="contained"
//                             component="label"
//                             margin="normal"
//                         >
//                             Загрузить главное фото
//                             <input
//                                 type="file"
//                                 hidden
//                             />
//                         </Button>
//                         <TextField
//                             fullWidth={true}
//                             id="outlined-multiline-static"
//                             label="Соцсети"
//                             multiline
//                             rows={4}
//                             // defaultValue="Default Value"
//                             margin="normal"
//                         />
//                     </section>
//                     <section className={css.formColumn}>
//                         <TextField id="outlined-basic" label="Контактный телефон" variant="outlined" margin="normal"/>
//
//                     </section>
//
//                 </Box>
//
//
//         </div>
//     );
// };
//
// export {AdminPage};
//
// //



import React, { useEffect, useState } from 'react';
import { Box, Button, TextField } from "@mui/material";
import css from './AdminPage.module.css';
import { adminService } from "../../services/adminService";
import SortableTree from '@nosferatu500/react-sortable-tree';
import '@nosferatu500/react-sortable-tree/style.css';
import {FormMapComponent} from "../FormMapComponent/FormMapComponent";
import {MapContainer, Marker, Popup, TileLayer, useMapEvents} from "react-leaflet"; // This only needs to be imported once in your app

const AdminPage = () => {
    const [companyData, setCompanyData] = useState(null);
    const [formData, setFormData] = useState({
        companyId: '',
        companyName: '',
        companyImg: '',
        shortDescription: '',
        fullDescription: '',
        contactPhone: '',
        socialInst: '',
        socialFb: '',
        geoTag: '',
        contactAddress: '',
    });
    const [treeData, setTreeData] = useState([
        { title: 'Chicken', children: [{ title: 'Egg' }] },
        { title: 'Fish', children: [{ title: 'fingerline' }] },
    ]);
    const [position, setPosition] = useState([0, 0]);

    useEffect(() => {
        adminService.getAll()
            .then(response => {
                console.log('Company Data:', response.data);
                setCompanyData(response.data);

                setFormData({
                    companyId: response.data.id || '',
                    companyName: response.data.name || '',
                    companyImg: response.data.img || '',
                    shortDescription: response.data.title || '',
                    fullDescription: response.data.description || '',
                    contactPhone: response.data.phone || '',
                    socialInst: response.data.instagram || '',
                    socialFb: response.data.faceBook || '',
                    geoTag: response.data.geoTag || '',
                    contactAddress: response.data.address || '',
                });
            })
            .catch(error => console.error('Error fetching company data:', error));
    }, []);

    const MapEvents = () => {
        const map = useMapEvents({
            click: (e) => {
                const { lat, lng } = e.latlng;
                setPosition([lat, lng]);
                setFormData(prevData => ({
                    ...prevData,
                    geoTag: `${lat}, ${lng}`
                }));
            },
        });

        return null;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     setFormData(prevData => ({
    //         ...prevData,
    //         [name]: value
    //     }));
    // };

    // const handleSubmit = () => {
    //     adminService.postCompanyData('http://menu-service.me:8000/cmcompany', formData)
    //         .then(response => {
    //             console.log('Data sent successfully:', response.data);
    //         })
    //         .catch(error => console.error('Error sending company data:', error));
    // };
    const handleSubmit = () => {
        console.log('Sending data:', formData); // Додаємо цей рядок
        adminService.postCompanyData(formData)
            .then(response => {
                console.log('Data sent successfully:', response.data);
                // Додайте додаткову логіку, якщо потрібно
            })
            .catch(error => console.error('Error sending company data:', error));
    };

    return (
        <div className={'container'}>

            <div style={{ height: 400 }}>
                <SortableTree
                    treeData={treeData}
                    onChange={(newTreeData) => setTreeData(newTreeData)}
                />
            </div>
            <h1>AdminPage</h1>
            <h3>Форма создания меню</h3>
            <Box
                component="form"
                noValidate
                autoComplete="off"
                className={css.formContainer}
            >
                <section className={css.formColumn}>
                    <TextField
                        id="outlined-basic"
                        label="Название компании"
                        variant="outlined"
                        margin="normal"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                    />

                    <TextField
                        margin="normal"
                        id="outlined-multiline-static"
                        label="Краткое описание"
                        multiline
                        rows={4}
                        margin="normal"
                        name="shortDescription"
                        value={formData.shortDescription}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="normal"
                        id="outlined-multiline-static"
                        label="Полное описание"
                        multiline
                        rows={7}
                        name="fullDescription"
                        value={formData.fullDescription}
                        onChange={handleChange}
                    />
                    <TextField
                        type="file"
                        id="outlined-file"
                        label="Главное фото"
                        variant="outlined"
                        margin="normal"
                        name="companyImg"
                        onChange={handleChange}
                        // InputLabelProps={{
                        //     shrink: true,
                        // }}
                    />

                    <TextField
                        id="outlined-basic"
                        label="Соцсети"
                        variant="outlined"
                        margin="normal"
                        name="socialMedia"
                        value={formData.socialMedia}
                        onChange={handleChange}
                    />
                </section>
                <section className={css.formColumn}>
                    <TextField
                        id="outlined-basic"
                        label="Телефон"
                        variant="outlined"
                        margin="normal"
                        name="contactPhone"
                        value={formData.contactPhone}
                        onChange={handleChange}
                    />
                    <TextField
                        id="outlined-basic"
                        label="Адрес"
                        variant="outlined"
                        margin="normal"
                        name="contactAddress"
                        value={formData.contactAddress}
                        onChange={handleChange}
                    />
                    <TextField
                        id="outlined-basic"
                        label="На карте"
                        variant="outlined"
                        margin="normal"
                        name="geoTag"
                        value={formData.geoTag}
                        onChange={handleChange}
                    />
                    {/* MapComponent */}
                    {/*<div style={{ height: '300px', width: '100%' }}>*/}
                    {/*    <MapContainer center={position} zoom={13} style={{ height: '100%', width: '100%' }}>*/}
                    {/*        <MapEvents />*/}
                    {/*        <TileLayer*/}
                    {/*            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"*/}
                    {/*            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'*/}
                    {/*        />*/}
                    {/*        <Marker position={position}>*/}
                    {/*            <Popup>Your selected location</Popup>*/}
                    {/*        </Marker>*/}
                    {/*    </MapContainer>*/}
                    {/*</div>*/}

                    <Button
                        variant="contained"
                        onClick={handleSubmit}
                    >
                        Відправити дані
                    </Button>
                </section>
            </Box>
        </div>
    );
};

export { AdminPage };

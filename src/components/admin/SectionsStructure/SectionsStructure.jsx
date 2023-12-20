import React, {useEffect, useState} from 'react';

import css from './SectionsStructure.module.css'
import Checkbox from '@mui/material/Checkbox';
import {
    AppBar, Box,
    Button,
    Dialog, DialogContent,
    GlobalStyles,
    IconButton,
    List,
    ListItem,
    ListItemText, Slide, TextField,
    Toolbar,
    Typography
} from "@mui/material";
import {SetupApiWithToken} from "../../../services/apiAdminService";
import svgClose from "../../../assets/img/close-icon.svg"
import {useNavigate} from "react-router-dom";
import {EditDialog} from "../../Dialog/EditDialog/EditDialog";
import {ConfirmationDialog} from "../../Dialog/ConfirmationDialog/ConfirmationDialog";


const SectionsStructure = () => {
    const { adminService } = SetupApiWithToken();
    const [treeData, setTreeData] = useState(null);
    const [showSubsectionForm, setShowSubsectionForm] = useState(false);
    const [formData, setFormData] = useState({
        parent_id: 1,
        companyId: 1,
        id: 0,
        name: '',
    });
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    const [dialogTitle, setDialogTitle] = useState("Default Title");
    const [selectedItemName, setSelectedItemName] = useState("");

    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
    const [selectedNodeId, setSelectedNodeId] = useState(null);
    let isStructureTitleRendered = false;
    useEffect(() => {
        adminService.getDishTree()
            .then(response => {
                setTreeData(response.data.dataTree);
            })
            .catch(error => console.error('Error fetching company data:', error));
    }, []);
    const navigate = useNavigate();
    const renderButton = (label, className, onClick) => (
        <Button
            className={`${css.actionButton} ${className}`}
            size="small"
            color="success"
            variant="outlined"
            onClick={onClick}
        >
            {label}
        </Button>
    );
    const renderStructureTitle = () => (
        <>
            <h2>Menu</h2>
            <div className={`${css.flexWrap} ${css.between} ${css.sectionTitle}`}>
                <h3>You can create new sections of your menu</h3>
                <div className={css.actionButtons}>
                    {renderButton("Create Section", `${css.create}`, () => handleCreateEdit('create', 0, 0, 'Section'))}
                </div>
            </div>
        </>

    );
    const renderSection = (section) => (
        <div key={section.id} className={css.section}>
            <div className={`${css.flexWrap} ${css.between}`}>
                <div className={css.flexWrap}>
                    <Checkbox
                        {...label}
                        defaultChecked
                        color="default"
                        onChange={() => handleCheckboxChange(section.id)}/>
                    <div className={css.sectionName}>{section.title}</div>
                </div>
                <div className={css.actionButtons}>
                    {renderButton("Create Subsection", `${css.create}`, () => handleCreateEdit('create', section.id, 0, 'Subsection'))}
                    {renderButton("Edit Section", `${css.edit}`, () => handleCreateEdit('section', 0, section.id, section.title))}
                </div>
            </div>
            {section.children && section.children.map(subsection => renderSubsection(subsection, section.id))}
        </div>
    );
    const renderSubsection = (subsection, parentId) => (
        <div key={subsection.id} className={css.subsection}>
            <div className={`${css.flexWrap} ${css.between}`}>
                <div className={css.flexWrap}>
                    <Checkbox
                        {...label}
                        defaultChecked
                        color="default"
                        onChange={() => handleCheckboxChange(subsection.id)}/>
                    <span className={css.subsectionName}>{subsection.title}</span>
                </div>
                <div className={css.actionButtons}>
                    {renderButton("Create Dish", `${css.create}`, () => handleCreateDish(subsection.id))}
                    {renderButton("Edit Subsection", `${css.edit}`, () => handleCreateEdit('subsection', parentId, subsection.id, `${subsection.title}`))}
                </div>
            </div>
            {subsection.children && subsection.children.map(renderDish)}
        </div>
    );
    const renderDish = (dish) => (
        <div key={dish.id} className={css.dish}>
            <div className={`${css.flexWrap} ${css.between}`}>
                <div className={css.flexWrap}>
                    <Checkbox
                        {...label}
                        defaultChecked
                        color="default"
                        onChange={() => handleCheckboxChange(dish.id)}/>
                    <div>
                        {/*<div>{dish.id}</div>*/}
                        <div>{dish.title}</div>
                        <div className={css.price}>{dish.price} &#8364;</div>
                        <div>{dish.weight} </div>
                    </div>
                </div>
                <div className={css.actionButtons}>
                    <Button onClick={() => handleEditDish(dish.id)}
                            className={css.btnEditDish}
                            size="small"
                            color="success"
                            variant="outlined">Edit Dish</Button>
                </div>
            </div>
        </div>
    );
    const handleCheckboxChange = (nodeId) => {
        //TODO вывести попап подтверждения активации-деактивации и перерендерить данные после подтверждения
        console.log(`Checkbox state changed for node with ID: ${nodeId}`);
        setSelectedNodeId(nodeId);
        setConfirmDialogOpen(true);
    };
    const handleConfirmation = (confirmed) => {
        // Handle confirmation result
        if (confirmed) {
            // TODO: Update checkbox state or perform any other action
            console.log(`Checkbox state changed for node with ID: ${selectedNodeId}`);
        }

        // Reset state
        setSelectedNodeId(null);
        setConfirmDialogOpen(false);
    };
    const handleEditDish = (subsectionId) => {
        navigate(`/admin/dish/${subsectionId}`);
    };

    const handleCreateDish = (dishId) => {
        navigate('/admin/dish');
    };


    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    const handleFormSubmit = () => {
        console.log('Sending data:', formData);
        adminService.createModifySection(formData)
            .then(response => {
                console.log('Data sent successfully:', response.data);
                setShowSubsectionForm(false);
            })
            .catch(error => console.error('Error sending company data:', error));
    };
    const generateEditTitle = (type, itemName) => {
        switch (type) {
            case 'section':
                return (
                    <div>
                        <span className={`${css.bold} ${css.uppercase}`}>{itemName}</span>: edit section
                    </div>
                );
            case 'subsection':
                return (
                    <div>
                        <span className={`${css.bold} ${css.capitalize}`}>{itemName}</span>: edit subsection
                    </div>
                );
            case 'dish':
                return `Edit Dish - ${itemName || 'No Name'}`;
            default:
                return '';
        }
    };


    const handleCreateEdit = (type, parentId, itemId = 0, itemName = '') => {
        setFormData({
            companyId: 1,
            parent_id: parentId,
            id: itemId,
            name: '',
        });

        const title = type === 'create' ? `Create ${itemName}` : generateEditTitle(type, itemName);
        console.log(itemName);
        setDialogTitle(title);
        setSelectedItemName(itemName);
        setEditDialogOpen(true);
    };

    return (
        <div className={'container container_margin'}>
            {/*{treeData && treeData.map(section => (*/}
            {/*    <div key={section.id}>*/}
            {/*        {!isStructureTitleRendered && renderStructureTitle(section)}*/}
            {/*        {renderSection(section)}*/}
            {/*        {isStructureTitleRendered = true}*/}
            {/*    </div>*/}
            {/*))}*/}

            {renderStructureTitle()}
            {treeData && treeData.map(section => (
                <div key={section.id}>
                    {renderSection(section)}
                </div>
            ))}
            {/* Edit Dialog */}
            <EditDialog
                open={editDialogOpen}
                onClose={() => setEditDialogOpen(false)}
                title={dialogTitle}
                formData={formData}
                onFormChange={handleFormChange}
                onFormSubmit={handleFormSubmit}
            />

            {/* Confirmation Dialog */}
            <ConfirmationDialog
                open={confirmDialogOpen}
                onClose={() => handleConfirmation(false)}
                onConfirm={handleConfirmation}
            />

            {/*{editDialogOpen && (*/}
            {/*    <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>*/}
            {/*        <Toolbar className={css.toolbar}>*/}
            {/*            <div className={css.toolbarTitle}>*/}
            {/*                {dialogTitle}*/}
            {/*            </div>*/}
            {/*            <IconButton edge="start" color="inherit" onClick={() => setEditDialogOpen(false)} aria-label="close">*/}
            {/*                <img src={svgClose} alt="Close Icon" />*/}
            {/*            </IconButton>*/}

            {/*        </Toolbar>*/}

            {/*        <DialogContent>*/}
            {/*            <Box*/}
            {/*                component="form"*/}
            {/*                noValidate*/}
            {/*                autoComplete="off"*/}
            {/*            >*/}
            {/*                <TextField*/}
            {/*                    id="outlined-basic"*/}
            {/*                    fullWidth*/}
            {/*                    label="Name"*/}
            {/*                    variant="outlined"*/}
            {/*                    margin="normal"*/}
            {/*                    name="name"*/}
            {/*                    value={formData.name}*/}
            {/*                    required*/}
            {/*                    onChange={handleFormChange}*/}
            {/*                />*/}
            {/*                <Button*/}
            {/*                    color="success"*/}
            {/*                    variant="outlined"*/}
            {/*                    onClick={handleFormSubmit}*/}
            {/*                >*/}
            {/*                    Submit*/}
            {/*                </Button>*/}
            {/*            </Box>*/}
            {/*        </DialogContent>*/}
            {/*    </Dialog>*/}
            {/*)}*/}

            {/*/!* Confirmation CustomDialog *!/*/}
            {/*<Dialog open={confirmDialogOpen} onClose={() => handleConfirmation(false)}>*/}
            {/*    <DialogContent>*/}
            {/*        <Typography>*/}
            {/*            Are you sure you want to change the checkbox state?*/}
            {/*        </Typography>*/}
            {/*        <Button onClick={() => handleConfirmation(true)} color="success" variant="outlined">*/}
            {/*            Confirm*/}
            {/*        </Button>*/}
            {/*        <Button onClick={() => handleConfirmation(false)} color="error" variant="outlined">*/}
            {/*            Cancel*/}
            {/*        </Button>*/}
            {/*    </DialogContent>*/}
            {/*</Dialog>*/}
        </div>
    );
};

export default SectionsStructure;
import React, { useCallback, useEffect, useState } from 'react';
import {Route, useNavigate, useParams} from "react-router-dom";

import css from './SectionsStructure.module.scss';
import Checkbox from '@mui/material/Checkbox';
import { Button } from "@mui/material";
import { SetupApiWithToken } from "../../../services/apiAdminService";
import { ConfirmationDialog } from "../../Dialog/ConfirmationDialog/ConfirmationDialog";
import { EditDialog } from "../../Dialog/EditDialog/EditDialog";
import { DishForm } from "../DishForm/DishForm";

const SectionsStructure =  React.memo(() => {
    console.log("Рендер MyComponent");

    const { adminService } = SetupApiWithToken();
    const { dishId } = useParams();
    const navigate = useNavigate();
    const [treeData, setTreeData] = useState([]);
    const [shouldRefresh, setShouldRefresh] = useState(false);
    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [selectedNodeData, setSelectedNodeData] = useState({ id: null, active: 0, type: null });
    const [dialogText, setDialogText] = useState('Default Title');
    const [formData, setFormData] = useState({
        parent_id: 1,
        companyId: 1,
        id: 0,
        name: '',
    });
    const [dishUpdateFlag, setDishUpdateFlag] = useState(false);


    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    console.log("Рендер MyComponent");

    // useEffect(() => {
    //     const fetchDataAsync = async () => {
    //         try {
    //             const response = await adminService.getDishTree();
    //             setTreeData(response.data.dataTree);
    //         } catch (error) {
    //             console.error('Error fetching company data:', error);
    //         }
    //     };
    //
    //     fetchDataAsync();
    // }, [shouldRefresh]);

    // useEffect(() => {
    //     const fetchDataAsync = async () => {
    //         try {
    //             const response = await adminService.getDishTree();
    //             setTreeData(response.data.dataTree);
    //         } catch (error) {
    //             console.error('Error fetching company data:', error);
    //         }
    //     };
    //
    //     fetchDataAsync();
    // }, [shouldRefresh]);


    const fetchData = async () => {
        try {
            const response = await adminService.getDishTree();
            setTreeData(response.data.dataTree);
            console.log(`treeData ${treeData}`);
        } catch (error) {
            console.error('Error fetching company data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [shouldRefresh]);


    const handleFormChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }, []);

    const handleFormSubmit = useCallback(() => {
        adminService.createModifySection(formData)
            .then(response => {
                setEditDialogOpen(false);
                setShouldRefresh(prev => !prev);
            })
            .catch(error => {
                console.error('Error sending company data:', error);
            });
    }, [formData, adminService]);

    const handleCreateEdit = useCallback((type, parentId, itemId = 0, itemName = '') => {
        setFormData({
            companyId: 1,
            parent_id: parentId,
            id: itemId,
            name: ''
        });

        const text = type === 'create' ? `Create ${itemName}` : `Edit ${itemName}`;
        setDialogText(text);
        setEditDialogOpen(true);
    }, []);


    // const handleCheckboxChange = useCallback((nodeId, currentActiveStatus, type) => {
    //     setSelectedNodeData({ id: nodeId, active: currentActiveStatus, type });
    //     setConfirmDialogOpen(true);
    // }, []);

    const handleCheckboxChange = useCallback((nodeId, currentActiveStatus, type) => {
        // const name = type === 'dish' ? ''
        const text = currentActiveStatus === false
            ? (
                <>
                    Are you sure you want to
                    <span className="text-bold"> activate </span>
                    {type}?
                </>
            )
            : (
                <>
                    Are you sure you want to
                    <span className="text-bold"> deactivate </span>
                    {type}?
                </>
            );
        console.log('text:', currentActiveStatus);

        setSelectedNodeData({ id: nodeId, active: currentActiveStatus ? 1 : 0, type });
        setDialogText(text);
        setConfirmDialogOpen(true);
    }, []);

    // const handleConfirmationSubmit = useCallback(async (confirm) => {
    //     if (confirm) {
    //         const updatedData = { id: selectedNodeData.id, active: !selectedNodeData.active };
    //         try {
    //             if (selectedNodeData.type === 'section' || selectedNodeData.type === 'subsection') {
    //                 await adminService.setSectionActivity(updatedData.id, updatedData.active);
    //             } else if (selectedNodeData.type === 'dish') {
    //                 await adminService.setDishActivity(updatedData.id, updatedData.active);
    //             }
    //             setShouldRefresh(prev => !prev);
    //         } catch (error) {
    //             console.error(`Error updating activity status for ${selectedNodeData.type}:`, error);
    //         }
    //     }
    //     setConfirmDialogOpen(false);
    // }, [selectedNodeData, adminService]);

    const handleConfirmationSubmit = useCallback(async (confirm) => {
        if (confirm) {
            const updatedData = { id: selectedNodeData.id, active: selectedNodeData.active === 0 ? 1 : 0 };
            try {
                if (selectedNodeData.type === 'section' || selectedNodeData.type === 'subsection') {
                    await adminService.setSectionActivity(updatedData.id, updatedData.active);
                    // console.log(sectionActivity);
                } else if (selectedNodeData.type === 'dish') {
                    await adminService.setDishActivity(updatedData.id, updatedData.active);
                }
                setShouldRefresh(prev => !prev);
            } catch (error) {
                console.error(`Error updating activity status for ${selectedNodeData.type}:`, error);
            }
        }
        setConfirmDialogOpen(false);
    }, [selectedNodeData, adminService]);


    // const handleEditDish = (dishId) => {
    //     navigate(`/admin/menu-tab/dish/${dishId}`);
    // };
    //
    // const handleCreateDish = () => {
    //     navigate('/admin/menu-tab/dish/new');
    // };

    const handleEditDish = (dishId) => {
        navigate(`/admin/menu-tab/dish/${dishId}`);
    };

    const handleCreateDish = (parentId) => {
        navigate(`/admin/menu-tab/dish/new?parentId=${parentId}`);
    };
    const handleDishUpdate = () => {
        setDishUpdateFlag(prevFlag => !prevFlag);
    };
    const generateEditTitle = (type, itemName) => {
        switch (type) {
            case 'section':
                return <div><span className={`${css.bold} ${css.uppercase}`}>{itemName}</span>: edit section</div>;
            case 'subsection':
                return <div><span className={`${css.bold} ${css.capitalize}`}>{itemName}</span>: edit subsection</div>;
            case 'dish':
                return `Edit Dish - ${itemName || 'No Name'}`;
            default:
                return '';
        }
    };

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
            <div className={css.sectionTitle}>
                <h3>You can create new sections of your menu</h3>
                {renderButton('Create Section', `${css.create}`, () => handleCreateEdit('create', 0, 0, 'Section'))}
            </div>
        </>
    );

    const renderSection = (section) => (
        <div key={section.id} className={css.section} id={section.id}>
            {/*{console.log(section.id)}*/}

            <div className={css.menuItemWrap}>
                <div className={css.leftCol}>
                    <Checkbox {...label} color="success" checked={section.active} onChange={() => handleCheckboxChange(section.id, section.active, 'section')} />
                    <div className={css.sectionName}>{section.title} id:{section.id}</div>
                </div>
                <div className={css.actionButtons}>
                    {renderButton('Create Subsection', `${css.create}`, () => handleCreateEdit('create', section.id, 0, 'Subsection'))}
                    {renderButton('Edit Section', `${css.edit}`, () => handleCreateEdit('section', 0, section.id, section.title))}
                </div>
            </div>
            {section.children && section.children.map((subsection) => renderSubsection(subsection, section.id))}
        </div>
    );

    const renderSubsection = (subsection, parentId) => (
        <div key={subsection.id} className={css.subsection}  id={subsection.id}>
            <div className={css.menuItemWrap}>
                <div className={css.leftCol}>
                    <Checkbox {...label} color="success" checked={subsection.active} onChange={() => handleCheckboxChange(subsection.id, subsection.active, 'subsection')} />
                    <span className={css.subsectionName}>{subsection.title} id:{subsection.id}</span>
                </div>
                <div className={css.actionButtons}>
                    {renderButton('Create Dish', `${css.create}`, () => handleCreateDish(subsection.id))}
                    {renderButton('Edit Subsection', `${css.edit}`, () => handleCreateEdit('subsection', parentId, subsection.id, `${subsection.title}`))}
                </div>
            </div>
            {subsection.children && subsection.children.map(renderDish)}
        </div>
    );

    const renderDish = (dish) => (
        <div key={`d${dish.id}`} className={css.dish} id={`d${dish.id}`}>
            <div className={css.flexWrap}>
                <div className={css.leftCol}>
                    <Checkbox {...label} color="success" checked={dish.active} onChange={() => handleCheckboxChange(dish.id, dish.active, 'dish')} />
                    <div>
                        <div>{dish.title}</div>
                        <div className={css.price}>{dish.price} €</div>
                        <div>{dish.weight}</div>
                        <div><b>id: {dish.id}</b></div>

                    </div>
                </div>
                <div className={css.actionButtons}>
                    <Button onClick={() => handleEditDish(dish.id)} className={css.btnEditDish} size="small" color="success" variant="outlined">Edit Dish</Button>
                </div>
            </div>
        </div>
    );

    if (dishId) {
        // return <Route path="/admin/menu-tab/dish/:dishId" element={<DishForm key={dishId} />} />;
        // return <DishForm key={dishId} />;
        return <DishForm key={dishId}/>;


    }

    return (
        <>
            {renderStructureTitle()}
            {treeData && treeData.map((section) => (
                <React.Fragment key={section.id}>
                    {renderSection(section)}
                </React.Fragment>
            ))}
            <EditDialog
                open={editDialogOpen}
                onClose={() => setEditDialogOpen(false)}
                title={dialogText}
                formData={formData}
                onFormChange={handleFormChange}
                onFormSubmit={handleFormSubmit}
            />
            <ConfirmationDialog
                open={confirmDialogOpen}
                onClose={() => setConfirmDialogOpen(false)}
                onConfirm={handleConfirmationSubmit}
                text={dialogText}
                title="Activate"
            />
        </>
    );
});

export default SectionsStructure;


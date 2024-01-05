import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";

import css from './SectionsStructure.module.scss';
import Checkbox from '@mui/material/Checkbox';
import { Button } from "@mui/material";
import { SetupApiWithToken } from "../../../services/apiAdminService";
import { ConfirmationDialog } from "../../Dialog/ConfirmationDialog/ConfirmationDialog";
import { EditDialog } from "../../Dialog/EditDialog/EditDialog";
import { DishForm } from "../DishForm/DishForm";

const SectionsStructure = () => {
    const { adminService } = SetupApiWithToken();
    const { dishId } = useParams();
    const navigate = useNavigate();
    const [treeData, setTreeData] = useState([]);
    const [shouldRefresh, setShouldRefresh] = useState(false);
    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [selectedNodeData, setSelectedNodeData] = useState({ id: null, active: false, type: null });
    const [dialogTitle, setDialogTitle] = useState('Default Title');
    const [formData, setFormData] = useState({
        parent_id: 1,
        companyId: 1,
        id: 0,
        name: '',
    });


    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

    useEffect(() => {
        const fetchDataAsync = async () => {
            try {
                const response = await adminService.getDishTree();
                setTreeData(response.data.dataTree);
            } catch (error) {
                console.error('Error fetching company data:', error);
            }
        };

        fetchDataAsync();
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

        const title = type === 'create' ? `Create ${itemName}` : `Edit ${itemName}`;
        setDialogTitle(title);
        setEditDialogOpen(true);
    }, []);


    const handleCheckboxChange = useCallback((nodeId, currentActiveStatus, type) => {
        setSelectedNodeData({ id: nodeId, active: currentActiveStatus, type });
        setConfirmDialogOpen(true);
    }, []);

    const handleConfirmationSubmit = useCallback(async (confirm) => {
        if (confirm) {
            const updatedData = { id: selectedNodeData.id, active: !selectedNodeData.active };
            try {
                if (selectedNodeData.type === 'section' || selectedNodeData.type === 'subsection') {
                    await adminService.setSectionActivity(updatedData.id, updatedData.active);
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


    const handleEditDish = (dishId) => {
        navigate(`/admin/menu-tab/dish/${dishId}`);
    };

    const handleCreateDish = () => {
        navigate('/admin/menu-tab/dish/new');
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
                    <Checkbox {...label} checked={section.active} onChange={() => handleCheckboxChange(section.id, section.active, 'section')} />
                    <div className={css.sectionName}>{section.title} {section.id}</div>
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
                    <Checkbox {...label} checked={subsection.active} onChange={() => handleCheckboxChange(subsection.id, subsection.active, 'subsection')} />
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
                    <Checkbox {...label} checked={dish.active} onChange={() => handleCheckboxChange(dish.id, dish.active, 'dish')} />
                    <div>
                        <div>{dish.title}</div>
                        <div>id: {dish.id}</div>
                        <div className={css.price}>{dish.price} €</div>
                        <div>{dish.weight}</div>
                    </div>
                </div>
                <div className={css.actionButtons}>
                    <Button onClick={() => handleEditDish(dish.id)} className={css.btnEditDish} size="small" color="success" variant="outlined">Edit Dish</Button>
                </div>
            </div>
        </div>
    );

    if (dishId) {
        return <DishForm />;
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
                title={dialogTitle}
                formData={formData}
                onFormChange={handleFormChange}
                onFormSubmit={handleFormSubmit}
            />
            <ConfirmationDialog
                open={confirmDialogOpen}
                onClose={() => setConfirmDialogOpen(false)}
                onConfirm={handleConfirmationSubmit}
            />
        </>
    );
};

export default SectionsStructure;




// import React, {useCallback, useEffect, useState} from 'react';
// import {useNavigate, useParams} from "react-router-dom";
//
// import css from './SectionsStructure.module.scss'
// import Checkbox from '@mui/material/Checkbox';
// import {Button} from "@mui/material";
// import {SetupApiWithToken} from "../../../services/apiAdminService";
// import {ConfirmationDialog} from "../../Dialog/ConfirmationDialog/ConfirmationDialog";
// import {EditDialog} from "../../Dialog/EditDialog/EditDialog";
// import {DishForm} from "../DishForm/DishForm";
//
//
// const SectionsStructure = () => {
//     const { adminService } = SetupApiWithToken();
//     const { dishId } = useParams();
//     const navigate = useNavigate();
//     const [treeData, setTreeData] = useState([]);
//     const [shouldRefresh, setShouldRefresh] = useState(false);
//     const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
//     const [editDialogOpen, setEditDialogOpen] = useState(false);
//     const [selectedNodeId, setSelectedNodeId] = useState(null);
//     const [dialogTitle, setDialogTitle] = useState('Default Title');
//     const [selectedItemName, setSelectedItemName] = useState('');
//     const [formData, setFormData] = useState({
//         parent_id: 1,
//         companyId: 1,
//         id: 0,
//         name: '',
//     });
//     const [selectedNodeActive, setSelectedNodeActive] = useState(false);
//
//     const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
//
//     const fetchData = async () => {
//         try {
//             const response = await adminService.getDishTree();
//             setTreeData(response.data.dataTree);
//
//         } catch (error) {
//             console.error('Error fetching company data:', error);
//         }
//     };
//     console.error(treeData);
//
//     useEffect(() => {
//         fetchData();
//     }, [shouldRefresh]);
//
//     const handleCheckboxChange = useCallback((nodeId, currentActiveStatus, type) => {
//         setSelectedNodeData({ id: nodeId, active: currentActiveStatus, type });
//         setConfirmDialogOpen(true);
//     }, []);
//
//
//     // const handleCheckboxChange = useCallback((nodeId, isActive, parentId = null) => {
//     //     const updatedFormData = {
//     //         ...formData, // Сохраняем текущие данные формы
//     //         id: nodeId,
//     //         active: isActive,
//     //         parent_id: parentId || formData.parent_id // Если parentId не указан, используем текущий parent_id из formData
//     //     };
//     //
//     //     adminService.createModifySection(updatedFormData)
//     //         .then(() => {
//     //             setShouldRefresh(true);
//     //         })
//     //         .catch(error => {
//     //             console.error('Error updating node active status:', error);
//     //         });
//     // }, [adminService, formData]);
//     // const handleCheckboxChange = useCallback((nodeId, isActive) => {
//     //     setSelectedNodeId(nodeId);
//     //     setSelectedNodeActive(isActive);
//     //     setConfirmDialogOpen(true);
//     // }, []);
//
//
//     const updateActiveStatus = useCallback((nodeId, isActive) => {
//         adminService.updateSectionActiveStatus(nodeId, isActive)
//             .then(() => {
//                 // Обновить данные с сервера
//                 fetchData();
//             })
//             .catch((error) => {
//                 console.error('Error updating active status:', error);
//             });
//     }, [adminService]);
//
//     const handleFormChange = useCallback((e) => {
//         const { name, value } = e.target;
//         setFormData((prevState) => ({
//             ...prevState,
//             [name]: value,
//         }));
//     }, []);
//
//     const handleFormSubmit = useCallback(() => {
//         adminService.createModifySection(formData)
//             .then((response) => {
//                 setEditDialogOpen(false);
//                 setShouldRefresh(true);
//             })
//             .catch((error) => {
//                 console.error('Error sending company data:', error);
//             });
//     }, [formData, adminService]);
//
//     const handleCreateEdit = useCallback((type, parentId, itemId = 0, itemName = '') => {
//         setFormData({
//             companyId: 1,
//             parent_id: parentId,
//             id: itemId,
//             name: '',
//         });
//
//         const title = type === 'create' ? `Create ${itemName}` : `Edit ${itemName}`;
//         setDialogTitle(title);
//         setSelectedItemName(itemName);
//         setEditDialogOpen(true);
//     }, []);
//
//     // const handleConfirmationSubmit = useCallback((confirm) => {
//     //     if (confirm) {
//     //         updateActiveStatus(selectedNodeId, selectedNodeActive);
//     //     }
//     //     setConfirmDialogOpen(false);
//     // }, [selectedNodeId, selectedNodeActive, updateActiveStatus]);
//
//
//     const handleConfirmationSubmit = useCallback(async (confirm) => {
//         if (confirm) {
//             const updatedData = {
//                 id: selectedNodeData.id,
//                 active: !selectedNodeData.active
//             };
//
//             try {
//                 if (selectedNodeData.type === 'section') {
//                     await adminService.setSectionActivity(updatedData);
//                 } else if (selectedNodeData.type === 'dish') {
//                     await adminService.setDishActivity(updatedData);
//                 }
//                 setShouldRefresh(true);
//             } catch (error) {
//                 console.error('Error updating activity status:', error);
//             }
//         }
//         setConfirmDialogOpen(false);
//     }, [selectedNodeData, adminService]);
//
//
//
//     const handleEditDish = (dishId) => {
//         navigate(`/admin/menu-tab/dish/${dishId}`);
//     };
//
//     const handleCreateDish = () => {
//         navigate('/admin/menu-tab/dish/new');
//     };
//
//     const generateEditTitle = (type, itemName) => {
//         switch (type) {
//             case 'section':
//                 return (
//                     <div>
//                         <span className={`${css.bold} ${css.uppercase}`}>{itemName}</span>: edit section
//                     </div>
//                 );
//             case 'subsection':
//                 return (
//                     <div>
//                         <span className={`${css.bold} ${css.capitalize}`}>{itemName}</span>: edit subsection
//                     </div>
//                 );
//             case 'dish':
//                 return `Edit Dish - ${itemName || 'No Name'}`;
//             default:
//                 return '';
//         }
//     };
//
//     // const handleCheckboxChange = (nodeId) => {
//     //     //TODO вывести попап подтверждения активации-деактивации и перерендерить данные после подтверждения
//     //     console.log(`Checkbox state changed for node with ID: ${nodeId}`);
//     //     setSelectedNodeId(nodeId);
//     //     setConfirmDialogOpen(true);
//     // };
//
//     const renderButton = (label, className, onClick) => (
//         <Button
//             className={`${css.actionButton} ${className}`}
//             size="small"
//             color="success"
//             variant="outlined"
//             onClick={onClick}
//         >
//             {label}
//         </Button>
//     );
//
//     const renderStructureTitle = () => (
//         <>
//             {/*<h2>Menu</h2>*/}
//             <div className={css.sectionTitle}>
//                 <h3>You can create new sections of your menu</h3>
//                 {/*<div className={css.actionButtons}>*/}
//                 {/*<div>*/}
//                     {renderButton('Create Section', `${css.create}`, () => handleCreateEdit('create', 0, 0, 'Section'))}
//                 {/*</div>*/}
//             </div>
//         </>
//     );
//
//     const renderSection = (section) => (
//         <div key={section.id} className={css.section}>
//             {/*<div className={`${css.flexWrap} ${css.between}`}>*/}
//             <div className={css.menuItemWrap}>
//                 <div className={css.leftCol}>
//                 {/*<div className={css.flexWrap}>*/}
//                     <Checkbox {...label} checked={section.active}     onChange={() => handleCheckboxChange(subsection.id, !subsection.active, section.id)}/>
//                     <div className={css.sectionName}>{section.title}</div>
//                 </div>
//                 <div className={css.actionButtons}>
//                     {renderButton('Create Subsection', `${css.create}`, () => handleCreateEdit('create', section.id, 0, 'Subsection'))}
//                     {renderButton('Edit Section', `${css.edit}`, () => handleCreateEdit('section', 0, section.id, section.title))}
//                 </div>
//             </div>
//             {section.children && section.children.map((subsection) => renderSubsection(subsection, section.id))}
//         </div>
//     );
//
//     const renderSubsection = (subsection, parentId) => (
//         <div key={subsection.id} className={css.subsection}>
//             <div className={css.menuItemWrap}>
//                 <div className={css.leftCol}>
//                     <Checkbox {...label} checked={subsection.active} onChange={() => handleCheckboxChange(subsection.id)} />
//                     <span className={css.subsectionName}>{subsection.title}</span>
//                 </div>
//                 <div className={css.actionButtons}>
//                     {renderButton('Create Dish', `${css.create}`, () => handleCreateDish(subsection.id))}
//                     {renderButton('Edit Subsection', `${css.edit}`, () => handleCreateEdit('subsection', parentId, subsection.id, `${subsection.title}`))}
//                 </div>
//             </div>
//             {subsection.children && subsection.children.map(renderDish)}
//         </div>
//     );
//
//     const renderDish = (dish) => (
//         <div key={dish.id} className={css.dish}>
//             <div className={css.flexWrap}>
//                 <div className={css.leftCol}>
//                     <Checkbox {...label} checked={dish.active} onChange={() => handleCheckboxChange(dish.id)} />
//                     <div>
//                         <div>{dish.title}</div>
//                         <div>id: {dish.id}</div>
//                         <div className={css.price}>{dish.price} €</div>
//                         <div>{dish.weight} </div>
//                     </div>
//                 </div>
//                 <div className={css.actionButtons}>
//                     <Button onClick={() => handleEditDish(dish.id)} className={css.btnEditDish} size="small" color="success" variant="outlined">Edit Dish</Button>
//
//                 </div>
//             </div>
//         </div>
//     );
//
//     if (dishId) {
//         return <DishForm />;
//     }
//
//     return (
//         // <div className={'container container_margin'}>
//         <>
//             {renderStructureTitle()}
//             {treeData && treeData.map((section) => (
//                 <>
//                     {renderSection(section)}
//                 </>
//             ))}
//             <EditDialog
//                 open={editDialogOpen}
//                 onClose={() => setEditDialogOpen(false)}
//                 title={dialogTitle}
//                 formData={formData}
//                 onFormChange={handleFormChange}
//                 onFormSubmit={handleFormSubmit}
//             />
//             <ConfirmationDialog
//                 open={confirmDialogOpen}
//                 onClose={() => setConfirmDialogOpen(false)}
//                 onConfirm={handleConfirmationSubmit}
//             />
//         </>
//     );
// };
//
// export default SectionsStructure;
//
//
//
// // const handleFormSubmit = useCallback(() => {
// //     adminService.createModifySection(formData)
// //         .then(response => {
// //             setEditDialogOpen(false);
// //             setShouldRefresh(true);
// //         })
// //         .catch(error => {
// //             console.error('Error sending company data:', error);
// //         });
// // }, [formData, adminService]);
//
// // const handleFormSubmit = useCallback(() => {
// //     if (formData.id) {
// //         // Логика редактирования
// //         adminService.editSection(formData)
// //             .then(response => {
// //                 // Обработка успешного ответа
// //             })
// //             .catch(error => {
// //                 // Обработка ошибки
// //             });
// //     } else {
// //         // Логика создания
// //         adminService.createSection(formData)
// //             .then(response => {
// //                 // Обработка успешного ответа
// //             })
// //             .catch(error => {
// //                 // Обработка ошибки
// //             });
// //     }
// //
// //     setEditDialogOpen(false);
// //     setShouldRefresh(true);
// // }, [formData, adminService]);



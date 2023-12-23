import React from 'react';
import { TextField } from '@mui/material';
import {CustomDialog} from '../CustomDialog/CustomDialog';

// const EditDialog = ({ open, onClose, title, formData, onFormChange, onFormSubmit }) => {
//
//     const handleSubmit = () => {
//         onFormSubmit(formData);
//         onClose();
//     };
//
//     return (
//         <CustomDialog
//             open={open}
//             onClose={onClose}
//             title={title}
//             formData={formData}
//             onFormChange={onFormChange}
//             onFormSubmit={onFormSubmit}
//         >
//             <TextField
//                 id="outlined-basic"
//                 fullWidth
//                 label="Name"
//                 variant="outlined"
//                 margin="normal"
//                 name="name"
//                 value={formData.name}
//                 required
//                 onChange={onFormChange}
//             />
//         </CustomDialog>
//     );
// };


const EditDialog = ({ open, onClose, title, formData, onFormChange, onFormSubmit }) => {
    return (
        <CustomDialog
            open={open}
            onClose={onClose}
            title={title}
            formData={formData}
            onFormChange={onFormChange}
            //TODO отрабатывает один из двух вариантов с зеркальными ошибками. надо поправить
            // onFormSubmit={() => onFormSubmit(formData)}
            onFormSubmit={onFormSubmit}

        >
            <TextField
                id="outlined-basic"
                fullWidth
                label="Name"
                variant="outlined"
                margin="normal"
                name="name"
                value={formData.name}
                required
                onChange={onFormChange}
            />
        </CustomDialog>
    );
};


export {EditDialog};
import React from 'react';
import {Box, Button, TextField} from '@mui/material';
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


// const EditDialog = ({ open, onClose, title, formData, onFormChange, onFormSubmit }) => {
//     return (
//         <CustomDialog
//             open={open}
//             onClose={onClose}
//             title={title}
//             formData={formData}
//             onFormChange={onFormChange}
//             //TODO отрабатывает один из двух вариантов с зеркальными ошибками. надо поправить
//             // onFormSubmit={() => onFormSubmit(formData)}
//             onFormSubmit={onFormSubmit}
//
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
//
//
// export {EditDialog};

const EditDialog = ({ open, onClose, title, formData, onFormChange, onFormSubmit }) => {
    const handleSubmit = (event) => {
        event.preventDefault();
        onFormSubmit(formData);
    };

    return (
        <CustomDialog open={open} onClose={onClose} title={title}>
            <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
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
                <div className={'flexWrap'}>
                    <Button color="error" variant="outlined" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button color="success" variant="outlined" type="submit">
                        Save
                    </Button>
                </div>
            </Box>
        </CustomDialog>
    );
};
export { EditDialog };

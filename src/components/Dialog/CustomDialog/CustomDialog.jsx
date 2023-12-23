import React from 'react';

import {Box, Button, Dialog, DialogContent, IconButton, TextField, Toolbar} from '@mui/material';
import svgClose from '../../../assets/img/close-icon.svg';
import css from './CustomDialog.module.css'


const CustomDialog = ({ open, onClose, title, children, onFormSubmit }) => {
    const handleSubmit = (event) => {
        event.preventDefault();
        if (onFormSubmit) {
            onFormSubmit();
        }
    };
    return (
        <Dialog open={open} onClose={onClose}>
            <Toolbar className={css.toolbar}>
                <div className={css.toolbarTitle}>{title}</div>
                <IconButton edge="start" color="inherit" onClick={onClose} aria-label="close">
                    <img src={svgClose} alt="Close Icon" />
                </IconButton>
            </Toolbar>
            <DialogContent>
                {/*<Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>*/}
                {/*    {children}*/}
                {/*    <Button color="success" variant="outlined" type="submit">*/}
                {/*        Submit*/}
                {/*    </Button>*/}
                {/*</Box>*/}

                <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
                    {children}
                    <div className={'flexWrap'}>
                        <Button color="success" variant="outlined" type="submit">
                            Submit
                        </Button>
                        <Button type="close" color="error" variant="outlined" onClick={onClose}>
                            Cancel
                        </Button>
                    </div>

                </Box>
            </DialogContent>
        </Dialog>
    );
};




// const CustomDialog = ({ open, onClose, title, children, onConfirm, onFormSubmit, formData, onFormChange }) => {
//     return (
//         <Dialog open={open} onClose={onClose}>
//             <Toolbar className={css.toolbar}>
//                 <div className={css.toolbarTitle}>{title}</div>
//                 <IconButton edge="start" color="inherit" onClick={onClose} aria-label="close">
//                     <img src={svgClose} alt="Close Icon" />
//                 </IconButton>
//             </Toolbar>
//             <DialogContent>
//                 <Box component="form" noValidate autoComplete="off" onSubmit={onFormSubmit}>
//                     {children}
//
//                     {onFormSubmit && (
//                         <Button color="success" variant="outlined" type="submit">
//                             Submit
//                         </Button>
//                     )}
//
//
//                 </Box>
//             </DialogContent>
//         </Dialog>
//     );
// };
//
export { CustomDialog };




import React from 'react';

import {Box, Button, Dialog, DialogContent, IconButton, TextField, Toolbar} from '@mui/material';
import svgClose from '../../../assets/img/close-icon.svg';
import css from './CustomDialog.module.css'

const CustomDialog = ({ open, onClose, title, children, paperProps, sxProps  }) => {
    return (
        <Dialog open={open}
                onClose={onClose}
                PaperProps={paperProps}
                sx={sxProps}>
            <Toolbar className={css.toolbar}>
                <div className={css.toolbarTitle}>{title}</div>
                <IconButton edge="start" color="inherit" onClick={onClose} aria-label="close">
                    <img src={svgClose} alt="Close Icon" />
                </IconButton>
            </Toolbar>
            <DialogContent>
                {children}
            </DialogContent>
        </Dialog>
    );
};
export { CustomDialog };
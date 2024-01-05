import React from 'react';

import { Button, Typography } from '@mui/material';
import {CustomDialog} from '../CustomDialog/CustomDialog';

const ConfirmationDialog = ({ open, onClose, onConfirm, text, title = 'Confirmation' }) => {
    return (
        <CustomDialog open={open} onClose={onClose} title={title}>
            <Typography>{text}</Typography>
            <div className={'flexWrap'}>
                <Button onClick={() => onConfirm(false)} color="error" variant="outlined">
                    Cancel
                </Button>
                <Button onClick={() => onConfirm(true)} color="success" variant="outlined">
                    Confirm
                </Button>
            </div>
        </CustomDialog>
    );
};
export { ConfirmationDialog };

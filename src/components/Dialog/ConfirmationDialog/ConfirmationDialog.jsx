import React from 'react';

import { Button, Typography } from '@mui/material';
import {CustomDialog} from '../CustomDialog/CustomDialog';

const ConfirmationDialog = ({ open, onClose, onConfirm, text }) => {
    const handleConfirm = () => {
        onConfirm(true);
        onClose();
    };
    const handleCancel = () => {
        onConfirm(false);
        onClose();
    };
    return (
        <CustomDialog open={open} onClose={onClose} title="Confirmation">
            <Typography>
                {text}
            </Typography>
           {/*<div className={'flexWrap'}>*/}
           {/*    <Button onClick={() => handleConfirm()} color="success" variant="outlined">*/}
           {/*        Confirm*/}
           {/*    </Button>*/}
           {/*    <Button onClick={() => handleCancel()} color="error" variant="outlined">*/}
           {/*        Cancel*/}
           {/*    </Button>*/}
           {/*</div>*/}
        </CustomDialog>
    );
};

export {ConfirmationDialog};
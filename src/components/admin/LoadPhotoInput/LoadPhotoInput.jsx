import React from 'react';

import {SetupApiWithToken} from "../../../services/apiAdminService";
import {Button} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {styled} from "@mui/material/styles";
import css from "./LoadPhotoInput.module.css";
import {imgLink} from '../../../constants/index'


const LoadPhotoInput = ({ onUploadSuccess, label, currentImageUrl}) => {
    const { adminService } = SetupApiWithToken();
    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const formData = new FormData();

        if (file) {
            formData.append('file', file, file.name);
            console.log(file.name);
            adminService.uploadFile(formData)
                .then(response => {
                    console.log('Data sent successfully:', response.data);

                    onUploadSuccess(response.data.filename); // callback
                })
                .catch(error => console.error('Error sending company data:', error));
        }
    };


    return (
     <>
         {currentImageUrl && (
             <div className={css.imgWrap}>
                 <img src={`${imgLink}${currentImageUrl}`} alt={currentImageUrl} className={css.companyImg}/>
             </div>
         )}
         <Button component="label" variant="outlined" color="success" startIcon={<CloudUploadIcon/>} className={css.btnMargin}>
             {label}
             <VisuallyHiddenInput type="file" hidden onChange={handleFileChange} name="img"/>
         </Button>
     </>
    );
};

export {LoadPhotoInput};

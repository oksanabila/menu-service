import React, { useState, useEffect } from 'react';

import {companyService} from "../../services";
import {imgLink} from '../../constants/index'
import css from './DishCard.module.css';
import { Dialog, IconButton, Slide, Typography } from "@mui/material";
import {CustomDialog} from "../Dialog/CustomDialog/CustomDialog";


const DishCard = ({dish}) => {
    // const [menuData, setMenuData] = useState(null);
    const [open, setOpen] = useState(false);
    // useEffect(() => {
    //     companyService.getAll()
    //         .then(response => setMenuData(response.data.menu))
    //         .catch(error => console.error("Error fetching menu data:", error));
    // }, []);
    useEffect(() => {
        console.log('Current state of open:', open);
    }, [open]);
    if (!dish) {
        return <div>Loading...</div>;
    }

    const handleClickOpen = () => {
        console.log("Opening dialog");
        setOpen(true);

    };

    const handleClose = () => {
        console.log("Closing dialog");
        setOpen(false);

    };

    const Transition = React.forwardRef(function Transition(props, ref) {
        return <Slide direction="up" ref={ref} {...props} />;
    });
    return dish.active ? (
        <div className={css.dish}>
            <div className={css.dishGrid} onClick={handleClickOpen}>
                <div className={css.imgWrap}>
                    <div className={css.imgContent}>
                        <div className={css.img} style={{ backgroundImage: `url(${imgLink}/${dish.mainImg})` }}></div>
                    </div>
                </div>
                <div>
                    <h3 className={css.dishTitle}>{dish.name}</h3>
                    <div className={css.dishWeight}>{dish.weight}gr</div>
                    <div className={css.dishDescr}>{dish.description}</div>
                </div>
                <div></div>
                <div>
                    <div className={css.dishPrice}>{dish.price} €</div>

                </div>
            </div>
            <CustomDialog
                open={open}
                onClose={handleClose}
                paperProps={{
                    style: {
                        height: '75vh',
                        overflowY: 'auto'
                    }
                }}
                sxProps={{
                    '& .MuiBackdrop-root': {
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    },
                    '& .MuiPaper-root': {
                        position: 'absolute',
                        top: '25%',
                        margin: '0',
                        width: '100%',
                        borderRadius: 0
                    },
                    '& .MuiDialogContent-root': {
                        padding: 0,
                    }
                }}>
                <div className={css.dialog}>
                    <div className={css.dialogImgWrap}>
                        <div className={css.dialogImgInner}>
                            <div className={css.dialogImg} style={{backgroundImage: `url(${imgLink}/${dish.mainImg})`}}></div>
                        </div>
                        {/*<img src={`${imgLink}/${dish.mainImg}`} alt={dish.name} className={css.dialogImg} />*/}
                    </div>

                    <div className={css.dialogDetails}>
                        <h3 className={css.dialogTitle}>
                            {dish.name}
                        </h3>
                        <div className={css.dialogPriceWeight}>
                            <div className={css.dialogWeight}>
                                {dish.weight}gr
                            </div>
                            <h6 className={css.dialogPrice}>
                                {dish.price} €
                            </h6>
                        </div>
                        <p className={css.dialogDescription}>
                            {dish.description}
                        </p>


                    </div>
                </div>
            </CustomDialog>
        </div>
    ) : null;

};

export { DishCard };

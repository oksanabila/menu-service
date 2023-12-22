import React, { useState, useEffect } from 'react';

import {companyService} from "../../services";
import {imgLink} from '../../constants/index'
import css from './DishCard.module.css';
import { Dialog, IconButton, Slide, Typography } from "@mui/material";


const DishCard = ({dish}) => {
    const [menuData, setMenuData] = useState(null);
    const [open, setOpen] = useState(false);
    useEffect(() => {
        companyService.getAll()
            .then(response => setMenuData(response.data.menu))
            .catch(error => console.error("Error fetching menu data:", error));
    }, []);

    if (!dish) {
        return <div>Loading...</div>;
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const Transition = React.forwardRef(function Transition(props, ref) {
        return <Slide direction="up" ref={ref} {...props} />;
    });

    return (
        <>
            <div className={css.dishGrid} onClick={handleClickOpen}>
                <div className={css.imgWrap}>
                    <div className={css.imgContent}>
                        <div className={css.img} style={{ backgroundImage: `url(${imgLink}/${dish.mainImg})` }}></div>
                    </div>
                </div>
                <div>
                    <div className={css.dishTitle}>{dish.name}</div>

                </div>
            </div>

            <Dialog
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
                PaperProps={{
                    style: {
                        height: '75vh',
                        overflowY: 'auto'
                    }
                }}
                sx={{
                    '& .MuiBackdrop-root': {
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    },
                    '& .MuiPaper-root': {
                        position: 'absolute',
                        top: '25%',
                        margin: '0',
                        width: '100%',
                        borderRadius: 0
                    }
                }}
            >
                <IconButton
                    edge="start"
                    color="inherit"
                    onClick={handleClose}
                    aria-label="close"
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                </IconButton>

                <div className={css.dialogContent}>
                    <div className={css.dishImageContainer}>
                        <img src={`${imgLink}/${dish.mainImg}`} alt={dish.name} className={css.dishImage} />
                    </div>

                    <div className={css.dishDetails}>
                        <Typography variant="h5" component="h2" className={css.dishTitle}>
                            {dish.name}
                        </Typography>
                        <Typography variant="body1" className={css.dishDescription}>
                            {dish.description}
                        </Typography>

                        <div className={css.dishPriceWeight}>
                            <Typography variant="h6" className={css.dishPrice}>
                                {dish.price} €
                            </Typography>
                            <Typography variant="subtitle1" className={css.dishWeight}>
                                {dish.weight}gr
                            </Typography>
                        </div>
                    </div>
                </div>
            </Dialog>
        </>
    );
};

export { DishCard };

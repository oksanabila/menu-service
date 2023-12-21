import React, { useState, useEffect } from 'react';
import css from './DishCard.module.css';
import { LikeButton } from "../LikeButton/LikeButton";
import { AppBar, Button, Dialog, IconButton, List, ListItem, ListItemText, Slide, Toolbar, Typography } from "@mui/material";
import {companyService} from "../../services";

const DishCard = ({dish}) => {
    const [menuData, setMenuData] = useState(null);
    const [open, setOpen] = useState(false);
console.log(dish);
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
                        {/* Ви можете використовувати menuData, щоб отримати дані про страву */}
                        <div className={css.img} style={{ backgroundImage: `url(${dish.mainImg})` }}></div>
                    </div>
                </div>
                <div>
                    <div className={css.dishTitle}>{dish.name}</div>

                </div>
            </div>

            <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="18" cy="18" r="17.5" fill="#2B2626" />
                                <path d="M9 27L27 9" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M27 27L9 9" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            Sound
                        </Typography>
                        <Button autoFocus color="inherit" onClick={handleClose}>
                            save
                        </Button>
                    </Toolbar>
                </AppBar>
                <List>
                    <ListItem>
                        <ListItemText primary={dish.description} />
                    </ListItem>
                </List>
            </Dialog>
        </>
    );
};

export { DishCard };

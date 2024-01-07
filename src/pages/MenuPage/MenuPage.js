import React from 'react';
import {MenuTabs} from "../../components/MenuTabs/MenuTabs";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {Header} from "../../components/Header/Header";
import {Button} from "@mui/material";

const MenuPage = () => {
    return (
        <>
            {/*<Header>*/}
            {/*    /!*<ThemeProvider theme={theme}>*!/*/}
            {/*    <Button variant="contained"*/}
            {/*            color="error"*/}
            {/*            onClick={handleGoBack}*/}
            {/*    >Go Back</Button>*/}
            {/*    /!*</ThemeProvider>*!/*/}
            {/*</Header>*/}
            <MenuTabs/>
        </>
    );
};

export {MenuPage};
CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};
function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

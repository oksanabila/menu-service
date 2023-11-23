import {configureStore} from "@reduxjs/toolkit";
import {companyReducer} from "./slices";

const store = configureStore({
    reducer : {
        company: companyReducer,
    },
})

export {store};
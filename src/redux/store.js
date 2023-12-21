import {configureStore} from "@reduxjs/toolkit";
import {sectionsReducer} from "./slices";

const store = configureStore({
    reducer : {
        sections: sectionsReducer,
    },
})

export {store};
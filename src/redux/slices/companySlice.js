import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import { companyService } from '../../services';
import async from "async";


const initialState = {
    company: [],
    isLoading: false,
    error: null,
};


export const fetchCompany = createAsyncThunk(
    'company/fetchCompany',
    async (_, { dispatch }) => {
        try {
            const { data } = await companyService.getAll();
            return data.results;
        } catch (error) {
            dispatch(setError(error.message));
            throw error;
        }
    }
);


const companySlice = createSlice({
    name: 'companySlice',
    initialState,
    reducers: {
        setError: (state, action) => {
            state.error = action.payload;
        },

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCompany.pending, (state) => {
                state.isLoading = true;
            })
    },
});

export const {reducer: companyReducer, actions: {setError}} = companySlice;

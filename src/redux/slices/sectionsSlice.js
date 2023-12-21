import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { SetupApiWithToken } from '../../services/apiAdminService';

export const fetchTreeData = createAsyncThunk(
    'sections/fetchTreeData',
    async (_, { dispatch, rejectWithValue }) => {
        try {
            const { adminService } = SetupApiWithToken();
            const response = await adminService.getDishTree();
            return response.data.dataTree;
        } catch (error) {
            dispatch(setError(error.message));
            return rejectWithValue(error.message);
        }
    }
);
const initialState = {
    treeData: null,
    isLoading: false,
    error: null,
};

const sectionsSlice = createSlice({
    name: 'sections',
    initialState,
    reducers: {
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTreeData.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchTreeData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.treeData = action.payload;
            })
            .addCase(fetchTreeData.rejected, (state) => {
                state.isLoading = false;
            });
    },
});

export const { reducer: sectionsReducer, actions: { setError } } = sectionsSlice;

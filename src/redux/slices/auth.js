import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils";

export const fetchAuth = createAsyncThunk(
    "auth/fetchAuth",

    async (params) => {
        const { data } = await axios.post("auth/login", params);

        return data
    }
);

export const fetchAuthMe = createAsyncThunk(
    "auth/fetchAuthMe",

    async () => {
        const { data } = await axios.get("auth/me");

        return data
    }
);

export const fetchAuthRegister = createAsyncThunk(
    "auth/fetchAuthRegister",

    async (params) => {
        const { data } = await axios.post("auth/register", params);

        return data
    }
);

const initialState = {
    data: null,
    status: "loading",
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state => {
            state.data = null
        })
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAuth.pending, (state) => {
            state.data = null;
            state.status = "loading";
        });
        builder.addCase(fetchAuth.fulfilled, (state, { payload }) => {
            state.data = payload;
            state.status = "load";
        });
        builder.addCase(fetchAuth.rejected, (state) => {
            state.data = null;
            state.status = "error";
        });

        builder.addCase(fetchAuthMe.pending, (state) => {
            state.data = null;
            state.status = "loading";
        });
        builder.addCase(fetchAuthMe.fulfilled, (state, { payload }) => {
            state.data = payload;
            state.status = "load";
        });
        builder.addCase(fetchAuthMe.rejected, (state) => {
            state.data = null;
            state.status = "error";
        });

        builder.addCase(fetchAuthRegister.pending, (state) => {
            state.data = null;
            state.status = "loading";
        });
        builder.addCase(fetchAuthRegister.fulfilled, (state, { payload }) => {
            state.data = payload;
            state.status = "load";
        });
        builder.addCase(fetchAuthRegister.rejected, (state) => {
            state.data = null;
            state.status = "error";
        });


    },
});


export const selectIsAuth = (state => Boolean(state.auth.data));


export const { logout } = authSlice.actions;

export default authSlice.reducer;

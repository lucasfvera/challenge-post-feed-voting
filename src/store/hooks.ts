import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "./store";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const useTypedDispatch = useDispatch.withTypes<AppDispatch>();
export const useTypedSelector = useSelector.withTypes<RootState>();
export const createAppAsyncThunk = createAsyncThunk.withTypes<{
    state: RootState;
    dispatch: AppDispatch;
}>();

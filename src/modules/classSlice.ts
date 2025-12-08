import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { StarClass } from "./types";

const classesSlice = createSlice({
  name: "classes",
  initialState: {
    classes: null as StarClass[] | null,
    filterName: "",
  },
  reducers: {
    setClasses(state, action: PayloadAction<StarClass[] | null>) {
      state.classes = action.payload;
    },
    setFilterName(state, action: PayloadAction<string>) {
      state.filterName = action.payload;
    },
  },
});

export const useClasses = () =>
  useSelector(
    (state: ReturnType<typeof classesSlice.getInitialState>) => state.classes
  );

export const useFilterName = () =>
  useSelector(
    (state: ReturnType<typeof classesSlice.getInitialState>) => state.filterName
  );

export const { setClasses, setFilterName } = classesSlice.actions;

export default classesSlice.reducer;

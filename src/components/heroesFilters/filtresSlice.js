import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/http.hook";

const filtersAdapter = createEntityAdapter({
    selectId: (filter) => filter.name
});

// const initialState = {
//     filters: [],
//     filtersLoadingStatus: 'idle',
//     activeFilter: 'all'
// }

const initialState = filtersAdapter.getInitialState({
    filtersLoadingStatus: 'idle',
    activeFilter: 'all'
});

export const fetchFilters = createAsyncThunk(
    'filters/fetchFilters',
    () => {
        const {request} = useHttp();
        return request("http://localhost:3001/filters");
    }
);

const filtersSlice = createSlice({
    name: 'filtres',
    initialState,
    reducers: {
        filtersChanged: (state, action) => { state.activeFilter = action.payload }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchFilters.pending, state => { state.filtersLoadingStatus = 'loading' })
            .addCase(fetchFilters.fulfilled, (state, action) => {
                // state.filters = action.payload;
                filtersAdapter.setAll(state, action.payload);
                state.filtersLoadingStatus = 'idle';
            })
            .addCase(fetchFilters.rejected, state => { state.filtersLoadingStatus = 'error' })
            .addDefaultCase(() => {})
    }
});

const {actions, reducer} = filtersSlice;

export default reducer;

export const {selectAll} = filtersAdapter.getSelectors(state => state.filters);

//export const getFilters = selectAll(store.getState()); // store еще нужно импортировать. Это пример
// почему это не будет работть? Потому что если сюда импортировать store до того как он был создан тут будет undefined

export const {
    filtersFetching,
    filtersFetched,
    filtersFetchingError,
    filtersChanged
} = actions;
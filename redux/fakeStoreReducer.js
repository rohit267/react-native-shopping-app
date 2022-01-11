import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {fakeStore} from '../utility/configs/fakestore';

const fakeStoreSlice = createSlice({
  name: 'fakeStore',
  initialState: {
    products: [],
  },
  reducers: {
    setProducts(state, action) {
      state.products = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(getAllProducts.fulfilled, (state, action) => {
      state.products = action.payload;
    });
  },
});

export const getAllProducts = createAsyncThunk('products/getAllProducts', async () => {
  try {
    let pResponse = await axios.get(
      fakeStore.baseUrl + fakeStore.productByLimit + 20,
    );
    return pResponse.data;
  } catch (e) {
    console.log(e);
    return [];
  }
});

export const {setProducts} = fakeStoreSlice.actions;
export default fakeStoreSlice.reducer;

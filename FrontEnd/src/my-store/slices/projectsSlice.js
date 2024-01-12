import { createSlice, current, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from 'src/utils/my-axios';

const initialState = {
  projects: [],
  status: 'idle',
};

// get users
export const getProjects = createAsyncThunk('project/getProjects', async () => {
  let data;
  try {
    const response = await axiosInstance.get(`/projects`);
    data = await response.data;
    if (response.status === 200) {
      return data;
    }
    throw new Error(response.statusText);
  } catch (err) {
    const error = err;
    return Promise.reject(error.message ? error.message : data?.message);
  }
});

// export const createUser = createAsyncThunk('api/crate-user', async (values, thunkApi) => {
//   let data;
//   let newValues = { phoneNumber: `${values.phoneNumber}`, ...values };

//   try {
//     const response = await axiosInstance.post(`/projcts`, { ...newValues });
//     data = await response.data;
//     if (response.status === 200) {
//       thunkApi.dispatch(getProjects({ query: '' }));
//       return data;
//     }
//     throw new Error(response.statusText);
//   } catch (err) {
//     const error = err;
//     return Promise.reject(error.response.data.message || 'Something Went Wrong');
//   }
// });
// delete user
// export const deleteUser = createAsyncThunk('api/delete-user', async (id, thunkApi) => {
//   let data;
//   try {
//     const response = await axiosInstance.delete(`/projcts/${id}`);
//     data = await response.data;
//     if (response.status === 200) {
//       thunkApi.dispatch(getProjects({ query: '' }));
//       return data;
//     }
//     throw new Error(response.statusText);
//   } catch (err) {
//     const error = err;
//     return Promise.reject(error.message ? error.message : error.error);
//   }
// });

// // get one user
// export const getUser = createAsyncThunk('api/get-user', async (id) => {
//   let data;
//   try {
//     const response = await axiosInstance.get(`/projcts/${id}`);
//     data = await response.data;
//     if (response.status === 200) {
//       return data;
//     }
//     throw new Error(response.statusText);
//   } catch (err) {
//     const error = err;
//     return Promise.reject(error.message ? error.message : error.error);
//   }
// });

// // edit user
// export const updateUser = createAsyncThunk('api/edit-user', async (query, thunkApi) => {
//   let data;
//   let newValues = { phoneNumber: `${query.values.phoneNumber}`, ...query };

//   let { values, id } = newValues;

//   try {
//     const response = await axiosInstance.put(`/projcts/${id}`, { ...values });

//     data = await response.data;
//     if (response.status === 200) {
//       thunkApi.dispatch(getProjects({ query: '' }));
//       return data;
//     }
//     throw new Error(response.statusText);
//   } catch (err) {
//     const error = err;
//     return Promise.reject(error.response.data.message || 'Something Went Wrong');
//   }
// });

export const projectsSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProjects.pending, (state) => {})
      .addCase(getProjects.fulfilled, (state, action) => {
        state.projects = action.payload;
      })
      .addCase(getProjects.rejected, (state, action) => {});

    //   .addCase(createUser.pending, (state) => {})
    //   .addCase(createUser.fulfilled, (state, action) => {})
    //   .addCase(createUser.rejected, (state, action) => {});
  },
});

export default projectsSlice.reducer;

import { createSlice, current, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from 'src/utils/my-axios';

const initialiseMembers = (users) => {
  return users?.map((member) => {
    return { ...member, checked: false };
  });
};

const initialState = {
  members: [],
  searchItems: [],
  meta: {},
  user: {},
  roles: [],
  state: 'idle',
  error: null,
  message: null,
  loading: null,
  searchString: '',
};

//get users
export const getUsers = createAsyncThunk('api/users', async ({ query }) => {
  let data;
  // let str = page && limit && search ? `?search=${search}page=${page}&limit=${limit}` : "";
  try {
    const response = await axiosInstance.get(`/users${query}`);
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

//get roles
// export const getRoles = createAsyncThunk("api/roles", async () => {
//   let data;
//   try {
//     const response = await axios.get(`/roles`);
//     data = await response.data;
//     if (response.status === 200) {
//       return data;
//     }
//     throw new Error(response.statusText);
//   } catch (err) {
//     const error = err;
//     return Promise.reject(error.message ? error.message : data?.message);
//   }
// });

export const createUser = createAsyncThunk('api/crate-user', async (values, thunkApi) => {
  let data;
  let newValues = { phoneNumber: `${values.phoneNumber}`, ...values };

  try {
    const response = await axiosInstance.post(`/users`, { ...newValues });
    data = await response.data;
    if (response.status === 200) {
      thunkApi.dispatch(getUsers({ query: '' }));
      return data;
    }
    throw new Error(response.statusText);
  } catch (err) {
    const error = err;
    return Promise.reject(error.response.data.message || 'Something Went Wrong');
  }
});
// delete user
export const deleteUser = createAsyncThunk('api/delete-user', async (id, thunkApi) => {
  let data;
  try {
    const response = await axiosInstance.delete(`/users/${id}`);
    data = await response.data;
    if (response.status === 200) {
      thunkApi.dispatch(getUsers({ query: '' }));
      return data;
    }
    throw new Error(response.statusText);
  } catch (err) {
    const error = err;
    return Promise.reject(error.message ? error.message : error.error);
  }
});

// get one user
export const getUser = createAsyncThunk('api/get-user', async (id) => {
  let data;
  try {
    const response = await axiosInstance.get(`/users/${id}`);
    data = await response.data;
    if (response.status === 200) {
      return data;
    }
    throw new Error(response.statusText);
  } catch (err) {
    const error = err;
    return Promise.reject(error.message ? error.message : error.error);
  }
});

// edit user
export const updateUser = createAsyncThunk('api/edit-user', async (query, thunkApi) => {
  let data;
  let newValues = { phoneNumber: `${query.values.phoneNumber}`, ...query };

  let { values, id } = newValues;

  try {
    const response = await axiosInstance.put(`/users/${id}`, { ...values });

    data = await response.data;
    if (response.status === 200) {
      thunkApi.dispatch(getUsers({ query: '' }));
      return data;
    }
    throw new Error(response.statusText);
  } catch (err) {
    const error = err;
    return Promise.reject(error.response.data.message || 'Something Went Wrong');
  }
});

export const updateUserPassword = createAsyncThunk(
  'api/edit-user-password',
  async (query, thunkApi) => {
    let data;
    let { password, id } = query;
    try {
      const response = await axiosInstance.put(`/users/${id}/password`, { password });
      data = await response.data;
      if (response.status === 200) {
        return data;
      }
      throw new Error(response.statusText);
    } catch (err) {
      const error = err;
      return Promise.reject(error.message ? error.message : error.error);
    }
  }
);
//activate / deactivate multiple users
export const changeUserStatus = createAsyncThunk('api/activate-users', async (values, thunkApi) => {
  let data;
  try {
    const response = await axios.put(`/admin/users/status`, { ...values });
    data = await response.data;
    if (response.status === 200) {
      thunkApi.dispatch(getUsers({ query: '?page=1&limit=8' }));
      return data;
    }
    throw new Error(response.statusText);
  } catch (err) {
    const error = err;

    return Promise.reject(error.message ? error.message : error.error);
  }
});

export const memberSlice = createSlice({
  name: 'member',
  initialState,
  reducers: {
    selectAll: (state, action) => {
      state.members = current(state).members.map((member) => {
        return { ...member, checked: action.payload };
      });
    },
    selectById: (state, action) => {
      state.members = current(state).members.map((member) => {
        if (member.username === action.payload.id)
          return { ...member, checked: action.payload.value };
        return member;
      });
    },
    setUsers: (state, action) => {
      state.members = action.payload;
    },
    setSearchString: (state, action) => {
      state.searchString = action.payload;
    },
    resetmemberSliceData: (state, action) => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {})
      .addCase(getUsers.fulfilled, (state, action) => {
        console.log(action);
        state.members = action.payload.docs;
      })
      .addCase(getUsers.rejected, (state, action) => {
        console.log(action);
      });
    builder
      .addCase(createUser.pending, (state) => {})
      .addCase(createUser.fulfilled, (state, action) => {})
      .addCase(createUser.rejected, (state, action) => {});
    //get users
    // [getUsers.pending]: (state) => {
    //   state.error = null;
    //   state.state = 'loading';
    // },
    // [getUsers.fulfilled]: (state, action) => {
    //   const users = action.payload.users;
    //   const newData = initialiseMembers(users);
    //   state.members = newData;
    //   state.searchItems = newData;
    //   state.meta = action.payload.meta;
    //   state.state = 'success';
    // },
    // [getUsers.rejected]: (state, action) => {
    //   state.error = action.error.message;
    //   state.state = 'error';
    // },
    //get roles
    // [getRoles.pending]: (state) => {
    //   state.error = null;
    // },
    // [getRoles.fulfilled]: (state, action) => {
    //   const roles = action.payload;
    //   state.roles = roles;
    // },
    // [getRoles.rejected]: (state, action) => {
    //   state.error = action.error.message;
    // },
    //create user
    // [createUser.pending]: (state) => {
    //   state.error = null;
    //   state.state = 'loading';
    // },
    // [createUser.fulfilled]: (state, action) => {
    //   const user = action.payload;
    //   state.members = [user, ...state.members];
    //   state.state = 'success';
    // },
    // [createUser.rejected]: (state, action) => {
    //   state.error = action.error.message;
    //   state.state = 'error';
    // },
    // //get user
    // [getUser.pending]: (state) => {
    //   state.error = null;
    //   state.state = 'loading';
    // },
    // [getUser.fulfilled]: (state, action) => {
    //   const user = action.payload;
    //   state.state = 'success';
    //   state.user = user;
    // },
    // [getUser.rejected]: (state, action) => {
    //   state.error = action.error.message;
    //   state.state = 'error';
    // },
    // // updateUser
    // [updateUser.pending]: (state) => {
    //   state.error = null;
    //   state.state = 'loading';
    // },
    // [updateUser.fulfilled]: (state, action) => {
    //   const { fullName } = action.payload;
    //   state.user['fullName'] = fullName;
    //   state.state = 'success';
    // },
    // [updateUser.rejected]: (state, action) => {
    //   state.error = action.error.message;
    //   state.state = 'error';
    // },
  },
});

export const { selectAll, selectById, setUsers, setSearchString, resetmemberSliceData } =
  memberSlice.actions;

export default memberSlice.reducer;

import AsyncStorage from '@react-native-async-storage/async-storage';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {ApiResponse, setAuthorization} from '../../api/apiCore';
import {getUser as getUserApi} from '../../api/user';
import {AsyncThunkConfig} from '@reduxjs/toolkit/dist/createAsyncThunk';

export interface User {
  _id: string;
  fullName: string;
  email: string;
  gender: 'Male' | 'Female';
  dob: string | Date;
}

export interface UserResponse extends ApiResponse {
  user?: User;
}

export interface UserState {
  isAuthorized: boolean;
  isAuthorizing: boolean;
  authorizationError: string;
  user: User | null;
  accessToken: string;
}

const INIT_USER_STATE: UserState = {
  isAuthorized: false,
  isAuthorizing: true,
  authorizationError: '',
  user: null,
  accessToken: '',
};

export const getUser = createAsyncThunk<
  string | undefined | any,
  void,
  AsyncThunkConfig
>('@@user/FETCH_USER', async (data: any, thunkAPI) => {
  try {
    //   const {accessToken} = thunkAPI.getState() as UserState;
    //   if (accessToken) {
    //     return thunkAPI.rejectWithValue('Not Authenticated');
    //   }
    const response = (await getUserApi()) as unknown as UserResponse;
    if (response.user) {
      return response.user;
    }
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const getCurrentSession = createAsyncThunk<
  string | undefined,
  void,
  AsyncThunkConfig
>('@@user/GET_SESSION', async (data: any, thunkAPI) => {
  try {
    const accessToken = await AsyncStorage.getItem('accessToken');
    if (accessToken) {
      setAuthorization(accessToken);
      return accessToken;
    }
    return thunkAPI.rejectWithValue('');
  } catch (error) {
    console.log('Error while getting session');
    return thunkAPI.rejectWithValue(error);
  }
});

const userSlice = createSlice({
  name: 'User',
  initialState: INIT_USER_STATE,
  reducers: {
    endAuthorization: (state: UserState, action) => {
      state.isAuthorized = false;
      state.isAuthorizing = false;
      state.authorizationError = 'No Internet!';
    },
  },
  extraReducers: builder => {
    builder.addCase(getUser.pending, (state: UserState, action) => {
      state.isAuthorizing = true;
      state.isAuthorized = false;
    });
    builder.addCase(getUser.fulfilled, (state: UserState, action) => {
      state.isAuthorized = true;
      state.isAuthorizing = false;
      state.user = action.payload as User;
    });
    builder.addCase(getUser.rejected, (state: UserState, action) => {
      state.isAuthorized = false;
      state.isAuthorizing = false;
      state.authorizationError = action.payload as string;
      state.user = null;
    });

    // For getting current Session
    builder.addCase(
      getCurrentSession.pending,
      (state: UserState, action) => {},
    );

    builder.addCase(
      getCurrentSession.fulfilled,
      (state: UserState, action: any) => {
        state.accessToken = action.payload;
      },
    );

    builder.addCase(
      getCurrentSession.rejected,
      (state: UserState, action: any) => {
        state.accessToken = '';
      },
    );
  },
});

export default userSlice.reducer;
export const {endAuthorization} = userSlice.actions;

import { PayloadAction, Slice, createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  user_login: false,
  user_logout: false,
  user_register: false,
  user_reminder: false,
  user_DateOfBirth: '',
  user_email: '',
  user_firstName: '',
  user_lastName: '',
};

interface IPayloadLogin {
  user_logout: boolean,
  user_login: boolean,
  user_register: boolean,
  user_reminder: boolean,
  user_DateOfBirth: string,
  user_email: string,
  user_firstName: string,
  user_lastName: string,
};

const slice: Slice = createSlice({
  name: 'safari',
  initialState: INITIAL_STATE,
  reducers: {
    statusLogin(state, { payload }: PayloadAction<boolean>) {
      return {
        ...state,
        user_login: payload,
      };
    },
    addDataUser(state, { payload }: PayloadAction<IPayloadLogin>) {
      return {
        state,
        ...payload,
      };
    },
    statusRegister(state, { payload }: PayloadAction<boolean>) {
      return {
        ...state,
        user_register: payload,
      };
    },
    statusForget(state, { payload }: PayloadAction<IPayloadLogin>) {
      return {
        ...state,
        user_reminder: payload,
      };
    },
    logoutUser(state, { payload }: PayloadAction<IPayloadLogin>) {
      return {
        ...state,
        user_logout: payload,
      };
    },
  },
});

export default slice.reducer;

export const {
  statusLogin,
  statusRegister,
  statusForget,
  addDataUser,
  logoutUser,
} = slice.actions;

export const useSlice = (state: any) => {
  return state.slice;
};

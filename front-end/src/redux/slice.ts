import { PayloadAction, Slice, createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  user_login: false,
  user_logout: false,
  user_register: false,
  user_reset_password: false,
  user_change_password: false,
  user_DateOfBirth: '',
  user_email: '',
  user_firstName: '',
  user_lastName: '',
  user_type: 'buyer',
};

interface IPayloadLogin {
  user_logout: boolean,
  user_login: boolean,
  user_register: boolean,
  user_reset_password: boolean,
  user_change_password: boolean,
  user_DateOfBirth: string,
  user_email: string,
  user_firstName: string,
  user_lastName: string,
  user_type: string,
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
    statusReset(state, { payload }: PayloadAction<IPayloadLogin>) {
      return {
        ...state,
        user_reset_password: payload,
      };
    },
    statusChange(state, { payload }: PayloadAction<IPayloadLogin>) {
      return {
        ...state,
        user_change_password: payload,
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
  statusReset,
  statusChange,
  addDataUser,
  logoutUser,
} = slice.actions;

export const useSlice = (state: any) => {
  return state.slice;
};

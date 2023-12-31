import * as types from "../action-types";
import { getToken } from "@/utils/token";
const initUserInfo = {
  name: "",
  role: "",
  avatar:"",
  token: getToken(),
};
export default function user(state = initUserInfo, action) {
  switch (action.type) {
    case types.USER_SET_USER_TOKEN:
      return {
        ...state,
        token: action.token
      };
    case types.USER_SET_USER_INFO:
      return {
        ...state,
        userId: action.user_id,
        userName: action.username,
        fullName: action.full_name,
        email: action.email,
        emailVerify: action.email_verify,
        phoneNumber: action.phone_number,
        phoneVerify: action.phone_verify,
        avatar: action.image_file,
      };
    case types.USER_RESET_USER:
      return {};
    default:
      return state;
  }
}

import { publicRequest } from "../requestMethods";
import { loginSucess, loginStart, loginFailure } from "./userSlice";

const login = async (user, dispatch) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSucess(res.data));
  } catch (error) {
    dispatch(loginFailure());
  }
};



export default login;

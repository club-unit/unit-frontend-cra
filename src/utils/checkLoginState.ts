import Cookies from "js-cookie";
import { REFRESH_COOKIE_NAME } from "src/constants/jwt";

function checkLoginState() {
  return { isLoggedIn: Boolean(Cookies.get(REFRESH_COOKIE_NAME)) };
}

export default checkLoginState;

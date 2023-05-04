import axios from "axios";
import { getJwtToken } from "../apis/auth";
import { router } from "../routes";
import { store } from "../store";

export async function request(
  url,
  { method = "GET", data, headers, auth = true } = {}
) {
  try {
    let res = await axios({
      method: method,
      url: url,
      headers: {
        "Content-Type": "application/json",
        // 展開運算符 (spread operator) + 短路運算符 (short-circuit operator) 
        ...(auth && { Authorization: `Bearer ${getJwtToken()}` }),
        ...headers,
      },
      ...(data && { data: JSON.stringify(data) }),
    });
    res.error = true;
    return res;
  } catch (error) {
    const res = { error: true };
    if (error.response.status === 401) {
      if (router.currentRoute.value.fullPath === "/login") {
        alert("帳號或密碼有誤!")
      } else {
        alert("請重新登入!");
        await store.dispatch("logoutUser");
        router.push("/login");
      }
    }
    return res;
  }
}
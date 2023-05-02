import axios from "axios";
import { getJwtToken } from "../apis/auth";
import { router } from "../routes";
import { store } from "../store";

export async function request(
  url,
  { method = "GET", data, headers, auth = true } = {}
) {
  try {
    const res = await axios({
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
    return res;
  } catch (error) {

    // console.log(error.response.status);
    // 如果status是401，就呼叫logout函式
    if (error.response.status === 401) {
      alert("請重新登入!");
      await store.dispatch("logoutUser");
      router.push("/login");
    }
  }

  // 這邊可以對請求錯誤做初步的處裡
  // if (res.status > 400) {

  // }
  // if (res.status == 401) {
  //   await store.dispatch("logoutUser");
  // }

  // console.log(res.status)
  // console.log(res)
  // 加上status屬性


}
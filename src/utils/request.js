import axios from "axios";
import { useStore } from "vuex";
import { getJwtToken } from "../apis/auth";

const store = useStore();

export async function request(
  url,
  { method = "GET", data, headers, auth = true } = {}
) {
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

  // 這邊可以對請求錯誤做初步的處裡
  // if (res.status > 400) {

  // }
  // if (res.status == 403) {
  //   await store.dispatch("logoutUser");
  // }
  // console.log(res.data);
  // console.log("res.data");
  return res;
}
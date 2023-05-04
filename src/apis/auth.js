import { request } from "../utils/request";

export function getJwtToken() {
  return localStorage.getItem("jwtToken");
}

export function setJwtToken(jwt) {
  localStorage.setItem("jwtToken", jwt);
}

export function saveUser(user) {
  // localstorage只支持儲存文本類型的數據，因此需使用JSON.stringify()
  localStorage.setItem("user", JSON.stringify(user));
}

export function getUser() {
  return JSON.parse(localStorage.getItem("user"));
}

export async function register(email, username, password) {
  const result = await request("http://localhost:8080/users/register", {
    method: "POST",
    auth: false,
    data: {
      email,
      username,
      password,
      // name: username,
    },
  });

  // 處理異常錯誤 (驗證表單輸入、伺服器錯誤等)
  // if(...){}

  const data = result.data;
  setJwtToken(data.jwt);
  saveUser(data.user);
  return data.user;
}

export async function login(email, password) {
  const result = await request("http://localhost:8080/users/login", {
    method: "POST",
    auth: false,
    data: {
      email,
      password,
    },
  });

  // 處理異常錯誤 (驗證表單輸入、伺服器錯誤等)
  // if(...){}

  const data = result.data;
  setJwtToken(data.jwt);
  saveUser(data.user);
  return data.user;
}

export function logout() {
  localStorage.removeItem("jwtToken");
  localStorage.removeItem("user");
}

// user修改
export async function modifyUserApi(user) {
  const response = await request(
    `http://localhost:8080/users/${getUser().userId}`,
    {
      method: "POST",
      auth: true,
      data: {
        name: user.name,
        cellphone: user.cellphone,
        address: user.address,
        gender: user.gender
      }
    });
  saveUser(response.data);
  return response.data;

}

// 取得所有user
export async function getUserListApi() {
  const response = await request(
    `http://localhost:8080/admin/users`,
    {
      method: "GET",
      auth: true,
      data: {}
    });
  return response.data;
}

// 取得要modify的user
export async function getModifyUserApi(userId) {
  const response = await request(
    `http://localhost:8080/admin/users/${userId}`,
    {
      method: "GET",
      auth: true,
      data: {}
    });
  return response.data;
}

// admin modify user
export async function adminModifyUserApi(user) {
  const response = await request(
    `http://localhost:8080/users/${user.userId}`,
    {
      method: "POST",
      auth: true,
      data: {
        name: user.name,
        cellphone: user.cellphone,
        address: user.address,
        gender: user.gender
      }
    });
  return response.data;

}
import axios from "axios";

const BASE_URL = "http://localhost:5000/api/";
const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MTg5NTc3MzE5NmMxMmMzZGJhZWIwNiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY4MDU0NTI0NSwiZXhwIjoxNjgwODA0NDQ1fQ.2Ndl_E95UMWu-YnFwxhagfpwcKEm5q4wmRMk7tc-A4A";

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  header: { token: `Bearer ${TOKEN}` },
});

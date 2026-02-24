import http from "k6/http";
import { check, sleep } from "k6";

export default function () {
  const url = "http://localhost:8080/api/auth/login";
  const payload = JSON.stringify({
    username: "testuser",
    password: "password123",
  });
  const params = { headers: { "Content-Type": "application/json" } };

  const res = http.post(url, payload, params);
  check(res, { "status is 200": (r) => r.status === 200 });
  sleep(0.1); 
}

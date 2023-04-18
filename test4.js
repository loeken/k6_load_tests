// test_auth.js
import http from 'k6/http';
import { check } from 'k6';

export default function () {
  const url = 'http://localhost:8080/api/v1/auth';
  const headers = {
    'accept': 'application/json',
    'Content-Type': 'application/json',
  };
  const payload = JSON.stringify({
    email: 'loeken@internetz.me',
    password: 'password',
  });

  const response = http.post(url, payload, { headers: headers });

  check(response, {
    'status is 200': (r) => r.status === 200,
  });
}

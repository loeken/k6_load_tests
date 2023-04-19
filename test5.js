import http from 'k6/http';
import { check } from 'k6';
import { sleep } from 'k6';

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
  sleep(1)
}

export let options = {
  stages: [
    { duration: '30s', target: 10000 }, // ramp up to 10000 RPS over 30 seconds
    { duration: '1m', target: 10000 }, // stay at 10000 RPS for 1 minute
    { duration: '30s', target: 0 }, // ramp down to 0 RPS over 30 seconds
  ],
};

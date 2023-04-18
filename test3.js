import http from 'k6/http';
import { check, sleep } from 'k6';

export const URL = 'http://localhost';

export default function () {
  let res = http.get(URL);
  check(res, {
          'resource returns status 200': (r) => r.status === 200,
      });
  getResources(res);
  sleep(1);
}

export function resolveUrl(url, baseUrl) {
    if (url.indexOf("/") == 0) {
        return baseUrl + url;
    }
    return url;
}

export function createHeader(baseUrl) {
    return {
        "Referer": baseUrl
    };
}

export function getResources(response) {
const resources = [];
response
    .html()
    .find('*[href]:not(a)')
    .each((index, element) => {
    resources.push(element.attributes().href.value);
    });
response
    .html()
    .find('*[src]:not(a)')
    .each((index, element) => {
    resources.push(element.attributes().src.value);
    });

    const responses = http.batch(
    resources.map((r) => {
        return ['GET', resolveUrl(r, response.url), null, { headers: createHeader(response.url) }];
    })
    );
    responses.forEach(() => {
    check(response, {
        'resource returns status 200': (r) => r.status === 200,
    });
    });
}

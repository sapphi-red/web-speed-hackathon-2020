import timeout from 'race-timeout';
import axiosMod from 'axios';
import { setupMockAPIData } from './mock';

const TIMEOUT = 20 * 1000;
const API_ENDPOINT = window.location.origin;

const axios = axiosMod.create({
  baseURL: API_ENDPOINT,
});
if (process.env.USE_MOCK_DATA === 'true') {
  setupMockAPIData(axios);
}

export async function fetch(path, params = {}) {
  const requestWithTimeout = timeout(axios.get(path, { params }), TIMEOUT);
  const res = await requestWithTimeout;

  if (res === 'timeout') {
    throw new Error(`Timeout: ${path}`);
  }

  const payload = res?.data?.data;

  if (!payload || typeof payload !== 'object') {
    throw new Error(`Invalid response for ${path}: ${JSON.stringify(res)}`);
  }

  return payload;
}

export async function post(path, data) {
  const requestWithTimeout = timeout(axios.post(path, data), TIMEOUT);
  const res = await requestWithTimeout;

  if (res.status !== 200) {
    throw new Error(
      `Invalid response for ${path} with ${JSON.stringify(data)}: status ${
        res.status
      }`,
    );
  }

  return res;
}

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
  const requestWithTimeout = axios.get(path, {
    params,
    timeout: TIMEOUT,
  });

  try {
    const res = await requestWithTimeout;
    const payload = res?.data?.data;

    if (!payload || typeof payload !== 'object') {
      throw new Error(`Invalid response for ${path}: ${JSON.stringify(res)}`);
    }

    return payload;
  } catch (err) {
    if (err.code === 'ECONNABORTED') {
      throw new Error(`Timeout: ${path}`);
    }
    throw err;
  }
}

export async function post(path, data) {
  const requestWithTimeout = axios.post(path, data, {
    timeout: TIMEOUT,
  });
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

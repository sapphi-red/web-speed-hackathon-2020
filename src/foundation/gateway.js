import { setupMock, fetch as fetchMock, post as postMock } from './mock';

export const TIMEOUT = 20 * 1000;
export const API_ENDPOINT = window.location.origin;

setupMock();

const raceTimeout = (promise, ms) => {
  const timeout = new Promise((_, reject) => {
    setTimeout(() => {
      reject('timeout');
    }, ms);
  });
  return Promise.race([promise, timeout]);
};

export async function fetch(path, params = {}) {
  if (process.env.USE_MOCK_DATA === 'true') {
    return fetchMock(path, params);
  }

  const url = new URL(path, API_ENDPOINT);
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined) url.searchParams.append(k, v);
  });

  try {
    const res = await raceTimeout(window.fetch(url.toString()), TIMEOUT);
    const payload = (await res.json())?.data;

    if (!payload || typeof payload !== 'object') {
      throw new Error(`Invalid response for ${path}: ${JSON.stringify(res)}`);
    }
    return payload;
  } catch (err) {
    if (err === 'timeout') {
      throw new Error(`Timeout: ${path}`);
    }
    throw err;
  }
}

export async function post(path, data) {
  if (process.env.USE_MOCK_DATA === 'true') {
    return postMock(path, data);
  }

  const url = new URL(path, API_ENDPOINT);

  try {
    const res = await raceTimeout(
      window.fetch(url.toString(), {
        method: 'POST',
        body: JSON.stringify(data),
      }),
      TIMEOUT,
    );

    if (res.status !== 200) {
      throw new Error(
        `Invalid response for ${path} with ${JSON.stringify(data)}: status ${
          res.status
        }`,
      );
    }
    return res;
  } catch (err) {
    if (err === 'timeout') {
      throw new Error(`Timeout: ${path}`);
    }
    throw err;
  }
}

const tzOffsetMin = -new Date().getTimezoneOffset();
const tzOffsetHMin = tzOffsetMin % 60;
const tzOffsetHour = (tzOffsetMin - tzOffsetHMin) / 60;

const nDigitize = (n) => (m) => ('' + m).padStart(n, '0');
const twoDigitize = nDigitize(2);
const fourDigitize = nDigitize(4);

export const UTCISOtoLocalISO = (UTC) => {
  if (typeof UTC !== 'number') {
    UTC = Date.parse(UTC);
  }
  const local = new Date(UTC + tzOffsetMin * 60 * 1000);
  const suffix = `${tzOffsetMin > 0 ? '+' : ''}${twoDigitize(
    tzOffsetHour,
  )}:${twoDigitize(tzOffsetHMin)}`;
  return local.toISOString().slice(0, -1) + suffix;
};

export const format = (date) => {
  const d = new Date(date);
  return `${fourDigitize(d.getFullYear())}-${twoDigitize(
    d.getMonth() + 1,
  )}-${twoDigitize(d.getDate())}`;
};

export const fromNow = (date) => {
  const oldT = typeof date === 'number' ? date : Date.parse(date);
  const nowT = Date.now();

  // 秒単位
  const diff = (nowT - oldT) / 1000;

  if (diff < 45) return 'a few seconds ago';
  if (diff < 90) return 'a minute ago';
  if (diff < 45 * 60) {
    return `${Math.floor(diff / 60)} minutes ago`;
  }
  if (diff < 90 * 60) return 'an hour ago';

  const diffHour = diff / 60 / 60;
  if (diffHour < 22) {
    return `${Math.floor(diffHour)} hours ago`;
  }
  if (diffHour < 36) return 'a day ago';

  const diffDay = diffHour / 24;
  if (diffDay < 26) {
    return `${Math.floor(diffDay)} days ago`;
  }
  if (diffDay < 45) return 'a month ago';
  if (diffDay < 320) {
    return `${Math.floor(diffDay / 30)} months ago`;
  }
  if (diffDay < 548) return 'a year ago';
  return `${Math.floor(diffDay / 365)} years ago`;
};

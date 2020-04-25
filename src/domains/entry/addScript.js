export const addScript = (props) => {
  const $script = document.createElement('script');
  for (const [key, val] of Object.entries(props)) {
    $script[key] = val;
  }
  document.body.appendChild($script);
  return $script;
};

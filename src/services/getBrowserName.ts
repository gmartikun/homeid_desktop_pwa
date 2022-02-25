export const getBrowserName = () => {
  const userAgent = navigator.userAgent;

  if (userAgent.match(/chrome|chromium|crios/i)) {
    return "chrome";
  } else if (userAgent.match(/firefox|fxios/i)) {
    return "firefox";
  }

  return "";
};

export default getBrowserName;

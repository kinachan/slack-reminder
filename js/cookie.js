
const getAllCookies = () => {
  if (document.cookie === '') return null;
  const cookies = document.cookie.split('; ');
  const result = {};
  const cookieList = cookies.forEach(cookie => {
    const name = cookie.split('=')[0];
    const value = cookie.split('=')[1]
    result[name] = value;
  });
  return result;
}

const getCookie = (name) => {
  const cookies = getAllCookies();
  if (cookies == null || !cookies.includes(name)) return null;
  
  const value = cookies[name];

  return value;
}

const setCookie = (option) => {
  const {name, value, isMaxAge, expires, maxAge, domain, path, isSecure} = option;

  const keyValue = `${name}=${value},`
  
  let expiresString = expires == null ? '' : `expires=${expires}`;
  const oneMonth = new Date().getTime() + 60 * 60 * 24 * 30;
  const maxAgeVal = isMaxAge ? oneMonth.toString() : maxAge;
  const maxAgeString = isMaxAge ? ` max-age=${maxAgeVal},` : '';

  const domainString = domain != null ? ` domain=${domain},`: '';
  const pathString = path != null ? ` path=${path},`: '';

  const cookie = keyValue + maxAgeString + expiresString + domainString + pathString;
  document.cookie = cookie;
  return cookie;
}

// setCookie({
//   name: 'hoge', 
//   value: 234,
//   isMaxAge: true
// });

// getCookie('hoge');
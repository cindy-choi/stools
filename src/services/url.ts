const { protocol, hostname } = window.location;
let BASE = `${protocol}//${hostname}`; // 웹서버

if (process.env.NODE_ENV === 'development') {
  BASE = 'http://localhost:5059';
}

export const URL = {
  BASE: `${BASE}/api`, 
};


export default URL;

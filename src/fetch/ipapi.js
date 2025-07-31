export const getClientIPCountryCode = ()=>{
  return fetch("https://ipapi.co/json/")
  .then(response => response.json())
  .then(data => data.country);
}

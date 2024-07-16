// class CookieService {
//   // Function to set token and user information in cookie
//   setCookie(userData: any, minute: number) {
//       const date = new Date();
//       date.setTime(date.getTime() + (minute * 60 * 1000)); // Convert hours to milliseconds
//       const expires = "expires=" + date.toUTCString();
//       const cookieData = {
//           userData: userData,
//           xApiKey: this.getApiKeyFromCookie() // Include existing x-api-key if it exists
//       };
//       document.cookie = `userData=${JSON.stringify(cookieData)};${expires};path=/`;
//   }

//   // Function to get user information from cookie
//   getCookie() {
//       const cookieName = 'userData=';
//       const cookies = document.cookie.split(';');
//       for (let i = 0; i < cookies.length; i++) {
//           let cookie = cookies[i];
//           while (cookie.charAt(0) === ' ') {
//               cookie = cookie.substring(1);
//           }
//           if (cookie.indexOf(cookieName) === 0) {
//               const cookieDataString = cookie.substring(cookieName.length, cookie.length);
//               const cookieData = JSON.parse(cookieDataString);
//               const userData = cookieData.userData;
//               const xApiKey = cookieData.xApiKey;
//               return { userData, xApiKey };
//           }
//       }
//       return null;
//   }

//   // Function to set x-api-key in cookie
//   setApiKey(xApiKey: string, hours: number) {
//       const date = new Date();
//       date.setTime(date.getTime() + (hours * 60 * 60 * 1000)); // Convert hours to milliseconds
//       const expires = "expires=" + date.toUTCString();
//       const cookieData = {
//           userData: this.getUserDataFromCookie(), // Include existing user data if it exists
//           xApiKey: xApiKey
//       };
//       document.cookie = `userData=${JSON.stringify(cookieData)};${expires};path=/`;
//   }

//   // Function to get x-api-key from cookie
//   getApiKeyFromCookie() {
//       const cookieData = this.getCookie();
//       return cookieData ? cookieData.xApiKey : null;
//   }

//   // Function to get user data from cookie
//   getUserDataFromCookie() {
//       const cookieData = this.getCookie();
//       return cookieData ? cookieData.userData : null;
//   }

//   // Function to clear token and user information from cookie
//   clearCookie() {
//       document.cookie = "userData=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;";
//   }
// }

// export const cookieService = new CookieService()

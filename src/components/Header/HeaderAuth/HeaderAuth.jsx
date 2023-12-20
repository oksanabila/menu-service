// import React from 'react';
//import {Header} from "../Header";
// import {useCookies} from "react-cookie";
//
// const HeaderAuth = ({isToken}) => {
//     const handleClickAuth = () => {
//         // Проверяем, есть ли куки authToken
//         const authTokenCookie = document.cookie.split('; ').find(row => row.startsWith('authToken='));
//
//         if (authTokenCookie) {
//             // Устанавливаем куку с истекшим сроком годности (expires)
//             document.cookie = 'authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
//         }
//     };
//
//     return (
//         <Header>
//             <button onClick={handleClickAuth}>Exit</button>
//         </Header>
//     );
// };
//
// export {HeaderAuth};
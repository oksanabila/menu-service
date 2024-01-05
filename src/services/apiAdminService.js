// import axios from "axios";
//
// import { baseURL } from "../constants";
// import {useCookies} from "react-cookie";
//
//
// const apiAdminService = axios.create({
//     baseURL,
// });
//
//
// // const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJjb21wMSIsImV4cCI6MTcwODA2NzM4OX0.rlanUWkOu4b4Yo2AkO_6vCB9Y3oRCe4zyVTUyo6U-8o';
//
//
// const ApiAdminServiceWithToken = () => {
//     const [cookies] = useCookies(['authToken']);
//     console.log(cookies);
//     apiAdminService.interceptors.request.use(
//         (config) => {
//             config.headers.accept = 'application/json';
//             config.headers.Authorization = `Bearer ${token}`;
//             return config;
//         },
//         (error) => {
//             return Promise.reject(error);
//         }
//     );
//
//     return apiAdminService;
// };
//
// export { apiAdminService };




import axios from "axios";
import {baseURL, urls} from "../constants";
import { useCookies } from "react-cookie";

const SetupApiWithToken = () => {
    const [cookies] = useCookies(['authToken']);

    const apiAdminService = axios.create({
        baseURL,
    });


    //
    // if(cookies.authToken.update_time < new Date()) {
    //
    // } else {
        const token = cookies.authToken;
    // }

    apiAdminService.interceptors.request.use(
        (config) => {
            config.headers.accept = 'application/json';
            config.headers.Authorization = `Bearer ${token}`;
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    const adminService = {
        getAll: () => apiAdminService.get(urls.admin.getAll()),
        postCompanyData: (data) => {
            const jsonData = JSON.stringify(data);
            return apiAdminService.post(urls.admin.postCompanyData(), jsonData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        },
        getDishTree: () => apiAdminService.get(urls.admin.getDishTree()),
        createModifySection: (data) => {
            const jsonData = JSON.stringify(data);
            return apiAdminService.post(urls.admin.createModifySection(), jsonData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        },
        createModifyDish: (data) => {
            const jsonData = JSON.stringify(data);
            return apiAdminService.post(urls.admin.createModifyDish(), jsonData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        },
        uploadFile: (data) => {
            return apiAdminService.post(urls.admin.uploadFile(), data, {
                headers: {
                    'Content-Type': `multipart/form-data; boundary=${urls.boundary}`,
                },
            });
        },
        token: (data) => {
            const jsonData = JSON.stringify(data);
            return apiAdminService.post(urls.admin.token(), jsonData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        },

        getDishById: (dishId) => apiAdminService.get(urls.admin.getDishById(dishId)),

        setSectionActivity: (id, active) => {
            const jsonData = JSON.stringify(id, active);
            return apiAdminService.post(urls.admin.setSectionActivity(id, active), jsonData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        },
        setDishActivity: (id, active) => {
            const jsonData = JSON.stringify(id, active);
            return apiAdminService.post(urls.admin.setDishActivity(id, active), jsonData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        },
        // updateToken: (data) => {
        //     apiAdminService.get(urls.admin.updateToken(data), )
        // }
    };

    return { apiAdminService, adminService };
};

export { SetupApiWithToken };

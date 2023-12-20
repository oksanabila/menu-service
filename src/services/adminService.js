import {SetupApiWithToken} from "./apiAdminService";
import {urls} from "../constants";
const adminService = {
    getAll: () => SetupApiWithToken().get(urls.admin.getAll()),
    postCompanyData: (data) => {
        const jsonData = JSON.stringify(data);
        return SetupApiWithToken().post(urls.admin.postCompanyData(), jsonData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
    },
    getDishTree: () => SetupApiWithToken().get(urls.admin.getDishTree()),
    createModifySection: (data) =>  {
        const jsonData = JSON.stringify(data);
        return SetupApiWithToken().post(urls.admin.createModifySection(), jsonData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
    },
    createModifyDish: (data) =>  {
        const jsonData = JSON.stringify(data);
        return SetupApiWithToken().post(urls.admin.createModifyDish(), jsonData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
    },
    uploadFile: (data) =>  {
        return SetupApiWithToken().post(urls.admin.uploadFile(), data, {
            headers: {
                'Content-Type': `multipart/form-data; boundary=${urls.boundary}`,
            },
        });
    },
    token: (data) =>  {
        const jsonData = JSON.stringify(data);
        return SetupApiWithToken().post(urls.admin.token(), jsonData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

}

export {
    adminService
}

import {apiAdminService} from "./apiAdminService";
import {urls} from "../constants";

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

}

export {
    adminService
}

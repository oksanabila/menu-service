import {apiService} from "./apiService";
import {urls} from "../constants";

const companyService = {
    getAll: () => apiService.get(urls.company.getAll()),

}

export {
    companyService
}

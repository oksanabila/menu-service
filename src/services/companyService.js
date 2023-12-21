import {apiService} from "./apiService";
import {urls} from "../constants";

const companyService = {
    getAll: (companyLink) => apiService.get(urls.company.getAll(companyLink)),

}

export {
    companyService
}

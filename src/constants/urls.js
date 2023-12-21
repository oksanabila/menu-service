const baseURL = 'http://menu-service.me:8000'

const imgLink = 'http://menu-service.me/images/'


// "/admin/getcompany" -> "/admin/get_company"
// "/admin/cmcompany" -> "/admin/create_modify_company"
// "/admin/cmsection" -> "/admin/create_modify_section"
// "/admin/cmdish" -> "/admin/create_modify_dish"
// "/admin/getdishes" -> "/admin/get_dishes"
// "/admin/getdish" -> "/admin/get_dish"
// "/admin/getdishtree" -> "/admin/get_dish_tree"
// "/admin/uploadfile/" -> "/admin/upload_file/"
// "/signup" -> "/sign_up"

// const company = '/testcompany'//TODO
const admin = '/admin/get_company'
const cmcompany = '/admin/create_modify_company'
const getDishTree = '/admin/get_dish_tree'
const createModifySection = '/admin/create_modify_section'
const createModifyDish = '/admin/create_modify_dish'
const uploadFile = '/admin/upload_file/'
const token = '/admin/token/'
const updateToken = '/admin/update_token'
const getDishes = '/admin/get_dishes'
const getDish = '/admin/get_dish'

const urls = {
    company: {
        getAll: (companyLink) => `${companyLink}`

    },
    admin: {
        getAll: () => `${admin}`,
        postCompanyData: () =>`${cmcompany}`,// заменить ${cmcompany} на адрес /${url}`
        getDishTree: () =>`${getDishTree}`,
        createModifySection: () => `${createModifySection}`,
        createModifyDish: () => `${createModifyDish}`,
        uploadFile: () => `${uploadFile}`,
        token: () => `${token}`,
        updateToken: () => `${updateToken}`,
        getDishById: (dishId) => `${getDish}?id=${dishId}`,
        // boundary: () => `${boundary}`
    }
}

export {
    baseURL,
    urls,
    imgLink
}

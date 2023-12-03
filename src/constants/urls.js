const baseURL = 'http://menu-service.me:8000'

// const imgLink = 'https://image.tmdb.org/t/p/w500/'

const company = '/adriaticooo'
const admin = '/admin/getcompany'
const cmcompany = '/admin/cmcompany'


const urls = {
    company: {
        getAll: () => `${company}`
    },
    admin: {
        getAll: () => `${admin}`,
        postCompanyData: () =>`${cmcompany}`
    }
}

export {
    baseURL,
    urls
}

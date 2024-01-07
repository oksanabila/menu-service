export const AppRoutes = {
    MAIN: '/:companyLink/',
    MENU: '/:companyLink/menu/:tabName?', // tabName optional
    NOT_FOUND_PAGE: '/:companyLink/*',
    ADMIN: '/admin/*',
    COMPANY_DATA_TAB: '/admin/company-data-tab',
    MENU_TAB: '/admin/menu-tab',
    DISH_TAB: '/admin/dish-tab',
};

export const  environment = {
    production: false,
    // ~~~~~~~~~~~~~~~~~ API ~~~~~~~~~~~~~~~~~ //
    // apiUrlDon: 'http://192.168.1.73:8000/api',
    apiUrlAdmin: 'https://admin-api.eglise-mukasa.ci/api',
    apiUrlDon: 'https://donation-api.eglise-mukasa.ci/api',
    apiUrlMass: 'https://messe-api.eglise-mukasa.ci/api',

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~mass request~~~~~~~~~~~~~~~~~~~
    requestMassIsanonymous:'https://messe-api.eglise-mukasa.ci/api/requestmesse/isanonymous',
    requestMassNoanonymous: 'https://messe-api.eglise-mukasa.ci/api/requestmesse/Noanonymous',
    
    // ~~~~~~~~~~~~~~~ CAPTCHA ~~~~~~~~~~~~~~~ //
    captchaKeyProd: "6LdUhyYmAAAAAKGkicX9V3mmCts-chMSxUOmZZU3",
    captchaKeyDev: "6LeFkyAmAAAAABw-gLHgeGGT-r19igGGMw4zsizw",

    // ~~~~~~~~~~ DATE FOR SEARCHING ~~~~~~~~~ //
    dateStartForSearch: new Date(2023, 0, 1).toISOString().substring(0, 10),
    todayDate: new Date().toISOString().substring(0, 10),// format AAAA-MM-JJ

    // ~~~~~~~~~~~~~~~~ ROLES ~~~~~~~~~~~~~~~~ //
    allRoles: ['Curé', 'Vicaire', 'Secrétaire', 'Financier', 'Responsable de catéchèse', 'Président du conseil paroissiale'],
    allRoles_Without_HeadOfCatechesis: ['Curé', 'Vicaire', 'Secrétaire', 'Financier', 'Président du conseil paroissiale'],
    superAdmins : ['Curé', 'Vicaire'],

    // ~~~~~~~~~~~~~~~~ Tokens ~~~~~~~~~~~~~~~ //
    massToken: "sWLeQZkVsbpHYhDhvFsRl159BOUfe5vvs4wdbBURYQXbZ1zKBmiQww6Yja7VmIn1q1M9eL8kGWpaUi9tXLY0oGd4LQo9k2KUFeYKeqvpEbOJcF86gRm3AHB31BU8EvFGJixp7DM4qCLYNpF9qQ9WGK0N7k7i8Zl6FWtD0JBaZUloNulerg2SCe5K6aHj5tlhHzOAJVAXl8ILxX0CQTgkcUuNgBjt4spF50YbaQ4WJQJkJ9iE2vTShH2H8Y7UeRucOQwNn8iJHJ6WsJciW19fLvhpzls2IHDF4FoNzDd3WgQveDmymuCyfQ0U66vO9IjmYQ7qXScUdMSPNBc69chenYAS9RJU9u3BtxBy70kn2HHrHJDi1SpNBQvU8AmkpGrAQ1Mowxu6vfm6Y2otkWlK7jQDIliI0NxYVbLRYAiGKyLYYwDBBa7aDU8X4NIBf4HMrQWUsKBnv9og0FUsVZmdpJcWhijFflM74VUkXmszWmrDnrHNXqrbu5jxeyUwxMI5mFevCywkYfSiOylyCqYay9Styk1SFkwUl5ecQzRmI52Iy58VWootVBQHXOgSsb2SDW1Lrgg7kND23Mlk4frpshV2t4zJqgsysHUZ6nfy1YBV9nGnXJzxqSBuQeNhDEABQrj3Y6MmJiH39G6D2oWxGqh1H7NKw21VaCOnQ1oWDCTOZysGV9TYxvDQ0d1pIcDF3Xuy7YDdgkcsdWxMfSuJ3Ca1cEIRmHW0tq8UGoB8D2KTYKRgF2jnRiVBqH7l5tQwX9ecE0BiB6AmXLDV28Cdive0yYipnk4C",
}

// apiUrlDon: 'http://192.168.2.106:8000/api',
// apiUrlAdmin: 'http://192.168.2.106:4200/api',

/**
 * POSSIBLES ROLES
 * 
 * Curé
 * Vicaire
 * Secrétaire
 * Financier
 * Responsable de catéchèse
 * Président du conseil paroissiale
 */

//GLOBAL RESOLVERS
export const GLOBAL_RESOLVERS={
    // donationNotif: DonationNotifResolver,
}
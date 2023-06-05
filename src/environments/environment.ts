import { DonationNotifResolver } from "src/app/core/resolvers/donation-notif.resolver"
const dateStart = new Date(2023, 0, 1)
export const  environment = {
    production: false,
    // ~~~~~~~~~~~~~~~~~ API ~~~~~~~~~~~~~~~~~ //
    apiUrlDon: 'https://donation-api.eglise-mukasa.ci/api',
    apiUrlAdmin: 'https://admin-api.eglise-mukasa.ci/api',

    // ~~~~~~~~~~~~~~~ CAPTCHA ~~~~~~~~~~~~~~~ //
    captchaKeyProd: "6LdUhyYmAAAAAKGkicX9V3mmCts-chMSxUOmZZU3",
    captchaKeyDev: "6LeFkyAmAAAAABw-gLHgeGGT-r19igGGMw4zsizw",

    // ~~~~~~~~~~ DATE FOR SEARCHING ~~~~~~~~~ //
    dateStartForSearch: new Date(2023, 0, 1).toISOString().substring(0, 10),
    todayDate: new Date().toISOString().substring(0, 10),// format AAAA-MM-JJ

    // ~~~~~~~~~~~~~~~~ ROLES ~~~~~~~~~~~~~~~~ //
    allRoles: ['Curé', 'Vicaire', 'Secrétaire', 'Financier', 'Responsable de catéchèse', 'Président du conseil paroissiale'],
    allRoles_Without_HeadOfCatechesis: ['Curé', 'Vicaire', 'Secrétaire', 'Financier', 'Président du conseil paroissiale'],
    superAdmins : ['Curé', 'Vicaire']
}

// apiUrlDon: 'http://192.168.2.106:8000/api',
// apiUrlAdmin: 'http://192.168.2.106:4200/api',

/**
 * ROLES POSSIBLES
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
    donationNotif: DonationNotifResolver,
}
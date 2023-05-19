import { DonationNotifResolver } from "src/app/core/resolvers/donation-notif.resolver"
const dateStart = new Date(2023, 0, 1)
export const  environment = {
    production: false,
    apiUrlDon: 'https://donation-api.eglise-mukasa.ci/api',
    // apiUrlDon: 'http://192.168.2.106:8000/api',
    apiUrlAdmin: 'https://admin-api.eglise-mukasa.ci/api',
    // apiUrlAdmin: 'http://192.168.2.106:4200/api',

    dateStartForSearch: new Date(2023, 0, 1).toISOString().substring(0, 10),
    todayDate: new Date().toISOString().substring(0, 10),// format AAAA-MM-JJ

    allRoles: ['Curé', 'Secrétaire', 'Financier', 'Responsable de catéchèse', 'Président du conseil paroissiale'],
    allRoles_Without_HeadOfCatechesis: ['Curé', 'Secrétaire', 'Financier', 'Président du conseil paroissiale'],
}

/**
 * ROLES POSSIBLES
 * 
 * Curé
 * Secrétaire
 * Financier
 * Responsable de catéchèse
 * Président du conseil paroissiale
 */

//GLOBAL RESOLVERS
export const GLOBAL_RESOLVERS={
    donationNotif: DonationNotifResolver,
}
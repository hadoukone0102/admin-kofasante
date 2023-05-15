import { DonationNotifResolver } from "src/app/core/resolvers/donation-notif.resolver"

export const  environment = {
    production: false,
    apiUrlDon: 'http://192.168.1.17:8000/api',
    apiUrlAdmin: 'http://192.168.1.17:4200/api',

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
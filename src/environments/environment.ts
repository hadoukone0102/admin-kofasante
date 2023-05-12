import { DonationNotifResolver } from "src/app/core/resolvers/donation-notif.resolver"

export const  environment = {
    production: false,
    apiUrlDon: 'http://192.168.1.14:8000/api',
    apiUrlAdmin: 'http://192.168.1.14:4200/api',

    allRoles: ['Curé', 'Sécrétaire', 'Financier', 'Responsable de catéchèse', 'Président du conseil paroissiale'],
}

/**
 * ROLES POSSIBLES
 * 
 * Curé
 * Sécrétaire
 * Financier
 * Responsable de catéchèse
 * Président du conseil paroissiale
 */

//GLOBAL RESOLVERS
export const GLOBAL_RESOLVERS={
    donationNotif: DonationNotifResolver,
}
import { DonationNotifResolver } from "src/app/core/resolvers/donation-notif.resolver"

export const  environment = {
    production: false,
    apiUrlDon: 'http://192.168.1.9:8000/api',
    apiUrlAdmin: 'http://192.168.1.9:4200/api'
}

//GLOBAL RESOLVERS
export const GLOBAL_RESOLVERS={
    donationNotif: DonationNotifResolver,
}
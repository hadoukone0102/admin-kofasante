export interface DataDonationInfo {
    status: string
    status_code: number
    status_message: string
    total_dons: number
    dernier_don: string
  }

  export interface Bilan {
    message: string
    pub: number
    user: number
    admin: number
    abonnement: number
    document: number
    renseignemnt: number
    visite: number
    medecine: number
  }

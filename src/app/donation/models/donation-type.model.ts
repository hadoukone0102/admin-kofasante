export interface DonationTypeModel {
    status: string
    status_code: number
    status_message: string
    dons: DonationTypeData[]
  }
  
  export interface DonationTypeData {
    id: number
    libelle: string
    montant: any
    montant_est_fixe: number
    created_at: string
    updated_at: string
  }
  
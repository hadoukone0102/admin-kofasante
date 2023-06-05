export interface DonationTypeModel {
    status: string
    status_code: number
    status_message: string
    types_don: DonationTypeData[]
  }
  
  export interface DonationTypeData {
    id: number|null
    libelle: string
    montant: number|null
    montant_est_fixe: number|null
    created_at: string
    updated_at: string
  }


  export interface AddDontationTypeModel {
    libelle: string
    montant: number|null
    montant_est_fixe: number|null
  }

  export interface AddDontationTypeResponseModel {
    success: boolean
    status_code: number
    status_message: string
    errosList: string
  }
  
  
  
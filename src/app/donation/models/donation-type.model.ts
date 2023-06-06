// ~~~~~~~~~~ Get Donation type ~~~~~~~~~~ //
export interface DonationTypeModel {
    status: string
    status_code: number
    status_message: string
    types_don: DonationTypeData[]
  }
  
  export interface DonationTypeData {
    id: number
    libelle: string
    montant: number|null
    montant_est_fixe: number|null
    created_at: string
    updated_at: string

  }

  // ~~~~~~~~~~~~ Add and update ~~~~~~~~~~~ //
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

  export interface DonationTypeByIdModel {
    success: boolean
    status_code: number
    status_message: string
    type_don: DonationTypeByIdData
  }
  
  export interface DonationTypeByIdData {
    id: number
    libelle: string
    montant: number
    montant_est_fixe: number
    created_at: string
    updated_at: string
    deleted_at: any
  }

  // ~~~~~~~~~~~~~~~~~ Set Response~~~~~~~~~~~~~~~~~ //
  export interface SetDonationTypeResponseModel {
    success: boolean
    status_code: number
    status_message: string
    data: SetDonationTypeResponseData
  }
  
  export interface SetDonationTypeResponseData {
    id: number
    libelle: string
    montant: number
    montant_est_fixe: number
    created_at: string
    updated_at: string
    deleted_at: any
  }
  
  
  
  
  
// ~~~~~~~~~~ Get Donation type ~~~~~~~~~~ //

  export interface DonationTypeModel {
    success: boolean
    status_code: number
    status_message: string
    types_dons: DonationTypeData[]
  }
  
  export interface DonationTypeData {
    id: number
    libelle: string
    montant: number|null
    montant_est_fixe: number|null
    created_at: string
    updated_at: string
    deleted_at: any
  }
  

  // ~~~~~~~~~~~~ Add and update ~~~~~~~~~~~ //
  export interface AddDontationTypeModel {
    libelle: string
    montant: number|null
    montant_est_fixe: number|null
  }

  // ~~~~~~~~~~~~~ Add reponse ~~~~~~~~~~~~~ //
  export interface AddDontationTypeResponseModel {
    success: boolean
    status_code: number
    status_message: string
    errosList: string
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

  // ~~~~~~~~ Get donaton type by id ~~~~~~~~ //
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

  

  // ====================================================== //
  // =============== ENABLED DISABLED DELETE ============== //
  // ====================================================== //

  export interface ActionDonationTypeResponseModel {
    success: string
    status_code: number
    status_message: string
  }
  
  
  
  
  
  
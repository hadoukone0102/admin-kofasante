export interface MassRequest {
    message: string
    succes: number
    status_code: number
    current_page: number
    last_page: number
    total_massesRe: number
    total_massesRe_page: number
    cumul_montant_page: number
    cumul_montants: number
    demande_messe: ChildMassRequest[]
  }
  
  export interface ChildMassRequest {
    id: number
    lastNameMr: string
    firstNameMr: string
    contactMr: string
    codeMr: any
    isAnonymous: number
    startDateMr: string
    descriptionMr: any
    labelMt: string
    masses_times: string
    masses_days: string
    name_masses_days: string
    transaction_id: string
    templateER?: string
    type_demande?: string
    lastNameDefunt_1?: string
    firstNameDefunt_1?: string
    lastNameDefunt_2?: string
    firstNameDefunt_2?: string
    lastNameDefunt_3?: string
    firstNameDefunt_3?: string
  }
  
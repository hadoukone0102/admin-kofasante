export interface MassReport {
    status: string
    status_code: number
    status_message: string
    total_messe: number
    cumul_prix_messe: number
    total_messe_anonymes: number
    cumul_prix_messes_anonymes: number
    total_messe_nonanonymes: number
    cumul_prix_messes_nonanonymes: number
  }
  
export  interface questReport{
    status: string;
    status_code: number;
    status_message: string;
    last_page: number;
    total_quette: number;
    cumul_montant: number;
}

// ~~~~~~~~~~~~~~~~Model for all mass request ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

export interface AllMassRequest {
  message: string
  succes: number
  status_code: number
  current_page: number
  last_page: number
  total_massesRe: number
  total_massesRe_page: number
  cumul_montant_page: number
  cumul_montants: number
  demande_messe: AllmassResquestChild[]
}

export interface AllmassResquestChild {
  id: number
  lastNameMr: string
  firstNameMr: string
  contactMr: string
  codeMr: any
  isAnonymous: number
  startDateMr: string
  descriptionMr: any
  labelMt: string
  transaction_id: string
  templateER: string
  type_demande: string
  masses: Mass[]
  lastNameDefunt_1?: string
  firstNameDefunt_1?: string
  lastNameDefunt_2?: string
  firstNameDefunt_2?: string
  lastNameDefunt_3?: string
  firstNameDefunt_3?: string
}

export interface Mass {
  masses_id: number
  masses_times: string
  masses_days: string
  name_masses_days: string
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~modal for export mass component ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

export interface ExportMass {
  message: string
  succes: number
  status_code: number
  total_massesRe: number
  cumul_montants: number
  demande_messe: ExportChild[]
}

export interface ExportChild {
  id: number
  lastNameMr: string
  firstNameMr: string
  contactMr: string
  codeMr: any
  isAnonymous: number
  startDateMr: string
  descriptionMr: any
  labelMt: string
  transaction_id: string
  templateER?: string
  type_demande?: string
  masses: Mass[]
  lastNameDefunt_1?: string
  firstNameDefunt_1?: string
  lastNameDefunt_2?: string
  firstNameDefunt_2?: string
  lastNameDefunt_3?: string
  firstNameDefunt_3?: string
}

export interface Mass {
  masses_id: number
  masses_times: string
  masses_days: string
  name_masses_days: string
}


export interface Facture {
  message: string
  data: Data
}

export interface Data {
  current_page: number
  data: Daum[]
  first_page_url: string
  from: number
  last_page: number
  last_page_url: string
  links: Link[]
  next_page_url: any
  path: string
  per_page: number
  prev_page_url: any
  to: number
  total: number
}

export interface Daum {
  id: number
  nom: string
  prenom: string
  contact: string
  email: string
  status:boolean
  details: string
  type: string
  couts: number
  document?: string
  autreTypeDocs: any
  rdv?: string
  autreTypeRDV: any
  dateRdv?: string
  consultant: any
  tyeConsultation: any
  dateTot: any
  dateTard: any
  services?: string
  typeServices?: string
  forfait?: string
  nombreVisite?: string
  created_at: string
  updated_at: string
}

export interface Link {
  url?: string
  label: string
  active: boolean
}

export interface documentsFacture{
  nom: string
  prenom: string
  contact: string
  email: string
  type: string
  couts: number
  status:boolean
  document?: string
  autreTypeDocs: any
  rdv?: string
  autreTypeRDV: any
  dateRdv?: string
  details: string
}

export interface VisiteFacture{
  nom: string
  prenom: string
  contact: string
  email: string
  type: string
  couts: number
  status:boolean
  services?: string
  typeServices?: string
  details: string
}

export interface RenseignerFacture{
  nom: string
  prenom: string
  contact: string
  email: string
  type: string
  couts: number
  status:boolean
  details: string
}

export interface MedecineFacture{
  nom: string
  prenom: string
  contact: string
  email: string
  type: string
  couts: number
  status:boolean
  consultant: any
  tyeConsultation: any
  dateTot: any
  dateTard: any
  details: string
}

export interface AbonnementFacture{
  nom: string
  prenom: string
  contact: string
  email: string
  type: string
  couts: number
  status:boolean
  services?: string
  typeServices?: string
  forfait?: string
  nombreVisite?: string
  details: string
}

export interface update {
  status:boolean
}

export interface DocumentPage {
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
  next_page_url: string
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
  document: string
  rdv: string
  dateRdv: string
  typeServices: string
  consultVar: string
  details: string
  type: string
  couts: number
  created_at: string
  updated_at: string
}

export interface Link {
  url?: string
  label: string
  active: boolean
}


// renseigner

export interface RenseignerPage {
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
  next_page_url: string
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
  details: string
  type: string
  couts: number
  created_at: string
  updated_at: string
}

export interface Link {
  url?: string
  label: string
  active: boolean
}

// medecine en ligne


export interface Medecine {
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
  next_page_url: string
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
  consultant: string
  tyeConsultation: string
  dateTot: string
  dateTard: string
  details: string
  type: string
  couts: number
  created_at: string
  updated_at: string
}

export interface Link {
  url?: string
  label: string
  active: boolean
}


// visites

export interface Visites {
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
  next_page_url: string
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
  services: string
  typeServices: string
  details: string
  type: string
  couts: number
  created_at: string
  updated_at: string
}

export interface Link {
  url?: string
  label: string
  active: boolean
}



// abonnement

export interface AbonnementPage {
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
  next_page_url: string
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
  forfait: string
  nombreVisite: string
  services: string
  typeServices: string
  details: string
  type: string
  couts: number
  created_at: string
  updated_at: string
}

export interface Link {
  url?: string
  label: string
  active: boolean
}


export interface RapportsModels {
  message: string
  data: Daum[]
}

export interface Daum {
  id: number
  nom: string
  prenom: string
  email: string
  contact: string
  nomAdmin: string
  titre: string
  desc: string
  created_at: string
  updated_at: string
}


export interface Prix {
  data : Prixsecnd []
}

export interface Prixsecnd {
  id: number
  service: string
  type_service: string
  prix: string
  created_at: string
  updated_at: string
}

export interface SendPrix {
  prix : number
}

export interface Success {
  message:string
  data : Prixsecnd
}

export interface ElementPage {
  id: number,
  types: string,
  typeService: string,
  price: number,
}

export interface RapporUser{
  nom: string
  prenom: string
  email: string
  contact: string
  nomAdmin: string
  titre:string
  desc:string
}

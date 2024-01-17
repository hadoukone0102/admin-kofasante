export interface DocumentPage {
  message: string
  data: Daum[]
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

// renseigner

export interface RenseignerPage {
  message: string
  data: RenseigneDaum[]
}

export interface RenseigneDaum {
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

// medecine en ligne

export interface Medecine {
  message: string
  data: MedecineDaum[]
}

export interface MedecineDaum {
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

// visites

export interface Visites {
  message: string
  data: VisitesDaum[]
}

export interface VisitesDaum {
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


// abonnement

export interface AbonnementPage {
  message: string
  data: AbonnementDaum[]
}

export interface AbonnementDaum {
  id: number
  nom: string
  prenom: string
  contact: string
  email: string
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

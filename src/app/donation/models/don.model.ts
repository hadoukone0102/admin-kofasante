/**
 * kofasante categorie type
 */

import { Time } from "@angular/common"

export interface categorie{
  status:number
  message:string
  type:Catego[]
}

export interface Catego{
  id:number
  nom:string
  created_at:string
  updated_at:string
}

export interface MediaSend{
  titre:string
  categorie:string
  media:string
  desc:string
}

export interface Successmessage{
  status:number
  message:string
}

export interface ListeMedia {
  status: number
  message: string
  pub: Pub[]
}

export interface Pub {
  id: number
  id_admin: number
  titre: string
  categorie: string
  media?: string
  desc: string
  created_at: string
  updated_at: string
}

export interface KofaUser {
  status: number
  message: string
  type: Type[]
}

export interface Type {
  id: number
  nom: string
  prenom: string
  email: string
  contact: string
  mot_de_passe: string
  role: string
  remember_token: any
  created_at: string
  updated_at: string
}

export interface Rappel {
  nom: string
  prenom: string
  email: string
  contact: string
  titre: string
  date: string
  heure: string
  jour:string
}

/**
 * kofasante categorie type
 */

export class Don {
    id!: number
    typeDon!: string
    autreTypeDon!: string
    montantDon!: number
    civiliteDon!: string
    nomDon!: string
    prenomDon!: string
    indicatifPaysDon!: string
    contactDon!: string
    payeurDon!: string
    paysDon!: string
    villeDon!: string
    organisationDon!: string
    estAnonyme!: number
    estOrganisation!: number
    transactionId!: string
    idEglise!: number
    created_at!: string
    updated_at!: string
}

export class DataDon {
    status!: string
    status_code!: number
    status_message!: string
    current_page!: number
    last_page!: number
    total_dons!: number
    dons!: Don[]
  }


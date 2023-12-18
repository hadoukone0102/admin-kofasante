  export interface DataResultLogin {
    status_code: number
    auth: boolean
    serverError: boolean
    catchError: boolean
    access_token: string
    message: string
    errorslist: string
    administrateur: AdminLogged
  }

  export interface AdminLogged {
    id: string
    nomAdmin: string
    prenomAdmin: string
    contactAdmin: string
    id_typeadmin: string
    id_Eglise: string
    created_at: string
    updated_at: string
    codeConfirmAdmin: any
  }


export interface AdminLog {
  status:number
  message:string
  user_token:string
  user:Users
}
export interface Users{
  id:number
  nom:string
  prenom:string
  contact:string
  mot_de_passe:string
  type:string
  created_at:string
  updated_at:string
}

export interface Datalogins {
  contact: string
  mot_de_passe: string
}

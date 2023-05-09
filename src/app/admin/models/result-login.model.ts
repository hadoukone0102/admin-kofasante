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
  
  
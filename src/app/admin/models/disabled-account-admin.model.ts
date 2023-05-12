export interface DataDisabledAccount {
    success: boolean
    status_code: number
    message: string
    errorslist: string
    administrateurs: DisabledAccount[]
  }
  
  export interface DisabledAccount {
    id: string
    nomAdmin: string
    prenomAdmin: string
    contactAdmin: string
    id_typeadmin: number
    id_Eglise: string
    created_at: string
    updated_at: string
    codeConfirmAdmin: any
    deleted_at: string
  }
  
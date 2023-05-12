export interface DataAdminByid {
    administrateur: AdminById
  }
  
  export interface AdminById {
    id: string
    nomAdmin: string
    prenomAdmin: string
    contactAdmin: string
    id_typeadmin: number
    id_Eglise: string
    created_at: string
    updated_at: string
    codeConfirmAdmin: any
    deleted_at: any
  }
  
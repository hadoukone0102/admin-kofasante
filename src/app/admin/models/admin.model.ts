export interface Admin {
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
export interface DataAdmin {
    status_code: number
    error: boolean
    message: string
    last_page: number
    administrateurs: Admin[]
  }

  export interface DataAdminAdd {
    nomAdmin: string
    prenomAdmin: string
    contactAdmin: string
    mdpAdmin: string
    id_typeadmin: string
    id_Eglise: string
  }

  //ADD
  export interface AdminResultAdd {
    nomAdmin: string
    prenomAdmin: string
    contactAdmin: string
    id_typeadmin: string
    id_Eglise: number
    updated_at: string
    created_at: string
    id: string
  }

  export interface DataAdminResultAdd {
    success: boolean
    status_code: number
    message: string
    // administrateurs: AdminResultAdd
  }
  //FIN ADD

  //ERROR ADD
  export interface DataAmdinErrorAdd {
    success: boolean
    status_code: number
    message: string
    errorslist: Errorslist
  }
  
  export interface Errorslist {
    contactAdmin: string[]
  }
  //FIN ERROR ADD

  //DELETE ADMIN
  export interface DataDeleteAdmin {
    message: string
  }
  
  
  
  
  

  
 
  
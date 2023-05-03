export interface Admin {
  id: string
  nomAdmin: string
  prenomAdmin: string
  contactAdmin: string
  id_typeadmin: number
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
  
 
  
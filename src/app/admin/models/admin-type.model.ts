  export interface DataAdminType {
    success: boolean
    status_code: number
    message: string
    errorslist: string
    typeadministrateurs: AdminType[]
  }
  
  export interface AdminType {
    id: number
    libelleType: string
    created_at: string
    updated_at: string
  }
  
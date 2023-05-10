export interface DataResetPassword {
    contactAdmin: string|null
    new_password: string
    confirm_password: string
  }

export interface DataResultResetPassword {
    success: boolean
    message: string
    errorslist: string
  }
  
export interface DataResultLogin {
    status_code: number
    auth: boolean
    serverError: boolean
    catchError: boolean
    access_token: string
    message: string
    errorslist: string
  }
  
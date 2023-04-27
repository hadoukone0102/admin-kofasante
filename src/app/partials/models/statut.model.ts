import { Don } from "src/app/donation/models/don.model"

export interface Status {
    status: string
    status_code: number
    status_message: string
    current_page: string
    last_page: number
    dons: Don[]
  }
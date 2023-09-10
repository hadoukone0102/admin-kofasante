// ~~~~~~~~~~~~ Get mass list ~~~~~~~~~~~~ //
export interface MassModel {
    status: string
    status_code: number
    status_message: string
    total: number
    total_page: number  
    per_page: number
    current_page: number
    last_page: number
    masses: MassDayData[]
  }
  
  export interface MassDayData {
    days: string
    days_id: number
    days_name: string
    masses: MassData[]
  }
  
  export interface MassData {
    id: number
    idMt: number
    idMd: number
    time: string
    QuestType: string[]
  }
  
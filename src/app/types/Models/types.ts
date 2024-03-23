export interface AjouterType {
  service: string
  type_service: string
  desc: string
}

export interface result {
  message: string
  data: Data[]
}

export interface Data {
  type: string
  desc: string
  updated_at: string
  created_at: string
  id: number
}

// ~~~~~~~~~~~ Get masses times ~~~~~~~~~~ //
export interface MassTimeModel {
    time: MassTimeData[]
  }
  
  export interface MassTimeData {
    id: number
    times: string
    created_at: string
    updated_at: string
  }

  // ~~~~~~~~~~~~ Add Mass time ~~~~~~~~~~~~ //
  export interface AddMassTimeModel {
    time: string
  }
            // ~~~~~~~~~~~~~ Add reponse ~~~~~~~~~~~~~ //
  export interface AddMassTimeResponseModel {
    message: string
    success: number
    status_code: number
    time: MassTimeData
  }
  
  // ~~~~~~~~~~~ Delete mass time ~~~~~~~~~~ //
  export interface DeleteMassTimeModel {
    time_id: number[]
  }
  export interface DeleteMassTimeResponseModel {
    success: number
    message: string
  }
  
  
  
  
  
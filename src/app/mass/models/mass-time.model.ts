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

  // ~~~~~~~~~~~~~~~~~ ADD ~~~~~~~~~~~~~~~~~ //

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
  
// ~~~~~~~~~~~~~~~~ DELETE ~~~~~~~~~~~~~~~ //

  // ~~~~~~~~~~~ Delete mass time ~~~~~~~~~~ //
  export interface DeleteMassTimeModel {
    time_id: number[]
  }
  export interface DeleteMassTimeResponseModel {
    success: number
    message: string
    status_code: number
  }

// ~~~~~~~~~~~~ SET  ~~~~~~~~~~~~ //

       // ~~~~~~~~~ Get mass time by id ~~~~~~~~~ //
       export interface MassTimeByIdModel {
        time: Times
        message: string
        success: number
        status_code: number
      }
      
      export interface Times {
        id: number
        times: string
        created_at: string
        updated_at: string
      }

      // ~~~~~~~~~~~~ Set mass time ~~~~~~~~~~~~ //
      export interface SetMassTimeModel {
        time_id: number
        times: string
      }

      export interface SetMassTimeResponseModel {
        message: string
        success: number
        status_code: number
      }
  
  
  
  
  
  
  
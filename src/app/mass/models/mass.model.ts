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

  // ~~~~~~~~~~~~~~~~ Update ~~~~~~~~~~~~~~~ //

        // ~~~~~~~~~~~~~~ Data toreceive ~~~~~~~~~~~~~~ //
        export interface DataSetMassModel {
          masse: Masse
        }
        
        export interface Masse {
          id_days: number
          date: string
          days: string
          times: Time[]
        }
        
        export interface Time {
          idMt: number
          time: string
          questType: string[]
        }

        // ~~~~~~~~~~~~~ Data to send ~~~~~~~~~~~~ //
        
          export interface SetMassModel {
            id: number
            typeQuette: string[]
            masses_times_id: number
          }
          
          export interface SetMassResponseModel {
            success: number
            message: string
          }
  // ~~~~~~~~~~~ Delete mass day ~~~~~~~~~~~ //
  export interface DeleteMassDayModel {
    day_id: number[]
  }
  
  export interface DeleteMassDayResponseModel {
    success: number
    message: string
  }
  

  
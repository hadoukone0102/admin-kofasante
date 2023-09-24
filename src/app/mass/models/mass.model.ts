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
          id_masse: number
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
            message: string
            success: number
            status_code: number
          }
  // ~~~~~~~~~~~ Delete mass day ~~~~~~~~~~~ //
  export interface DeleteMassDayModel {
    day_id: number[]
  }
  
  export interface DeleteMassDayResponseModel {
    messages: Message[]
    status_code: number
  }
  
  export interface Message {
    message: string
    success: number
  }
  

  // ~~~~~~~~~~~~~ Delete mass ~~~~~~~~~~~~~ //
  export interface DeleteMassModel {
    messe_id: number[]
  }
  
  export interface DeleteMassResponseModel {
    messe_id: number[]
  }
  

  
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

  // ~~~~~~~~~~~~~~~~~ Add ~~~~~~~~~~~~~~~~~ //
  export interface AddMassModel {
    date_debut: string
    date_fin: string
    times: string[]
    days_name: string[]
    typeQuette: string[]
  }

  export interface AddMassResponseModel {
    message: string
    success: number
    status_code: number
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
  
  export interface DeleteMassDayResponseModel {
    message: string
    success: number
    status_code: number
  }
  
  // ~~~~~~~~~~~~~ Delete mass ~~~~~~~~~~~~~ //
  export interface DeleteMassResponseModel {
    message: string
    success: number
    status_code: number
  }

// -------------- for discount -----------------

export interface discount {
  status: string
  status_code: number
  status_message: string
  id: number
  libelle: string
  montant: string
  active: number
}
  // child
    export interface DiscountElements {
      id: boolean
      libelle: boolean
      montant: boolean
      active: boolean
    }

    export interface DiscountUpdate{
      id:number
      libelle: string
      montant: string
      active: number
    }


  

  
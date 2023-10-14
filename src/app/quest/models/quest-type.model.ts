export interface QuestTypeModel {
    message: string
    succes: number
    status_code: number
    current_page: number
    last_page: number
    total_questType: number
    totalQuestType_current_page: number
    questType: QuestTypeData[]
  }
  
  export interface QuestTypeData {
    id: number
    labelQt: string
    created_at: string
    updated_at: string
  }

// ~~~~~~~~~~~~~~~~~ ADD ~~~~~~~~~~~~~~~~~ //
export interface AddQuestTypeModel {
    labelQt: string
}

export interface AddQuestTypeResponseModel {
    message: string
    success: number
    status_code: number
}


// ~~~~~~~~~~~~~~~~~ SET ~~~~~~~~~~~~~~~~~ //
  // ~~~~~~~~~~~~~ Data to get ~~~~~~~~~~~~~ //

  export interface QuestTypeByIdModel {
    message: string
    status_code: number
    success: number
    questType: AddQuestTypeData
  }
  
  export interface AddQuestTypeData {
    id: number
    labelQt: string
    created_at: string
    updated_at: string
  }
  

  // ~~~~~~~~~~~~~ Data to send ~~~~~~~~~~~~ //
  export interface SetQuesTypeModel {
    id: string
    labelQt: string
  }

  export interface SetQuesTypeResponseModel {
    message: string
    success: number
    status_code: number
  }

// ~~~~~~~~~~~~~~~~ DELETE ~~~~~~~~~~~~~~~ //
export interface DeleteQuestTypeResponseModel {
    message: string
    success: number
    status_code: number
  }
  
  
  
  
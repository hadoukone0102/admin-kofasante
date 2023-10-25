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
  
  
// ~~~~~~~~~~~~~~~~~~~~~LISTE QUEST ~~~~~~~~~~~~~~~~~~~~~~

export interface Quette {
  status: string
  status_code: number
  status_message: string
  current_page: number
  last_page: number
  total_quette: number
  cumul_montant: number
  quettes: Child[]
}

export interface Child {
  id: number
  amountQuest: string
  quest_types: string
  masses_id: number
  days: string
  name_days: string
  heure: string
}
  //~~~~~~~~~~~~~~~~~~~~ form blobal pour cacher les colonne ~~~~~~~~~~~~~~~~~~~~~~~
  export interface FormQuestColumn{
    amountQuest: boolean
    quest_types: boolean
    masses_id: boolean
    days: boolean
    name_days: boolean
    heure: boolean
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~Origin quest Link~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
export interface QuestOriginal {
  status: string
  status_code: number
  status_message: string
  total: number
  masses: QuestOriginalChild[]
}

export interface QuestOriginalChild {
  messe_id: number
  days_id: number
  days: string
  days_name: string
  time: string
  amount_total: number
  total_Quest: number
  Quest: Quest[]
}

export interface Quest {
  id: number
  amountQuest: string
  quest_types: string
  masses_id: number
}



  
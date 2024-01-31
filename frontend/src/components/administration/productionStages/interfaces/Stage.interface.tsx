export interface Stage {
    _id: string
    name: string
    comment: string
    usedIn: string[]
}

export interface CreateStage {
    name: string 
    comment: string
    
}

export interface updateStageData {
    id: string
    attr: {
        name : string,
        comment: string,
        
    }
}
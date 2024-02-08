
export interface Operation {
    _id: string
    name : string
    comment: string

    workSpaceTypeId: string
    usedIn: string[]
    timePerPiece: number
   
}


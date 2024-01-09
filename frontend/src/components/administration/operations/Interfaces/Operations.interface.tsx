
export interface Operation {
    _id: string
    name : String,
    comment: String,

    units_type: String,
    units: Number,
    timePerUnit: Number

    stage_id: String,
    workSpace_type: String

    active: false,
    active_in: [String]
}


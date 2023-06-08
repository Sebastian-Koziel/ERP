export interface Workspace {
    _id: string
    name: string
    comment:  string
    addedBy: string
    addedWhen:  string
}

export interface CreateWorkspace {
    name: string 
    comment:  string
}
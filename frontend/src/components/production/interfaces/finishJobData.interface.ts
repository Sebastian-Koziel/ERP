export interface finishJobData {
    id: string
    attr: {
        finishedAt: number,
        inProgress: boolean
    }
}
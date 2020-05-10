export interface ICreateMeasurement {
    weight: number
}

export interface IUpdateMeasurement {
    id: string,
    weight: number
}

export interface IFetchMeasurements {
    from?: Date,
    to?: Date,
}
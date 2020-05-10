export interface IMeasurement {
    id: string,
    timestamp: Date,
    weight: number
}

export interface IDifferentialMeasurement extends IMeasurement
{
    difference: number
}
import { ICreateMeasurement, IUpdateMeasurement, IFetchMeasurements } from '../types/requests'
import { IMeasurement } from '../types/models'

let serverUrl = '/api'

if (process.env.NODE_ENV !== 'production') {
    serverUrl = `http://localhost:5000${serverUrl}`
}

export const fetchMeasurements = async (request: IFetchMeasurements): Promise<IMeasurement[]> => {
    const params = new URLSearchParams();
    if(request.to) params.append('to', request.to!.toISOString())
    if(request.from) params.append('from', request.from!.toISOString())
    let url = `${serverUrl}/measurements`
    const queryString = params.toString()
    if(queryString.length > 0) {
        url += '?' + queryString
    }

    const response = await fetch(url)
    return response.json()
}

export const createMeasurement = async (request: ICreateMeasurement): Promise<IMeasurement> => {
    const response = await fetch(`${serverUrl}/measurements`, {
        method: 'POST',
        body: JSON.stringify(request),
        headers: { "Content-Type": "application/json" }
    })

    return response.json()
}

export const updateMeasurement = async (request: IUpdateMeasurement): Promise<IMeasurement> => {
    const response = await fetch(`${serverUrl}/measurements/${request.id}`, {
        method: 'PUT',
        body: JSON.stringify(request),
        headers: { "Content-Type": "application/json" }
    })

    return response.json()
}

export const deleteMeasurement = async (id: string): Promise<boolean> => {
    const response = await fetch(`${serverUrl}/measurements/${id}`, {
        method: 'DELETE',
    })

    return response.status === 204
}
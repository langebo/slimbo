import * as React from 'react'
import styled from 'styled-components'
import moment from 'moment'
import { Text } from 'office-ui-fabric-react/lib/Text';
import { List } from 'office-ui-fabric-react/lib/List';

import { IMeasurement, IDifferentialMeasurement } from '../../types/models'
import { FilterRange } from '../../types/shared';
import { fetchMeasurements } from '../../api/client'
import { IFetchMeasurements } from '../../types/requests';
import MeasureItem from './measureItem';

export interface IMeasureListProps {
    range: FilterRange
    latest?: IMeasurement
}

const MeasureList: React.FC<IMeasureListProps> = ({range, latest}) => {
    const [measures, setMeasures] = React.useState<IDifferentialMeasurement[]>([]);

    const compare = (first: IMeasurement, second: IMeasurement): number =>
        first.timestamp > second.timestamp ? -1 : first.timestamp < second.timestamp ? 1 : 0;

    const transform = (measures: IMeasurement[]): IDifferentialMeasurement[] => {
        return measures.map((measure, index) => ({ 
            ...measure, 
            difference: index > 0 ? measure.weight - measures[index-1].weight : 0
        }))
    }

    const push = (previous: IDifferentialMeasurement[], measure: IMeasurement) => {
        const result: IDifferentialMeasurement = { ...measure, difference: 0}
        if(previous.length > 0) {
            result.difference = measure.weight - previous[0].weight
        }

        return [result, ...previous]
    }

    React.useEffect(() => {
        const fetchMeasures = () => {
            const request: IFetchMeasurements = {}
            switch(range){
                case 'month':
                    request.from = moment().subtract(1, 'month').toDate()
                    break;
                case 'week':
                    request.from = moment().subtract(1, 'week').toDate()
                    break;
                case 'none':
                default:
                    break;
            }
    
            fetchMeasurements(request)
                .then((response) => response.sort(compare))
                .then((sorted) => sorted.reverse())
                .then((sorted) => transform(sorted))
                .then((sorted) => sorted.reverse())
                .then((result) => setMeasures(result))
        }

        fetchMeasures()
    }, [range])

    React.useEffect(() => {
        if(latest) {
            setMeasures(prev => push(prev, latest))
        }
    },[latest])

    return (
        <Container>
            <Text variant='xLarge'>Measurements</Text>
            <List 
                items={measures} 
                style={{paddingTop: '1rem', overflow: 'auto'}}
                onRenderCell={(m) => m && <MeasureItem key={m.id} {...m} />} 
            />
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: 1rem;
`    

export default MeasureList
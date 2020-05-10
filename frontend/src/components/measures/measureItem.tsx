import * as React from 'react'
import styled from 'styled-components';
import moment from 'moment';
import { Text } from 'office-ui-fabric-react/lib/Text';
import { Icon } from '@fluentui/react/lib/Icon';

import { IDifferentialMeasurement } from '../../types/models'

const MeasureItem: React.FC<IDifferentialMeasurement> = ({timestamp, weight, difference}) => {

    const renderDifferenceIcon = () => {
        if(difference > 0) {
            return <Icon iconName="ChevronUp" style={{color: 'red'}} />;
        }
        else if(difference < 0) {
            return <Icon iconName="ChevronDown" style={{color: 'green'}} />;
        }
        else {
            return <Icon iconName="LocationDot" />;
        }
    }

    return (
        <Container>
            <Wrapper style={{ flex: '1 1 auto' }}>
                <Text variant='medium'>
                    {moment(timestamp).format('DD.MM.YY HH:mm')}
                </Text>
            </Wrapper>
            <Wrapper style={{ width: '3.2rem' }}>
                {renderDifferenceIcon()}
                <Text variant='medium' style={{paddingLeft: '0.4rem'}}>
                    {difference > 0 ? '+' : difference < 0 ? '' : '±'}
                    {difference.toFixed(1)}
                </Text>
            </Wrapper>
            <Text variant='xxLarge' style={{ width: '3.6rem', paddingLeft: '2rem' }}>{weight.toFixed(1)}</Text>
        </Container>
    )
}

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgba(113, 175, 229, 0.4);
`


export default MeasureItem
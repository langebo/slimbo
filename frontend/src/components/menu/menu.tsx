import * as React from 'react'
import styled from 'styled-components'
import { CommandBar, ICommandBarItemProps } from 'office-ui-fabric-react/lib/CommandBar'
import { Customizer } from 'office-ui-fabric-react'
import { FilterRange } from '../../types/shared';
import { commandBarTheme } from '../../types/themes';

export interface IMenuProps {
    onCreate: () => void
    onFilterChanged: (range: FilterRange) => void
}

const Menu: React.FC<IMenuProps> = ({onCreate, onFilterChanged}) => {
    const items: ICommandBarItemProps[] = [
    {
        key: 'newItem',
        cacheKey: 'newItem',
        text: 'New',
        iconProps: { iconName: 'Add' },
        onClick: () => onCreate()
    },
    {
        key: 'filter',
        cacheKey: 'filter',
        text: 'Filter',
        iconProps: { iconName: 'Filter' },
        subMenuProps: {
            items: [
                {
                    key: 'lastWeek',
                    cacheKey: 'lastWeek',
                    text: 'Last week',
                    iconProps: { iconName: 'CalendarWeek' },
                    onClick: () => onFilterChanged('week')
                },
                {
                    key: 'lastMonth',
                    cacheKey: 'lastMonth',
                    text: 'Last month',
                    iconProps: { iconName: 'Calendar' },
                    onClick: () => onFilterChanged('month')
                },
                {
                    key: 'all',
                    cacheKey: 'all',
                    text: 'Unfiltered',
                    iconProps: { iconName: 'ClearFilter' },
                    onClick: () => onFilterChanged('none')
                }
            ]
        }
    }
    ];

    return (
        <Container>
            <Customizer settings={{ theme: commandBarTheme }}>
                <CommandBar items={items} />
            </Customizer>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    justify-content: flex-end;
    background-color: #edebe9;
`

export default Menu
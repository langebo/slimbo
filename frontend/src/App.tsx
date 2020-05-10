import React from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import { Dialog, DialogType } from 'office-ui-fabric-react/lib/Dialog';

import Menu from './components/menu/menu'
import MeasureList from './components/measures/measureList'
import { FilterRange } from './types/shared'
import CreateMeasure from './components/create/createMeasure';
import { IMeasurement } from './types/models';
import LogoImage from './assets/slimbo-head.png'

const App = () => {
  const [filter, setFilter] = React.useState<FilterRange>('none');
  const [hideDialog, setHideDialog] = React.useState<boolean>(true)
  const [latestMeasure, setLatestMeasure] = React.useState<IMeasurement | undefined>()

  return (
        <Layout>
          <Header><Logo src={LogoImage} alt='Slimbo'/></Header>
          <Menu onFilterChanged={setFilter} onCreate={() => setHideDialog(false)}/>
          <MeasureList range={filter} latest={latestMeasure}/>
          <Dialog hidden={hideDialog} onDismiss={() => setHideDialog(true)} 
            dialogContentProps={{ type: DialogType.normal, title: 'Add measurement'}} 
            modalProps={{ isBlocking: true, styles: { main: { maxWidth: '70vw' } }}}
          >
            <CreateMeasure onClose={() => setHideDialog(true)} onCreated={(m) => setLatestMeasure(m)}/>
          </Dialog>
          <GlobalStyle />
        </Layout>
  );
}

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0px;
    padding: 0px;
  }
`

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 100vh;
`

const Header = styled.div`
  display: flex;
  align-items: center;
  padding-left: 1rem;
  min-height: 4rem;
  color: #fff;
  background-color: #0078d4;
`

const Logo = styled.img`

`

export default App

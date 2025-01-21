
import { Fragment, useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import { observer } from 'mobx-react-lite';
import { Outlet } from 'react-router-dom';

function App() {

  return (
    <Fragment>
      <Container style={{ marginTop: '7em' }}>


        <NavBar />
      <Outlet/>
      </Container>
    </Fragment>

  )
}

export default observer(App)
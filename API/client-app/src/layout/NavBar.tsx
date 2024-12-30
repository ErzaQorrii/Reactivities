import React from "react";
import { Button, Container, Menu } from "semantic-ui-react";
import './styles.css';
interface Props
{
  openForm:()=>void;
}

export default function NavBar({openForm}:Props)
{
  return(
    <Menu inverted fixed='top'>
      <Container>
        <Menu.Item header>
          <img src="/assets/logo.webp" alt="logo" style={{marginRight:'10px',borderRadius:"6px"}} />
          Reactivities
        </Menu.Item>
        <Menu.Item name='Activities'/>
        <Menu.Item>
          <Button onClick={openForm} positive content='Create Activity'></Button>
          </Menu.Item>
      </Container>
    </Menu>
  )
}
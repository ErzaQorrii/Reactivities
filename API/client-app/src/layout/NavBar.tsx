import React from "react";
import { Button, Container, Menu } from "semantic-ui-react";
import './styles.css';
import { NavLink } from "react-router-dom";


export default function NavBar() {
  {
    return (
      <Menu inverted fixed='top'>
        <Container>
          <Menu.Item as={NavLink} to='/'>
            <img src="/assets/logo.webp" alt="logo" style={{ marginRight: '10px', borderRadius: "6px" }} />
            Reactivities
          </Menu.Item>
          <Menu.Item as={NavLink} to='/activities' name='Activities' />
          <Menu.Item>
            <Button as={NavLink} to='/createActivity' positive content='Create Activity'></Button>
          </Menu.Item>
        </Container>
      </Menu>
    )
  }
}
import React from "react";
import { Button, Container, Menu } from "semantic-ui-react";
import './styles.css';
import { useStore } from "../app/stores/store";


export default function NavBar() {
  const { activityStore } = useStore();
  {
    return (
      <Menu inverted fixed='top'>
        <Container>
          <Menu.Item header>
            <img src="/assets/logo.webp" alt="logo" style={{ marginRight: '10px', borderRadius: "6px" }} />
            Reactivities
          </Menu.Item>
          <Menu.Item name='Activities' />
          <Menu.Item>
            <Button onClick={() => activityStore.openForm()} positive content='Create Activity'></Button>
          </Menu.Item>
        </Container>
      </Menu>
    )
  }
}
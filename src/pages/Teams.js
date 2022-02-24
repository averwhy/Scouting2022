import React from 'react';
import {ListGroup, ListGroupItem, ListGroupItemHeading, Container, Badge, UncontrolledAlert} from "reactstrap";

const Teams = (props) => {
  return (
  <Container>
  <UncontrolledAlert color="warning">Hey! This is just example data to test the components, not real team data.</UncontrolledAlert>
  <br></br>
  <h2>Team List</h2>
  <ListGroup flush>
    <ListGroupItem
      action
      tag="button">
      <ListGroupItemHeading>Team 138</ListGroupItemHeading>
      <Badge pill color="success">Hightest climber average</Badge>
    </ListGroupItem>
    <ListGroupItem
      action
      tag="button">
      <ListGroupItemHeading>Team 256</ListGroupItemHeading>
      <Badge pill color="success">Highest auto points</Badge>
    </ListGroupItem>
  </ListGroup>
</Container>
  )
};

export default Teams;
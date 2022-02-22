import React from 'react';
import {ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, Container, Badge, UncontrolledAlert} from "reactstrap";

const Matches = (props) => {
return (
    <Container>
      <UncontrolledAlert color="warning">Hey! This is just example data to test the components, not real match data.</UncontrolledAlert>
      <br></br>
      <h2>Match List</h2>
      <ListGroup>
        <ListGroupItem
          action
          tag="button"
        >
          <ListGroupItemHeading>Match 1</ListGroupItemHeading>
          <ListGroupItemText>138, 256, 88 vs 2154, 139, 1004</ListGroupItemText>
          <Badge pill color="success">138 win</Badge>
        </ListGroupItem>
        <ListGroupItem
          action
          tag="button"
        >
          <ListGroupItemHeading>Match 2</ListGroupItemHeading>
          <ListGroupItemText>138, 256, 88 vs 2154, 139, 1004</ListGroupItemText>
          <Badge pill color="danger">138 loss</Badge>
        </ListGroupItem>
        <ListGroupItem
          action
          tag="button"
        >
          <ListGroupItemHeading>Match 3</ListGroupItemHeading>
          <ListGroupItemText>138, 256, 88 vs 2154, 139, 1004</ListGroupItemText>
          <Badge pill color="primary">Latest</Badge>
        </ListGroupItem>
      </ListGroup>
    </Container>
  )
};

export default Matches;
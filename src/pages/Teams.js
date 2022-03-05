import {React, useEffect} from 'react';
import {ListGroup, Container, UncontrolledAlert} from "reactstrap";
import TeamListItem from './utils/TeamListItem';

const Teams = (props) => {
  return (
  <Container>
  <UncontrolledAlert color="warning">Hey! This is just example data to test the components, not real team data.</UncontrolledAlert>
  <br></br>
  <h2>Team List</h2>
  <ListGroup flush>
    {
    useEffect(() => {
      TeamListItem()
    })
    }
  </ListGroup>
</Container>
  )
};

export default Teams;
import {React} from 'react';
import {ListGroup, Container, UncontrolledAlert} from "reactstrap";
import TeamListItem from './utils/TeamListItem';

const Teams = (props) => {
  return (
  <Container>
    <UncontrolledAlert color="info">Hey! This is testing/example data since we haven't been to a competition yet.</UncontrolledAlert>
    <br></br>
    <h2>Team List</h2>
    <ListGroup flush>
      <TeamListItem/>
    </ListGroup>
  </Container>
  )
};

export default Teams;
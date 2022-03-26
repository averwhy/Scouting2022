import {React} from 'react';
import {ListGroup, Container, UncontrolledAlert} from "reactstrap";
import TeamListItem from './utils/TeamListItem';

const Teams = (props) => {
  return (
  <Container>
    <UncontrolledAlert color="info">Hey! An infinite loading icon means there's no data.</UncontrolledAlert>
    <br></br>
    <h2>Team List</h2>
    <ListGroup flush>
      <TeamListItem/>
    </ListGroup>
    <br/><br/><br/><br/><br/><br/><br/>
  </Container>
  )
};

export default Teams;
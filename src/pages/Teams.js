import {React} from 'react';
import {ListGroup, Container, UncontrolledAlert} from "reactstrap";
import TeamListItem from './utils/TeamListItem';
import CalcAmount from './utils/CalcAmount';

const Teams = (props) => {
  return (
  <Container style={{ whiteSpace: 'pre-wrap' }}>
    <br></br>
    <h2>Team List</h2>
    <CalcAmount type='team'/>
    <ListGroup flush>
      <TeamListItem/>
    </ListGroup>
    <br/><br/><br/><br/><br/><br/><br/>
  </Container>
  )
};

export default Teams;
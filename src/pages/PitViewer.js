import {React} from 'react';
import {ListGroup, Container} from "reactstrap";
import PitListItem from './utils/PitListItem';
import CalcAmount from './utils/CalcAmount';

const PitViewer = (props) => {
  return (
  <Container>
    <br></br>
    <h2>Pit Data List</h2>
    <CalcAmount type='team'/>
    <ListGroup>
      <PitListItem/>
    </ListGroup>
    <br/><br/><br/><br/><br/><br/><br/>
  </Container>
  )
};

export default PitViewer;
import {React} from 'react';
import {ListGroup, Container} from "reactstrap";
import PitListItem from './utils/PitListItem';

const PitViewer = (props) => {
  return (
  <Container>
    <br></br>
    <h2>Pit Data List</h2>
    <ListGroup>
      <PitListItem/>
    </ListGroup>
    <br/><br/><br/><br/><br/><br/><br/>
  </Container>
  )
};

export default PitViewer;
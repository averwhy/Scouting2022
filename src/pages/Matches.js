import React from 'react';
import {ListGroup, Container, UncontrolledAlert} from "reactstrap";
import MatchListItem from './utils/MatchListItem';
import CalcAmount from './utils/CalcAmount';

const Matches = (props) => {
return (
    <Container>
      <br></br>
      <h2>Match List</h2>
      <CalcAmount type='match'/>
      <ListGroup>
        <MatchListItem/>
      </ListGroup>
      <br/><br/><br/><br/><br/><br/><br/>
    </Container>
  )
};

export default Matches;
import React from 'react';
import {ListGroup, Container, UncontrolledAlert} from "reactstrap";
import MatchListItem from './utils/MatchListItem';

const Matches = (props) => {
return (
    <Container>
      <UncontrolledAlert color="info">Hey! An infinite loading icon means there's no data.</UncontrolledAlert>
      <br></br>
      <h2>Match List</h2>
      <ListGroup>
        <MatchListItem/>
      </ListGroup>
      <br/><br/><br/><br/><br/><br/><br/>
    </Container>
  )
};

export default Matches;
import React from 'react';
import {ListGroup, Container, Button} from "reactstrap";
import MatchListItem from './utils/MatchListItem';
import CalcAmount from './utils/CalcAmount';

const Matches = (props) => {
  var MLI = React.createRef();
  function doRefresh(){
    if (!(MLI.current === null)){
    MLI.current.refresh_data()
    } else {
      // Component isn't loaded yet
      return
    }
  }
return (
    <Container>
      <br></br>
      <h2>Match List</h2>
      <Button type="submit" color="success" onClick={doRefresh} style={{float: "right"}}>
        Refresh
      </Button>
      <CalcAmount type='match'/>
      <ListGroup>
        <MatchListItem ref={MLI}/>
      </ListGroup>
      <br/><br/><br/><br/><br/><br/><br/>
    </Container>
  )
};

export default Matches;
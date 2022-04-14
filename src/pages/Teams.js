import React from 'react';
import {ListGroup, Container, Button} from "reactstrap";
import TeamListItem from './utils/TeamListItem';
import CalcAmount from './utils/CalcAmount';

const Teams = (props) => {
  var TLI = React.createRef();
  var CA = React.createRef();
  function doRefresh(){
    if (!(TLI.current === null || CA.current === null)){
      TLI.current.refresh_data()
    } else {
      // Component isn't loaded yet
      return
    }
  }
  return (
  <Container style={{ whiteSpace: 'pre-wrap' }}>
    <br></br>
    <h2>Team List</h2>
    <Button type="submit" color="success" onClick={doRefresh} style={{float: "right"}}>
        Refresh
    </Button>
    <CalcAmount type='team' ref={CA}/>
    <ListGroup flush>
      <TeamListItem ref={TLI}/>
    </ListGroup>
    <br/><br/><br/><br/><br/><br/><br/>
  </Container>
  )
};

export default Teams;
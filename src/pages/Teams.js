import React from 'react';
import {ListGroup, ListGroupItem, ListGroupItemHeading, Container, Badge, UncontrolledAlert} from "reactstrap";
import database from './utils/db';

const Teams = (props) => {
  var db = new database("testing");
  function addAutoPill (teamNum){
    var HAP = database.getHighestAutoPoints();
    if (HAP.teamNumber == teamNum){
      return (<Badge pill color="success">Highest Auto Points</Badge>)
    }
  }
  function doTeamData(){
    var data = db.getAll()
    .then((d) => {d.map((team, index) =>( //todo: forEach
      <ListGroupItem
        tag="button">
        <ListGroupItemHeading>Team {team.teamNumber}</ListGroupItemHeading>
        {addAutoPill(team.teamNumber)}
      </ListGroupItem>
          )
        )
      }
    )
    //.then((d) => {console.log(d._snapshot)})
  }

  return (
  <Container>
  <UncontrolledAlert color="warning">Hey! This is just example data to test the components, not real team data.</UncontrolledAlert>
  <br></br>
  <h2>Team List</h2>
  <ListGroup flush>
    {
    doTeamData()
    }
    <ListGroupItem
      tag="button">
      <ListGroupItemHeading>Team 0</ListGroupItemHeading>
    </ListGroupItem>
  </ListGroup>
</Container>
  )
};

export default Teams;
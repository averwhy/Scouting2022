import React from 'react';
import {Form, FormGroup, Label, Input, Button, Container, Col, UncontrolledAlert} from "reactstrap";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import database from './utils/db';
import { useNavigate } from 'react-router';

var db = new database("shrewsbury-pit");

const formData = Object({
  teamNum: 0,
  climber: Boolean,
  auto: Boolean,
  lowShooter: Boolean,
  highShooter: Boolean,
  notes: 'None',
})
const PitEntry = (props) => {
var navigate = useNavigate();
function toViewer(){
    navigate("/pitdata", {replace: true})
}
  function submitForm(e){
    e.preventDefault();
    try {
      addDoc(collection(db.db, "shrewsbury-pit"), {
        teamNumber: formData.teamNum.valueAsNumber,
        climber: formData.climber.checked,
        auto: formData.auto.checked,
        lowShooter: formData.lowShooter.checked,
        highShooter: formData.highShooter.checked,
        notes: formData.notes.value,
        submitted: Timestamp.now()
      }).then(a => {
      console.log("Submitted!");
      navigate("/submitted", {replace: true})
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  return (
    <Container>
      <UncontrolledAlert color="info">Hey! Here are some important tips for pit scouting.
      <br/>Be friendly!! If you see they are having trouble, ask if they need help. They just might return the favor!
      <br/>Make sure to introduce yourself and be nice. Good relationships with other teams is important when choosing alliances for the tournament.
      <br/><br/>Observe their robot! Do they have a rat's nest of wires? Are any chains tensioned properly? What motors do they use?
      <br/>Ask questions! E.g. "What can you do in auto?" "How fast is your climber?" "What bar can you get to?" "How many goals can you usually get?"
      <br/><br/>If you need help find Avery!!!</UncontrolledAlert>
      <UncontrolledAlert color="success">To view pit data, scroll to the bottom and click the green button.</UncontrolledAlert>
      <Form onSubmit={submitForm}>
        <h3>
          Pit Scouting Entry
        </h3>
        <br/>
        <FormGroup row>
          <Label for="teamNum" sm={2}>
            Team Number
          </Label>
          <Col sm={10}>
            <Input
              id="teamNum"
              name="team"
              placeholder="e.g. 2"
              type="number"
              innerRef={(node) => formData.teamNum = node}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
            <Label for="auto" sm={2}>
            Do they have an auto?
            </Label>
            <Col sm={{size: 10}}>
              <FormGroup check>
                <Input
                  id="checkbox2"
                  type="checkbox"
                  innerRef={(node) => formData.auto = node}/>
                {' '}
              </FormGroup>
            </Col>
        </FormGroup>
        <FormGroup row>
            <Label for="climber" sm={2}>
            Do they have a climber?
            </Label>
            <Col sm={{size: 10}}>
              <FormGroup check>
                <Input
                  id="checkbox2"
                  type="checkbox"
                  innerRef={(node) => formData.climber = node}/>
                {' '}
              </FormGroup>
            </Col>
        </FormGroup>
        <FormGroup row>
            <Label for="lowShooter" sm={2}>
            Can they shoot low goal?
            </Label>
            <Col sm={{size: 10}}>
              <FormGroup check>
                <Input
                  id="checkbox2"
                  type="checkbox"
                  innerRef={(node) => formData.lowShooter = node}/>
                {' '}
              </FormGroup>
            </Col>
        </FormGroup>
        <FormGroup row>
            <Label for="highShooter" sm={2}>
            Can they shoot high goal?
            </Label>
            <Col sm={{size: 10}}>
              <FormGroup check>
                <Input
                  id="checkbox2"
                  type="checkbox"
                  innerRef={(node) => formData.highShooter = node}/>
                {' '}
              </FormGroup>
            </Col>
        </FormGroup>
        <br/>
        <FormGroup>
          <Label for="exampleText">
            Other notes
          </Label>
          <Input
            id="notes"
            name="text"
            type="textarea"
            innerRef={(node) => formData.notes = node}
          />
        </FormGroup>
        <Button type="submit" color="info">
          Submit
        </Button>
        <br/><br/>
        <Button color="success" onClick={toViewer}>
            View Pit Data (hit submit first if you have any data)
        </Button>
        <br/><br/><br/><br/><br/><br/>
      </Form>
    </Container>
  )
};

export default PitEntry;
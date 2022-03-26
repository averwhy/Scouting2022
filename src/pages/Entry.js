import React from 'react';
import {Form, FormGroup, Label, Input, Button, Container, Col, UncontrolledAlert} from "reactstrap";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import database from './utils/db';
import { useNavigate } from 'react-router';

const dbcol = "shrewsbury-real";
var db = new database(dbcol);

const formData = Object({
  teamNum: 0,
  matchNum: 0,
  allianceColor: '',
  autoScoredLow: 0,
  autoScoredHigh: 0,
  autoMoved: Boolean,
  teleScoredLow: 0,
  teleScoreHigh: 0,
  climbLevel: '',
  finalScoreBlue: 0,
  finalScoreRed: 0,
  notes: 'None',
})
const Entry = (props) => {
  var navigate = useNavigate();
  function submitForm(e){
    e.preventDefault();
    try {
      addDoc(collection(db.db, dbcol), {
        teamNumber: formData.teamNum.valueAsNumber || 0,
        matchNumber: formData.matchNum.valueAsNumber || 0,
        allianceColor: formData.allianceColor.value,
        autoLow: formData.autoScoredLow.valueAsNumber || 0,
        autoHigh: formData.autoScoredHigh.valueAsNumber || 0,
        autoMoved: formData.autoMoved.checked,
        teleLow: formData.teleScoredLow.valueAsNumber || 0,
        teleHigh: formData.teleScoreHigh.valueAsNumber || 0,
        climbLevel: formData.climbLevel.value,
        finalBlue: formData.finalScoreBlue.valueAsNumber || 0,
        finalRed: formData.finalScoreRed.valueAsNumber || 0,
        notes: formData.notes.value || 'None',
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
      <UncontrolledAlert color="info">Hey! Here are some important tips for scouting.
      <br/>1. Always stay focused on your bot. We want accurate data to pick good teammates!
      <br/>2. Doublecheck your data before submitting.
      <br/>3. If there's any thing you think should be added, add that in the last field under 'Notes'.
      <br/>Also, remember that we can use this data to impress potential alliance partners.
      <br/>If you need help find Avery!!!</UncontrolledAlert>
      <Form onSubmit={submitForm}>
        <h3>
          Scouting Entry
        </h3>
        <br/>
        <FormGroup row>
          <Label for="matchNum" sm={2}>
            Match Number
          </Label>
          <Col sm={10}>
            <Input
              id="matchNum"
              name="match"
              placeholder="e.g. 1"
              type="number"
              innerRef={(node) => formData.matchNum = node}
            />
          </Col>
        </FormGroup>
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
          <Label for="allianceColor" sm={2}>
            Alliance
          </Label>
          <Col sm={10}>
            <Input
              id="allianceColor"
              name="select"
              type="select"
              innerRef={(node) => formData.allianceColor = node}
            >
              <option>
                Blue
              </option>
              <option>
                Red
              </option>
            </Input>
          </Col>
        </FormGroup>
        <br />
        <h4>
          Autonomous
        </h4>
      <FormGroup row>
        <Label for="autoMoved" sm={2}>
          Moved?
        </Label>
            <Col sm={{size: 10}}>
              <FormGroup check>
                <Input
                  id="checkbox2"
                  type="checkbox"
                  innerRef={(node) => formData.autoMoved = node}/>
                {' '}
              </FormGroup>
            </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="autoScoredLow" sm={2}>
            Auto Scored: Low goal
          </Label>
          <Col sm={10}>
            <Input
              id="autoScored"
              name="autoScored"
              placeholder="e.g. 3"
              type="number"
              innerRef={(node) => formData.autoScoredLow = node}
            
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="autoScoredHigh" sm={2}>
            Auto Scored: High goal
          </Label>
          <Col sm={10}>
            <Input
              id="autoScored"
              name="autoScored"
              placeholder="e.g. 4"
              type="number"
              innerRef={(node) => formData.autoScoredHigh = node}
            
            />
          </Col>
        </FormGroup>
        <br/>
        <h4>
          Teleop
        </h4>
        <FormGroup row>
          <Label for="teleScoredLow" sm={2}>
            Teleop Scored: Low goal
          </Label>
          <Col sm={10}>
            <Input
              id="teleScored"
              name="teleScored"
              placeholder="e.g. 5"
              type="number"
              innerRef={(node) => formData.teleScoredLow = node}
            
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="teleScoredHigh" sm={2}>
            Teleop Scored: High goal
          </Label>
          <Col sm={10}>
            <Input
              id="teleScored"
              name="teleScored"
              placeholder="e.g. 6"
              type="number"
              innerRef={(node) => formData.teleScoreHigh = node}
            
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="climbLevel" sm={2}>
            Climb Level
          </Label>
          <Col sm={10}>
            <Input
              id="climbLevel"
              name="climb"
              type="select"
              innerRef={(node) => formData.climbLevel = node}
            >
              <option>
                None
              </option>
              <option>
                Low (1)
              </option>
              <option>
                Mid (2)
              </option>
              <option>
                High (3)
              </option>
              <option>
                Traversal (4)
              </option>
            </Input>
          </Col>
        </FormGroup>
        <br/>
        <h4>Results</h4>
        <FormGroup row>
          <Label for="blueFinalScore" sm={2}>
            Blue Alliance score
          </Label>
          <Col sm={10}>
            <Input
              id="blueFinalScore"
              name="blueFinalScore"
              placeholder="e.g. 50"
              type="number"
              innerRef={(node) => formData.finalScoreBlue = node}
            
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="redFinalScore" sm={2}>
            Red Alliance score
          </Label>
          <Col sm={10}>
            <Input
              id="redFinalScore"
              name="redFinalScore"
              placeholder="e.g. 45"
              type="number"
              innerRef={(node) => formData.finalScoreRed = node}
            
            />
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
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
      </Form>
    </Container>
  )
};

export default Entry;

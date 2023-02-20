import React from 'react';
import {Form, FormGroup, Label, Input, Button, Container, Col } from "reactstrap";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { sqlite3 } from 'sqlite3';
import database from './utils/db';
import { SubmitError } from './utils/Errors';
import { useNavigate } from 'react-router';

import config from './../config';
const db2 = new sqlite3.Database('scout');
const db = new database(config.database_collection);
const dbcol = config.database_collection
const disabled = config.disable_submitting

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
  const [disable, setDisable] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  function submitForm(e){
    e.preventDefault();
    try {
      setDisable(true)
      setErrorMessage("")
      if (disabled){
        throw new SubmitError("Submitting is disabled as there is no active competition.") // eslint-disable-next-line
      }
      db.serialize(() => {
        db.run("CREATE TABLE IF NOT EXISTS Teams (Team INT, Match INT, Alliance INT, automoved BLOB, autobalance BLOB, autocone1 INT, autocone2 INT, autocone3 INT, autocube1 INT, autocube2 INT, autocube3 INT, telecone1 INT, telecone2 INT, telecone3 INT, telecube1 INT, telecube2 INT, telecube3 INT, telebalance BLOB)");
    
        const stmt = db.prepare("INSERT INTO Teams VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
        stmt.run(); // TODO
        stmt.finalize();
    });
      addDoc(collection(db.db, dbcol), {
        teamNumber: formData.teamNum.valueAsNumber || 0,
        matchNumber: formData.matchNum.valueAsNumber || 0,
        allianceColor: formData.allianceColor.value,
        autocone1: formData.autocone1.valueAsNumber || 0,
        autocone2: formData.autocone2.valueAsNumber || 0,
        autocone3: formData.autocone3.valueAsNumber || 0,
        autocube1: formData.autocube1.valueAsNumber || 0,
        autocube2: formData.autocube2.valueAsNumber || 0,
        autocube3: formData.autocube3.valueAsNumber || 0,
        autoMoved: formData.autoMoved.checked,
        autobalance: formData.autobalance.checked,
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
      setErrorMessage("Internal error has occured: " + e);
      //setDisable(false);
    }
  }

  return (
    <Container>
      {/* <UncontrolledAlert color="info">Hey! Here are some important tips for scouting.
      <br/>1. Always stay focused on your bot. We want accurate data to pick good teammates!
      <br/>2. Doublecheck your data before submitting.
      <br/>3. If there's any thing you think should be added, add that in the last field under 'Notes'.
      <br/>Also, remember that we can use this data to impress potential alliance partners.
      <br/>If you need help find Avery!!!</UncontrolledAlert> */}
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
        <Label for="autoBalance" sm={2}>
          Charge Pad?
        </Label>
            <Col sm={{size: 10}}>
              <FormGroup check>
                <Input
                  id="checkbox3"
                  type="checkbox"
                  innerRef={(node) => formData.autobalance = node}/>
                {' '}
              </FormGroup>
            </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="autocone1" sm={2}>
            Auto Scored: Cone Level 1
          </Label>
          <Col sm={10}>
            <Input
              id="autocone1"
              name="autocone1"
              placeholder="e.g. 3"
              type="number"
              innerRef={(node) => formData.autocone1 = node}
            
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="autocone2" sm={2}>
            Auto Scored: Cone Level 2
          </Label>
          <Col sm={10}>
            <Input
              id="autocone2"
              name="autocone2"
              placeholder="e.g. 4"
              type="number"
              innerRef={(node) => formData.autocone2 = node}
            
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="autocone3" sm={2}>
            Auto Scored: Cone Level 3
          </Label>
          <Col sm={10}>
            <Input
              id="autocone3"
              name="autocone3"
              placeholder="e.g. 4"
              type="number"
              innerRef={(node) => formData.autocone3 = node}
            
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="autocube1" sm={2}>
            Auto Scored: Cube Level 1
          </Label>
          <Col sm={10}>
            <Input
              id="autocube1"
              name="autocube1"
              placeholder="e.g. 3"
              type="number"
              innerRef={(node) => formData.autocube1 = node}
            
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="autocube2" sm={2}>
            Auto Scored: Cube Level 2
          </Label>
          <Col sm={10}>
            <Input
              id="autocube2"
              name="autocube2"
              placeholder="e.g. 4"
              type="number"
              innerRef={(node) => formData.autocube2 = node}
            
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="autocube3" sm={2}>
            Auto Scored: Cube Level 3
          </Label>
          <Col sm={10}>
            <Input
              id="autocube3"
              name="autocube3"
              placeholder="e.g. 4"
              type="number"
              innerRef={(node) => formData.autocube3 = node}
            
            />
          </Col>
        </FormGroup>
        <br/>
        <h4>
          Teleop
        </h4>
        <FormGroup row>
        <Label for="teleBalance" sm={2}>
          Charge Pad?
        </Label>
            <Col sm={{size: 10}}>
              <FormGroup check>
                <Input
                  id="checkbox4"
                  type="checkbox"
                  innerRef={(node) => formData.telebalance = node}/>
                {' '}
              </FormGroup>
            </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="telecone1" sm={2}>
            Teleop Scored: Cone Level 1
          </Label>
          <Col sm={10}>
            <Input
              id="telecone1"
              name="telecone1"
              placeholder="e.g. 3"
              type="number"
              innerRef={(node) => formData.telecone1 = node}
            
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="telecone2" sm={2}>
            Teleop Scored: Cone Level 2
          </Label>
          <Col sm={10}>
            <Input
              id="telecone2"
              name="telecone2"
              placeholder="e.g. 4"
              type="number"
              innerRef={(node) => formData.telecone2 = node}
            
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="telecone3" sm={2}>
            Teleop Scored: Cone Level 3
          </Label>
          <Col sm={10}>
            <Input
              id="telecone3"
              name="telecone3"
              placeholder="e.g. 4"
              type="number"
              innerRef={(node) => formData.telecone3 = node}
            
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="telecube1" sm={2}>
            Teleop Scored: Cube Level 1
          </Label>
          <Col sm={10}>
            <Input
              id="telecube1"
              name="telecube1"
              placeholder="e.g. 3"
              type="number"
              innerRef={(node) => formData.telecube1 = node}
            
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="telecube2" sm={2}>
            Teleop Scored: Cube Level 2
          </Label>
          <Col sm={10}>
            <Input
              id="telecube2"
              name="telecube2"
              placeholder="e.g. 4"
              type="number"
              innerRef={(node) => formData.telecube2 = node}
            
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="telecube3" sm={2}>
            Teleop Scored: Cube Level 3
          </Label>
          <Col sm={10}>
            <Input
              id="telecube3"
              name="telecube3"
              placeholder="e.g. 4"
              type="number"
              innerRef={(node) => formData.telecube3 = node}
            
            />
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
            placeholder=""
            type="textarea"
            innerRef={(node) => formData.notes = node}
          />
        </FormGroup>
        <Button type="submit" color="info" disabled={disable}>
          Submit
        </Button>
        <h6 style={{color: 'red'}}>{errorMessage}</h6>
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

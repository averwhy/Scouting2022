import React from 'react';
import {Form, FormGroup, Label, Input, Button, Container, Col} from "reactstrap";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore"; 
import config from "../config.js";

const firebaseApp = initializeApp({
  apiKey: config['firebase_key'],
  authDomain: config['firebase_auth_domain'],
  projectId: config['firebase_project_id']
})
const db = getFirestore();

const Entry = (props) => {

function submitForm(){
  console.log("Submitted!");
  try {
    const docRef = addDoc(collection(db, "pre/scout"), {
      first: "Ada",
      last: "Lovelace",
      born: 1815
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

return (
  <Container>
    <Form>
      <h3>
        Scouting Entry
      </h3>
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
          />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="teamNum" sm={2}>
          Match Number
        </Label>
        <Col sm={10}>
          <Input
            id="teamNum"
            name="team"
            placeholder="e.g. 2"
            type="number"
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
      <br /> {/* cool spacer */}
      <h4>
        Autonomous
      </h4>
    <FormGroup row>
      <Label
        for="checkbox2"
        sm={2}
      >
        Moved?
      </Label>
          <Col
            sm={{
              size: 10
            }}
          >
            <FormGroup check>
              <Input
                id="checkbox2"
                type="checkbox"
              />
              {' '}
            </FormGroup>
          </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="autoScored" sm={2}>
          Scored Balls (auto)
        </Label>
        <Col sm={10}>
          <Input
            id="autoScored"
            name="autoScored"
            placeholder="e.g. 1"
            type="number"
          
          />
        </Col>
      </FormGroup>
      <br/>
      <h4>
        Teleop
      </h4>
      <FormGroup row>
        <Label for="teleScored" sm={2}>
          Scored Balls (teleop)
        </Label>
        <Col sm={10}>
          <Input
            id="teleScored"
            name="teleScored"
            placeholder="e.g. 2"
            type="number"
          
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
      <Button color="info" onClick={submitForm}>
        Submit
      </Button>
      <br/>
      {output}
    </Form>
  </Container>
  )
};

export default Entry;

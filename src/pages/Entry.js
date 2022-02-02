import React from 'react';
import {Form, FormGroup, Label, Input, Button, FormText, Container} from "reactstrap";

const Entry = (props) => {
return (
  <Container>
    <Form>
      <FormGroup>
        <Label for="matchNum">
          Match Number
        </Label>
        <Input
          id="matchNum"
          name="match"
          placeholder="e.g. 1"
          type="number"
        />
      </FormGroup>
      <FormGroup>
        <Label for="teamNum">
          Match Number
        </Label>
        <Input
          id="teamNum"
          name="team"
          placeholder="e.g. 2"
          type="number"
        />
      </FormGroup>
      <FormGroup>
        <Label for="allianceColor">
          Alliance
        </Label>
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
      </FormGroup>
      <br /> {/* cool spacer */}
      <h3>
        Autonomous
      </h3>
      <FormGroup>
        <Label for="exampleText">
          Text Area
        </Label>
        <Input
          id="exampleText"
          name="text"
          type="textarea"
        />
      </FormGroup>
      <FormGroup tag="fieldset">
        <legend>
          Radio Buttons
        </legend>
        <FormGroup check>
          <Input
            name="radio1"
            type="radio"
          />
          {' '}
          <Label check>
            Option one is this and that—be sure to include why it's great
          </Label>
        </FormGroup>
        <FormGroup check>
          <Input
            name="radio1"
            type="radio"
          />
          {' '}
          <Label check>
            Option two can be something else and selecting it will deselect option one
          </Label>
        </FormGroup>
        <FormGroup
          check
          disabled
        >
          <Input
            disabled
            name="radio1"
            type="radio"
          />
          {' '}
          <Label check>
            Option three is disabled
          </Label>
        </FormGroup>
      </FormGroup>
      <FormGroup check>
        <Input type="checkbox" />
        {' '}
        <Label check>
          Check me out
        </Label>
      </FormGroup>
      <Button>
        Submit
      </Button>
    </Form>
  </Container>
  )
};

export default Entry;
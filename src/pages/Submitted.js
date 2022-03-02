import React from 'react';
import { Container, Form, Button } from 'reactstrap';

const Submitted = (props) => {
    function backtoEntry(){
        window.location.href = "/";
    }
    return (
        <Container>
            <Form>
                <br/>
                <br/>
                <center>
                    <h4>
                        Scouting form submmited succesfully!
                    </h4>
                    <br/>
                    <Button color="dark" onClick={backtoEntry}>
                      Back to entry
                    </Button>
                </center>
            </Form>
        </Container>
    )
}

export default Submitted;
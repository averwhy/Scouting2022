import React from 'react';
import { useNavigate } from 'react-router';
import { Container, Form, Button } from 'reactstrap';

const Submitted = (props) => {
    var navigate = useNavigate();
    function backtoEntry(){
        navigate("/", {replace: true})
    }
    return (
        <Container>
            <Form>
                <br/>
                <br/>
                <center>
                    <h4>
                        Scouting form submmited successfully!
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
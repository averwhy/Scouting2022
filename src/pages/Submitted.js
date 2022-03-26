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
                    <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                    By the way, if you were scouting pits, 
                    <br/>hit that rightmost button on the bottom there to go back.
                </center>
            </Form>
        </Container>
    )
}

export default Submitted;
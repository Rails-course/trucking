import React from "react"
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

const LoginForm = () => {
    return (
        <div>
            <ButtonGroup variant="contained" aria-label="outlined primary button group">
                <Button>One</Button>
                <Button>Two</Button>
                <Button>Three</Button>
            </ButtonGroup>
        </div>
    );
  }

export default LoginForm

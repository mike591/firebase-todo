import React from "react";
import "firebase/auth";
import { useAuth } from "hooks/useAuth";
import { Redirect } from "react-router-dom";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
  Container,
} from "@material-ui/core";

const LoginPage = () => {
  const { user, handleLogin } = useAuth();
  if (user) {
    return <Redirect to="/todo" />;
  }
  return (
    <Container className="LoginPage">
      <Card className="prompt">
        <CardContent>
          <Typography color="primary" gutterBottom variant="h4">
            Enter via Google Auth
          </Typography>
        </CardContent>
        <CardActions>
          <Button onClick={handleLogin} color="primary" variant="contained">
            Sign In
          </Button>
        </CardActions>
      </Card>
    </Container>
  );
};

export default LoginPage;

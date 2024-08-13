import { Container, Title, Text, Button, Group } from "@mantine/core";
import Illustration from "./Illustration";
import classes from "./PageNotFound.module.css";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <Container className={classes.root}>
      <div className={classes.inner}>
        <Illustration className={classes.image} />
        <div className={classes.content}>
          <Title className={classes.title}>Nothing to see here</Title>
          <Text
            c="dimmed"
            size="lg"
            ta="center"
            className={classes.description}
          >
            Page you are trying to open does not exist. You may have mistyped
            the address, or the page has been moved to another URL.
          </Text>
          <Group justify="center">
            <Link
              to="/"
              className="text-3xl text-center mt-10 text-grey-800 hover:text-gray-600"
            >
              <Button size="md" color="cyan">
                Take me back to home page
              </Button>
            </Link>
          </Group>
        </div>
      </div>
    </Container>
  );
};

export default PageNotFound;

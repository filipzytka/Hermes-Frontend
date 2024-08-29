import {
  Image,
  Container,
  Title,
  Button,
  Group,
  Text,
  List,
  ThemeIcon,
  rem,
} from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";
import image from "../assets/herobullets.svg";
import classes from "../assets/HeroBullets.module.css";
import { Link } from "react-router-dom";

const HeroBullets = () => {
  return (
    <Container size="md">
      <div className={classes.inner}>
        <div className={classes.content}>
          <Title className={classes.title}>
            Streamline Your Server Management <br /> with Our Admin Dashboard
          </Title>
          <Text c="dimmed" mt="md">
            Efficiently manage your server and collaborators with our modern
            admin dashboard. From role-based access control to real-time server
            statistics, our platform provides all the tools you need to keep
            your server running smoothly.
          </Text>

          <List
            mt={30}
            spacing="sm"
            size="sm"
            icon={
              <ThemeIcon size={20} radius="xl">
                <IconCheck
                  style={{ width: rem(12), height: rem(12) }}
                  stroke={1.5}
                />
              </ThemeIcon>
            }
          >
            <List.Item>
              <b>Role-Based Access Control</b> – Sign in as an admin or
              collaborator, with customized permissions tailored to each role.
            </List.Item>
            <List.Item>
              <b>Invite Collaborators</b> – Admins can send invitation emails to
              add new collaborators to the platform effortlessly.
            </List.Item>
            <List.Item>
              <b>Server Management Tools</b> – Manage your banlist, keep track
              of unwanted users, and ensure your server runs smoothly.
            </List.Item>
            <List.Item>
              <b>Real-Time Server Statistics</b> – View live data from your
              server, including player counts and activity trends, displayed in
              an intuitive chart format.
            </List.Item>
          </List>

          <Group mt={30}>
            <Link
              to="https://github.com/Filipus1/Hermes-Frontend"
              target="_blank"
            >
              <Button color={"cyan"} variant="filled" radius="xl" size="md">
                Source code
              </Button>
            </Link>
          </Group>
        </div>
        <Image src={image} className={classes.image} />
      </div>
    </Container>
  );
};

export default HeroBullets;

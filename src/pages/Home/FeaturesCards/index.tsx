import {
  Group,
  Title,
  Text,
  Card,
  SimpleGrid,
  Container,
  rem,
} from "@mantine/core";
import classes from "../assets/FeaturesCards.module.css";
import { data } from "./data";

const FeaturesCards = () => {
  const features = data.map((d) => (
    <Card
      key={d.title}
      shadow="md"
      radius="md"
      className={classes.card}
      padding="xl"
    >
      <d.icon
        style={{ width: rem(50), height: rem(50) }}
        stroke={2}
        color="#06b6d4"
      />
      <Text fz="lg" fw={500} className={classes.cardTitle} mt="md">
        {d.title}
      </Text>
      <Text fz="sm" c="dimmed" mt="sm">
        {d.description}
      </Text>
    </Card>
  ));

  return (
    <Container size="lg" py="xl">
      <Group justify="center"></Group>
      <Title order={2} className={classes.title} ta="center" mt="sm">
        Manage Your Server with Efficient Features
      </Title>

      <Text c="dimmed" className={classes.description} ta="center" mt="md">
        Our platform offers a comprehensive suite of tools designed to help you
        effortlessly manage your server and collaborate with your team.
      </Text>

      <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl" mt={50}>
        {features}
      </SimpleGrid>
    </Container>
  );
};

export default FeaturesCards;

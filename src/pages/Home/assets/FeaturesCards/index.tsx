import {
  Group,
  Title,
  Text,
  Card,
  SimpleGrid,
  Container,
  rem,
  useMantineColorScheme,
} from "@mantine/core";
import classes from "./FeaturesCards.module.css";
import { data } from "./data";

const FeaturesCards = () => {
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === "dark";

  const features = data.map((d) => (
    <Card
      key={d.title}
      shadow="md"
      radius="md"
      className={classes.card}
      padding="xl"
      style={{
        backgroundColor: isDark ? "#0e141f" : undefined,
      }}
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
        Integrate effortlessly with any technology stack
      </Title>

      <Text c="dimmed" className={classes.description} ta="center" mt="md">
        Every once in a while, you’ll see a Golbat that’s missing some fangs.
        This happens when hunger drives it to try biting a Steel-type Pokémon.
      </Text>

      <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl" mt={50}>
        {features}
      </SimpleGrid>
    </Container>
  );
};

export default FeaturesCards;

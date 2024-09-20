import { Text, Container, SimpleGrid, rem, Title } from "@mantine/core";
import classes from "./assets/FeaturesGrid.module.css";
import { FeaturesGridData } from "./data";

interface FeatureProps {
  icon: React.FC<any>;
  title: React.ReactNode;
  description: React.ReactNode;
}

export function Feature({ icon: Icon, title, description }: FeatureProps) {
  return (
    <div>
      <Icon style={{ width: rem(100), height: rem(100) }} stroke={1.5} />
      <Text mt="sm" mb={7}>
        {title}
      </Text>
      <Text size="sm" c="dimmed" lh={1.6}>
        {description}
      </Text>
    </div>
  );
}

export function FeaturesGrid() {
  const features = FeaturesGridData.map((feature, index) => (
    <Feature {...feature} key={index} />
  ));

  return (
    <section id="features">
      <Container size={1250} px={0} className={classes.wrapper}>
        <Title className={`${classes.title}`}>
          <Text
            component="span"
            variant="gradient"
            gradient={{ from: "blue", to: "cyan" }}
            inherit
          >
            Technologies & Features
          </Text>
        </Title>

        <SimpleGrid
          mt={60}
          cols={{ base: 1, sm: 2, md: 3 }}
          spacing={{ base: "xl", md: 50 }}
          verticalSpacing={{ base: "xl", md: 50 }}
        >
          {features}
        </SimpleGrid>
      </Container>
    </section>
  );
}

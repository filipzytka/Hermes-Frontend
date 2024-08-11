import LineGraph from "../../components/Chart/Line";
import Footer from "../../components/Shared/Footer";
import NavigationBar from "../../components/Shared/NavigationBar";

const Statistics = () => {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <NavigationBar />
        <div className="flex flex-grow items-center">
          <LeadGrid />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Statistics;

import { Container, Grid, SimpleGrid, rem } from "@mantine/core";

const PRIMARY_COL_HEIGHT = rem(300);

export function LeadGrid() {
  const SECONDARY_COL_HEIGHT = `calc(${PRIMARY_COL_HEIGHT} / 2 - var(--mantine-spacing-md) / 2)`;

  return (
    <Container my="md">
      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="lg">
        <div style={{ height: PRIMARY_COL_HEIGHT }}>
          <LineGraph />
        </div>
        <Grid gutter="md">
          <Grid.Col>
            <div style={{ height: SECONDARY_COL_HEIGHT }}>
              <LineGraph />
            </div>
          </Grid.Col>
          <Grid.Col span={6}>
            <div style={{ height: SECONDARY_COL_HEIGHT }}>
              <LineGraph />
            </div>
          </Grid.Col>
          <Grid.Col span={6}>
            <div style={{ height: SECONDARY_COL_HEIGHT }}>
              <LineGraph />
            </div>
          </Grid.Col>
        </Grid>
      </SimpleGrid>
    </Container>
  );
}

import { Text, Container, SimpleGrid, rem, Title } from "@mantine/core";
import classes from "./FeaturesGrid.module.css";
import { AiOutlineSchedule, AiOutlineDotNet } from "react-icons/ai";
import { SiCypress, SiElastic } from "react-icons/si";
import { FaShieldAlt, FaDocker } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { RiReactjsFill } from "react-icons/ri";
import { BiLogoPostgresql } from "react-icons/bi";

export const MOCKDATA = [
  {
    icon: AiOutlineDotNet,
    title: "ASP.NET Core",
    description:
      "High-performance backend framework used to build scalable web applications and APIs, seamlessly integrating with PostgreSQL and ElasticSearch for robust data management.",
  },
  {
    icon: RiReactjsFill,
    title: "React JS",
    description:
      "Dynamic, component-based frontend library used with TypeScript and Vite for fast, modern UI development, enabling real-time interactions and seamless integration with backend APIs.",
  },
  {
    icon: SiElastic,
    title: "ElasticSearch & Logstash",
    description:
      "Search and analytics engine paired with Logstash to ingest, process, and store logs from monitored servers, enabling real-time querying and analysis of system data.",
  },
  {
    icon: SiCypress,
    title: "Cypress E2E Tests",
    description:
      "End-to-end testing framework designed to ensure reliability and smooth user experience, automating UI and API tests for the entire application.",
  },
  {
    icon: AiOutlineSchedule,
    title: "Background Scheduling",
    description:
      "Automate recurring tasks such as server monitoring and notifications with Quartz.NET, ensuring timely execution and optimal system performance.",
  },
  {
    icon: BiLogoPostgresql,
    title: "PostgreSQL",
    description:
      "Advanced relational database system used to store structured application data, offering powerful querying, scalability, and data integrity.",
  },
  {
    icon: FaShieldAlt,
    title: "Role-based Authorization",
    description:
      "Secure authorization system with admin and collaborator roles, including email-based invitations, ensuring controlled access to the platform’s resources.",
  },
  {
    icon: MdDashboard,
    title: "Admin Dashboard",
    description:
      "Comprehensive dashboard for managing users, viewing logs, monitoring metrics, and administering system configurations with a clean, intuitive UI.",
  },
  {
    icon: FaDocker,
    title: "Docker",
    description:
      "Containerization platform ensuring the application is portable, scalable, and isolated, with all services running in consistent environments.",
  },
];

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
  const features = MOCKDATA.map((feature, index) => (
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
            Technologies features
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

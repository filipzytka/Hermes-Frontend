import { AiOutlineSchedule, AiOutlineDotNet } from "react-icons/ai";
import { SiCypress, SiElastic } from "react-icons/si";
import { FaShieldAlt, FaDocker } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { RiReactjsFill } from "react-icons/ri";
import { BiLogoPostgresql } from "react-icons/bi";

export const FeaturesGridData = [
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

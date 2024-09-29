import { Container, Text, Group, Image } from "@mantine/core";
import classes from "./assets/HeroTitle.module.css";
import { FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";
import image from "./assets/herobullets.svg";

export function HeroTitle() {
  return (
    <section id="hero-title" className={`${classes.wrapper}`}>
      <Container size={1250} px={0} className={classes.inner}>
        <div className="flex flex-row justify-between">
          <h1 className={`${classes.title} max-w-2xl `}>
            A{" "}
            <Text
              component="span"
              variant="gradient"
              gradient={{ from: "blue", to: "cyan" }}
              inherit
            >
              modern and intuitive
            </Text>{" "}
            Hermes dashboard for managing servers provides real-time metrics and
            tools for efficient administration and proactive monitoring
          </h1>
          <Image src={image} className={classes.image} />
        </div>

        <Group className={`${classes.controls} `}>
          <Link
            className="py-3 px-6 inline-flex justify-center items-center gap-2 rounded-lg border border-transparent font-semibold
    bg-gray-800 text-white hover:bg-gray-900 focus:outline-none 
    transition-all text-lg focus:ring-offset-gray-800 whitespace-nowrap"
            to="https://github.com/filipzytka/Hermes"
            target="_blank"
          >
            <FaGithub /> Backend
          </Link>

          <Link
            className="py-3 px-6 inline-flex justify-center items-center gap-2 rounded-lg border border-transparent font-semibold
    bg-gray-800 text-white hover:bg-gray-900 focus:outline-none 
    transition-all text-lg focus:ring-offset-gray-800 whitespace-nowrap"
            to="https://github.com/filipzytka/Hermes-Frontend"
            target="_blank"
          >
            <FaGithub /> Frontend
          </Link>
        </Group>
      </Container>
    </section>
  );
}

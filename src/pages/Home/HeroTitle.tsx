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
          <h1 className={`${classes.title} max-w-xl `}>
            A{" "}
            <Text
              component="span"
              variant="gradient"
              gradient={{ from: "blue", to: "cyan" }}
              inherit
            >
              modern and intuitive
            </Text>{" "}
            admin dashboard for managing servers offers real-time metrics for
            efficient management
          </h1>
          <Image src={image} className={classes.image} />
        </div>

        <Group className={`${classes.controls} mt-8`}>
          <Link
            className="py-3 px-8 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold
    bg-gray-800 text-white hover:bg-gray-600 focus:outline-none 
    transition-all text-xl dark:focus:ring-offset-gray-800 whitespace-nowrap"
            to="https://github.com/filipzytka/Hermes"
            target="_blank"
          >
            <FaGithub /> Backend
          </Link>

          <Link
            className="py-3 px-8 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold
    bg-gray-800 text-white hover:bg-gray-600 focus:outline-none 
    transition-all text-xl dark:focus:ring-offset-gray-800 whitespace-nowrap"
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

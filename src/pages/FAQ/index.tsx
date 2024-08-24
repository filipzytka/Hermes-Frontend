import { Container, Title, Accordion } from "@mantine/core";
import NavigationBar from "../../components/Shared/NavigationBar";
import Footer from "../../components/Shared/Footer";
import { data } from "./data";

const FAQ = () => {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <NavigationBar />
      <Container
        size="sm"
        className="flex-grow w-full justify-center items-center mt-8 md:mt-32"
      >
        <Title className="text-center text-gray-800 dark:text-gray-100 mb-8">
          Frequently Asked Questions
        </Title>

        <Accordion variant="separated">
          {data.map((d) => (
            <Accordion.Item key={d.value} value={d.value}>
              <Accordion.Control>{d.question}</Accordion.Control>
              <Accordion.Panel>{d.answer}</Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion>
      </Container>
      <Footer />
    </div>
  );
};

export default FAQ;

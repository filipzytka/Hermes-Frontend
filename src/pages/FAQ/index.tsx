import { Container, Title, Accordion } from "@mantine/core";
import NavigationBar from "../../components/Shared/NavigationBar";
import Footer from "../../components/Shared/Footer";

const FAQ = () => {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <NavigationBar />
      <Container
        size="sm"
        className="flex-grow w-full justify-center items-center my-28"
      >
        <Title className="text-center text-gray-800 dark:text-gray-400 my-10">
          Frequently Asked Questions
        </Title>

        <Accordion variant="separated">
          <Accordion.Item value="add-collaborators">
            <Accordion.Control>
              How do I add collaborators via email?
            </Accordion.Control>
            <Accordion.Panel>
              To add collaborators, go to the 'Collaborators' section, enter the
              email address of the person you want to add, and select their
              role. An invitation will be sent to their email.
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item value="permissions">
            <Accordion.Control>
              How can I manage permissions for different collaborators?
            </Accordion.Control>
            <Accordion.Panel>
              Permissions can be managed by navigating to the 'Permissions' tab
              under 'Settings'. Here, you can assign or revoke specific
              permissions for each collaborator.
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item value="view-charts">
            <Accordion.Control>
              How can I view and customize the charts of statistics?
            </Accordion.Control>
            <Accordion.Panel>
              You can view and customize charts from the 'Analytics' section.
              Choose the metrics you want to display and adjust the time range
              or filters to tailor the data to your needs.
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item value="monitor-resources">
            <Accordion.Control>
              What tools are available for monitoring server resources?
            </Accordion.Control>
            <Accordion.Panel>
              Our platform provides a real-time dashboard with CPU, memory, and
              disk usage stats. You can set up alerts for when resources reach
              critical levels.
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item value="notifications">
            <Accordion.Control>
              Can I set up notifications for server resource thresholds?
            </Accordion.Control>
            <Accordion.Panel>
              Yes, go to the 'Notifications' settings to configure alerts. You
              can set thresholds for different server resources, and choose how
              you would like to be notified.
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      </Container>
      <Footer />
    </div>
  );
};

export default FAQ;

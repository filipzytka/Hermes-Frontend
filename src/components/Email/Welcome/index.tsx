import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import { REACT_URL } from "../../../services/constants";

interface Props {
  username: string;
  token: string;
  inviterEmail: string;
}

export const Welcome = ({ username, token, inviterEmail }: Props) => {
  return (
    <Html>
      <Head />
      <Preview>You have been invited to join Hermes</Preview>
      <Body style={main}>
        <Container style={container}>
          <Text style={title}>You have been invited to join Hermes.</Text>
          <Section style={section}>
            <Text style={text}>
              Hey <strong>{username}</strong>!
            </Text>
            <Text style={text}>
              You have been invited by {inviterEmail} to join Hermes. Click the
              button below to accept your invitation.
            </Text>
            <Button
              style={button}
              href={`${REACT_URL}/register?token=${token}`}
            >
              Accept Invitation
            </Button>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

Welcome.PreviewProps = {
  username: "alanturing",
} as Props;

export default Welcome;

const main = {
  backgroundColor: "#ffffff",
  color: "#24292e",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji"',
};

const container = {
  maxWidth: "480px",
  margin: "0 auto",
  padding: "20px 0 48px",
};

const title = {
  fontSize: "24px",
  lineHeight: 1.25,
};

const section = {
  padding: "24px",
  border: "solid 1px #dedede",
  borderRadius: "5px",
  textAlign: "center" as const,
};

const text = {
  margin: "0 0 10px 0",
  textAlign: "left" as const,
};

const button = {
  fontSize: "14px",
  backgroundColor: "#60a5fa",
  color: "#fff",
  lineHeight: 1.5,
  borderRadius: "0.5em",
  padding: "12px 24px",
};

const links = {
  textAlign: "center" as const,
};

const link = {
  color: "#0366d6",
  fontSize: "12px",
};

const footer = {
  color: "#6a737d",
  fontSize: "12px",
  textAlign: "center" as const,
  marginTop: "60px",
};

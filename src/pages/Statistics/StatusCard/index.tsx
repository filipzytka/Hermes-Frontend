import { Text, Card, RingProgress } from "@mantine/core";
import classes from "./StatusCard.module.css";
import { TServerState } from "..";

type Props = {
  state: TServerState;
};

const StatusCard = ({ state }: Props) => {
  return (
    <Card withBorder p="xl" radius="md" className={`${classes.card}`}>
      <div className={classes.inner}>
        <div>
          <Text fz="xl" className={classes.label}>
            Server status
          </Text>
        </div>
        <div className={classes.ring}>
          <RingProgress
            roundCaps
            thickness={6}
            size={150}
            sections={[
              {
                value: 100,
                color: `${
                  state === "ON"
                    ? `green`
                    : state === "PENDING"
                    ? `gray`
                    : `red`
                }`,
              },
            ]}
            label={
              <div>
                <Text
                  ta="center"
                  fz="lg"
                  className={`${
                    state === "ON"
                      ? `text-green-500`
                      : state == "PENDING"
                      ? `text-cyan-500`
                      : `text-red-500`
                  }`}
                >
                  {state === "ON" ? "OK" : state == "PENDING" ? "..." : "ERROR"}
                </Text>
              </div>
            }
          />
        </div>
      </div>
    </Card>
  );
};

export default StatusCard;

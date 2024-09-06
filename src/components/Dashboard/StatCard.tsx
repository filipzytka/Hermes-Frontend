import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export type StatCardProps = {
  title?: string;
  value?: string;
  title2?: string;
  value2?: string;
};

export default function StatCard({
  title = "",
  value = "",
  title2 = "",
  value2 = "",
}: StatCardProps) {
  return (
    <Card variant="outlined" sx={{ height: "100%", flexGrow: 1 }}>
      <CardContent>
        <Stack
          direction="column"
          sx={{ justifyContent: "space-between", flexGrow: 1, gap: 2 }}
        >
          <Stack>
            {title && (
              <Typography component="h2" variant="subtitle2" gutterBottom>
                {title}
              </Typography>
            )}
            {value && (
              <Typography variant="h4" component="p">
                {value}
              </Typography>
            )}
          </Stack>
          <Stack>
            {title2 && (
              <Typography component="h2" variant="subtitle2" gutterBottom>
                {title2}
              </Typography>
            )}
            {value2 && (
              <Typography variant="h4" component="p">
                {value2}
              </Typography>
            )}
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}

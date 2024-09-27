import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { mainListItems } from "./data";

type Props = {
  currentPageIndex?: number;
};

export default function MenuContent({ currentPageIndex }: Props) {
  const { role } = useAuth();
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: "space-between" }}>
      <List dense>
        {mainListItems.map((item, index) => {
          if (item.text === "Collaborators" && role !== "admin") {
            return null;
          }

          return (
            <ListItem
              data-cy={`dashboard-nav-menu-item-${index}`}
              key={index}
              disablePadding
              sx={{ display: "block" }}
            >
              <ListItemButton
                onClick={() => handleNavigation(item.path)}
                selected={index === currentPageIndex}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Stack>
  );
}

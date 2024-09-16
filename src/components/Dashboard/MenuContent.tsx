import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import PeopleIcon from "@mui/icons-material/People";
import BlockIcon from "@mui/icons-material/Block";
import SpeakerNotesIcon from "@mui/icons-material/SpeakerNotes";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const mainListItems = [
  { text: "Home", icon: <HomeRoundedIcon /> },
  { text: "Collaborators", icon: <PeopleIcon /> },
  { text: "BanList", icon: <BlockIcon /> },
  { text: "Logs", icon: <SpeakerNotesIcon /> },
];

type Props = {
  currentPageIndex?: number;
};

export default function MenuContent({ currentPageIndex }: Props) {
  const { role } = useAuth();
  const navigate = useNavigate();

  const handleNavigation = (index: number) => {
    if (index == 0) {
      navigate("/admin/dashboard/home");
    } else if (index == 1) {
      navigate("/admin/dashboard/collab");
    } else if (index == 2) {
      navigate("/admin/dashboard/banlist");
    } else if (index == 3) {
      navigate("/admin/dashboard/logs");
    }
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
                onClick={() => handleNavigation(index)}
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

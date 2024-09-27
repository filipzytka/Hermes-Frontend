import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import PeopleIcon from "@mui/icons-material/People";
import BlockIcon from "@mui/icons-material/Block";
import SpeakerNotesIcon from "@mui/icons-material/SpeakerNotes";

export const mainListItems = [
  { text: "Home", icon: <HomeRoundedIcon />, path: "/admin/dashboard/home" },
  {
    text: "Collaborators",
    icon: <PeopleIcon />,
    path: "/admin/dashboard/collab",
  },
  { text: "BanList", icon: <BlockIcon />, path: "/admin/dashboard/banlist" },
  { text: "Logs", icon: <SpeakerNotesIcon />, path: "/admin/dashboard/logs" },
];

import { IoBarChartSharp } from "react-icons/io5";
import { MdQueryStats } from "react-icons/md";
import { FaWpforms } from "react-icons/fa";
import { ImProfile } from "react-icons/im";

const links = [
  {
    id: 1,
    text: "statistiques",
    path: "/",
    icon: <IoBarChartSharp />,
  },
  {
    id: 2,
    text: "recherches",
    path: "all-jobs",
    icon: <MdQueryStats />,
  },
  {
    id: 3,
    text: "ajouter",
    path: "add-job",
    icon: <FaWpforms />,
  },
  {
    id: 4,
    text: "profil",
    path: "profile",
    icon: <ImProfile />,
  },
];

export default links;

import { useAppContext } from "../context/appContext";
import StatsItem from "./StatsItem";
import { FaSuitcaseRolling, FaCalendarCheck, FaBug } from "react-icons/fa";
import Wrapper from "../assets/wrappers/StatsContainer";

const StatsContainer = () => {
  const { stats } = useAppContext();

  const defaultStats = [
    {
      title: "En attente",
      count: stats.pending,
      icon: <FaSuitcaseRolling />,
      color: "#e9b949",
      bcg: "#fcefc7",
    },
    {
      title:
        stats.interview > 1 ? "Entretiens plannifiés" : "Entretien plannifié",
      count: stats.interview,
      icon: <FaCalendarCheck />,
      color: "#647acb",
      bcg: "#e0e8f9",
    },
    {
      title: "Refus",
      count: stats.declined,
      icon: <FaBug />,
      color: "#d66a6a",
      bcg: "#ffeeee",
    },
  ];

  return (
    <Wrapper>
      {defaultStats.map((item, idx) => (
        <StatsItem key={idx} {...item} />
      ))}
    </Wrapper>
  );
};
export default StatsContainer;

import { useAppContext } from "../context/appContext";
import moment from "moment";
import "moment/locale/fr";
import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/Job";
import JobInfo from "./JobInfo";

const Job = ({
  id,
  company,
  createdAt,
  position,
  jobLocation,
  jobType,
  status,
}) => {
  const { editMode, deleteJob, isLoading } = useAppContext();

  return (
    <Wrapper>
      <header>
        <div className="main-icon">{company.charAt(0)}</div>
        <div className="info">
          <h5>{position}</h5>
          <p>{company}</p>
        </div>
      </header>

      <div className="content">
        <div className="content-center">
          <JobInfo icon={<FaLocationArrow />} text={jobLocation} />
          <JobInfo
            icon={<FaCalendarAlt />}
            text={moment(createdAt).local("fr").calendar()}
          />
          <JobInfo icon={<FaBriefcase />} text={jobType} />
          <div
            className={
              status === "entrevue"
                ? "status interview"
                : status === "refusé"
                ? "status declined"
                : "status pending"
            }
          >
            {status}
          </div>
        </div>
        <footer>
          <div className="actions">
            <Link
              to="/add-job"
              className="btn edit-btn"
              onClick={() => editMode(id)}
            >
              Éditer
            </Link>
            <button
              disabled={isLoading}
              onClick={() => deleteJob(id)}
              className="btn delete-btn"
            >
              Supprimer
            </button>
          </div>
        </footer>
      </div>
    </Wrapper>
  );
};
export default Job;

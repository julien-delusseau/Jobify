import { useAppContext } from "../../context/appContext";
import { FormRow, FormRowSelect } from "../../components";
import Wrapper from "../../assets/wrappers/DashboardFormPage";

const AddJob = () => {
  const {
    isLoading,
    isEditing,
    position,
    company,
    jobLocation,
    jobTypeOptions,
    statusOptions,
    jobType,
    status,
    handleChange,
    clearJobValues,
    createJob,
    editJob,
  } = useAppContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isEditing) {
      await editJob();
      return;
    }
    await createJob({ company, position, jobLocation, jobType, status });
  };

  const handleJobChange = (e) => {
    handleChange({ name: e.target.name, value: e.target.value });
  };

  return (
    <Wrapper>
      <form onSubmit={handleSubmit} className="form">
        <h3>{isEditing ? "Éditer un métier" : "Ajouter un métier"}</h3>

        <div className="form-center">
          {/* COMPANY */}
          <FormRow
            label="Entreprise"
            name="company"
            value={company}
            onChange={handleJobChange}
          />
          {/* POSITION */}
          <FormRow
            label="Intitulé"
            name="position"
            value={position}
            onChange={handleJobChange}
          />
          {/* JOB LOCATION */}
          <FormRow
            label="Ville"
            name="jobLocation"
            value={jobLocation}
            onChange={handleJobChange}
          />

          {/* JOB TYPE */}
          <FormRowSelect
            label="Type"
            name="jobType"
            value={jobType}
            onChange={handleJobChange}
            list={jobTypeOptions}
          />

          {/* JOB STATUS */}
          <FormRowSelect
            name="status"
            value={status}
            onChange={handleJobChange}
            list={statusOptions}
          />

          <div className="btn-container">
            <button
              type="submit"
              className="btn btn-block submit-btn"
              disabled={isLoading}
            >
              {isEditing ? "Modifier" : "Ajouter"}
            </button>

            <button
              type="button"
              className="btn btn-block clear-btn"
              onClick={clearJobValues}
            >
              Reset
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};
export default AddJob;

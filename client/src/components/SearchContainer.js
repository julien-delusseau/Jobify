import { useAppContext } from "../context/appContext";
import FormRow from "./FormRow";
import FormRowSelect from "./FormRowSelect";
import Wrapper from "../assets/wrappers/SearchContainer";

const SearchContainer = () => {
  const {
    isLoading,
    search,
    searchStatus,
    searchType,
    sort,
    sortOptions,
    handleChange,
    clearFilters,
    jobTypeOptions,
    statusOptions,
  } = useAppContext();

  const handleSearch = (e) => {
    const { name, value } = e.target;
    if (isLoading) return;

    handleChange({ name, value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    clearFilters();
  };

  return (
    <Wrapper>
      <form onSubmit={handleSubmit} className="form">
        <h4>Formulaire de recherche</h4>
        <div className="form-center">
          <FormRow
            type="text"
            label="recherche"
            name="search"
            value={search}
            onChange={handleSearch}
          />

          <FormRowSelect
            label="status"
            name="searchStatus"
            value={searchStatus}
            onChange={handleSearch}
            list={["--", ...statusOptions]}
          />

          <FormRowSelect
            label="type"
            name="searchType"
            value={searchType}
            onChange={handleSearch}
            list={["--", ...jobTypeOptions]}
          />

          <FormRowSelect
            label="Ordre"
            name="sort"
            value={sort}
            onChange={handleSearch}
            list={sortOptions}
          />

          <button
            type="submit"
            className="btn btn-block btn-danger"
            disabled={isLoading}
          >
            Reset
          </button>
        </div>
      </form>
    </Wrapper>
  );
};
export default SearchContainer;

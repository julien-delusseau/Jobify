import { useReducer, useContext, createContext } from "react";
import reducer from "./reducers";
import {
  CLEAR_ALERT,
  SETUP_USER,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR,
  UPDATE_USER,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  LOGOUT_USER,
  TOGGLE_SIDEBAR,
  HANDLE_CHANGE,
  CLEAR_VALUES,
  CREATE_JOB,
  CREATE_JOB_SUCCESS,
  CREATE_JOB_ERROR,
  GET_JOBS,
  GET_JOBS_SUCCESS,
  EDIT_JOB,
  EDIT_JOB_BEGIN,
  EDIT_JOB_SUCCESS,
  EDIT_JOB_ERROR,
  DELETE_JOB,
  SHOW_STATS,
  SHOW_STATS_SUCCESS,
  CLEAR_FILTERS,
  CHANGE_PAGE,
} from "./actions";
import axios from "axios";

const user = localStorage.getItem("user");
const token = localStorage.getItem("token");
const location = localStorage.getItem("location");

const initialState = {
  isLoading: false,
  user: JSON.parse(user) || null,
  token: token || null,
  userLocation: location || "",
  showAlert: false,
  alertText: "",
  alertType: "",
  showSidebar: false,
  isEditing: false,
  editJobId: "",
  position: "",
  company: "",
  jobLocation: location || "",
  jobTypeOptions: ["CDI", "CDD", "télétravail", "stage"],
  jobType: "CDI",
  statusOptions: ["entrevue", "refusé", "en cours"],
  status: "en cours",
  jobs: [],
  totalJobs: 0,
  numOfPages: 1,
  page: 1,
  stats: {},
  monthlyApplications: [],
  search: "",
  searchStatus: "all",
  searchType: "all",
  sort: "latest",
  sortOptions: ["latest", "oldest", "a-z", "z-a"],
};

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  /**
   * Axios Instance
   */
  const authFetch = axios.create();

  /**
   * Axios Request
   */
  authFetch.interceptors.request.use(
    (config) => {
      config.headers.common["Authorization"] = `Bearer ${state.token}`;
      return config;
    },
    (err) => {
      return Promise.reject(err);
    }
  );

  /**
   * Axios Response
   */
  authFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (err) => {
      if (err.response.status === 401) {
        logoutUser();
      }
      return Promise.reject(err);
    }
  );

  /**
   * Clear Alert
   */
  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 1000);
  };

  /**
   * Handle Input Change
   */
  const handleChange = ({ name, value }) => {
    dispatch({ type: HANDLE_CHANGE, payload: { name, value } });
  };

  /**
   * Clear Job Values
   */
  const clearJobValues = () => {
    dispatch({ type: CLEAR_VALUES });
  };

  /**
   * Add User To Local Storage
   */
  const addUserToLocalStorage = ({ user, token, location }) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
    localStorage.setItem("location", location);
  };

  /**
   * Remove User From Local Storage
   */
  const removeUserFromLocalStorage = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("location");
  };

  /**
   * Login / Register User
   */
  const setupUser = async (currentUser, endPoint) => {
    dispatch({ type: SETUP_USER });
    try {
      const res = await axios.post(`/api/auth/${endPoint}`, currentUser);
      const { token, user } = res.data;
      dispatch({
        type: SETUP_USER_SUCCESS,
        payload: { token, user, location: user.location },
      });
      addUserToLocalStorage({ user, token, location: user.location });
    } catch (error) {
      dispatch({
        type: SETUP_USER_ERROR,
        payload: error.response.data.message,
      });
    }
    clearAlert();
  };

  /**
   * Update User
   */
  const updateUser = async (currentUser) => {
    dispatch({ type: UPDATE_USER });
    try {
      const { data } = await authFetch.patch("/api/auth/update", currentUser);
      const { token, user } = data;
      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: { token, user, location: user.location },
      });
      addUserToLocalStorage({ user, token, location: user.location });
    } catch (error) {
      dispatch({
        type: UPDATE_USER_ERROR,
        payload: error.response.data.message,
      });
    }
    clearAlert();
  };

  /**
   * Logout User
   */
  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER });
    removeUserFromLocalStorage();
  };

  /**
   * Toggle Sidebar
   */
  const toggleSidebar = () => {
    dispatch({ type: TOGGLE_SIDEBAR });
  };

  /**
   * Get Jobs
   */
  const getJobs = async () => {
    dispatch({ type: GET_JOBS });
    try {
      let url = `/api/jobs?status=${state.searchStatus}&jobType=${state.searchType}&sort=${state.sort}&page=${state.page}`;
      if (state.search) {
        url += `&search=${state.search}`;
      }

      const { data } = await authFetch.get(url);
      const { jobs, totalJobs, numOfPages } = data;
      dispatch({
        type: GET_JOBS_SUCCESS,
        payload: { jobs, totalJobs, numOfPages },
      });
    } catch (error) {
      logoutUser();
    }
  };

  /**
   * Create Job
   */
  const createJob = async ({
    company,
    position,
    jobLocation,
    jobType,
    status,
  }) => {
    const newJob = { company, position, jobLocation, jobType, status };
    dispatch({ type: CREATE_JOB });
    try {
      const { data } = await authFetch.post("/api/jobs", newJob);
      dispatch({ type: CREATE_JOB_SUCCESS, payload: data });
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      dispatch({
        type: CREATE_JOB_ERROR,
        payload: error.response.data.message,
      });
    }
    clearAlert();
  };

  /**
   * Edit Mode
   */
  const editMode = (id) => {
    dispatch({ type: EDIT_JOB, payload: { id } });
  };

  /**
   * Edit Job
   */
  const editJob = async () => {
    const { company, position, jobLocation, jobType, status, editJobId } =
      state;
    dispatch({ type: EDIT_JOB_BEGIN });
    try {
      await authFetch.patch(`/api/jobs/${editJobId}`, {
        company,
        position,
        jobLocation,
        jobType,
        status,
      });
      dispatch({ type: EDIT_JOB_SUCCESS });
      clearJobValues();
    } catch (error) {
      dispatch({
        type: EDIT_JOB_ERROR,
        payload: error.response.data.message,
      });
    }
    clearAlert();
  };

  /**
   * Delete Job
   */
  const deleteJob = async (id) => {
    if (window.confirm("Supprimer cette sauvegarde ?")) {
      dispatch({ type: DELETE_JOB });
      try {
        await authFetch.delete(`/api/jobs/${id}`);
        await getJobs();
      } catch (error) {
        logoutUser();
      }
    }
  };

  /**
   * Show Stats
   */
  const showStats = async () => {
    dispatch({ type: SHOW_STATS });
    try {
      const { data } = await authFetch.get("/api/jobs/stats");
      dispatch({
        type: SHOW_STATS_SUCCESS,
        payload: {
          stats: data.stats,
          monthlyApplications: data.monthlyApplications,
        },
      });
    } catch (error) {
      logoutUser();
    }
    clearAlert();
  };

  /**
   * Clear Filters
   */
  const clearFilters = () => {
    dispatch({ type: CLEAR_FILTERS });
  };

  /**
   * Change Page
   */
  const changePage = (page) => {
    dispatch({ type: CHANGE_PAGE, payload: { page } });
  };

  /**
   * Return
   */
  return (
    <AppContext.Provider
      value={{
        ...state,
        setupUser,
        logoutUser,
        updateUser,
        toggleSidebar,
        handleChange,
        clearJobValues,
        createJob,
        getJobs,
        editMode,
        editJob,
        deleteJob,
        showStats,
        clearFilters,
        changePage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, useAppContext, initialState };

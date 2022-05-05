import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  CLEAR_VALUES,
  SETUP_USER,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR,
  UPDATE_USER,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  LOGOUT_USER,
  TOGGLE_SIDEBAR,
  HANDLE_CHANGE,
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
import { initialState } from "./appContext";

const reducer = (state, action) => {
  if (action.type === DISPLAY_ALERT) {
    return {
      ...state,
      showAlert: true,
      alertType: action.payload.type,
      alertText: action.payload.message,
    };
  }
  if (action.type === CLEAR_ALERT) {
    return {
      ...state,
      showAlert: false,
      alertType: "",
      alertText: "",
    };
  }

  if (action.type === CLEAR_VALUES) {
    const init = {
      isEditing: false,
      editJobId: "",
      position: "",
      company: "",
      jobLocation: state.userLocation,
      jobType: "CDI",
      status: "en cours",
    };
    return { ...state, ...init };
  }

  if (action.type === HANDLE_CHANGE) {
    return {
      ...state,
      page: 1,
      [action.payload.name]: action.payload.value,
    };
  }

  if (action.type === SETUP_USER) {
    return { ...state, isLoading: true, showAlert: false };
  }
  if (action.type === SETUP_USER_SUCCESS) {
    const { user, token, location } = action.payload;
    return {
      ...state,
      isLoading: false,
      user,
      token,
      userLocation: location,
      jobLocation: location,
      showAlert: true,
      alertType: "success",
      alertText: "Connexion réussie",
    };
  }
  if (action.type === SETUP_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "error",
      alertText: action.payload,
    };
  }

  if (action.type === UPDATE_USER) {
    return { ...state, isLoading: true, showAlert: false };
  }
  if (action.type === UPDATE_USER_SUCCESS) {
    const { user, token, location } = action.payload;
    return {
      ...state,
      isLoading: false,
      user,
      token,
      userLocation: location,
      jobLocation: location,
      showAlert: true,
      alertType: "success",
      alertText: "Profil mis à jour",
    };
  }
  if (action.type === UPDATE_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "error",
      alertText: action.payload,
    };
  }

  if (action.type === LOGOUT_USER) {
    return {
      ...initialState,
      user: null,
      token: null,
      userLocation: "",
      jobLocation: "",
    };
  }

  if (action.type === TOGGLE_SIDEBAR) {
    return {
      ...state,
      showSidebar: !state.showSidebar,
    };
  }

  if (action.type === CREATE_JOB) {
    return { ...state, isLoading: true, showAlert: false };
  }
  if (action.type === CREATE_JOB_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      company: action.payload.company,
      position: action.payload.position,
      jobLocation: action.payload.jobLocation,
      jobType: action.payload.jobType,
      status: action.payload.status,
      showAlert: true,
      alertType: "success",
      alertText: "Sauvegarde créée",
    };
  }
  if (action.type === CREATE_JOB_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "error",
      alertText: action.payload,
    };
  }

  if (action.type === GET_JOBS) {
    return { ...state, isLoading: true, showAlert: false };
  }

  if (action.type === GET_JOBS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      jobs: action.payload.jobs,
      totalJobs: action.payload.totalJobs,
      numOfPages: action.payload.numOfPages,
    };
  }

  if (action.type === EDIT_JOB) {
    const job = state.jobs.find((item) => item.id === action.payload.id);
    return {
      ...state,
      isEditing: true,
      editJobId: job.id,
      position: job.position,
      company: job.company,
      jobLocation: job.jobLocation,
      jobType: job.jobType,
      status: job.status,
    };
  }
  if (action.type === EDIT_JOB_BEGIN) {
    return { ...state, isLoading: true, showAlert: false };
  }
  if (action.type === EDIT_JOB_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "Sauvegarde modifiée",
    };
  }
  if (action.type === EDIT_JOB_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "error",
      alertText: action.payload,
    };
  }
  if (action.type === DELETE_JOB) {
    return { ...state, isLoading: true, showAlert: false };
  }

  if (action.type === SHOW_STATS) {
    return { ...state, isLoading: true, showAlert: false };
  }
  if (action.type === SHOW_STATS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      stats: action.payload.stats,
      monthlyApplications: action.payload.monthlyApplications,
    };
  }

  if (action.type === CLEAR_FILTERS) {
    return {
      ...state,
      search: "",
      searchStatus: "all",
      searchType: "all",
      sort: "latest",
    };
  }

  if (action.type === CHANGE_PAGE) {
    return {
      ...state,
      showAlert: false,
      page: action.payload.page,
    };
  }

  throw new Error(`Action inconnue: ${action.type}`);
};

export default reducer;

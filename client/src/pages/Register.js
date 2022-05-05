import { useState, useEffect } from "react";
import { Logo, FormRow } from "../components";
import Wrapper from "../assets/wrappers/RegisterPage";
import { useAppContext } from "../context/appContext";
import { useNavigate } from "react-router-dom";

const initialState = {
  name: "",
  email: "",
  password: "",
  isMember: true,
};

const Register = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState(initialState);
  const { isLoading, user, setupUser } = useAppContext();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, isMember } = values;

    if (isMember) {
      setupUser({ email, password }, "login");
      return;
    }
    setupUser({ name, email, password }, "register");
  };

  return (
    <Wrapper className="full-page">
      <form onSubmit={handleSubmit} className="form">
        <Logo />
        <h3>{values.isMember ? "Se connecter" : "S'enregistrer"}</h3>
        {!values.isMember && (
          <FormRow
            type="text"
            name="name"
            label="Prénom"
            value={values.name}
            onChange={handleChange}
          />
        )}
        <FormRow
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange}
        />
        <FormRow
          type="password"
          name="password"
          label="Mot de passe"
          value={values.password}
          onChange={handleChange}
        />
        <button type="submit" className="btn btn-block" disabled={isLoading}>
          Envoyer
        </button>
        <p>
          {values.isMember ? "Pas encore inscrit ?" : "Déjà inscrit ?"}
          <button type="button" className="member-btn" onClick={toggleMember}>
            {values.isMember ? "S'enregistrer" : "Se connecter"}
          </button>
        </p>
      </form>
    </Wrapper>
  );
};
export default Register;

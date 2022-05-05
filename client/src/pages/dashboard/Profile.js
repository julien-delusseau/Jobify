import { useState } from "react";
import { useAppContext } from "../../context/appContext";
import { FormRow } from "../../components";
import Wrapper from "../../assets/wrappers/DashboardFormPage";

const Profile = () => {
  const { user, updateUser, isLoading } = useAppContext();
  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [lastname, setLastname] = useState(user?.lastname);
  const [location, setLocation] = useState(user?.location);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser({ name, lastname, email, location });
  };

  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-center">
          <FormRow
            type="text"
            label="Prénom"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <FormRow
            type="text"
            label="Nom"
            name="lastname"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
          <FormRow
            type="email"
            label="Email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <FormRow
            type="text"
            label="Ville"
            name="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />

          <button type="submit" className="btn btn-block" disabled={isLoading}>
            Modifier
          </button>
        </div>
      </form>
    </Wrapper>
  );
};
export default Profile;

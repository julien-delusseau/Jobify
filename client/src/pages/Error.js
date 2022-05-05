import { Link } from "react-router-dom";
import img from "../assets/images/not-found.svg";
import Wrapper from "../assets/wrappers/ErrorPage";

const Error = () => {
  return (
    <Wrapper className="full-page">
      <div>
        <img src={img} alt="ressource introuvable" />
        <h3>404 | Avis de recherche</h3>
        <p>Oups... On dirait que votre page s'est perdue dans le néant ...</p>
        <Link to="/">Retour</Link>
      </div>
    </Wrapper>
  );
};
export default Error;

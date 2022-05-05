import { UnauthorizedError } from "../errors/index.js";

const checkPermissions = (requestUser, resourceUserId) => {
  if (requestUser.role === "admin") return;
  if (parseInt(requestUser.userId) === resourceUserId) return;

  throw new UnauthorizedError(
    "Vous n'avez pas le droit de modifier cette ressource."
  );
};

export default checkPermissions;

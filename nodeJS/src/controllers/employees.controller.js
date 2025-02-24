import { findUserbyId } from "../services/employee.service.js";

export const profileController = (req, res, next) => {
  res.json({
    message: "You made it to the secure route",
    user: req.user,
  });
};

export const employeesController = async (req, res, next) => {
  const user = await findUserbyId(req.params.id);
  console.log(user)
  res.json(user);
};

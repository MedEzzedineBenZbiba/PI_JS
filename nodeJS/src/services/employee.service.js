import User from "../models/employee.model.js";  

export const findUserbyId = async (id) => {
  const user = await User.findById(id);
  return user;
};


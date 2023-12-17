const User = require("../Model/user");

const signup = async (req, res, next) => {
  const { firstName , lastName , email , country ,state ,city,gender,dateOfBirth,age} = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    console.log(err);
  }

  if (existingUser) {
    return res
      .status(400)
      .json({ message: "User already exists! Login Instead" });
  }
  
  const user = new User({
    firstName,
    lastName,
    email,
    country,
    state,
    city,
    gender,
    dateOfBirth,
    age
  });
  
  try {
    await user.save();
  } catch (err) {
    console.log(err);
  }
  
  return res.status(201).json({ message: user });
};



module.exports = {
  signup,

};


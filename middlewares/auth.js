/* Middleware Method to provide authentication to the routes */
const authenticate = async (req, res, next) => {
  try {
    let { userId } = req.body;
    if (!userId) userId = req.params.id;
    if (!userId) userId = req.headers.id;

    if (userId) {
      const rawData = await global.redis_client.get(userId);
      const userData = JSON.parse(rawData);
      if (!userData || !userData.verified) {
        return res.status(401).json({
          error:
            "You have no access; Please do login(using '/login' API) to the access.",
        });
      }
      req.user = userData;
      next();
    } else {
      return res.status(400).json({ error: "Invalid User" });
    }
  } catch (error) {
    res.status(401).json({ error });
  }
};

/* Middleware Method to provide role-based authorization to the routes */
const authorize = (roles = []) => {
  try {
    return (req, res, next) => {
      const { user } = req;
      if (user && roles.includes(user.role)) {
        // role is allowed, so continue on the next step
        next();
      } else {
        // user is forbidden(user's role is not having this access)
        return res.status(403).json({
          Error: "Forbidden: You are not authorized to access this resource",
        });
      }
    };
  } catch (error) {
    res
      .status(403)
      .json({ error: "You are not authorized to access this resource" });
  }
};
module.exports = { authenticate, authorize };

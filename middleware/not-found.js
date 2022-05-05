const notFoundMiddleware = (req, res) => {
  res.status(404).json({ message: "404 | Cette route n'existe pas" });
};

export default notFoundMiddleware;

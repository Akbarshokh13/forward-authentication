const protectedController = (req, res) => {
    res.json({ message: 'Protected resource' });
  };
  
  module.exports = protectedController;
  
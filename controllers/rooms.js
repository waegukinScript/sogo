/**
 * GET /blog
 * Blog form page.
 */
exports.getRooms = (req, res) => {
    //const unknownUser = !(req.user);
  
    res.render('rooms', {
      title: 'Rooms',
      //unknownUser,
    });
  };
  
/**
 * GET /blog
 * Blog form page.
 */
exports.getEvents = (req, res) => {
    //const unknownUser = !(req.user);
  
    res.render('events', {
      title: 'Events',
      //unknownUser,
    });
  };
  
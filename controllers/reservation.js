/**
 * GET /blog
 * Blog form page.
 */
exports.getReservation = (req, res) => {
    //const unknownUser = !(req.user);
  
    res.render('reservation', {
      title: 'Reservation',
      //unknownUser,
    });
  };
  
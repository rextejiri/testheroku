//===========
// dependencies
//==================

const express = require('express');
const router = express.Router();
const Product = require('../models/store.js');




//===================
//Edit Route
//===================

router.get('/:id/edit', (req, res) => {
  Product.findById(req.params.id, (error, foundProduct) => {
    res.render(
      'edit.ejs',
      {
        product: foundProduct,
        currentUser: req.session.currentUser
      }
    )
  });
});

//===================
//Update Route
//===================

router.put('/:id', (req, res) => {
  Product.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedProduct) => {
    res.redirect(`/home/${req.params.id}`);
  });
});


//===================
//Seed Route
//===================

router.get('/seed', (req, res) => {
  Product.create(
    [
      {
        name: 'westly',
        description: 'shoe',
        price: 234,
        qty: 3,
        img: 'https://wallpaperaccess.com/full/30100.jpg'
      }
    ],
    (err, data) => {
      res.redirect('/home')
    }
  )
})


//===================
//New Route
//===================


router.get('/new', (req, res) => {
    res.render(
      'new.ejs',
      {
        currentUser: req.session.currentUser
      }

    )
});


//===================
//Show Route
//===================


router.get('/:id', (req, res) => {
    Product.findById(req.params.id, (error, foundProduct) => {
        res.render(
            'show.ejs',
            {
                product:foundProduct,
                currentUser: req.session.currentUser
            }
        );
    })
});

//===================
//Buy Route
//===================

router.put('/:id/buy', (req, res) => {
  Product.findByIdAndUpdate(req.params.id, {$inc: {qty: -1} }, (error, boughtProduct) => {
    res.redirect(`/home/${req.params.id}`)
  })
})

//===================
//Delete Route
//===================

router.delete('/:id', (req, res) => {
  Product.findByIdAndRemove(req.params.id, (error, deletedProduct) => {
    res.redirect('/home')
  })
})


//===================
//Index Route
//===================

router.get('/', (req, res) => {
  Product.find({}, (error, allProducts) => {
    res.render(
      'index.ejs',
      {
        products: allProducts,
        currentUser: req.session.currentUser
      }
    )
  })

})

//===================
//Create / Post Route
//===================

router.post('/', (req, res) => {
    Product.create(req.body, (error, createdProduct) => {
        res.redirect('/home')
    })
})

module.exports = router;

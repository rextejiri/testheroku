//=================
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
//welcome route
//===================


router.get('/welcome', (req, res) => {
  Product.find({}, (error, allProducts) => {
    res.render(
      'welcome.ejs',
      {
        products: allProducts,
        currentUser: req.session.currentUser
      }
    )
  })

})

//===================
//Seed Route
//===================

router.get('/seed', (req, res) => {
  Product.create(
    [
      {
        name: 'TATINE',
        price: 43.00,
        img: 'https://cdn.shopify.com/s/files/1/0315/1160/9388/products/Stars_are_Fire_SiloB-high-res_8f249c92-8d1d-401b-b956-49760d235d9b_1512x.jpg?v=1598030521',
        img2: 'https://cdn.shopify.com/s/files/1/0315/1160/9388/products/Stars_are_Fire_Silo-high-res_dad5e3c9-ac8e-486e-8ec8-ab8948167d1f_1512x.jpg?v=1598030521',
        description: 'Spirit House Candle - 8 OZ',

      },
      {
        name: 'TATINE',
        price: 43.00,
        img: 'https://cdn.shopify.com/s/files/1/0315/1160/9388/products/Stars_are_Fire_SiloB-high-res_8f249c92-8d1d-401b-b956-49760d235d9b_1512x.jpg?v=1598030521',
        img2: 'https://cdn.shopify.com/s/files/1/0315/1160/9388/products/Stars_are_Fire_Silo-high-res_dad5e3c9-ac8e-486e-8ec8-ab8948167d1f_1512x.jpg?v=1598030521',
        description: 'Spirit House Candle - 8 OZ',

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

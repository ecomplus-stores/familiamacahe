const path = require('path')

module.exports = () => ({
  resolve: {
    alias: {
     
      './html/ProductCard.html': path.resolve(__dirname, 'template/alpix/ProductCard.html'),
      './js/ProductCard.js': path.resolve(__dirname, 'template/alpix/ProductCard.js'),
      './js/TheProduct.js': path.resolve(__dirname, 'template/alpix/TheProduct.js'),
      './html/CartQuickview.html': path.resolve(__dirname, 'template/alpix/CartQuickview.html'),
      './html/CartItem.html': path.resolve(__dirname, 'template/alpix/CartItem.html'),   
      './js/CartItem.js': path.resolve(__dirname, 'template/alpix/CartItem.js'),
      './html/InstantSearch.html': path.resolve(__dirname, 'template/alpix/InstantSearch.html'),   
      './js/InstantSearch.js': path.resolve(__dirname, 'template/alpix/InstantSearch.js'), 
      

      './html/EcCheckout.html': path.resolve(__dirname, 'template/js/custom-js/html/EcCheckout.html'),
      './html/ShippingCalculator.html': path.resolve(__dirname, 'template/js/custom-js/html/ShippingCalculator.html'),

      //  './html/TheCart.html': path.resolve(__dirname, 'template/js/custom-js/html/TheCart.html'),   
      // './html/EcCheckout.html': path.resolve(__dirname, 'template/js/custom-js/html/EcCheckout.html'),   
      // './js/EcCheckout.js': path.resolve(__dirname, 'template/js/custom-js/html/EcCheckout.js'),   
      // './html/PaymentMethods.html': path.resolve(__dirname, 'template/js/custom-js/html/PaymentMethods.html'),   
      // './App.vue': path.resolve(__dirname, 'template/js/custom-js/html/App.vue'), 
      // './html/TheAccount.html': path.resolve(__dirname, 'template/js/custom-js/html/TheAccount.html'), 
    }
  }
})

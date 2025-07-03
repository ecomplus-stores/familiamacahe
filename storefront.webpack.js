const path = require('path')

module.exports = () => ({
  resolve: {
    alias: {
     
      './html/ProductCard.html': path.resolve(__dirname, 'template/alpix/ProductCard.html'),
      './html/CartQuickview.html': path.resolve(__dirname, 'template/alpix/CartQuickview.html'),
      './html/CartItem.html': path.resolve(__dirname, 'template/alpix/CartItem.html'),   
      './js/CartItem.js': path.resolve(__dirname, 'template/alpix/CartItem.js'), 
      
    }
  }
})

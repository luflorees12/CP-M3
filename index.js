if (process.env.NODE_ENV !== 'test') {
   require('./app')
      // ⚠️ NO MODIFICAR ESTE ARCHIVO ⚠️
      .listen(3000, () => {
         console.log('servidor escuchando en el puerto 3000');
      });
}

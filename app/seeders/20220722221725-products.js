'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert('productos',[{
    nombre: 'Manzana',
    cantidad: 1000,
    precio: 15.00,
    createdAt: new Date(),
    updatedAt: new Date()
    },
    {
      nombre: 'Platano',
      cantidad: 1000,
      precio: 12.00,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ],{});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     return queryInterface.bulkDelete('productos', null, {});
  }
};

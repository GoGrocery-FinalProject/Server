'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     await queryInterface.bulkInsert('Transactions', [
       {
         UserId: 2,
         products: '[{\"ProductId:\"1,\"quantity:\"2,\"price\":3500\"},\"{\"ProductId:\"2,\"quantity:\"3,\"price\":5500\"}]',
         order_id: 'OD101-12197',
         totalPrice: 20000,
         status: 'unpaid',
         createdAt: new Date(),
         updatedAt: new Date()
       },
       {
        UserId: 3,
        products: '[{\"ProductId:\"10,\"quantity:\"20,\"price\":35000\"},\"{\"ProductId:\"20,\"quantity:\"30,\"price\":55000\"}]',
        order_id: 'OD101-12198',
        totalPrice: 194800,
        status: 'unpaid',
        createdAt: new Date(),
        updatedAt: new Date()
       }
     ], {})
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Transactions', null, {})
  }
};

'use strict';

const { hashPassword } = require('../helpers/bcrypt')

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
    await queryInterface.bulkInsert('Users', [
      {
        id: 1,
        name: 'Mukti Metronom',
        email: 'muktientutz@mail.com',
        password: hashPassword('sistamania'),
        isAdmin: true,
        phone_number: '081908091808',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        name: 'Benidictivity',
        email: 'benidictivity@mail.com',
        password: hashPassword('korbantenggelam'),
        isAdmin: false,
        phone_number: '081908091808',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        name: 'Manasm',
        email: 'manasm@mail.com',
        password: hashPassword('gooners'),
        isAdmin: false,
        phone_number: '081908091808',
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
    await queryInterface.bulkDelete('Users', null, {})
  }
};

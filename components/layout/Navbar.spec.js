import { mount } from '@cypress/vue';
import Navbar from './Navbar.vue';
`F1`;
import loggedInUser from '~/cypress/fixtures/loggedInUser.json';
import workspace from '~/cypress/fixtures/workspace.json';

describe('Navbar', () => {
  const style = `
    html {
      font-size: 0.5px;
    }
  `;

  const DATA = {
    loggedInUser,
    workspace,
    userInitial: 'MN'
  };

  beforeEach(() => {
    mount(Navbar, {
      propsData: DATA,
      style
    });
  });

  describe('Logo', () => {
    it('has correct wordmark text', () => {
      cy.get('.wordmark').contains('Editori');
    });
  });

  describe('Avatar', () => {
    it('displays user initials', () => {
      cy.get('.avatar').contains(DATA.userInitial);
    });
  });
});

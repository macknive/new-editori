import { mount } from '@cypress/vue';
import Navbar from './Navbar.vue';
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

  describe('Logo', () => {
    it('has correct wordmark text', () => {
      mount(Navbar, {
        propsData: DATA,
        style
      });
      cy.get('.wordmark').contains('Editori');
    });
  });

  describe('Avatar', () => {
    it('displays user initials', () => {
      mount(Navbar, {
        propsData: DATA,
        style
      });
      cy.get('.avatar').contains(DATA.userInitial);
    });
  });

  describe('Workspace', () => {
    it('does not appear when shouldShowWorkspace=false', () => {
      mount(Navbar, {
        propsData: Object.assign(DATA, { shouldShowWorkspace: false }),
        style
      });
      cy.get('.workspace').should('not.exist');
    });

    it('appears when shouldShowWorkspace=true', () => {
      mount(Navbar, {
        propsData: Object.assign(DATA, { shouldShowWorkspace: true }),
        style
      });
      cy.get('.workspace').contains('Little Travelers Guide');
    });
  });
});

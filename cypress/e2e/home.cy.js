/// <reference types="cypress" />

describe(' Validando que o cypress esta função', () => {
    it('Abri a pagina do MarkLite', () => {
        cy.visit('/')    
        cy.title().should('eq', 'Gerencie suas tarefas com Mark L' )
    })
})


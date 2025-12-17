Cypress.Commands.add('fillMandatoryFieldsAndSubmit', (data ={
    FirstName: 'Jonny',
    LastName: 'gym',
    email: 'jonny@gmail.com',
    text: 'variacao2'

})=>{

    cy.get('#firstName').type(data.FirstName)
    cy.get('#lastName').type(data.LastName)
    cy.get('#email').type(data.email)
    cy.get('#open-text-area').type(data.text)
    cy.get('button[type="submit"]').click()

})


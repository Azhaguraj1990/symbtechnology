describe('Form submission', () => {
  function generateRandomName(length = 10) {
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let randomName = '';
      for (let i = 0; i < length; i++) {
        randomName += characters.charAt(Math.floor(Math.random() * characters.length));
      }
      return randomName;
    }
  it('verify form submission and all the data present in URL', () => {
     const randomName=generateRandomName() 
     const randomPassword=generateRandomName() 
     
    cy.visit('https://d3pv22lioo8876.cloudfront.net/tiptop/')
    cy.get('[name="my-disabled"]').should('be.disabled')
    cy.get('[name="my-readonly"]').should('have.value','Readonly input')
    cy.get('.form-select').find('option').should('have.length',8)
    cy.get('#submit-form').should('be.disabled')
    cy.get('#my-name-id').type(randomName)
    cy.get('#my-password-id').type(randomPassword)
    cy.get('#submit-form').should('not.be.disabled')
    cy.get('#submit-form').click()
    cy.url().should('contain',`submitted.html?my-name=${randomName}&my-password=${randomPassword}&my-readonly=Readonly+input&my-select=white`)
    cy.get('#message').should('have.text','Received!')

  })
})
Cypress.Commands.add('createTask', (taskname='') => {
    cy.visit('http://localhost:8080')
    
    cy.get('input[placeholder="Add a new Task"]').as('inputTask')

    if (taskname !== ''){
        cy.get('@inputTask')
        .type(taskname)
    }   
    cy.contains('button', "Create").click() 
});


Cypress.Commands.add('isRequired', (targetMessage) =>{

    cy.get('@inputTask')
    .invoke('prop','validationMessage')
    .should((text)=>{
        expect(
            targetMessage
        ).to.eq(text)
    })    
});

// remove  task by name 
  
Cypress.Commands.add('removeTaskByName', (taskname) => {
    cy.request({
      url:  Cypress.env('apiUrl') + '/helper/tasks',
      method: 'DELETE',
      body: {name: taskname}
    }).then(response => {
      expect(response.status).to.eq(204)
    })
})
  
// Add a task though the api 
Cypress.Commands.add('postTask', (task) => {
    cy.request({
      url:  Cypress.env('apiUrl') + '/tasks',
      method: 'POST',
      body: task
    }).then(response => {
      expect(response.status).to.eq(201)
    })
})




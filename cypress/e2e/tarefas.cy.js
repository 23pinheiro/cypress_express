/// <reference types="cypress" />

// import  {faker}  from '@faker-js/faker'

describe('tarefas',  () => {
    let testData; 
  
    before(() => {
      // para chamar os json contidos em features 
      cy.fixture('tasks').then(t =>{
        testData = t 
      })
      
    })
  
    context('cadastro', () => {
      it('Deve cadastrar uma nova tarefa', () => {
        const taskName= 'Ler um livro de Node.js'
    

        cy.removeTaskByName(taskName)

        cy.createTask(taskName)
    

        cy.contains('main div p', taskName)
         .should('be.visible')
      })
    
    
      it('não deve permitir tarefa duplicada', () => {
        const task= testData.dup
       
  
        cy.removeTaskByName(task.name)

    
        cy.postTask(task)
    
        cy.visit('/') 
    
        cy.createTask(task.name)
  
        // Então vejo a mensagem de duplicado 
        cy.get('.swal2-html-container')
          .should('be.visible')
          .should('have.text',  'Task already exists!')
      })
    
      it ('campo obrigatorio', ()=>{
        cy.createTask()
        
        cy.isRequired('This is a required field')
        
      })
      
    })
    context('atualizacao', ()=> {
      it('deve concluir uma tarefa', ()=>{
        
        const task= testData.update

        
        cy.removeTaskByName(task.name)
  
        cy.postTask(task)
  
        cy.visit('/')
  
        cy.contains('p', task.name)
          .parent()
          .find('button[class*=ItemToggle]')
          .click()
        cy.contains('p', task.name)
          .should('have.css', 'text-decoration-line', 'line-through')
  
        })
      it('nao deve remover uma tarefa', () => {
        const task= {
          name : 'Deve remover uma tarefa',
          is_done: false
  
        }
        cy.removeTaskByName(task.name)
        cy.postTask(task)
  
        cy.visit('/')
  
        cy.contains('p', task.name)
          .parent()
          .find('button[class*=ItemDelete]')
          .click()
        cy.contains('p', task.name)
          .should('not.exist')
    
      })
  
    })
    
  })  


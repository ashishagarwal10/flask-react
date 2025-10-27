describe('Task Management App', () => {
  beforeEach(() => {
    // Visit the app before each test
    cy.visit('http://localhost:3000')
  })

  it('should create a new task', () => {
    // Click the add task button
    cy.get('[data-testid="add-task-btn"]').click()

    // Fill in the task form
    cy.get('[data-testid="task-title-input"]').type('Test Task')
    cy.get('[data-testid="task-description-input"]').type('Test Description')
    cy.get('[data-testid="submit-task-btn"]').click()

    // Verify the task was created
    cy.contains('Test Task').should('be.visible')
    cy.contains('Test Description').should('be.visible')
  })

  it('should add a comment to a task', () => {
    // Expand the first task's comments
    cy.get('[data-testid="task-card"]').first().within(() => {
      cy.contains('Comments').click()
      cy.get('[data-testid="add-comment-btn"]').click()
    })

    // Add a comment
    cy.get('[data-testid="comment-input"]').type('Test Comment')
    cy.get('[data-testid="submit-comment-btn"]').click()

    // Verify the comment was added
    cy.contains('Test Comment').should('be.visible')
  })

  it('should edit a task', () => {
    // Click edit on the first task
    cy.get('[data-testid="edit-task-btn"]').first().click()

    // Edit the task
    cy.get('[data-testid="task-title-input"]').clear().type('Updated Task')
    cy.get('[data-testid="task-description-input"]').clear().type('Updated Description')
    cy.get('[data-testid="submit-task-btn"]').click()

    // Verify the task was updated
    cy.contains('Updated Task').should('be.visible')
    cy.contains('Updated Description').should('be.visible')
  })

  it('should delete a task', () => {
    // Store the task title
    cy.get('[data-testid="task-title"]').first().invoke('text').as('taskTitle')

    // Delete the task
    cy.get('[data-testid="delete-task-btn"]').first().click()

    // Verify the task was deleted
    cy.get('@taskTitle').then((title) => {
      cy.contains(title).should('not.exist')
    })
  })
})
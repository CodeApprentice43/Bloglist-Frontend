describe('Blog app', ()=>{
  beforeEach(function(){
    cy.request('POST','http://localhost:3003/api/testing/reset')
    const user = {
      name: 'John Doe',
      username: 'john',
      password: 'testing'
    }
    cy.request('POST','http://localhost:3003/api/users',user)
    cy.visit('')
  })

  it('Login form is shown',()=>{
    cy.contains('login').click()
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login',()=>{
    it('sucess with correct credentials',()=>{
      cy.contains('login').click()
      cy.get('#username').type('john')
      cy.get('#password').type('testing')
      cy.contains('Submit').click()
      cy.contains('Logged in as user John Doe',{ timeout: 10000 })
    })
    it('fails with incorrect credentials',()=>{
      cy.contains('login').click()
      cy.get('#username').type('john')
      cy.get('#password').type('wrongpass')
      cy.contains('Submit').click()
      cy.get('.error',{timeout: 10000})
      .should('contain', 'Wrong username/password!')
      .and('have.css', 'color', 'rgb(255, 0, 0)')
      
    })
  })

  describe('when logged in ',async()=>{
    beforeEach(()=>{
      cy.request('POST','http://localhost:3003/api/login',{username:'john',password:'testing'}).
      then(response=>window.localStorage.setItem('loggedUser',JSON.stringify(response.body)))
      cy.visit('')
    })
    it('user can create new blog',()=>{
      cy.contains('new blog').click()
      cy.get('#title').type('test blog')
      cy.get('#url').type('www.testing.com')
      cy.get('#likes').type('0')
      cy.contains('Submit').click()
      cy.get('.add').should('contain','new blog added').and('have.css','color','rgb(0, 128, 0)')
      cy.contains('test blog')
    })
    it('user can like a blog',()=>{
      cy.contains('new blog').click()
      cy.get('#title').type('testing stuff')
      cy.get('#url').type('www.testing.com')
      cy.get('#likes').type('0')
      cy.contains('Submit').click()

      cy.contains('testing stuff').parent()
      .contains('view').click()
      
      cy.contains('testing stuff').parent()
      .find('button').contains('like').click()

      cy.contains('1')

   
      
    })
  })

})
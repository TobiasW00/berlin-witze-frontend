let loginuser = {email:'Astrid@standard-cloud.com',pasword:'Start#123',name:"Astrid"}

describe('Navigation', function() {
    it('Login Username for anonym Users', function() {
        cy.visit('http://localhost:3000/');
        cy.get("#stdNavbar").get('a[href="/editmyprofile"]').contains('Login') 
    })
})

describe('Login', function() {
    it('Login User Astrid, Anzeige in Navigation', function() {
            cy.login(loginuser.email,loginuser.pasword);
            cy.contains(loginuser.name);
    });

       // expect(localStorage.getItem('token').length() > 0);
});


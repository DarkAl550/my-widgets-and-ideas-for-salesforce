({
    doInit: function (cmp, event, helper) {
        console.log("Login");
    },
    
    login : function(component, event, helper) {
        let email = component.find("emailField").get("v.value");
        let password = component.find("passwordField").get("v.value");
        helper.checkLogin(component, helper, event, email, password);
    }
})
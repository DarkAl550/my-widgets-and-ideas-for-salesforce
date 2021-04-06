({
    handleLoginEvent: function (component, event, helper) {
        let user = event.getParam("user");
        let log = event.getParam("successLog");
        let admin = event.getParam("isAdmin");

        component.set("v.user", user);
        component.set("v.successLog", log);
        component.set("v.isAdmin", admin);

        console.log("Main --> " + user);
        console.log("Main --> " + log);
        console.log("Main --> " + admin);
    }
})
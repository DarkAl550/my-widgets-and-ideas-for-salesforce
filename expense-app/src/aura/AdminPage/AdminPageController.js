({
    doInit : function(component, event, helper) {
        let months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
        component.set("v.months", months);
        let year = component.find("selectYear").get("v.value");
        helper.getOfficesStatistics(component, event, helper, year);
        helper.getAllYears(component, event, helper);
    },

    checkOffice : function(component, event, helper){
        
        let clickOffice = event.target.id;
        console.log("Click Office: " + clickOffice);

        helper.checkValidOffice(component, event, clickOffice);
        
    }
})
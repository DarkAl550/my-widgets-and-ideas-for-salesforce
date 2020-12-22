({
    onload : function(component, event, helper) {
        window.setInterval(
            function(){
                helper.displayClock(component);
            }, 1000);
    }
})
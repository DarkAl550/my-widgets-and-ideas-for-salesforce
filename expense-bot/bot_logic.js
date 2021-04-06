var salesforce = require('./salesforce');

module.exports = {
    validateEmail : function (email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    },
    validateAmount : function(amount){
        if(amount.split(",").length > 1 && amount.split(",").length < 3 ){
            var convertedAmount = [];
            for(var i=0; i< amount.split(',').length; i++){
                convertedAmount.push(amount.split(',')[i]);
            }
            amount = convertedAmount.join('.');
        }
        var m = amount.match(/^\d+(\.\d{1,2})?$/);
        if(m){
            return amount;
        }else{
            return null;
        }
    }
}

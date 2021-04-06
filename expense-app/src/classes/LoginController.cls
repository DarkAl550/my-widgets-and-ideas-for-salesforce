public with sharing class LoginController {

    @AuraEnabled
    public static Contact checkLoginData(String email, String pass){
        try{
            Contact keeper = [SELECT Id, Name, Email, Password__c, Office__c, Admin__c FROM Contact WHERE Email = :email AND Password__c = :pass];
            System.debug(keeper);
            return keeper;
        }catch(Exception ex){
            return null;
        }
        
    }
}
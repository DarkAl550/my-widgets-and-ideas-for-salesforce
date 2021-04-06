@isTest
public with sharing class AdminPageControllerTest {
    @testSetup
    static void setup(){
       	Contact c = new Contact();
        c.Admin__c = true;
        c.LastName = 'TestKeeper';
        c.Email = 'email@email.com';
        c.Password__c = '1111';
        c.Office__c = 'Office 2';
        insert c;

        Contact c1 = new Contact();
        c1.Admin__c = false;
        c1.LastName = 'TestKeeper1';
        c1.Email = 'em@email.com';
        c1.Password__c = '1111';
        c1.Office__c = 'Office 1';
        insert c1;

        Monthly_Expense__c mEx = new Monthly_Expense__c();
        mEx.Balance__c = 20;
        mEx.Month_Date__c = Date.today();
        mEx.Keeper__c = c1.Id;
        insert mEx;

        Expense_Card__c testExCard1= new Expense_Card__c();
        testExCard1.Amount__c = 20;
        testExCard1.Card_Keeper__c = c.Id;
        testExCard1.CardDate__c = Date.valueOf('2020-01-01');
        testExCard1.Description__c = 'Test Description';
        insert testExCard1;
    }

    @isTest
    static void testGetAllOffices(){
        List<String> listResults = AdminPageController.getAllOffices();
        System.assert(listResults.size() > 0);
    }

    @isTest
    static void testGetBalanceToday(){
        Double balanceOffice1 = AdminPageController.getBalanceToday('Office 1');
        System.assertEquals(balanceOffice1, 20);
        Double balanceOffice2 = AdminPageController.getBalanceToday('Office 2');
        System.assertEquals(balanceOffice2, 0);
    }

    @isTest
    static void testGetSpentsAmounts(){
        List<Double> listResults1 = AdminPageController.getSpentsAmounts(2020, 'Office 1');
        System.assert(listResults1.size() == 12);
        List<Double> listResults2 = AdminPageController.getSpentsAmounts(2020, 'Office 2');
        System.assert(listResults2.size() == 12);
    }

    @isTest
    static void testGetTotalSumAtYear(){
        List<Double> testList = new List<Double>();
        for(Integer i=0; i<12; i++){
            testList.add(1);
        }
        Double testResult = AdminPageController.getTotalSumAtYear(testList);
        System.assertEquals(testResult, 12);
    }

    @isTest
    static void testGetOfficeStatistic(){
        List<AdminPageController.OfficeStatistics> testResults = AdminPageController.getOfficeStatistic(2020);
        System.assert(testResults.size()>0);
    }

    @isTest
    static void testGetReminder(){
        Double reminderOffice1 = AdminPageController.getReminder('Office 1');
        System.assertEquals(reminderOffice1, 20);
        Double reminderOffice2 = AdminPageController.getReminder('Office 2');
        System.assertEquals(reminderOffice2, 0);
    }

    @isTest
    static void testGetOffice(){
        Contact c = new Contact();
        c.LastName = 'Keeper';
        c.Email = 'new@email.com';
        c.Password__c = '1111';
        c.Office__c = 'Office 1';
        insert c;

        String testOffice = AdminPageController.getOffice(c.Id);

        System.assertEquals(testOffice, c.Office__c);
    }
    
    @isTest
    static void testGetYears(){
        List<Integer> testListYears = AdminPageController.getYears();
        
        System.assert(testListYears.size() >0);
    }
    

}
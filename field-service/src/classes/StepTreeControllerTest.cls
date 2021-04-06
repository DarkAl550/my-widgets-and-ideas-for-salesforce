@isTest
public with sharing class StepTreeControllerTest {

    @TestSetup
    static void setup(){
        Product2 testProduct = new Product2();
        testProduct.Name = 'Test Product';
        testProduct.IsActive = true;
        insert testProduct;

        WorkType newTestWorkType = new WorkType();
        newTestWorkType.Name = 'Test Work Type';
        newTestWorkType.EstimatedDuration = 2;
        newTestWorkType.DurationType = 'Hours';
        insert newTestWorkType;
    }

    @isTest
    static void testGetWorkType(){
        List<WorkType> testListWorkTypes = StepTreeController.getWorkType();
        System.assert(testListWorkTypes.size() > 0 );
    }

    @isTest 
    static void testGetProduts(){
        List<Product2> testListProducts = StepTreeController.getProduts();
        System.assert(testListProducts.size() > 0);
    }

    @isTest 
    static void testCreateProductRequired(){
        Product2 p = [SELECT Id FROM Product2 WHERE Name = 'Test Product'];
        WorkType wt = [SELECT Id FROM WorkType WHERE Name = 'Test Work Type'];
        StepTreeController.createProductRequired(wt.Id, p.Id, 2,'Each');
        ProductRequired getTestProductRequired = [SELECT Id FROM ProductRequired WHERE ParentRecordId = :wt.Id AND Product2Id = :p.Id];
        System.assertNotEquals(getTestProductRequired, null);
    }
}
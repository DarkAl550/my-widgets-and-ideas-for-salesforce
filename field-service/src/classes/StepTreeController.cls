public with sharing class StepTreeController {
    @AuraEnabled
    public static List<WorkType> getWorkType(){
        return [SELECT Id, Name FROM WorkType];
    }

    @AuraEnabled
    public static List<Product2> getProduts(){
        return [SELECT Id, Name FROM Product2];
    }

    @AuraEnabled
    public static void createProductRequired(Id workType, Id product, Double quantity, String unitOfMeasure){
        ProductRequired productRequired = new ProductRequired();
        productRequired.ParentRecordId = workType;
        productRequired.Product2Id = product;
        productRequired.QuantityRequired = quantity;
        productRequired.QuantityUnitOfMeasure = unitOfMeasure;
        upsert productRequired;
    }
}
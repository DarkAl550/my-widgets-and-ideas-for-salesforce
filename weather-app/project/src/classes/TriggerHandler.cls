public virtual class TriggerHandler {
    public virtual void run(){
        if(Trigger.isInsert && Trigger.isBefore){
            //code
            beforeInsert();
        }else if (Trigger.isInsert && Trigger.isAfter){
            //code
            afterInsert();
        }
        else if(Trigger.isUpdate && Trigger.isBefore){
            //code
            beforeUpdate();
        }else if(Trigger.isUpdate && Trigger.isAfter){
            //code
            afterUpdate();
        }else if(Trigger.isDelete && Trigger.isBefore){
            //code
            beforeDelete();
        }else if(Trigger.isDelete && Trigger.isAfter){
            //code
            afterDelete();
        }
    }
    
    protected virtual void beforeInsert(){}
    protected virtual void afterInsert(){}
    protected virtual void beforeUpdate(){}
    protected virtual void afterUpdate(){}
    protected virtual void beforeDelete(){}
    protected virtual void afterDelete(){}
}
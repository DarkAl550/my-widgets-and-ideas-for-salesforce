({
    displayClock : function(component) {
        var canvasHTML = component.find("clock").getElement();
        var contextHTML = canvasHTML.getContext('2d');
        contextHTML.strokeRect(0, 0, canvasHTML.width, canvasHTML.height);
        
        //find radius and center clock's
        var radiusClock = canvasHTML.width/2 - 10;
        var xCenterClock = canvasHTML.width/2;
        var yCenterClock = canvasHTML.height/2;
        
        //clear convas 
        contextHTML.fillStyle = "#ffffff";
        contextHTML.fillRect(0, 0, canvasHTML.width, canvasHTML.height);
        
        //clocks border
        contextHTML.strokeStyle =  "#000000";//border color
        contextHTML.fillStyle = "#ffffff";// fill color
        contextHTML.lineWidth = 8;
        contextHTML.beginPath();
        contextHTML.arc(xCenterClock, yCenterClock, radiusClock, 0, 2*Math.PI, true);
        contextHTML.moveTo(xCenterClock, yCenterClock);
        contextHTML.stroke();
        contextHTML.fill();
        contextHTML.closePath();
        
        // clock's steps
        var radiusNum = radiusClock - 10; //radius for one step
        var radiusPoint;
        for(var tm = 0; tm < 60; tm++){
            contextHTML.beginPath();
            contextHTML.lineWidth = 2;
            contextHTML.strokeStyle =  "#000000";// step color
            contextHTML.fillStyle = "#ff0000";// fill color
            radiusPoint = (tm % 5 ==0) ? 5 : 2; 
            var xPointM = xCenterClock + radiusNum * Math.cos(-6*tm*(Math.PI/180) + Math.PI/2);
            var yPointM = yCenterClock - radiusNum * Math.sin(-6*tm*(Math.PI/180) + Math.PI/2);
            contextHTML.arc(xPointM, yPointM, radiusPoint, 0, 2*Math.PI, true);
            contextHTML.stroke();
            contextHTML.fill();
            contextHTML.closePath();
        } 
        
        //nums
        for(var th = 1; th <= 12; th++){
            contextHTML.beginPath();
            contextHTML.strokeStyle =  "#000000";// num color
            contextHTML.fillStyle = "#ff0000";// fill color
            contextHTML.font = 'bold 25px sans-serif';
            var xText = xCenterClock + (radiusNum - 30) * Math.cos(-30 * th * (Math.PI/180) + Math.PI/2);
            var yText = yCenterClock - (radiusNum - 30) * Math.sin(-30 * th * (Math.PI/180) + Math.PI/2);
            if(th <= 9){
                contextHTML.strokeText(th, xText - 5 , yText + 10);
            }else{
                contextHTML.strokeText(th, xText - 15 , yText + 10);
            }
            contextHTML.stroke();
            contextHTML.fill();
            contextHTML.closePath();	
        }

        //arrows
        var lengthSeconds = radiusNum - 10;
        var lengthMinutes = radiusNum - 15;
        var lengthHour = lengthMinutes / 1.5;
        var d = new Date(); 
        var t_sec = 6 * d.getSeconds(); 
        var t_min = 6 * (d.getMinutes() + (1/60) * d.getSeconds());
        var t_hour = 30 * (d.getHours() + (1/60) * d.getMinutes());

        //hours
        contextHTML.beginPath();
        contextHTML.strokeStyle = "#000000";//hour color
        contextHTML.lineWidth = 7;// height hour
        contextHTML.moveTo(xCenterClock, yCenterClock);
        contextHTML.lineTo(xCenterClock + lengthHour * Math.cos(Math.PI/2 - t_hour * (Math.PI/180)),
                    yCenterClock - lengthHour * Math.sin(Math.PI/2 - t_hour * (Math.PI/180)));
        contextHTML.stroke();
        contextHTML.closePath();
        
        //minutes
        contextHTML.beginPath();
        contextHTML.strokeStyle =  "#000000";// minutes color
        contextHTML.lineWidth = 5; // height minutes
        contextHTML.moveTo(xCenterClock, yCenterClock);
        contextHTML.lineTo(xCenterClock + lengthMinutes * Math.cos(Math.PI/2 - t_min * (Math.PI/180)),
                    yCenterClock - lengthMinutes * Math.sin(Math.PI/2 - t_min * (Math.PI/180)));
        contextHTML.stroke();
        contextHTML.closePath();

        //seconds
        contextHTML.beginPath();
        contextHTML.lineWidth = 2;//hieght seconds
        contextHTML.strokeStyle =  "#ff0000";// seconds color
        contextHTML.moveTo(xCenterClock, yCenterClock);
        contextHTML.lineTo(xCenterClock + lengthSeconds * Math.cos(Math.PI/2 - t_sec * (Math.PI/180)),
                    yCenterClock - lengthSeconds * Math.sin(Math.PI/2 - t_sec * (Math.PI/180)));
        contextHTML.stroke();
        contextHTML.closePath();

        //center point
        contextHTML.beginPath();
        contextHTML.strokeStyle = "#ffffff";//border color
        contextHTML.fillStyle = "#ff0000";//fill color
        contextHTML.lineWidth = 6; //height border for center point 
        contextHTML.arc(xCenterClock, yCenterClock, 5, 0, 2 * Math.PI, true);
        contextHTML.stroke();
        contextHTML.fill();
        contextHTML.closePath();
        
        return;
    }
})
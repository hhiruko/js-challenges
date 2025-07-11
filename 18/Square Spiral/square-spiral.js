function drawSquareSpiral() {
    const canvas = document.getElementById("square-spiral-canvas");
    if (canvas.getContext) {
        const ctx = canvas.getContext("2d");

        const originX = 100;
        const originY = 100;

        ctx.beginPath();
        ctx.moveTo(originX, originY);
        
        const step = 20;
        const spirals = 16;
        let direction = 'r';
        let length = 1;

        let prevX = originX;
        let prevY = originY;
        for(let i = 0; i < spirals; i++) {
            if(i > 0 && i % 2 === 0){
                length++;
            }

            let x;
            let y;
            switch(direction){
                case 'r': x = prevX + step * length; y = prevY; direction = 'u'; break;
                case 'u': x = prevX; y = prevY - step * length; direction = 'l'; break;
                case 'l': x = prevX - step * length; y = prevY; direction = 'd'; break;
                case 'd': x = prevX; y = prevY + step * length; direction = 'r'; break;
            }

            ctx.lineTo(x, y);
            prevX = x;
            prevY = y;
        }

        ctx.lineWidth = 5;
        ctx.stroke();
    }
}

function drawSpiral() {
    const canvas = document.getElementById("spiral-canvas");
    if (canvas.getContext) {
        const ctx = canvas.getContext("2d");

        const originX = 100;
        const originY = 100;

        ctx.beginPath();
        ctx.moveTo(originX, originY);
        
        const spirals = 200;
        let r = 0;
        let angle = 0;
        for(let i = 0; i < spirals; i++) {
            let x;
            let y;
            
            x = originX + r * Math.cos(angle);
            y = originY + r * Math.sin(angle);

            ctx.lineTo(x, y);
            r += 0.5;
            angle += 0.1;
        }

        ctx.lineWidth = 5;
        ctx.stroke();
    }
}

drawSquareSpiral();
drawSpiral();
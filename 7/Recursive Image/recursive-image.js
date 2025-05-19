class RecursiveImage {
    draw(leaves, length){
        const canvas = document.getElementById("recursive-image");
        if (canvas.getContext) {
            this.ctx = canvas.getContext("2d");
            this.width = canvas.width;
            this.height = canvas.height;

            this.leaf(leaves, length);
        }
    }

    leaf(count, depth) {
        const totalCount = count;
        const centerX = this.width / 2;
        const centerY = this.height / 2;

        const gradient = this.ctx.createLinearGradient(0, 0, 0, 60);
        gradient.addColorStop(0, "#ffffff");
        gradient.addColorStop(0.5, "#4CAF50");
        gradient.addColorStop(1, "#2E7D32");

        const drawRecursiveLeaf = (depth) => {
            if (depth === 0) return;

            this.ctx.beginPath();
            this.ctx.moveTo(0, 0);
            this.ctx.lineTo(-5, 30);
            this.ctx.lineTo(0, 60);
            this.ctx.lineTo(5, 30);
            this.ctx.closePath();
            this.ctx.fill();

        
            this.ctx.translate(0, 60);
            this.ctx.rotate(Math.random() * (Math.random() < 0.5 ? -1 : 1));

            drawRecursiveLeaf(depth - 1);
        };

        for (let i = 0; i < totalCount; i++) {
            const angle = (i * 2 * Math.PI) / totalCount;

            this.ctx.save();
            this.ctx.translate(centerX, centerY);
            this.ctx.rotate(angle);

            this.ctx.fillStyle = gradient;

            drawRecursiveLeaf(depth);

            this.ctx.restore();
        }
    }
}

const image = new RecursiveImage();
image.draw(10, 5);
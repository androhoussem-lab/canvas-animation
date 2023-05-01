const canvas = document.getElementById("canvas1");
const context = canvas.getContext("2d"); //2d or webgl 
let particles = [];
let hue = 0;


canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    // context.fillStyle = "#54CF5D";
    // context.fillRect(10 , 10 , 100 , 50); //x  y width height 
});




let mouse = {
    x: undefined,
    y: undefined,
}

canvas.addEventListener("click", (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
    initParticles();
});

canvas.addEventListener("mousemove", (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
    initParticles();
});

//draw circle
// context.fillStyle = "#54CF5D";
// context.beginPath();
// context.arc(100,100,50,0,Math.PI * 2); //x , y ,radius , start from , end to
// context.fill();


class Particle {
    constructor() {
        this.x = mouse.x;
        this.y = mouse.y;
        this.size = Math.random() * 15; //1.5 >> 6 px
        this.speedX = Math.random() * 3 - 1.5; // -1.5 >> 1.5
        this.speedY = Math.random() * 3 - 1.5; // -1.5 >> 1.5
        this.color = "hsl(" + hue + ",100%,50%)"
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.size > 0.1) this.size -= 0.1;
    }

    draw() {
        context.fillStyle = this.color;
        context.beginPath();
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        context.fill();
    }
}


function initParticles() {
    for (let i = 0; i < 3; i++) {
        particles.push(new Particle());
    }
}

function hundleParticles() {
    for (let i = 0; i < particles.length; i++) {

        for (let j = i; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
            if (distance < 100) {
                context.strokeStyle = particles[i].color;
                context.beginPath();
                context.lineWidth = 0.2;
                context.moveTo(particles[i].x, particles[i].y);
                context.lineTo(particles[j].x, particles[j].y);
                context.stroke();

            }
        }
        particles[i].update();
        particles[i].draw();
        if (particles[i].size < 0.2) {
            particles.splice(i, 1);
            i--;
        }
    }
}

function animate() {
    //context.fillStyle="rgba(0,0,0,0.02)";
    //context.fillRect(0,0,canvas.width, canvas.height);
    context.clearRect(0, 0, canvas.width, canvas.height);
    hue += 5;
    hundleParticles();
    requestAnimationFrame(animate);
}

animate();



//draw rectangle
// context.fillStyle = "#54CF5D";
// context.fillRect(10 , 10 , 100 , 50); //x  y width height 
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const tileSize = 40;
const rows = canvas.height / tileSize;
const cols = canvas.width / tileSize;

let player = {
    x: 1,
    y: 1,
    speed: 2
};

let bombs = [];
let explosions = [];

function drawPlayer() {
    ctx.fillStyle = 'blue';
    ctx.fillRect(player.x * tileSize, player.y * tileSize, tileSize, tileSize);
}

function drawBombs() {
    ctx.fillStyle = 'red';
    bombs.forEach(bomb => {
        ctx.fillRect(bomb.x * tileSize, bomb.y * tileSize, tileSize, tileSize);
    });
}

function drawExplosions() {
    ctx.fillStyle = 'orange';
    explosions.forEach(explosion => {
        ctx.fillRect(explosion.x * tileSize, explosion.y * tileSize, tileSize, tileSize);
    });
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function update() {
    clearCanvas();
    drawPlayer();
    drawBombs();
    drawExplosions();
    requestAnimationFrame(update);
}

function placeBomb() {
    bombs.push({ x: player.x, y: player.y });
    setTimeout(() => {
        bombs.shift();
        explosions.push({ x: player.x, y: player.y });
        setTimeout(() => {
            explosions.shift();
        }, 500);
    }, 2000);
}

document.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowUp':
            player.y = Math.max(player.y - 1, 0);
            break;
        case 'ArrowDown':
            player.y = Math.min(player.y + 1, rows - 1);
            break;
        case 'ArrowLeft':
            player.x = Math.max(player.x - 1, 0);
            break;
        case 'ArrowRight':
            player.x = Math.min(player.x + 1, cols - 1);
            break;
        case ' ':
            placeBomb();
            break;
    }
});

update();
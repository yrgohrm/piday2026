const COLORS = [
    '#ff0055', '#ff6600', '#ffee00', '#00ff66',
    '#00eeff', '#aa00ff', '#ff00cc', '#00ffaa',
    '#ff3300', '#ccff00', '#0088ff', '#ff00ff',
];

/**
 * Create a glowing circle that appears on the given coordinate
 * and grows while getting more and more transparent. Also plays
 * a popping sound.
 * 
 * @param {number} x the x position of the center
 * @param {number} y the y position of the center
 */
function spawnCircle(x, y) {
    const pop = document.getElementById('pop');
    if (pop && pop.paused) {
        pop.volume = 0.3;
        pop.currentTime = 0;
        pop.play();
    }

    const circle = document.createElement('div');
    circle.classList.add('circle');

    const size = 80 + Math.random() * 220;
    const color = COLORS[Math.floor(Math.random() * COLORS.length)];
    const secondColor = COLORS[Math.floor(Math.random() * COLORS.length)];

    circle.style.left = `${x}px`;
    circle.style.top = `${y}px`;
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.style.background = `radial-gradient(circle at 35% 35%, white, ${color}, ${secondColor})`;
    circle.style.boxShadow = `0 0 ${size * 0.5}px ${color}, 0 0 ${size * 0.25}px ${color}, 0 0 ${size * 0.1}px white`;

    document.body.appendChild(circle);
    circle.addEventListener('animationend', () => circle.remove());
}

/**
 * Generate a random point within the visible viewport.
 *
 * @returns {{ x: number, y: number }} coordinates in CSS pixels.
 */
function randomPos() {
    return {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
    };
}

document.addEventListener('click', (e) => {
    spawnCircle(e.clientX, e.clientY);
});

document.addEventListener('touchstart', (e) => {
    for (const touch of e.touches) {
        spawnCircle(touch.clientX, touch.clientY);
    }
}, { passive: true });

document.addEventListener('keydown', () => {
    const { x, y } = randomPos();
    spawnCircle(x, y);
});

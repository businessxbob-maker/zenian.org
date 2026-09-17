/* ============================================================
 * vex.rip · animated rain background
 * front + back row, splats, puddle band at bottom of screen.
 * ============================================================ */
(function () {
    function randInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }

    function makeDrops(container, side) {
        container.innerHTML = '';
        let x = 0;
        while (x < 100) {
            const r100 = randInt(1, 98);
            const r5 = randInt(2, 5);
            x += r5;

            const drop = document.createElement('div');
            drop.className = 'drop';
            drop.style[side] = x + '%';
            drop.style.bottom = (r5 + r5 - 1 + 100) + '%';
            const delay = '0.' + r100 + 's';
            /* slower fall: 0.9s–1.7s */
            const dur   = '1.' + r100 + 's';
            drop.style.animationDelay = delay;
            drop.style.animationDuration = dur;

            const stem = document.createElement('div');
            stem.className = 'stem';
            stem.style.animationDelay = delay;
            stem.style.animationDuration = dur;

            const splat = document.createElement('div');
            splat.className = 'splat';
            splat.style.animationDelay = delay;
            splat.style.animationDuration = dur;

            drop.appendChild(stem);
            drop.appendChild(splat);
            container.appendChild(drop);
        }
    }

    function makePuddles(container) {
        container.innerHTML = '';
        /* a strip of subtle ripples along the bottom */
        for (let i = 0; i < 24; i++) {
            const p = document.createElement('div');
            p.className = 'puddle';
            p.style.left = randInt(0, 98) + '%';
            p.style.width = randInt(30, 90) + 'px';
            p.style.animationDelay = (Math.random() * 4).toFixed(2) + 's';
            p.style.animationDuration = (2 + Math.random() * 2.5).toFixed(2) + 's';
            container.appendChild(p);
        }
    }

    function build() {
        let wrap = document.querySelector('.rain-bg');
        let pw   = document.querySelector('.puddle-wrap');
        if (!wrap) {
            wrap = document.createElement('div');
            wrap.className = 'rain-bg';
            wrap.setAttribute('aria-hidden', 'true');
            wrap.innerHTML = `
                <div class="rain front-row"></div>
                <div class="rain back-row"></div>
            `;
            document.body.appendChild(wrap);
        }
        if (!pw) {
            pw = document.createElement('div');
            pw.className = 'puddle-wrap';
            pw.setAttribute('aria-hidden', 'true');
            pw.innerHTML = '<div class="puddle-band"></div>';
            document.body.appendChild(pw);
        }
        document.body.classList.add('splat-toggle', 'back-row-toggle');
        makeDrops(wrap.querySelector('.front-row'), 'left');
        makeDrops(wrap.querySelector('.back-row'),  'right');
        makePuddles(pw.querySelector('.puddle-band'));
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', build);
    } else {
        build();
    }

    /* re-seed occasionally so it never looks static */
    setInterval(build, 30000);

    /* fade the puddle band when the footer scrolls into view so
       the two glowing lines never sit on top of each other */
    function updatePuddleVisibility() {
        const pw = document.querySelector('.puddle-wrap');
        const foot = document.querySelector('.foot');
        if (!pw || !foot) return;
        const r = foot.getBoundingClientRect();
        const overlap = r.top < window.innerHeight - 10;
        pw.classList.toggle('hide', overlap);
    }
    window.addEventListener('scroll',  updatePuddleVisibility, { passive: true });
    window.addEventListener('resize',  updatePuddleVisibility);
    setTimeout(updatePuddleVisibility, 200);
})();

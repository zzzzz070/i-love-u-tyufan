document.addEventListener("DOMContentLoaded", () => {

  const btn = document.getElementById("btn");
  const start = document.getElementById("start");
  const heart = document.getElementById("heart");

  btn.addEventListener("click", () => {

    start.style.display = "none";
    startFlow();

  });

  function startFlow() {

    heart.innerHTML = "";

    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const scale = 18;

    const points = [];

    // 🔥 создаём сердце
    for (let t = 0; t < Math.PI * 2; t += 0.06) {

      const x = 16 * Math.pow(Math.sin(t), 3);

      const y =
        13 * Math.cos(t)
        - 5 * Math.cos(2 * t)
        - 2 * Math.cos(3 * t)
        - Math.cos(4 * t);

      const el = document.createElement("span");
      el.className = "word";
      el.innerText = "I love u";

      el.style.left = (x * scale + centerX) + "px";
      el.style.top = (-y * scale + centerY) + "px";

      heart.appendChild(el);

      points.push({
        el,
        angle: t
      });

      // старт
      setTimeout(() => {
        el.style.opacity = 1;
      }, Math.random() * 1500);
    }

    // 🔥 БЕСКОНЕЧНЫЙ “СЛЕД”
    let i = 0;

    setInterval(() => {

      const item = points[i];

      if (!item) {
        i = 0; // зацикливаем
        return;
      }

      const el = item.el;

      // исчезает
      el.style.transition = "0.15s";
      el.style.opacity = "0";
      el.style.transform = "scale(0.5)";

      // 💥 создаём новый "след" на том же месте
      setTimeout(() => {

        const clone = document.createElement("span");
        clone.className = "word";
        clone.innerText = "I love u";

        clone.style.left = el.style.left;
        clone.style.top = el.style.top;

        heart.appendChild(clone);

        setTimeout(() => {
          clone.style.opacity = 1;
        }, 20);

        // новый элемент тоже станет частью цикла
        points.push({
          el: clone,
          angle: item.angle
        });

      }, 120);

      i++;

    }, 40);

  }

});

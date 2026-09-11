// src/utils/getDominantColor.js

export function getDominantColor(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = src;

    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        const size = 40;
        canvas.width = size;
        canvas.height = size;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, size, size);

        const { data } = ctx.getImageData(0, 0, size, size);

        let r = 0, g = 0, b = 0, count = 0;

        for (let i = 0; i < data.length; i += 4) {
          const red = data[i];
          const green = data[i + 1];
          const blue = data[i + 2];
          const alpha = data[i + 3];

          if (alpha < 100) continue;

          const brightness = (red + green + blue) / 3;
          if (brightness > 235 || brightness < 20) continue;

          r += red;
          g += green;
          b += blue;
          count++;
        }

        if (count === 0) {
          resolve(null);
          return;
        }

        r = Math.round(r / count);
        g = Math.round(g / count);
        b = Math.round(b / count);

        resolve(`rgb(${r}, ${g}, ${b})`);
      } catch (err) {
        reject(err);
      }
    };

    img.onerror = reject;
  });
}
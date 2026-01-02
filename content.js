(function () {
 //replace name of bg.jpg with w/e u have and make sure to change it in manifest too
  const bgUrl = chrome.runtime.getURL("bg.jpg");

  const blur = document.createElement("div");
  Object.assign(blur.style, {
    position: "fixed",
    inset: "0",
    backgroundImage: `url("${bgUrl}")`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    filter: "blur(40px)",
    transform: "scale(1.2)",
    zIndex: "-9999"
  });

  const main = document.createElement("div");
  Object.assign(main.style, {
    position: "fixed",
    inset: "0",
    backgroundImage: `url("${bgUrl}")`,
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    zIndex: "-9998"
  });
  document.documentElement.prepend(blur, main);
  document.body.style.background = "transparent";

  const style = document.createElement("style");
  style.textContent = `
    .dark [class*="bg-"] {
    background-color: rgba(20, 20, 20, 0.15) !important;
    transition-property: color, box-shadow, border-color !important;
    }
    `;
    document.head.appendChild(style);

    const bgclr = "rgba(20,20,20,0.15)";
    const rgbmin = 60;

    function getrgb(bg) {
        const m = bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
        return m ? [+m[1], +m[2], +m[3]] : null;
    }

    function shldSkip(style) {
        if (style.backgroundImage !== "none") return false;

        const rgb = getrgb(style.backgroundColor);
        if (!rgb) return true;

        return rgb.some(v => v > rgbmin);
    }

function transparenting(el) {
    if (el.matches("img, svg, video, canvas, script, style, link, meta")) return;

    const style = getComputedStyle(el);

    if (style.backgroundColor === "rgba(0, 0, 0, 0)") return;

    if (shldSkip(style)) return;

    el.style.backgroundColor = bgclr;
}

// Initial pass
document.querySelectorAll("*").forEach(transparenting);

// Observe future elements
const observer = new MutationObserver(mutations => {
    for (const m of mutations) {
        for (const node of m.addedNodes) {
            if (node.nodeType === 1) {
                transparenting(node);
                node.querySelectorAll("*").forEach(transparenting);
            }
        }
    }
});

observer.observe(document.body, { childList: true, subtree: true });
})();
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
}

.dark [class*="bg-"]:not(img):not(svg):not(video):not(canvas) {
  backdrop-filter: saturate(120%);
  -webkit-backdrop-filter: saturate(120%);
}
    `;
    document.head.appendChild(style);
})();
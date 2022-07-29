(function () {
  const url =
    window.location.hostname === "localhost"
      ? "http://localhost:3000"
      : "https://ponsor.vercel.app";
  const payload = document.querySelector("script[data-widget-id]");
  //@ts-ignore
  const { widgetId, placement } = payload.dataset;
  if (!widgetId) return;
  //@ts-ignore
  const attr = payload.getAttribute.bind(payload);
  const searchParams = attr("data-widget-id");
  const constructIframe = (src) => {
    let iframe = document.createElement("iframe");
    iframe.width = "100%";
    iframe.height = "100%";
    iframe.src = src;

    return iframe;
  };

  const style = document.createElement("style");
  style.innerHTML = `.embed, .embed-btn {
      border-radius: 10.5px;
      box-shadow: var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow);
      left: 14px;
      position: fixed;
      overflow: hidden;
      z-index: 99999999;
  } 
  .embed {
      --tw-shadow: 0 20px 25px -5px rgb(0 0 0/0.1),0 8px 10px 6px rgb(0 0 0/0.1);
      --tw-shadow-colored: 0 20px 25px -5px var(--tw-shadow-color),0 8px 10px -6px var(--tw-shadow-color);
      bottom: 70px;
      height: 400px;
      max-height: 600px;
      background: white;
      overflow-x: hidden;
      width: 294px;
      transition: opacity 0.15s ease-in-out, transform 0.15s ease-in-out;
  }
  .embed > div {
    width: 100%;
    height: 100%;
    position: relative;
  }
  .embed > div > button {
    position: absolute;
    top: 14px;
    right: 14px;
    opacity: 50%;
    transition: opacity 0.15s ease-in-out;
  }
  .embed > div > button:hover {
    opacity: 100%;
  }
  .embed-btn {
    --tw-shadow: 0 1px 3px 0 rgb(0 0 0/0.1),0 1px 2px -1px rgb(0 0 0/0.1);
    --tw-shadow-colored: 0 1px 3px 0 var(--tw-shadow-color),0 1px 2px -1px var(--tw-shadow-color);
    bottom: 14px;
    cursor: pointer;
    height: 42px;
    overflow: hidden;
    width: 168px; 
    background: white;
  }
  .bounce {
    animation: bounce 1s infinite;
  }
  .embed-btn button {
    width: 100%;
    overflow: hidden;
    height: 100%;
    position: absolute;
    top:0;
    left:0;
  }
  @media screen and (max-width: 426px) { 
    .embed-btn { 
      bottom: 7px;  
      left: 7px;
      overflow: hidden;  
    }
    .embed {
      bottom: 0;
      left: 0;
      width: 100vw;
      min-height: max-content;
      max-height: --webkit-fill-available;
      z-index: 100000000;
    }
   }
   @keyframes bounce {
    0%, 100% {
      transform: translateY(-25%);
      animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    }
    50% {
      transform: translateY(0);
      animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
  }`;

  // Setup DOM
  const container = document.createElement("div");
  container.classList.add("himaker-container");

  const containerButton = document.createElement("div");
  const containerButtonTrigger = document.createElement("button");
  containerButton.classList.add("embed-btn");
  containerButton.classList.add("bounce");
  containerButton.append(constructIframe(`${url}/widget/trigger`));
  containerButton.append(containerButtonTrigger);

  const containerCloseButton = document.createElement("button");
  containerCloseButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--ion" width="24" height="24" preserveAspectRatio="xMidYMid meet" viewBox="0 0 512 512"><path fill="currentColor" d="m289.94 256l95-95A24 24 0 0 0 351 127l-95 95l-95-95a24 24 0 0 0-34 34l95 95l-95 95a24 24 0 1 0 34 34l95-95l95 95a24 24 0 0 0 34-34Z"></path></svg>`;
  containerCloseButton.onclick = () => {
    closePanel();
  };

  const containerPanel = document.createElement("div");
  containerPanel.style.display = "none";
  containerPanel.style.transform = "translateY(50px)";
  containerPanel.classList.add("embed");
  const containerPanelIframe = constructIframe(
    `${url}/widget/panel/${searchParams}`
  );
  const wrapper = document.createElement("div");
  wrapper.append(containerCloseButton);
  wrapper.append(containerPanelIframe);
  containerPanel.append(wrapper);

  container.append(style);
  container.append(containerPanel);
  container.append(containerButton);

  document.body.append(container);

  let isOpen = false;
  containerButtonTrigger.onclick = () => {
    if (isOpen) {
      closePanel();
      containerButton.classList.add("bounce");
    } else {
      openPanel();
      containerButton.classList.remove("bounce");
    }
  };

  document.onclick = (event) => {
    let el = event.target;
    if (el !== containerButtonTrigger) {
      closePanel();
      containerButton.classList.add("bounce");
    }
  };

  var s = { insideIframe: false, scrollX: 0, scrollY: 0 };

  containerPanelIframe.addEventListener("mouseenter", function () {
    s.insideIframe = true;
    s.scrollX = window.scrollX;
    s.scrollY = window.scrollY;
  });

  containerPanelIframe.addEventListener("mouseleave", function () {
    s.insideIframe = false;
  });

  document.addEventListener("scroll", function () {
    if (s.insideIframe) window.scrollTo(s.scrollX, s.scrollY);
  });

  const openPanel = () => {
    isOpen = true;
    containerPanel.style.display = "block";
    setTimeout(() => {
      containerPanel.style.opacity = "1";
      containerPanel.style.transform = "translateY(0px)";
    }, 0);
  };
  const closePanel = () => {
    isOpen = false;
    containerPanel.style.opacity = "0";
    containerPanel.style.transform = "translateY(50px)";
    setTimeout(() => {
      containerPanel.style.display = "none";
    }, 150);
  };
})();

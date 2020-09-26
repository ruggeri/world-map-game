function getWorldMapObjectEl(): HTMLObjectElement {
  return document.getElementById("world-map") as HTMLObjectElement;
}

function getWorldMapDocument(): Document {
  return getWorldMapObjectEl().contentDocument as Document;
}

export async function awaitWorldMapLoad() {
  await new Promise((resolve, reject) => {
    getWorldMapObjectEl().addEventListener("load", resolve);
  });
}

export function setCountryColor(isoCountryCode: string, color: string) {
  const newStyleElement = getWorldMapDocument().createElementNS(
    "http://www.w3.org/2000/svg",
    "style"
  );
  newStyleElement.textContent = `
    .${isoCountryCode.toLowerCase()} {
      fill: ${color};
    }
  `;

  getWorldMapDocument().documentElement.appendChild(newStyleElement);
}

export function clearCountryColors() {
  const styleTags = getWorldMapDocument().getElementsByTagName("style");
  for (let idx = 1; idx < styleTags.length; idx++) {
    styleTags[idx].remove();
  }
}

function getCountryCodeForElement(targetElement: HTMLElement): string {
  const svgEl = getWorldMapDocument().documentElement;
  if (targetElement.parentElement !== svgEl) {
    return getCountryCodeForElement(targetElement.parentElement as HTMLElement);
  }

  return targetElement.id.toUpperCase();
}

export function setWorldMapClickHandler(handler: (s: string) => void) {
  const svgEl = getWorldMapDocument().documentElement;

  svgEl.addEventListener("click", (e: Event) => {
    const clickedCountryCode = getCountryCodeForElement(
      e.target as HTMLElement
    );
    handler(clickedCountryCode);
  });
}

export class WorldMap {
  worldMapObjectEl: HTMLObjectElement;
  worldMapDocument: Document;
  // TODO: This should be SVGElement?
  worldMapSVGEl: HTMLElement;

  constructor(worldMapObjectEl: HTMLObjectElement) {
    this.worldMapObjectEl = worldMapObjectEl;
    this.worldMapDocument = worldMapObjectEl.contentDocument as Document;
    this.worldMapSVGEl = this.worldMapDocument.documentElement;
  }

  setCountryColor(isoCountryCode: string, color: string) {
    const newStyleElement = this.worldMapDocument.createElementNS(
      "http://www.w3.org/2000/svg",
      "style"
    );
    newStyleElement.textContent = `
      .${isoCountryCode.toLowerCase()} {
        fill: ${color};
      }
    `;

    this.worldMapSVGEl.appendChild(newStyleElement);
  }

  clearCountryColors() {
    const styleTags = this.worldMapDocument.getElementsByTagName("style");
    for (let idx = 1; idx < styleTags.length; idx++) {
      styleTags[idx].remove();
    }
  }

  getCountryCodeForElement(targetElement: HTMLElement): string {
    if (targetElement.parentElement !== this.worldMapSVGEl) {
      return this.getCountryCodeForElement(
        targetElement.parentElement as HTMLElement
      );
    }

    return targetElement.id.toUpperCase();
  }

  setWorldMapClickHandler(handler: (clickedCountryCode: string) => void) {
    this.worldMapSVGEl.addEventListener("click", (e: Event) => {
      const clickedCountryCode = this.getCountryCodeForElement(
        e.target as HTMLElement
      );
      handler(clickedCountryCode);
    });
  }
}

export async function awaitWorldMapLoad(): Promise<WorldMap> {
  const worldMapObjectEl = document.getElementById(
    "world-map"
  ) as HTMLObjectElement;
  return new Promise<WorldMap>((resolve, reject) => {
    worldMapObjectEl.addEventListener("load", () => {
      resolve(new WorldMap(worldMapObjectEl));
    });
  });
}

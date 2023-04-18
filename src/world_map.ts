import { getCountryCode, IsoCountryCode } from "./country_data";
import { delay } from "lodash";

export default class WorldMap {
  worldMapObjectEl: HTMLObjectElement;
  worldMapDocument: Document;
  // TODO: This should be SVGElement?
  worldMapSVGEl: HTMLElement;

  static fetchMapFromServer(): Promise<WorldMap> {
    const worldMapObjectEl = document.getElementById(
      "world-map"
    ) as HTMLObjectElement;

    return new Promise((resolve, _) => {
      function step() {
        if (!worldMapObjectEl.contentDocument) {
          return delay(step, 10);
        }

        const worldMapDocument = worldMapObjectEl.contentDocument as Document;
        if (!worldMapDocument.documentElement) {
          return delay(step, 10);
        }

        const documentElement =
          worldMapDocument.documentElement as unknown as SVGSVGElement;
        console.log("Checking if SVG is loaded...");
        console.log(documentElement.constructor);

        // For some reason SVG elements first are instantiated as
        // instances of HTMLHtmlElement before they are fully loaded?
        if (!documentElement.createSVGNumber) {
          return delay(step, 10);
        }

        resolve(new WorldMap(worldMapObjectEl));
      }

      step();
    });
  }

  constructor(worldMapObjectEl: HTMLObjectElement) {
    this.worldMapObjectEl = worldMapObjectEl;
    this.worldMapDocument = worldMapObjectEl.contentDocument as Document;
    this.worldMapSVGEl = this.worldMapDocument.documentElement;
  }

  setCountryColor(isoCountryCode: IsoCountryCode, color: string) {
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

  hideCountryCircles(isoCountryCodes: Array<IsoCountryCode>) {
    const newStyleElement = this.worldMapDocument.createElementNS(
      "http://www.w3.org/2000/svg",
      "style"
    );

    const selector = isoCountryCodes
      .map((isoCode) => `circle.${isoCode.toLowerCase()}`)
      .join(", ");
    newStyleElement.textContent = `
      ${selector} {
        opacity: 0;
      }
    `;

    this.worldMapSVGEl.appendChild(newStyleElement);
  }

  clearCountryColor(isoCountryCode: IsoCountryCode) {
    const styleTags = this.worldMapDocument.getElementsByTagName("style");
    const cssSelector = `.${isoCountryCode.toLowerCase()}`;
    for (let idx = 1; idx < styleTags.length; idx++) {
      const styleTag = styleTags[idx];
      if (styleTag.textContent?.includes(cssSelector)) {
        styleTags[idx].remove();
        return;
      }
    }
  }

  clearCountryColors() {
    const styleTags = this.worldMapDocument.getElementsByTagName("style");
    for (let idx = 1; idx < styleTags.length; idx++) {
      styleTags[idx].remove();
    }
  }

  getCountryCodeForElement(targetElement: HTMLElement): IsoCountryCode | null {
    if (targetElement.parentElement !== this.worldMapSVGEl) {
      return this.getCountryCodeForElement(
        targetElement.parentElement as HTMLElement
      );
    }

    try {
      return getCountryCode(targetElement.id);
    } catch {
      return null;
    }
  }

  setWorldMapClickHandler(
    handler: (clickedCountryCode: IsoCountryCode) => void
  ) {
    this.worldMapSVGEl.addEventListener("click", (e: Event) => {
      const clickedCountryCode = this.getCountryCodeForElement(
        e.target as HTMLElement
      );
      if (clickedCountryCode) {
        handler(clickedCountryCode);
      }
    });
  }
}

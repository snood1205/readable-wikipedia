import type {JSDOM} from "jsdom";
import {infoboxObjectToProse} from "@/lib/parse-article/infobox-object-to-prose";

export const convertInfoboxToProse = async (articleDOM: JSDOM): Promise<JSDOM> => {
  const infoboxes = articleDOM.window.document.querySelectorAll(".infobox");
  if (infoboxes.length === 0) return articleDOM;
  const infoboxesAsProse = await Promise.all(Array.from(infoboxes).map(async (infobox) => {
    const infoboxAsObject = elementToObject(infobox);
    const prose = await infoboxObjectToProse(infoboxAsObject);
    infobox.replaceWith(prose);
  }));
  return articleDOM;
};

const elementToObject = (element: Element): Record<string, string> => {
  const object: Record<string, string> = {};
  const rows = element.querySelectorAll("tr");
  rows.forEach((row) => {
    if (row.children.length !== 2) return;
    const key = row.children[0].textContent;
    const value = row.children[1].textContent;
    if (!key || !value) return;
    object[key] = value;
  });
  return object;
};
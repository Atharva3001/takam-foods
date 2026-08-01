import { useEffect } from "react";

const BASE_URL = "https://takamfoods.com";

export function useCanonical(path: string) {
  useEffect(() => {
    const href = `${BASE_URL}${path}`;
    let tag = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!tag) {
      tag = document.createElement("link");
      tag.rel = "canonical";
      document.head.appendChild(tag);
    }
    tag.href = href;
    return () => {
      tag!.href = "";
    };
  }, [path]);
}

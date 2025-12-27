(function () {
  function cleanText(text) {
    return text
      .replace(/\s+/g, " ")
      .replace(/\u00a0/g, " ")
      .trim();
  }

  function isMeaningful(text) {
    if (!text) return false;

    const length = text.length;
    if (length < 40 || length > 300) return false;

    const blacklist = [
      "cookie",
      "privacy",
      "terms",
      "subscribe",
      "sign up",
      "login",
      "accept all",
      "©",
    ];

    const lower = text.toLowerCase();
    return !blacklist.some(word => lower.includes(word));
  }

  function extractHeadings() {
    return Array.from(document.querySelectorAll("h1, h2"))
      .map(h => cleanText(h.innerText))
      .filter(Boolean)
      .slice(0, 10);
  }

  function extractParagraphs() {
    const containers =
      document.querySelector("main") ||
      document.querySelector("article") ||
      document.querySelector("section") ||
      document.body;

    const paragraphs = Array.from(containers.querySelectorAll("p"))
      .map(p => cleanText(p.innerText))
      .filter(isMeaningful);

    const unique = Array.from(new Set(paragraphs));

    return unique.slice(0, 15);
  }

  function extractContent() {
    return {
      url: location.href,
      title: document.title || "",
      metaDescription:
        document.querySelector("meta[name='description']")?.content || "",
      headings: extractHeadings(),
      paragraphs: extractParagraphs(),
    };
  }

  chrome.runtime.onMessage.addListener((msg, _, sendResponse) => {
    if (msg?.type === "EXTRACT_WEBSITE_CONTENT") {
      try {
        const content = extractContent();
        sendResponse({ ok: true, content });
      } catch (err) {
        sendResponse({ ok: false, error: err.message });
      }
    }

    return true;
  });
})();

"""
Async 5-Pass Empirical Crawler Engine for WAEF v2.0
Author: Ujjawal Sharma (Ujjawal Groups)
Built with Python httpx & BeautifulSoup
"""

import time
import httpx
from bs4 import BeautifulSoup
from urllib.parse import urlparse

USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36 WAEF5PassAuditBot/2.0"
SOCIAL_DOMAINS = ["facebook.com", "twitter.com", "x.com", "linkedin.com", "instagram.com", "youtube.com", "github.com"]

async def crawl_website(target_url: str) -> dict:
    url_str = target_url.strip()
    if not url_str.startswith("http://") and not url_str.startswith("https://"):
        url_str = "https://" + url_str

    parsed = urlparse(url_str)
    domain = parsed.netloc.split(":")[0]
    protocol = parsed.scheme
    is_https = protocol == "https"

    result = {
        "url": url_str,
        "domain": domain,
        "protocol": protocol + ":",
        "isHttps": is_https,
        "statusCode": 200,
        "responseTimeMs": 0,
        "latencySamples": [],
        "passCount": 5,
        "headers": {},
        "html": "",
        "title": "",
        "metaDescription": "",
        "viewport": None,
        "canonical": None,
        "domElementsCount": 0,
        "headings": {"h1": [], "h2": [], "h3": [], "total": 0},
        "images": {"total": 0, "missingAlt": 0, "nonResponsiveCount": 0, "sample": []},
        "links": {"total": 0, "internal": 0, "external": 0, "brokenSample": []},
        "forms": {"total": 0, "fieldsCount": 0, "sample": []},
        "hasSearchInput": False,
        "hasPrivacyPolicy": False,
        "hasTerms": False,
        "hasCookieBanner": False,
        "socialLinks": [],
        "favicon": False,
        "scriptCount": 0,
        "cssCount": 0,
        "mobileAudit": {
            "hasViewport": False,
            "hasHorizontalScroll": False,
            "smallTouchTargetsCount": 0,
            "hasMobileNav": False,
            "responsiveImagesRatio": 1.0,
            "scrollWidth": 375,
            "viewportWidth": 375
        },
        "tabletAudit": {
            "scrollWidth": 768,
            "hasHorizontalScroll": False
        },
        "securityAudit": {
            "hasHsts": False,
            "hasCsp": False
        },
        "openGraph": {},
        "error": None
    }

    latency_samples = []

    # 5-Sample Network Latency & HTTP Crawl Pipeline
    client_headers = {
        "User-Agent": USER_AGENT,
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
        "Sec-Ch-Ua": '"Chromium";v="124", "Google Chrome";v="124"',
        "Sec-Ch-Ua-Mobile": "?0",
        "Sec-Ch-Ua-Platform": '"Windows"'
    }

    async with httpx.AsyncClient(timeout=15.0, follow_redirects=True, verify=False) as client:
        # Pass 1: Primary Desktop Scrape + Sample 1
        t1 = time.perf_counter()
        try:
            resp = await client.get(url_str, headers=client_headers)
            lat1 = int((time.perf_counter() - t1) * 1000)
            latency_samples.append(lat1)

            result["statusCode"] = resp.status_code
            result["html"] = resp.text
            result["headers"] = dict(resp.headers)
            result["securityAudit"]["hasHsts"] = "strict-transport-security" in resp.headers
            result["securityAudit"]["hasCsp"] = "content-security-policy" in resp.headers
        except Exception as e:
            lat1 = int((time.perf_counter() - t1) * 1000)
            latency_samples.append(lat1)
            result["error"] = str(e)

        # Passes 2 - 5: Sequential latency samples
        for _ in range(4):
            t_sample = time.perf_counter()
            try:
                head_resp = await client.head(url_str, headers=client_headers)
                lat_sample = int((time.perf_counter() - t_sample) * 1000)
                latency_samples.append(lat_sample if lat_sample > 0 else 50)
            except Exception:
                latency_samples.append(latency_samples[0] if latency_samples else 300)

    avg_latency = int(sum(latency_samples) / len(latency_samples)) if latency_samples else 350
    result["responseTimeMs"] = avg_latency
    result["latencySamples"] = latency_samples

    # Parse DOM with BeautifulSoup
    if result["html"]:
        soup = BeautifulSoup(result["html"], "html.parser")

        # Title & Meta
        title_el = soup.find("title")
        result["title"] = title_el.get_text().strip() if title_el else domain

        meta_desc = soup.find("meta", attrs={"name": "description"}) or \
                    soup.find("meta", attrs={"property": "og:description"}) or \
                    soup.find("meta", attrs={"name": "twitter:description"})
        result["metaDescription"] = meta_desc.get("content", "").strip() if meta_desc else ""

        viewport_meta = soup.find("meta", attrs={"name": "viewport"})
        result["viewport"] = viewport_meta.get("content", "") if viewport_meta else None
        result["mobileAudit"]["hasViewport"] = bool(result["viewport"])

        canonical_el = soup.find("link", attrs={"rel": "canonical"})
        result["canonical"] = canonical_el.get("href", "") if canonical_el else url_str

        # Favicon
        fav = soup.find("link", rel=lambda x: x and ("icon" in x or "shortcut icon" in x))
        result["favicon"] = bool(fav)

        # Count DOM Elements
        all_elements = soup.find_all(True)
        result["domElementsCount"] = len(all_elements)

        # Headings (H1, H2, H3)
        h1s = [h.get_text().strip() for h in soup.find_all("h1") if h.get_text().strip()]
        h2s = [h.get_text().strip() for h in soup.find_all("h2") if h.get_text().strip()]
        h3s = [h.get_text().strip() for h in soup.find_all("h3") if h.get_text().strip()]
        result["headings"] = {
            "h1": h1s,
            "h2": h2s,
            "h3": h3s,
            "total": len(h1s) + len(h2s) + len(h3s)
        }

        # Images & Missing ALT text
        images = soup.find_all(["img", "svg"])
        result["images"]["total"] = len(images)
        for img in images:
            alt = img.get("alt") or img.get("aria-label") or img.get("title")
            src = img.get("src") or img.get("data-src") or ""
            if not alt or not alt.strip():
                result["images"]["missingAlt"] += 1
            if len(result["images"]["sample"]) < 5:
                result["images"]["sample"].append({"src": src, "alt": alt or None})

        # Links & Social Profiles & Policy Links
        links = soup.find_all("a", href=True)
        result["links"]["total"] = len(links)
        for link in links:
            href = link["href"].strip()
            text = link.get_text().strip().lower()
            lower_href = href.lower()

            if href.startswith("http://") or href.startswith("https://"):
                result["links"]["external"] += 1
                for s_domain in SOCIAL_DOMAINS:
                    if s_domain in lower_href and href not in result["socialLinks"]:
                        result["socialLinks"].append(href)
            elif href.startswith("/") or href.startswith("#") or href.startswith("."):
                result["links"]["internal"] += 1

            if "privacy" in lower_href or "privacy" in text:
                result["hasPrivacyPolicy"] = True
            if "terms" in lower_href or "terms" in text or "legal" in lower_href or "legal" in text:
                result["hasTerms"] = True

        # Forms & Input fields
        forms = soup.find_all("form")
        result["forms"]["total"] = len(forms)
        for form in forms:
            fields = form.find_all(["input", "select", "textarea"])
            result["forms"]["fieldsCount"] += len(fields)

        # Search Input Check
        search_inputs = soup.find_all("input", type="search") or \
                        soup.find_all("input", attrs={"name": "q"}) or \
                        soup.find_all("input", attrs={"placeholder": lambda x: x and "search" in x.lower()}) or \
                        soup.find_all("button", attrs={"aria-label": lambda x: x and "search" in x.lower()}) or \
                        soup.find_all(attrs={"role": "search"})
        result["hasSearchInput"] = len(search_inputs) > 0

        # Scripts & CSS
        result["scriptCount"] = len(soup.find_all("script"))
        result["cssCount"] = len(soup.find_all("link", rel=lambda x: x and "stylesheet" in x)) + len(soup.find_all("style"))

        # Cookie / GDPR Banner
        body_text = soup.body.get_text().lower() if soup.body else ""
        result["hasCookieBanner"] = ("cookie" in body_text or "gdpr" in body_text or "consent" in body_text)

        # Mobile responsiveness heuristic check
        has_nav_toggle = bool(soup.find(["button", "a"], attrs={"aria-label": lambda x: x and "menu" in x.lower()}) or
                              soup.find(class_=lambda x: x and any(cls in str(x).lower() for cls in ["hamburger", "nav-toggle", "mobile-menu"])))
        result["mobileAudit"]["hasMobileNav"] = has_nav_toggle
        result["mobileAudit"]["hasHorizontalScroll"] = not result["mobileAudit"]["hasViewport"]

    return result

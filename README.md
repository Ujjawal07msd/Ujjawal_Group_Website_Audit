# 🌐 Website Audit AI — WAEF v2.0 Platform
> **Official Website Quality Index (WQI) 5-Pass Empirical Audit Platform & 25-Page Handbook Implementation**  
> **Author & Framework Owner:** Ujjawal Sharma (VIT Bhopal University, 2026)  
> **Copyright:** © 2026 Ujjawal Sharma. All Rights Reserved.  
> **AI Ensemble Used:** ChatGPT (GPT-4o), Google Gemini 2.5 Flash, & Claude 3.5 Sonnet

---

## 🔗 Live Application & Links

- 🚀 **Live Production Web Application:** [https://website-audit-ai-seven.vercel.app/](https://website-audit-ai-seven.vercel.app/)
- 📦 **GitHub Repository:** [https://github.com/Ujjawal07msd/WebsiteAudit_AI](https://github.com/Ujjawal07msd/WebsiteAudit_AI)

---

## 📖 Complete Handbook Specification (WAEF v2.0)

This platform implements the complete **25-Page Master Handbook** authored by **Ujjawal Sharma** (VIT Bhopal University, 2026). It replaces subjective opinions with an objective, reproducible 100-mark mathematical model called the **Website Quality Index (WQI)**.

### 📐 Core Mathematical Model (Chapter 2 & Chapter 6)

$$\text{Parameter Score}_i = \left(\frac{\text{Points Obtained}_i}{\text{Maximum Points}_i}\right) \times \text{Weight}_i \quad \text{for } i = 1 \text{ to } 15$$

$$\text{Raw WQI} = \sum_{i=1}^{15} \text{Parameter Score}_i \quad \text{(Total 100 Marks)}$$

$$\text{Total Penalties Deduction} = \min\left(20, \sum \text{Verified Penalty Deductions}\right)$$

$$\text{Final WQI Score} = \max\left(0, \text{Raw WQI} - \text{Total Penalties}\right)$$

---

## 🔍 5-Pass Empirical Web Scraping Pipeline

When auditing any target URL, the platform runs **5 distinct live scraping passes**:

1. **Pass 1: Desktop DOM & Structural Scrape (1280x800)**
   - Renders DOM, evaluates single H1 heading hierarchy, images, alt text coverage ratio, title/meta tags, and form fields.
2. **Pass 2: Mobile Viewport Audit (375x667)**
   - Measures horizontal layout overflow (`scrollWidth > 375px`), small tap targets (`<40px`), responsive images, and mobile navigation drawers.
3. **Pass 3: Tablet Viewport Audit (768x1024)**
   - Evaluates tablet layout reflow and medium screen breakpoint responsiveness.
4. **Pass 4: Security, SSL & Privacy Policy Audit**
   - Scrapes HTTPS SSL certificate status, HSTS headers, Privacy Policy link in footer, Terms link, and GDPR cookie banner.
5. **Pass 5: 5-Sample Network Response Latency Average**
   - Measures response latency across 5 separate network iterations to calculate the true 5-sample average latency ($ms$).

---

## 📋 The 15 Major Evaluation Parameters (100 Marks - Chapter 3 & 4)

| # | Parameter Name | Weight | Industry Standard | Key Evaluation Criteria |
| :-: | :--- | :-: | :--- | :--- |
| **1** | Brand Identity & Consistency | **5** | Brand Guidelines | Logo visibility, color consistency, title value proposition, CTA match. |
| **2** | Visual Design & Aesthetics | **8** | Visual Design Principles | White space, color palette, modern UI, visual hierarchy (H1 $\rightarrow$ H2 $\rightarrow$ H3). |
| **3** | Navigation & Info Architecture | **10** | Jakob's Law, 3-Click Rule | Main menu, 3-click reachability, breadcrumb, search bar, footer navigation. |
| **4** | Homepage First Impression | **7** | 3-Second Rule | Single H1 purpose, hero CTA above fold, homepage clutter control. |
| **5** | Typography & Readability | **5** | WCAG 2.2 | Readability, heading scale, line leading, body contrast ratio. |
| **6** | Accessibility | **10** | WCAG 2.2 Level AA | Contrast ratio $\ge$ 4.5:1, keyboard focus, image alt text coverage ratio. |
| **7** | Mobile Responsiveness | **10** | Google Mobile-Friendly | Viewport scaling, touch targets $\ge$ 48x48px, zero mobile horizontal scroll. |
| **8** | Performance & Speed | **10** | Core Web Vitals | Lighthouse performance, LCP $\le$ 2.5s, CLS $\le$ 0.1, INP $\le$ 200ms. |
| **9** | Content Quality | **8** | Content UX Principles | Clarity, target audience relevance, grammatical accuracy, up-to-date info. |
| **10** | Search & Findability | **5** | IR Principles | Search bar location, accuracy, search filters, latency $<$ 1s. |
| **11** | Forms & User Interaction | **5** | Baymard Institute | Simple minimal fields, inline real-time validation, specific error messages. |
| **12** | Security & Trust | **7** | HTTPS, OWASP Top 10 | HTTPS SSL active, Privacy Policy footer link, Terms & Conditions link. |
| **13** | SEO & Technical Quality | **5** | Google SEO Guidelines | Unique title tags, meta descriptions, heading hierarchy, sitemap. |
| **14** | Social Presence & Community | **3** | Social Engagement | Active working social media links (Twitter/X, GitHub, LinkedIn). |
| **15** | Overall UX Heuristics | **2** | Nielsen's 10 Heuristics | Zero major usability violations across Nielsen's 10 heuristics. |
| **TOTAL** | | **100** | | |

---

## ⚠️ Official Handbook Penalty System (Chapter 7 - Capped at 20 Points)

| Critical Failure Description | Handbook Deduction |
| :--- | :-: |
| **Missing HTTPS / Invalid SSL Certificate** | `-10 Points` |
| **Extremely Slow Load (LCP Average > 6.0s)** | `-5 Points` |
| **Major Accessibility Failure (WCAG Level A / >35% Missing Image ALT)** | `-5 Points` |
| **Broken Forms (cannot submit successfully)** | `-5 Points` |
| **Missing Privacy Policy Page Link in Footer** | `-3 Points` |
| **Intrusive Pop-up Overload (3+ pop-ups)** | `-3 Points` |
| **404 / Error Pages Not Handled Gracefully** | `-3 Points` |
| **Horizontal Scroll on Mobile (Width > 375px)** | `-2 Points` |
| **Auto-Playing Media with Sound Enabled** | `-2 Points` |
| **Broken Links (per link found)** | `-2 Points` |

---

## 🏅 Final Grade Scale (Chapter 8)

- **90 – 100**: **Grade A+** (Excellent / Industry Benchmark Standard — Maintain & iterate)
- **80 – 89**: **Grade A** (Very Good — Minor tweaks only)
- **70 – 79**: **Grade B** (Good — Address P2 priority issues)
- **60 – 69**: **Grade C** (Average — Significant UX improvements needed)
- **50 – 59**: **Grade D** (Needs Improvement — Redesign key sections)
- **Below 50**: **Grade F** (Major Redesign Required — Full audit & rebuild)

---

## 🚆 IRCTC Full Audit Case Study (Chapter 11)

Applying the 15-parameter WQI framework to `https://www.irctc.co.in`:

- **Audited Website:** `https://www.irctc.co.in`
- **Auditor:** Ujjawal Sharma (VIT Bhopal University, 2026)
- **Raw WQI Score:** `47.0 / 100`
- **Applied Penalties:** `-13 Points` (Broken links: -4, Mobile horizontal scroll: -2, Autoplay audio: -2, WCAG alt text: -5)
- **Final WQI Score:** **`34.0 / 100`**
- **Final Grade:** **Grade F — Major Redesign Required**

---

## 🤖 Multi-LLM AI Ensemble Attribution (Chapter 12)

This project and handbook were built utilizing an ensemble of three leading AI models:

1. **ChatGPT (OpenAI):** Primary brainstorming, 15-parameter framework structure, WQI math formula, chapter outlines.
2. **Google Gemini (DeepMind):** Research verification, WCAG 2.2 & Core Web Vitals accuracy, IRCTC audit research.
3. **Claude (Anthropic):** Code architecture, ReportLab PDF generation, formatting, & quality assurance.

---

## 📄 Downloadable Master Handbook & Audit PDF

- **Download Master PDF Handbook:** `WAEF_v2_Master_Handbook_Ujjawal_Sharma.pdf`
- **Live PDF Report Generator:** Click **Download Detailed PDF Report** on any audited URL in the live app to generate a customized 5-step web scraping report!

---

© 2026 **Ujjawal Sharma** (VIT Bhopal University). All Rights Reserved.

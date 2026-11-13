# Miraya Diamonds content audit

**Date:** 13 November 2026  
**Scope:** Website text in the local repository: home, about, contact, customisation, lab-grown education, testimonials, product pages, account pages, navigation, footer, policy pages, metadata and catalogue seed descriptions.  
**Approach:** Polished Indian/British English and brand-relevant jewellery copy. As requested, unsupported business promises and review claims were replaced with neutral wording.

The audit changed text in **50 source files**, including one new shared FAQ source. The [detailed changelog](CONTENT_CHANGELOG.md) records previous and updated text by file. Earlier changes to the footer description, Jaipur address and Instagram-only social links were retained.

## Main replacements

| Area | Previous content | Updated content / action | Reason |
| --- | --- | --- | --- |
| Contact email | `concierge@aurorajewels.com` and `support@aurorajewels.com` | `miraya.diamond23@gmail.com` | Removed another brand's contact details. |
| Policy email | `support@mirayadiamonds.com` | `miraya.diamond23@gmail.com` | Used the contact already established in the footer. |
| Business phone | `+91 98765 43210` in contact/policy information | `+91 9869698984` | Removed the sample business phone; input placeholders now ask for the customer's mobile number. |
| Location | Conflicting geographic claims and Mumbai court jurisdiction | Business contact location uses `Jaipur, India`; unsupported exclusive court clause removed | Avoided presenting an unconfirmed operating location or legal jurisdiction as fact. |
| Footer | `Bangels` | `Bangles` | Corrected spelling. |
| Jewellery CTAs | `Explore Jewellary`, `Jewellary Type` | `Explore Jewellery`, `Jewellery Type` | Corrected spelling. |
| Custom design intro | `LET'S CREATE SOMETHING MEMORIAL` | `LET'S CREATE SOMETHING MEANINGFUL` | Corrected the intended meaning. |
| FAQ headings | `Frequently Asked Question` | `Frequently Asked Questions` | Corrected grammar. |
| FAQ subtitle | `Know the answer for your questions` | `Find answers to your jewellery questions.` | Replaced unnatural phrasing. |
| Design process | `We craft and deliver a truly personal and meaningful jewellery.` | `We craft a personal, meaningful piece of jewellery around your chosen design.` | Corrected grammar and flow. |
| Collection CTA | `Explore All Collection` | `Explore All Collections` | Corrected pluralisation. |
| Category copy | `Necklace & Pendants`, singular earring labels | `Necklaces & Pendants`, `Earrings` | Made category language consistent. |
| Forms | `Select Your Approx Budget`, `Supported format`, `Choose file or drag here` | `Select Your Approximate Budget`, `Supported formats`, `Choose a file or drag it here` | Improved instructions. |
| English consistency | `personalized`, `customized`, `Virtual Jewelry`, `Whatsapp` | `personalised`, `customised`, `Virtual Jewellery`, `WhatsApp` | Applied consistent spelling and brand styling. |
| Profile | `Saved to Database`, `For your Anniversaries` | `Saved to Your Profile`, `Your Special Dates` | Removed implementation language and improved clarity. |
| Global metadata | `Miraya Diamonds application` | Descriptive fine jewellery, collections and design enquiry copy | Replaced developer placeholder copy. |

## Brand story and trust copy

- Removed the unsupported `250K+` customer count and international patron claim. Replaced them with “Jewellery for Your Story” and the established Jaipur location.
- Replaced the supposed design-artist quotations with an unattributed Miraya design philosophy. The copy now includes all wearers rather than assuming every customer is a woman.
- Replaced `34+ Hrs`, `100%`, “Zero-Tolerance Setting Precision”, blanket conflict-free claims and lifetime warranty badges with statements about design, detail, finish and personal guidance.
- Removed claims about generational Jaipur/Mumbai artisans, insured armoured transport, free lifetime cleaning and laser engraving services that were not confirmed.
- Rewrote supporting paragraphs to focus on jewellery design, meaningful moments, craftsmanship and choosing a piece with confidence.
- Removed an unconfirmed `Pvt Ltd.` legal-entity suffix from the account footer.

## FAQs, contact and customisation

- Home, contact and customisation now use the same [shared FAQ copy](../lib/jewellery-faqs.ts). Answers cover material confirmation, sizing, care, return eligibility and delivery arrangements.
- Removed contradictory promises of a sizing kit, free polishing, fixed 15-day returns, express delivery, automatic tracking and guaranteed certification across the range.
- Replaced “IGI & GIA Certified Staff”, master-gemologist claims, sub-four-hour responses, 4K video calls, worldwide insured shipping and complimentary at-home try-ons with neutral product and consultation guidance.
- Call, email, consultation and WhatsApp contact CTAs now point to relevant destinations. No messages were sent during this audit.
- The standalone custom design form only changes local state. It now explicitly says it does not send a message or upload a file, and shows contact details instead of falsely claiming an enquiry was received.
- The disabled product customisation form now states that online submission is unavailable and gives an email contact.
- Appointment copy no longer claims that a booking has been confirmed. The CTA opens an email request; it does not automatically send the selected form fields.
- Replaced the newsletter-looking email field, which had no subscription handler, with an honest contact CTA.

## Customer stories and account content

- Removed unverified customer names, quotations, five-star ratings, “Verified Purchase” badges, `4.9/5`, `4.8 out of 5`, `1,200+ verified reviews` and `148` review counts.
- The testimonials page now invites customers to share their experience and explains that approved stories can be published with permission.
- Home testimonial cards now contain unattributed design inspiration under “The Miraya Edit”.
- Product review cards were replaced with practical buying guidance.
- Removed sample enquiry IDs, prices, dates and statuses from the account page. It now directs customers to the team for genuine enquiry updates.

## Product content and pricing

- Replaced the hardcoded “Natural Solitaire” badge and “IGI Certified Natural Diamond” heading. The catalogue seed described the same featured ring as lab-grown, so the previous natural-diamond claim was inconsistent.
- Replaced no-cost EMI, lifetime buyback/exchange, free insured delivery and blanket hallmark/certification promises with requests to confirm the terms for the chosen piece.
- Corrected **carat versus gold purity**: the metal-purity selector no longer calls gold fineness “Carat”.
- Product diamond/gross-weight summary fields now use available product data instead of displaying the same fixed values for every item.
- Database product metal and diamond-grade choices now use the product's available source fields instead of automatically inheriting the featured ring's choices.
- Removed the sample collection fallback, its invented Ruby/diamond labels and repeated sample prices. If catalogue data is unavailable, the collection now shows an honest contact state.
- Removed randomly assigned best-seller, occasion, style and customer-gender tags from database product listings. Unsupported filter values no longer pretend to match products.
- Removed estimated prices based on a fixed gold rate when a real variant price is missing; the UI asks customers to enquire instead.
- Removed fabricated reference-price markups when the database has no strikethrough price. A crossed-out product price is shown only when there is a discount.
- Replaced repeated hardcoded home/suite prices and the standalone fallback ring's unverified price/discount with “Enquire for Pricing”.
- Relabelled nonfunctional AR/360 claims as an illustrative ring view, image browsing and click-to-zoom. Size illustrations are clearly labelled as illustrative.
- Polished seed descriptions, including “pavé”, “round-cut”, “brilliant-cut”, missing articles and plural earrings. Seeds were **not executed** and database records were **not modified**.

## Lab-grown diamond education

- Converted body paragraphs from Word-By-Word Capitalisation into normal sentence case.
- Corrected the repeated growth-process text so seed, growth, crystal formation, and cutting/polishing each have a distinct description.
- Removed blanket “More Sustainable”, “A lighter footprint”, “Ethically Created”, “Environment Friendly” and “A Sustainable Future” claims. Replaced them with technology, laboratory origin, brilliance and personal choice.
- Retained a clear distinction between diamond material properties and origin. Growth-method wording was checked against [GIA's overview of laboratory-grown diamond production and identification](https://www.gia.edu/gems-gemology/summer-2024-gia-update-on-laboratory-grown-diamonds).

## Policies

Warranty, returns, terms and privacy pages now use neutral interim wording consistent with the current enquiry-based website. Changes include:

- Removed unconfirmed warranty durations, service prices, free replacements, return deadlines, refund deadlines, cancellation windows and payment-method promises.
- Replaced references to checkout and automatic order confirmation with the actual enquiry and direct-confirmation process.
- Privacy wording describes visible account, enquiry, authentication and file-storage features rather than asserting unverified payment, marketing or analytics workflows.
- Removed an unsupported Mumbai-exclusive jurisdiction clause without inventing a Jaipur court clause.
- Standardised policy contact details and revised the displayed content date to 13 November 2026.

These pages are interim customer guidance. Final commercial terms and privacy practices still need the business's confirmed details; this audit does not establish those facts.

## Validation

- **TypeScript:** `tsc --noEmit` passed.
- **Diff formatting:** `git diff --check` passed.
- **HTTP/content verification:** All 12 checked public routes returned HTTP 200: home, about, contact, customise, lab-grown, testimonials, privacy, returns, terms, warranty, collection and the featured product page. Extracted rendered text contained none of the old-brand, typo, fabricated-review, lifetime-benefit or EMI phrases targeted by the audit.
- **Lint:** Full repository lint reports 14 existing errors and 10 warnings. In the edited files, the remaining errors are the header's existing conditional hook and five existing `any` type errors in the product component. Baseline lint confirmed those six errors existed before this audit. No new lint error was introduced in the edited files.
- **Visual QA:** Browser access was unavailable, so desktop/mobile screenshots and visual overflow checks could not be completed. Server rendering and text checks passed; these are not a substitute for visual inspection.

## Boundaries and remaining business verification

- This work updates local source files; no deployment was performed.
- Occasion, collection, style and customer-gender filters need confirmed catalogue metadata before they can return meaningful results. The current database does not supply those fields; no random labels are substituted.
- Existing live database product descriptions, metal purities, stone origins, weights, prices, inventory, classification and grading documents were not independently authenticated or rewritten. Seed-copy edits only affect future seed runs. Those source facts need verification by Miraya Diamonds before making product-specific guarantees.
- Text embedded in image banners, image authenticity and external social/account-provider content were outside this source-text pass. No raster artwork was edited. Internal image paths containing “aurora” were retained to avoid breaking assets; customer-facing Aurora email addresses were removed.
- Existing inactive or preview-only forms were made explicit; no new backend, booking or newsletter service was implemented.

See [CONTENT_CHANGELOG.md](CONTENT_CHANGELOG.md) for previous and replacement wording grouped by file.

# Bundled website fonts

The website uses two locally hosted font families through `next/font/local`:

- Inter: body text, labels, navigation and controls; variable weights 100–900.
- Cormorant Infant: headings, editorial text, the Contact card phone number and PDP title; normal and italic variable weights 300–700.

Production builds and visitors do not need to request fonts from Google.
Legacy assets for other inactive families remain in this directory but are not
loaded by the website. Admin references retain the system monospace font.

The fonts use the SIL Open Font License 1.1; their license files are included.
Cormorant Infant was sourced from the Google Fonts distribution:
https://fonts.google.com/specimen/Cormorant+Infant
https://github.com/google/fonts/tree/main/ofl/cormorantinfant

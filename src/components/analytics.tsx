import Script from "next/script";

import { site } from "@/lib/site";

/**
 * Google Analytics 4.
 *
 * Φορτώνει μόνο σε production build — αλλιώς κάθε `npm run dev` θα μόλυνε τα
 * στατιστικά με δικές μας επισκέψεις.
 *
 * `afterInteractive`: το script μπαίνει αφού γίνει interactive η σελίδα, ώστε
 * να μην καθυστερεί το πρώτο rendering.
 *
 * ⚠️ ΝΟΜΙΚΟ: το GA4 γράφει cookies. Στην ΕΕ αυτό θέλει συγκατάθεση του
 * χρήστη πριν ενεργοποιηθεί (ePrivacy / GDPR). Δείτε το README.
 */
export function Analytics() {
  if (!site.ga4 || process.env.NODE_ENV !== "production") return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${site.ga4}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${site.ga4}');`}
      </Script>
    </>
  );
}

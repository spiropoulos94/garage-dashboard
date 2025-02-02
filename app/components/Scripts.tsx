import Script from "next/script";
import React from "react";

const Scripts = () => {
  return (
    <>
      {/* beforeInteractive will always load the script into <head> */}

      {/* Google Tag Manager */}
      <Script id="google-tag-manager" strategy="beforeInteractive">
        {`
        (function(w,d,s,l,i){
          w[l]=w[l]||[];
          w[l].push({'gtm.start': new Date().getTime(), event:'gtm.js'});
          var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),
          dl=l!='dataLayer'?'&l='+l:'';
          j.async=true;
          j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
          f.parentNode.insertBefore(j,f);
        })(window, document, 'script', 'dataLayer', 'GTM-MDLX4MW');
      `}
      </Script>
      {/* End Google Tag Manager */}

      {/* Google Tag Manager (noscript) */}
      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-MDLX4MW"
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
        ></iframe>
      </noscript>
      {/* End Google Tag Manager (noscript) */}
    </>
  );
};

export default Scripts;

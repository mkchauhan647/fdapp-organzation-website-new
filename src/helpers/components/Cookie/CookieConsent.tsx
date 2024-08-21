// components/CookieConsent.js
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import Link from 'next/link';

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = Cookies.get('cookie-consent');
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const acceptCookies = () => {
    Cookies.set('cookie-consent', 'accepted', { expires: 365 });
    setShowBanner(false);
  };

  if (!showBanner) {
    return null;
  }

  return (
    <div className="fixed flex items-center justify-center gap-5 bottom-0 left-0 right-0 p-4 bg-white text-black text-center z-50">
      <p>
        We use cookies to improve your experience. By using our site, you agree to our{' '}
        <Link href="/privacy" className="underline">
          privacy policy
        </Link>.
      </p>
      <button
        onClick={acceptCookies}
        className="mt-2 px-4 py-3 bg-[var(--c-l-primary)]  text-white rounded">
        Accept
      </button>
    </div>
  );
};

export default CookieConsent;

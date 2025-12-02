// Custom hook that forces a redirect to profile when the WebView navigates to dashboard (post-login)
import { RefObject, useCallback } from "react";
import { WebView, WebViewNavigation } from "react-native-webview";

type UseWebViewRedirectProps = {
  webViewRef: RefObject<WebView | null>;
  dashboardUrl: string; // e.g., dashboard URL (post-login success point to intercept)
  profileUrl: string; // e.g., profile URL (where we want to force redirect)
};

const useWebViewRedirect = ({
  webViewRef,
  dashboardUrl,
  profileUrl,
}: UseWebViewRedirectProps) => {
  const handleNavigationStateChange = useCallback(
    (navState: WebViewNavigation) => {
      const { url } = navState;

      if (url.startsWith(dashboardUrl)) {
        // User has logged in successfully—prevent dashboard load and force profile
        webViewRef.current?.injectJavaScript(`
          (function() {
            if (window.location.href !== "${profileUrl}") {
              window.location.replace("${profileUrl}");
            }
            true;
          })();
        `);
      }
    },
    [webViewRef, dashboardUrl, profileUrl]
  );

  return { handleNavigationStateChange };
};

export default useWebViewRedirect;
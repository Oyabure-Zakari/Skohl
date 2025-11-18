// Custom hook that forces a redirect to `toUrl` when the WebView tries to navigate to `fromUrl`
import { RefObject, useCallback } from "react";
import { WebView, WebViewNavigation } from "react-native-webview";

type UseWebViewRedirectProps = {
  webViewRef: RefObject<WebView | null>;
  fromUrl: string; // e.g., dashboard URL (the one we want to intercept)
  toUrl: string; // e.g., profile URL (where we want to force redirect)
};

const useWebViewRedirect = ({
  webViewRef,
  fromUrl,
  toUrl,
}: UseWebViewRedirectProps) => {
  const handleNavigationStateChange = useCallback(
    (navState: WebViewNavigation) => {
      const { url } = navState;

      if (url.startsWith(fromUrl)) {
        // Prevent the unwanted navigation and force redirect
        webViewRef.current?.injectJavaScript(`
          (function() {
            if (window.location.href !== "${toUrl}") {
              window.location.replace("${toUrl}");
            }
            true;
          })();
        `);
      }
    },
    [webViewRef, fromUrl, toUrl]
  );

  return { handleNavigationStateChange };
};

export default useWebViewRedirect;
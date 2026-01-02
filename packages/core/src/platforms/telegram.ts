import { DeepLinkHandler } from '../types';

export const telegramHandler: DeepLinkHandler = {
  match: (url) => url.match(/^https?:\/\/(?:www\.)?t\.me\/([^/?#]+)(?:\/(\d+))?/),

  build: (webUrl, match) => {
    const username = match[1];
    const postId = match[2];

    let iosDeeplink = `tg://resolve?domain=${username}`;
    let androidParams = `domain=${username}`;

    if (postId) {
      iosDeeplink += `&post=${postId}`;
      androidParams += `&post=${postId}`;
    }

    const androidDeeplink =
      `intent://resolve?${androidParams}` +
      `#Intent;scheme=tg;package=org.telegram.messenger;` +
      `S.browser_fallback_url=${encodeURIComponent(webUrl)};end`;

    return {
      webUrl,
      ios: iosDeeplink,
      android: androidDeeplink,
      platform: 'telegram',
    };
  },
};

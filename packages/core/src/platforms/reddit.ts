import { DeepLinkHandler } from '../types';

export const redditHandler: DeepLinkHandler = {
  match: (url) =>
    url.match(/reddit\.com\/r\/([^/]+)/) ??
    url.match(/reddit\.com\/user\/([^/]+)/) ??
    url.match(/reddit\.com\/r\/[^/]+\/comments\/([^/]+)/) ??
    url.match(/redd\.it\/([^/?]+)/),

  build: (webUrl, match) => {
    const path = webUrl.replace(/^https?:\/\//, '');

    return {
      webUrl,
      ios: webUrl,
      android: `intent://${path}#Intent;scheme=https;package=com.reddit.frontpage;end`,
      platform: 'reddit',
    };
  },
};

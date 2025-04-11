export function rewriteHtml($, baseUrl) {
  $('a[href], link[href], script[src], img[src], iframe[src]').each((_, el) => {
    const attr = el.name === 'a' || el.name === 'link' ? 'href' : 'src';
    const val = $(el).attr(attr);
    if (val && !val.startsWith('data:') && !val.startsWith('javascript:')) {
      const absolute = new URL(val, baseUrl).toString();
      $(el).attr(attr, `/api/proxy?url=${encodeURIComponent(absolute)}`);
    }
  });
}

import { NextResponse } from 'next/server';
import cheerio from 'cheerio';
import { rewriteHtml } from '../../../utils/rewriteHtml';
import { injectYouTubeFixes } from '../../../utils/injectYouTubeFixes';
import fetch from 'node-fetch';

export default async function handler(req, res) {
  const { url } = req.query;
  if (!url) return res.status(400).send('Missing URL');

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': req.headers['user-agent'] || 'Mozilla/5.0',
        'Accept': '*/*',
        'Referer': url,
        'Cookie': req.headers.cookie || ''
      }
    });

    const contentType = response.headers.get('content-type');
    const raw = await response.text();

    if (contentType.includes('text/html')) {
      let $ = cheerio.load(raw);
      rewriteHtml($, url);
      if (url.includes('youtube.com')) injectYouTubeFixes($);
      res.setHeader('Content-Type', 'text/html');
      return res.send($.html());
    } else {
      res.setHeader('Content-Type', contentType);
      return res.send(raw);
    }
  } catch (err) {
    res.status(500).send(`Proxy error: ${err.message}`);
  }
}

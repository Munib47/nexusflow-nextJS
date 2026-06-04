import { useState, useEffect } from 'react';
import { themeConfig } from '../config/themeConfig';

/**
 * usePluckCMS — Headless Pluck CMS data fetching hook.
 *
 * Fetches a content node from the configured Pluck CMS flat-file API endpoint.
 * Gracefully falls back to `fallback` data on:
 *   - Placeholder base URL (yourdomain.com) — skips fetch entirely
 *   - Network timeout (configurable in themeConfig.cms.timeout)
 *   - Non-2xx HTTP response codes
 *   - Any runtime fetch error
 *
 * Rich-text fields returned from the CMS can be rendered with dangerouslySetInnerHTML.
 *
 * @param {string} endpointKey  — key from themeConfig.cms.endpoints (e.g. 'hero')
 * @param {object} fallback     — static content object used when CMS is unavailable
 * @returns {{ data: object, loading: boolean, error: string|null }}
 *
 * Usage:
 *   const { data, loading } = usePluckCMS('hero', STATIC_HERO_CONTENT);
 */
export function usePluckCMS(endpointKey, fallback = {}) {
  const [data, setData]       = useState(fallback);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    const { baseUrl, endpoints, timeout } = themeConfig.cms;
    const path = endpoints[endpointKey];

    // Skip fetch when using the placeholder domain — fall back to static content immediately.
    if (!path || baseUrl.includes('yourdomain.com')) {
      setLoading(false);
      return;
    }

    const controller = new AbortController();
    const timeoutId  = setTimeout(() => controller.abort(), timeout);

    async function fetchContent() {
      try {
        const res = await fetch(`${baseUrl}${path}`, {
          method:  'GET',
          headers: { 'Accept': 'application/json' },
          signal:  controller.signal,
        });

        if (!res.ok) {
          throw new Error(`Pluck CMS returned HTTP ${res.status} for "${endpointKey}"`);
        }

        const json = await res.json();

        // Merge CMS response on top of fallback so any missing CMS fields
        // still resolve to static copy rather than undefined.
        setData(prev => ({ ...prev, ...json }));
      } catch (err) {
        if (err.name === 'AbortError') {
          setError(`Pluck CMS timeout (>${timeout}ms) — using static fallback for "${endpointKey}"`);
        } else {
          setError(err.message);
        }
        // Keep fallback data — do not clear it on error.
      } finally {
        clearTimeout(timeoutId);
        setLoading(false);
      }
    }

    fetchContent();

    return () => {
      controller.abort();
      clearTimeout(timeoutId);
    };
  }, [endpointKey]);

  return { data, loading, error };
}

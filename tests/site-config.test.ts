import { describe, it, expect } from 'vitest';
import siteConfig from '../src/data/site-config';

describe('siteConfig integrity', () => {
  it('contains valid primary website metadata', () => {
    expect(siteConfig.title).toBeTruthy();
    expect(siteConfig.description).toBeTruthy();
    expect(siteConfig.website).toMatch(/^https?:\/\//);
  });

  it('has valid header navigation links with valid routes', () => {
    expect(Array.isArray(siteConfig.headerNavLinks)).toBe(true);
    expect(siteConfig.headerNavLinks!.length).toBeGreaterThan(0);

    siteConfig.headerNavLinks?.forEach((link) => {
      expect(link.text).toBeTruthy();
      expect(link.href).toBeTruthy();
      expect(link.href.startsWith('/') || link.href.startsWith('http')).toBe(true);
    });
  });

  it('has valid footer navigation and social links', () => {
    expect(Array.isArray(siteConfig.footerNavLinks)).toBe(true);
    expect(Array.isArray(siteConfig.socialLinks)).toBe(true);

    siteConfig.socialLinks?.forEach((social) => {
      expect(social.text).toBeTruthy();
      expect(social.href.startsWith('http') || social.href.startsWith('mailto:')).toBe(true);
    });
  });

  it('has hero section with text and actions', () => {
    expect(siteConfig.hero).toBeDefined();
    expect(siteConfig.hero?.title).toBeTruthy();
    expect(siteConfig.hero?.text).toBeTruthy();
    expect(Array.isArray(siteConfig.hero?.actions)).toBe(true);
  });
});

import { describe, it, expect } from 'vitest';
import {
  parseTimeToSeconds,
  extractYouTubeVideoId,
  getYouTubeEmbedUrl,
  getMediaCardCapabilities,
} from '../src/utils/media-utils';

describe('parseTimeToSeconds', () => {
  it('handles numeric input in seconds', () => {
    expect(parseTimeToSeconds(0)).toBe(0);
    expect(parseTimeToSeconds(125)).toBe(125);
    expect(parseTimeToSeconds(3600)).toBe(3600);
  });

  it('handles numeric strings with or without "s"', () => {
    expect(parseTimeToSeconds('120')).toBe(120);
    expect(parseTimeToSeconds('90s')).toBe(90);
  });

  it('handles mm:ss format', () => {
    expect(parseTimeToSeconds('1:30')).toBe(90);
    expect(parseTimeToSeconds('04:15')).toBe(255);
    expect(parseTimeToSeconds('0:00')).toBe(0);
  });

  it('handles hh:mm:ss format', () => {
    expect(parseTimeToSeconds('1:02:15')).toBe(3735);
    expect(parseTimeToSeconds('01:00:00')).toBe(3600);
  });

  it('handles human string formats like "1h2m30s", "3m20s"', () => {
    expect(parseTimeToSeconds('1h2m30s')).toBe(3750);
    expect(parseTimeToSeconds('2m15s')).toBe(135);
    expect(parseTimeToSeconds('45s')).toBe(45);
    expect(parseTimeToSeconds('1h')).toBe(3600);
  });

  it('returns undefined for invalid or empty inputs', () => {
    expect(parseTimeToSeconds(undefined)).toBeUndefined();
    expect(parseTimeToSeconds('')).toBeUndefined();
    expect(parseTimeToSeconds('invalid-time')).toBeUndefined();
    expect(parseTimeToSeconds(-10)).toBeUndefined();
  });
});

describe('extractYouTubeVideoId', () => {
  it('extracts ID from standard watch URL', () => {
    expect(extractYouTubeVideoId('https://www.youtube.com/watch?v=dQw4w9WgXcQ')).toBe(
      'dQw4w9WgXcQ'
    );
    expect(extractYouTubeVideoId('https://youtube.com/watch?v=dQw4w9WgXcQ&t=10s')).toBe(
      'dQw4w9WgXcQ'
    );
  });

  it('extracts ID from short youtu.be URL', () => {
    expect(extractYouTubeVideoId('https://youtu.be/dQw4w9WgXcQ')).toBe('dQw4w9WgXcQ');
    expect(extractYouTubeVideoId('https://youtu.be/dQw4w9WgXcQ?t=120')).toBe('dQw4w9WgXcQ');
  });

  it('extracts ID from embed URLs', () => {
    expect(extractYouTubeVideoId('https://www.youtube.com/embed/dQw4w9WgXcQ')).toBe('dQw4w9WgXcQ');
    expect(extractYouTubeVideoId('https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ')).toBe(
      'dQw4w9WgXcQ'
    );
  });

  it('recognizes standalone 11-char video ID', () => {
    expect(extractYouTubeVideoId('dQw4w9WgXcQ')).toBe('dQw4w9WgXcQ');
  });

  it('returns null for empty or invalid URLs', () => {
    expect(extractYouTubeVideoId('')).toBeNull();
    expect(extractYouTubeVideoId('https://vimeo.com/12345')).toBeNull();
    expect(extractYouTubeVideoId(undefined)).toBeNull();
  });
});

describe('getYouTubeEmbedUrl', () => {
  it('generates privacy-enhanced embed URL with default autoplay and JS API enabled', () => {
    const url = getYouTubeEmbedUrl({ url: 'https://youtu.be/dQw4w9WgXcQ' });
    expect(url).toContain('https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?');
    expect(url).toContain('autoplay=1');
    expect(url).toContain('enablejsapi=1');
    expect(url).toContain('rel=0');
  });

  it('adds start and end time parameters when provided', () => {
    const url = getYouTubeEmbedUrl({
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      startTime: '1:30',
      endTime: '3:00',
    });
    expect(url).toContain('start=90');
    expect(url).toContain('end=180');
  });

  it('respects numeric and string timestamps', () => {
    const url = getYouTubeEmbedUrl({
      url: 'dQw4w9WgXcQ',
      startTime: 45,
      endTime: '1m15s',
    });
    expect(url).toContain('start=45');
    expect(url).toContain('end=75');
  });

  it('returns null when URL is missing or invalid', () => {
    expect(getYouTubeEmbedUrl(undefined)).toBeNull();
    expect(getYouTubeEmbedUrl({ url: 'https://invalid-domain.com/video' })).toBeNull();
  });
});

describe('getMediaCardCapabilities (Scenario Matrix)', () => {
  it('Scenario A: Informational only (no url, no video)', () => {
    const caps = getMediaCardCapabilities({});
    expect(caps.hasUrl).toBe(false);
    expect(caps.hasVideo).toBe(false);
    expect(caps.embedUrl).toBeNull();
    expect(caps.isInformationalOnly).toBe(true);
  });

  it('Scenario B: External link only (e.g. Sessionize, Meetup, Event write-up)', () => {
    const caps = getMediaCardCapabilities({
      url: 'https://techinmotion.com/blog/bringing-legacy-tech-systems-into-the-age-of-ai',
    });
    expect(caps.hasUrl).toBe(true);
    expect(caps.hasVideo).toBe(false);
    expect(caps.embedUrl).toBeNull();
    expect(caps.isInformationalOnly).toBe(false);
  });

  it('Scenario C: Both external link AND video clip', () => {
    const caps = getMediaCardCapabilities({
      url: 'https://sessionize.com/nathan-frank/',
      video: {
        url: 'https://youtu.be/dQw4w9WgXcQ',
        startTime: '2:15',
        endTime: '5:30',
        label: 'Watch Talk Excerpt',
      },
    });
    expect(caps.hasUrl).toBe(true);
    expect(caps.hasVideo).toBe(true);
    expect(caps.embedUrl).toContain('dQw4w9WgXcQ');
    expect(caps.embedUrl).toContain('start=135');
    expect(caps.embedUrl).toContain('end=330');
    expect(caps.videoLabel).toBe('Watch Talk Excerpt');
    expect(caps.isInformationalOnly).toBe(false);
  });

  it('Scenario D: Video clip only (no external url)', () => {
    const caps = getMediaCardCapabilities({
      video: {
        url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      },
    });
    expect(caps.hasUrl).toBe(false);
    expect(caps.hasVideo).toBe(true);
    expect(caps.embedUrl).not.toBeNull();
    expect(caps.videoLabel).toBe('Watch Clip');
    expect(caps.isInformationalOnly).toBe(false);
  });
});

/**
 * Utilities for parsing and generating media and video embed links.
 */

/**
 * Parses various time formats (seconds, mm:ss, hh:mm:ss, 1h2m30s) into integer seconds.
 */
export function parseTimeToSeconds(time: number | string | undefined | null): number | undefined {
  if (time === undefined || time === null) return undefined;
  if (typeof time === 'number') {
    return Number.isFinite(time) && time >= 0 ? Math.floor(time) : undefined;
  }

  const trimmed = time.trim();
  if (!trimmed) return undefined;

  // Pure integer / numeric string (e.g., "120" or "120s")
  if (/^\d+s?$/i.test(trimmed)) {
    const parsed = parseInt(trimmed, 10);
    return isNaN(parsed) ? undefined : parsed;
  }

  // Format like "1h30m15s", "2m10s", "45s"
  const hmsRegex = /^(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?$/i;
  const hmsMatch = trimmed.match(hmsRegex);
  if (hmsMatch && (hmsMatch[1] || hmsMatch[2] || hmsMatch[3])) {
    const hours = parseInt(hmsMatch[1] || '0', 10);
    const minutes = parseInt(hmsMatch[2] || '0', 10);
    const seconds = parseInt(hmsMatch[3] || '0', 10);
    return hours * 3600 + minutes * 60 + seconds;
  }

  // Format like "mm:ss" or "hh:mm:ss"
  const colonParts = trimmed.split(':');
  if (colonParts.length === 2) {
    const minutes = parseInt(colonParts[0], 10);
    const seconds = parseInt(colonParts[1], 10);
    if (!isNaN(minutes) && !isNaN(seconds) && seconds >= 0 && seconds < 60) {
      return minutes * 60 + seconds;
    }
  } else if (colonParts.length === 3) {
    const hours = parseInt(colonParts[0], 10);
    const minutes = parseInt(colonParts[1], 10);
    const seconds = parseInt(colonParts[2], 10);
    if (
      !isNaN(hours) &&
      !isNaN(minutes) &&
      !isNaN(seconds) &&
      minutes >= 0 &&
      minutes < 60 &&
      seconds >= 0 &&
      seconds < 60
    ) {
      return hours * 3600 + minutes * 60 + seconds;
    }
  }

  return undefined;
}

/**
 * Extracts YouTube Video ID from various YouTube URL formats or a raw video ID.
 */
export function extractYouTubeVideoId(urlOrId: string | undefined | null): string | null {
  if (!urlOrId) return null;
  const trimmed = urlOrId.trim();

  // If it's already an 11-character alphanumeric video ID
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
    return trimmed;
  }

  // Patterns for youtu.be, youtube.com/watch?v=, youtube.com/embed/, youtube.com/v/, etc.
  const regexPatterns = [
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/,
    /youtube-nocookie\.com\/embed\/([\w-]{11})/,
  ];

  for (const pattern of regexPatterns) {
    const match = trimmed.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }

  return null;
}

export interface VideoConfig {
  url: string;
  startTime?: number | string;
  endTime?: number | string;
  label?: string;
  autoplay?: boolean;
}

/**
 * Generates a privacy-friendly YouTube embed URL with optional start/end parameters.
 */
export function getYouTubeEmbedUrl(
  config: VideoConfig | undefined | null,
  options: { autoplay?: boolean } = {}
): string | null {
  if (!config?.url) return null;

  const videoId = extractYouTubeVideoId(config.url);
  if (!videoId) return null;

  const params = new URLSearchParams();

  // Autoplay parameter (default enabled when clicking Watch)
  const shouldAutoplay = options.autoplay ?? config.autoplay ?? true;
  if (shouldAutoplay) {
    params.set('autoplay', '1');
  }

  const startSeconds = parseTimeToSeconds(config.startTime);
  if (startSeconds !== undefined && startSeconds > 0) {
    params.set('start', startSeconds.toString());
  }

  const endSeconds = parseTimeToSeconds(config.endTime);
  if (endSeconds !== undefined && endSeconds > 0) {
    params.set('end', endSeconds.toString());
  }

  // Enable JS API for reliable lifecycle control and restrict related videos to same channel
  params.set('enablejsapi', '1');
  params.set('rel', '0');

  const queryString = params.toString();
  return `https://www.youtube-nocookie.com/embed/${videoId}${queryString ? `?${queryString}` : ''}`;
}

export interface MediaCardCapabilities {
  hasUrl: boolean;
  hasVideo: boolean;
  embedUrl: string | null;
  videoLabel: string;
  isInformationalOnly: boolean;
}

/**
 * Analyzes a media card entry to determine its supported display and interaction capabilities.
 */
export function getMediaCardCapabilities(data: {
  url?: string;
  video?: VideoConfig;
}): MediaCardCapabilities {
  const hasUrl = Boolean(data.url && data.url.trim().length > 0);
  const embedUrl = data.video ? getYouTubeEmbedUrl(data.video) : null;
  const hasVideo = Boolean(embedUrl);
  const videoLabel = data.video?.label?.trim() || 'Watch Clip';
  const isInformationalOnly = !hasUrl && !hasVideo;

  return {
    hasUrl,
    hasVideo,
    embedUrl,
    videoLabel,
    isInformationalOnly,
  };
}

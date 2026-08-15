import { describe, it, expect } from 'vitest';
import { slugify } from '../src/utils/common-utils';
import { getAllTags, getPostsByTag, sortItemsByDateDesc } from '../src/utils/data-utils';

describe('slugify', () => {
  it('converts basic text to lowercase hyphenated format', () => {
    expect(slugify('Hello World')).toBe('hello-world');
    expect(slugify('Machine Learning & MLOps')).toBe('machine-learning-mlops');
  });

  it('strips accents and diacritics', () => {
    expect(slugify('Café Déjà Vu')).toBe('cafe-deja-vu');
  });

  it('handles multiple hyphens, spaces, and edge whitespace', () => {
    expect(slugify('  multi   space  --  test  ')).toBe('multi-space-test');
  });

  it('handles empty or undefined input', () => {
    expect(slugify('')).toBe('');
    expect(slugify(undefined)).toBe('');
  });
});

interface MockItem {
  data: {
    publishDate: Date;
  };
}

describe('sortItemsByDateDesc', () => {
  it('sorts collection items by publishDate in descending order', () => {
    const itemOld: MockItem = {
      data: { publishDate: new Date('2023-01-01') },
    };
    const itemNew: MockItem = {
      data: { publishDate: new Date('2024-06-15') },
    };
    const itemMid: MockItem = {
      data: { publishDate: new Date('2023-12-31') },
    };

    const sorted = [itemOld, itemNew, itemMid].sort((a, b) =>
      sortItemsByDateDesc(a as never, b as never)
    );
    expect(sorted).toEqual([itemNew, itemMid, itemOld]);
  });
});

describe('getAllTags and getPostsByTag', () => {
  const samplePosts = [
    {
      id: 'post-1',
      data: { tags: ['MLOps', 'Python', 'Enterprise AI'] },
    },
    {
      id: 'post-2',
      data: { tags: ['Python', 'Testing'] },
    },
    {
      id: 'post-3',
      data: { tags: ['MLOps'] },
    },
    {
      id: 'post-4',
      data: { tags: [] },
    },
  ];

  it('extracts unique tags with slugified IDs', () => {
    const tags = getAllTags(samplePosts as never);
    expect(tags).toEqual([
      { name: 'MLOps', id: 'mlops' },
      { name: 'Python', id: 'python' },
      { name: 'Enterprise AI', id: 'enterprise-ai' },
      { name: 'Testing', id: 'testing' },
    ]);
  });

  it('filters posts matching a given tag ID', () => {
    const mlopsPosts = getPostsByTag(samplePosts as never, 'mlops');
    expect(mlopsPosts.map((p: (typeof samplePosts)[number]) => p.id)).toEqual(['post-1', 'post-3']);

    const pythonPosts = getPostsByTag(samplePosts as never, 'python');
    expect(pythonPosts.map((p: (typeof samplePosts)[number]) => p.id)).toEqual([
      'post-1',
      'post-2',
    ]);

    const nonExistent = getPostsByTag(samplePosts as never, 'react');
    expect(nonExistent).toEqual([]);
  });
});

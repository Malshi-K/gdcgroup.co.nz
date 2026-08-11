// utils/locationContent.js

import locationContentData from '@/app/data/localLocation.json';

/**
 * Suburb pages nested under a parent office location.
 * Keyed by parent slug → suburb slug list.
 */
const suburbRoutes = {
  'hamilton-head-office': [
    'hamilton-central',
    'rototuna',
    'nawton',
    'huntington',
    'hamilton-east',
    'frankton',
    'dinsdale',
    'chartwell',
    'te-rapa',
    'silverdale',
    'pukete',
    'melville',
    'hillcrest',
    'glenview',
    'flagstaff',
    'enderley',
    'claudelands',
  ],
};

/**
 * Get content for a specific location by slug
 * @param {string} locationSlug - The location slug (e.g., 'hamilton-head-office')
 * @returns {Object|null} - Location content object or null if not found
 */
export const getLocationContent = (locationSlug) => {
  return locationContentData[locationSlug] || null;
};

/**
 * Get all available location slugs
 * @returns {Array} - Array of location slugs
 */
export const getAvailableLocationSlugs = () => {
  return Object.keys(locationContentData).filter(
    (slug) => !locationContentData[slug]?.parentSlug
  );
};

/**
 * Check if a location slug exists
 * @param {string} locationSlug - The location slug to check
 * @returns {boolean} - True if location exists
 */
export const locationExists = (locationSlug) => {
  const content = locationContentData[locationSlug];
  return Boolean(content && !content.parentSlug);
};

/**
 * Generate static params for Next.js static generation
 * @returns {Array} - Array of params objects for static generation
 */
export const generateLocationStaticParams = () => {
  return getAvailableLocationSlugs().map((slug) => ({
    slug: slug,
  }));
};

/**
 * Generate static params for suburb pages nested under office locations
 * @returns {Array} - Array of { slug, suburb } params
 */
export const generateSuburbStaticParams = () => {
  return Object.entries(suburbRoutes).flatMap(([slug, suburbs]) =>
    suburbs.map((suburb) => ({ slug, suburb }))
  );
};

/**
 * Check whether a suburb belongs under a parent office slug
 * @param {string} parentSlug
 * @param {string} suburbSlug
 * @returns {boolean}
 */
export const suburbExistsUnderParent = (parentSlug, suburbSlug) => {
  const suburbs = suburbRoutes[parentSlug] || [];
  if (!suburbs.includes(suburbSlug)) return false;

  const content = getLocationContent(suburbSlug);
  return Boolean(content && content.parentSlug === parentSlug);
};

/**
 * Get location content with fallback
 * @param {string} locationSlug - The location slug
 * @param {Object} fallback - Fallback content object
 * @returns {Object} - Location content or fallback
 */
export const getLocationContentWithFallback = (locationSlug, fallback = {}) => {
  return getLocationContent(locationSlug) || fallback;
};

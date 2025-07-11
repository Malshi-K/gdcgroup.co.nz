// utils/locationContent.js

import locationContentData from '@/app/data/localLocation.json';

/**
 * Get content for a specific location by slug
 * @param {string} locationSlug - The location slug (e.g., 'hamilton')
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
  return Object.keys(locationContentData);
};

/**
 * Check if a location slug exists
 * @param {string} locationSlug - The location slug to check
 * @returns {boolean} - True if location exists
 */
export const locationExists = (locationSlug) => {
  return locationSlug in locationContentData;
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
 * Get location content with fallback
 * @param {string} locationSlug - The location slug
 * @param {Object} fallback - Fallback content object
 * @returns {Object} - Location content or fallback
 */
export const getLocationContentWithFallback = (locationSlug, fallback = {}) => {
  return getLocationContent(locationSlug) || fallback;
};
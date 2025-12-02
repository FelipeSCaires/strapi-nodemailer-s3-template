/**
 * Test connection to Strapi Production
 *
 * This script tests the connection to the Railway production instance
 */

import { strapiProduction } from '../src/lib/strapi-client';

async function testConnection() {
  try {
    // Test basic connection
    const response = await fetch('https://strapi-production-593be.up.railway.app/api');

    if (response.ok) {
      const data = await response.json();
    } else {
    }

    // Test API endpoints
    try {
      const clinics = await strapiProduction.clinic.find();
    } catch (apiError: any) {
      if (apiError.message.includes('401') || apiError.message.includes('403')) {
      } else {
        throw apiError;
      }
    }

    // Test products endpoint (shared, should be accessible)
    try {
      const products = await strapiProduction.product.find();
    } catch (apiError: any) {
      if (apiError.message.includes('401') || apiError.message.includes('403')) {
      } else {
        throw apiError;
      }
    }

  } catch (error) {
    process.exit(1);
  }
}

testConnection();

'use strict';

/**
 * helpful service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::helpful.helpful');

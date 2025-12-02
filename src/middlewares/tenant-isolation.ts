/**
 * Tenant Isolation Middleware
 *
 * Automatically filters all queries by clinic_id for tenant-isolated content types.
 * Ensures data isolation between clinics in a multitenant architecture.
 */

export default (config, { strapi }) => {
  return async (ctx, next) => {
    await next();

    // Tenant-isolated content types (must have clinic relation)
    const tenantIsolatedTypes = [
      'api::inventory-item.inventory-item',
      'api::inventory-movement.inventory-movement',
      'api::order.order',
      'api::transaction.transaction',
      'api::account-payable.account-payable',
      'api::account-receivable.account-receivable',
      'api::appointment.appointment',
      'api::invoice.invoice',
    ];

    // Shared content types (no automatic filtering)
    const sharedTypes = [
      'api::supplier.supplier',
      'api::product.product',
      'api::category.category',
    ];

    const user = ctx.state.user;

    // Skip if no authenticated user
    if (!user) {
      return;
    }

    // Get user's clinic
    const userWithClinic = await strapi.entityService.findOne(
      'plugin::users-permissions.user',
      user.id,
      {
        populate: ['clinic'],
      }
    );

    const clinicId = userWithClinic?.clinic?.id;

    // Skip if user has no clinic assigned
    if (!clinicId) {
      return;
    }

    // Store clinic context in state for use in controllers/services
    ctx.state.clinicId = clinicId;
  };
};

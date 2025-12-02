/**
 * `is-clinic-owner` policy
 *
 * Ensures that users can only access resources that belong to their clinic.
 */

export default (policyContext, config, { strapi }) => {
  const user = policyContext.state.user;

  if (!user) {
    return false;
  }

  // Admin users can access all resources
  if (user.role?.type === 'admin') {
    return true;
  }

  // Get clinic ID from user
  const clinicId = policyContext.state.clinicId || user.clinic?.id;

  if (!clinicId) {
    return false;
  }

  // Store clinic filter in policy context
  policyContext.state.clinicFilter = {
    clinic: {
      id: clinicId,
    },
  };

  return true;
};

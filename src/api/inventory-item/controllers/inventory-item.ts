import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::inventory-item.inventory-item', ({ strapi }) => ({
  async find(ctx) {
    const user = ctx.state.user;

    if (!user?.clinic?.id) {
      return ctx.unauthorized('User must belong to a clinic');
    }

    const filters = (ctx.query.filters as Record<string, any>) || {};
    ctx.query = {
      ...ctx.query,
      filters: {
        ...filters,
        clinic: {
          id: user.clinic.id,
        },
      },
    };

    const { data, meta } = await super.find(ctx);
    return { data, meta };
  },

  async findOne(ctx) {
    const user = ctx.state.user;

    if (!user?.clinic?.id) {
      return ctx.unauthorized('User must belong to a clinic');
    }

    const { id } = ctx.params;
    const entity: any = await strapi.entityService.findOne('api::inventory-item.inventory-item', id, {
      populate: ['clinic'],
    });

    if (!entity || entity.clinic?.id !== user.clinic.id) {
      return ctx.notFound();
    }

    const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
    return this.transformResponse(sanitizedEntity);
  },

  async create(ctx) {
    const user = ctx.state.user;

    if (!user?.clinic?.id) {
      return ctx.unauthorized('User must belong to a clinic');
    }

    ctx.request.body.data = {
      ...ctx.request.body.data,
      clinic: user.clinic.id,
    };

    const response = await super.create(ctx);
    return response;
  },
}));

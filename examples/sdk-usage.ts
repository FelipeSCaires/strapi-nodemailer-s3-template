/**
 * SDK Usage Examples
 *
 * Examples of how to use the Strapi SDK client with TypeScript
 */

import { strapiProduction, strapiDevelopment } from '../src/lib/strapi-client';
import type {
  Clinic,
  Order,
  Product,
  InventoryItem,
  AuthResponse,
  StrapiResponse
} from '../src/types/api';

// =============================================================================
// Authentication Examples
// =============================================================================

async function loginExample() {
  try {
    const response = await strapiProduction.auth.login(
      'user@example.com',
      'password123'
    ) as AuthResponse;

    // Store JWT token for subsequent requests
    const token = response.jwt;
    const user = response.user;

    return { token, user };
  } catch (error) {
    throw error;
  }
}

async function getCurrentUser() {
  try {
    const me = await strapiProduction.auth.me();
    return me;
  } catch (error) {
    throw error;
  }
}

// =============================================================================
// Clinic Examples (Tenant)
// =============================================================================

async function getClinics() {
  try {
    const response = await strapiProduction.clinic.find() as StrapiResponse<Clinic[]>;
    const clinics = response.data;

    return clinics;
  } catch (error) {
    throw error;
  }
}

async function getClinicById(id: string) {
  try {
    const response = await strapiProduction.clinic.findOne(id) as StrapiResponse<Clinic>;
    const clinic = response.data;

    return clinic;
  } catch (error) {
    throw error;
  }
}

async function createClinic() {
  try {
    const newClinic = {
      name: 'Clínica Saúde Total',
      cnpj: '12.345.678/0001-90',
      email: 'contato@saudetotal.com',
      phone: '(11) 98765-4321',
      address: {
        street: 'Rua das Flores, 123',
        city: 'São Paulo',
        state: 'SP',
        zipCode: '01234-567'
      },
      status: 'active',
      credit_limit: 50000,
    };

    const response = await strapiProduction.clinic.create(newClinic) as StrapiResponse<Clinic>;
    return response.data;
  } catch (error) {
    throw error;
  }
}

// =============================================================================
// Product Examples (Shared Entity)
// =============================================================================

async function getProducts() {
  try {
    const response = await strapiProduction.product.find() as StrapiResponse<Product[]>;
    return response.data;
  } catch (error) {
    throw error;
  }
}

async function createProduct() {
  try {
    const newProduct = {
      name: 'Luva Cirúrgica Descartável',
      sku: 'LUV-001',
      description: 'Luva cirúrgica de látex estéril, tamanho M',
      supplier: 1, // Supplier ID
      category: 1, // Category ID
      brand: 'MedSupply',
      base_price: 25.90,
      unit: 'box',
      units_per_package: 100,
      available: true,
      stock_supplier: 500,
    };

    const response = await strapiProduction.product.create(newProduct) as StrapiResponse<Product>;
    return response.data;
  } catch (error) {
    throw error;
  }
}

// =============================================================================
// Inventory Examples (Tenant-isolated)
// =============================================================================

async function getInventoryItems() {
  try {
    // Automatically filtered by user's clinic
    const response = await strapiProduction.inventoryItem.find() as StrapiResponse<InventoryItem[]>;
    return response.data;
  } catch (error) {
    throw error;
  }
}

async function createInventoryItem() {
  try {
    const newItem = {
      product: 1, // Product ID
      quantity: 50,
      min_quantity: 10,
      location: 'Prateleira A-3',
      unit_cost: 25.00,
      status: 'in_stock',
    };

    // clinic is automatically assigned from authenticated user
    const response = await strapiProduction.inventoryItem.create(newItem) as StrapiResponse<InventoryItem>;
    return response.data;
  } catch (error) {
    throw error;
  }
}

async function updateInventoryItem(id: string, quantity: number) {
  try {
    const response = await strapiProduction.inventoryItem.update(id, {
      quantity,
    }) as StrapiResponse<InventoryItem>;

    return response.data;
  } catch (error) {
    throw error;
  }
}

// =============================================================================
// Order Examples (Tenant-isolated)
// =============================================================================

async function getOrders() {
  try {
    // Automatically filtered by user's clinic
    const response = await strapiProduction.order.find() as StrapiResponse<Order[]>;
    return response.data;
  } catch (error) {
    throw error;
  }
}

async function createOrder() {
  try {
    const newOrder = {
      order_number: `ORD-${Date.now()}`,
      supplier: 1, // Supplier ID
      status: 'draft',
      subtotal: 1500.00,
      discount: 150.00,
      tax: 135.00,
      shipping: 50.00,
      total: 1535.00,
      payment_method: 'credit',
      payment_status: 'pending',
      delivery_address: {
        street: 'Rua das Flores, 123',
        city: 'São Paulo',
        state: 'SP',
        zipCode: '01234-567'
      },
    };

    // clinic is automatically assigned from authenticated user
    const response = await strapiProduction.order.create(newOrder) as StrapiResponse<Order>;
    return response.data;
  } catch (error) {
    throw error;
  }
}

async function updateOrderStatus(id: string, status: string) {
  try {
    const response = await strapiProduction.order.update(id, {
      status,
    }) as StrapiResponse<Order>;

    return response.data;
  } catch (error) {
    throw error;
  }
}

// =============================================================================
// Transaction Examples (Tenant-isolated)
// =============================================================================

async function createTransaction() {
  try {
    const newTransaction = {
      transaction_number: `TRX-${Date.now()}`,
      type: 'debit',
      category: 'order',
      amount: 1535.00,
      balance_before: 10000.00,
      balance_after: 8465.00,
      description: 'Compra de materiais médicos',
      status: 'completed',
    };

    // clinic is automatically assigned from authenticated user
    const response = await strapiProduction.transaction.create(newTransaction);
    return response;
  } catch (error) {
    throw error;
  }
}

// =============================================================================
// Appointment Examples (Tenant-isolated)
// =============================================================================

async function createAppointment() {
  try {
    const newAppointment = {
      patient_name: 'João Silva',
      patient_phone: '(11) 98765-4321',
      patient_email: 'joao@example.com',
      date: new Date().toISOString(),
      duration: 60, // minutes
      procedure: 'Consulta de rotina',
      status: 'scheduled',
      estimated_value: 200.00,
    };

    // clinic is automatically assigned from authenticated user
    const response = await strapiProduction.appointment.create(newAppointment);
    return response;
  } catch (error) {
    throw error;
  }
}

// =============================================================================
// Export all examples
// =============================================================================

export {
  loginExample,
  getCurrentUser,
  getClinics,
  getClinicById,
  createClinic,
  getProducts,
  createProduct,
  getInventoryItems,
  createInventoryItem,
  updateInventoryItem,
  getOrders,
  createOrder,
  updateOrderStatus,
  createTransaction,
  createAppointment,
};

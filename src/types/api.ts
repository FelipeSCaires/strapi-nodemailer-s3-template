/**
 * Generated TypeScript types for Strapi API
 * Based on the multitenant architecture schemas
 */

export interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface StrapiEntity {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  locale?: string;
}

// Clinic (Tenant)
export interface Clinic extends StrapiEntity {
  name: string;
  slug: string;
  cnpj: string;
  email: string;
  phone?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  settings?: {
    credit_limit?: number;
    payment_terms?: any;
  };
  status: 'active' | 'suspended' | 'inactive';
  balance: number;
  credit_limit: number;
  credit_used: number;
  users?: User[];
  inventory_items?: InventoryItem[];
  orders?: Order[];
  transactions?: Transaction[];
  accounts_payable?: AccountPayable[];
  accounts_receivable?: AccountReceivable[];
  supplier_contracts?: SupplierContract[];
  appointments?: Appointment[];
}

// User
export interface User extends StrapiEntity {
  username: string;
  email: string;
  provider?: string;
  confirmed: boolean;
  blocked: boolean;
  first_name: string;
  last_name: string;
  phone?: string;
  avatar?: any;
  clinic: Clinic;
  user_role: 'admin' | 'manager' | 'staff' | 'supplier';
  supplier?: Supplier;
  status: 'active' | 'inactive';
  last_login?: string;
}

// Supplier
export interface Supplier extends StrapiEntity {
  name: string;
  slug: string;
  cnpj: string;
  email: string;
  phone?: string;
  address?: any;
  description?: string;
  logo?: any;
  website?: string;
  payment_terms?: any;
  delivery_areas?: any;
  min_order_value: number;
  status: 'active' | 'inactive';
  rating: number;
  products?: Product[];
  contracts?: SupplierContract[];
  orders?: Order[];
  users?: User[];
}

// SupplierContract
export interface SupplierContract extends StrapiEntity {
  clinic: Clinic;
  supplier: Supplier;
  discount_percentage: number;
  payment_terms?: any;
  delivery_terms?: string;
  credit_limit: number;
  status: 'active' | 'suspended' | 'terminated';
  start_date: string;
  end_date?: string;
}

// Category
export interface Category extends StrapiEntity {
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  parent?: Category;
  children?: Category[];
  order: number;
  products?: Product[];
}

// Product
export interface Product extends StrapiEntity {
  supplier: Supplier;
  name: string;
  slug: string;
  sku: string;
  description?: string;
  category: Category;
  subcategory?: string;
  brand?: string;
  images?: any[];
  thumbnail?: any;
  specifications?: any;
  base_price: number;
  unit: 'unit' | 'box' | 'kg' | 'liter';
  units_per_package: number;
  available: boolean;
  stock_supplier: number;
  is_featured: boolean;
  is_new: boolean;
  requires_prescription: boolean;
  inventory_items?: InventoryItem[];
  order_items?: OrderItem[];
}

// InventoryItem
export interface InventoryItem extends StrapiEntity {
  clinic: Clinic;
  product: Product;
  quantity: number;
  min_quantity: number;
  max_quantity?: number;
  location?: string;
  unit_cost?: number;
  total_value?: number;
  status: 'in_stock' | 'low_stock' | 'out_of_stock' | 'discontinued';
  last_purchase_date?: string;
  expiration_date?: string;
  movements?: InventoryMovement[];
}

// InventoryMovement
export interface InventoryMovement extends StrapiEntity {
  inventory_item: InventoryItem;
  clinic: Clinic;
  type: 'in' | 'out' | 'adjustment' | 'transfer';
  quantity: number;
  quantity_before: number;
  quantity_after: number;
  reason: 'purchase' | 'sale' | 'adjustment' | 'waste' | 'return';
  reference_type?: string;
  reference_id?: number;
  notes?: string;
  user?: User;
}

// Order
export interface Order extends StrapiEntity {
  order_number: string;
  clinic: Clinic;
  supplier: Supplier;
  status: 'draft' | 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  subtotal: number;
  discount: number;
  tax: number;
  shipping: number;
  total: number;
  payment_method?: 'credit' | 'boleto' | 'pix' | 'card';
  payment_status: 'pending' | 'paid' | 'overdue' | 'cancelled';
  payment_due_date?: string;
  delivery_address?: any;
  estimated_delivery?: string;
  delivered_at?: string;
  notes?: string;
  internal_notes?: string;
  tracking_code?: string;
  confirmed_at?: string;
  shipped_at?: string;
  items?: OrderItem[];
  transactions?: Transaction[];
  invoice?: Invoice;
  account_payable?: AccountPayable;
}

// OrderItem
export interface OrderItem extends StrapiEntity {
  order: Order;
  product: Product;
  quantity: number;
  unit_price: number;
  discount: number;
  subtotal: number;
  notes?: string;
}

// Transaction
export interface Transaction extends StrapiEntity {
  transaction_number: string;
  clinic: Clinic;
  type: 'credit' | 'debit';
  category: 'order' | 'payment' | 'refund' | 'fee' | 'adjustment' | 'procedure';
  amount: number;
  balance_before: number;
  balance_after: number;
  description: string;
  notes?: string;
  reference_type?: string;
  reference_id?: number;
  order?: Order;
  status: 'pending' | 'completed' | 'cancelled' | 'reversed';
  created_by?: User;
}

// Invoice
export interface Invoice extends StrapiEntity {
  invoice_number: string;
  clinic: Clinic;
  supplier: Supplier;
  order?: Order;
  type: 'nfe' | 'nfse' | 'receipt';
  subtotal: number;
  tax: number;
  total: number;
  status: 'issued' | 'cancelled' | 'rectified';
  access_key?: string;
  xml_file?: any;
  pdf_file?: any;
  issue_date: string;
  due_date?: string;
  paid_at?: string;
  notes?: string;
}

// AccountPayable
export interface AccountPayable extends StrapiEntity {
  clinic: Clinic;
  supplier?: Supplier;
  creditor_name: string;
  description: string;
  category: 'supplier' | 'rent' | 'salary' | 'utilities' | 'tax' | 'other';
  amount: number;
  amount_paid: number;
  amount_remaining?: number;
  due_date: string;
  payment_date?: string;
  status: 'pending' | 'overdue' | 'paid' | 'cancelled';
  order?: Order;
  invoice?: Invoice;
  notes?: string;
}

// AccountReceivable
export interface AccountReceivable extends StrapiEntity {
  clinic: Clinic;
  patient_name: string;
  patient_cpf?: string;
  description: string;
  procedure?: string;
  amount: number;
  amount_received: number;
  amount_remaining?: number;
  due_date: string;
  received_date?: string;
  status: 'pending' | 'overdue' | 'received' | 'cancelled';
  payment_method?: 'cash' | 'card' | 'pix' | 'insurance';
  notes?: string;
  appointment?: Appointment;
}

// Appointment
export interface Appointment extends StrapiEntity {
  clinic: Clinic;
  patient_name: string;
  patient_phone?: string;
  patient_email?: string;
  date: string;
  duration?: number;
  procedure: string;
  status: 'scheduled' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled' | 'no_show';
  professional?: User;
  estimated_value?: number;
  notes?: string;
  account_receivable?: AccountReceivable;
}

// Auth responses
export interface AuthResponse {
  jwt: string;
  user: User;
}

export interface MeResponse {
  id: number;
  username: string;
  email: string;
  clinic: Clinic;
  user_role: string;
}

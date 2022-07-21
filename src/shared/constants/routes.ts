abstract class Routes {
  static readonly ADMIN_DASHBOARD = "/admin";
  static readonly PRODUCTS = "/admin/products";
  static readonly ORDERS = "/admin/orders";
  static readonly HISTORY = "/admin/history";
  static readonly CATEGORIES = "/admin/categories";
  static readonly BRANDS = "/admin/brands";
  static readonly PROFILE = "/admin/profile";
  static readonly NOTIFICATIONS = "/admin/notifications";
  static readonly NEW_PRODUCT = "/admin/products/new";
  static readonly NEW_CATEGORY = "/admin/categories/new";
  static readonly NEW_BRAND = "/admin/brands/new";
  static readonly ADMIN_LOGIN = "/admin/login";
  static readonly FORGOT_PASSWORD = "/admin/forgot-password";
  static readonly RESET_PASSWORD = "/admin/reset-password";
  static readonly PRODUCT_DETAILS = (id: number) => `/admin/products/${id}`;
  static readonly CATEGORY_DETAILS = (id: number) => `/admin/categories/${id}`;
  static readonly BRAND_DETAILS = (id: number) => `/admin/brands/${id}`;
  static readonly ORDER_DETAILS = (id: number) => `/admin/orders/${id}`;
}

export default Routes;

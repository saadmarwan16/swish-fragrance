const getProductStockStatusColor = (
  in_stock: number,
  restock_point: number
) => {
  if (in_stock <= 0) {
    return "bg-error";
  } else if (in_stock > 0 && in_stock <= restock_point) {
    return "bg-warning";
  } else {
    return "bg-success";
  }
};

export default getProductStockStatusColor;

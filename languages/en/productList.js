import { Filter } from "lucide-react";

const productList = {
    breadcrumb: "Products",
    title: "All Products",
    loading: "Loading products...",
    filter: {
      filter: "Filter",
      category: "Category",
      price: "Price",
      rating: "Rating",
      apply: "Apply Filters",
      clear: "Clear Filters",
      result: "Filter Results",
      product: "product",
      loading: "Filtering...",
      no_result: "No products match your filters.",
      clear_and_retry: "Clear filters and try again"
    },
    sidebar: {
      categories_title: "Categories",
      all_categories: "All",
      clear_filters: "CLEAR ALL FILTERS",
      price: {
        title: "Price Range",
        from: "Min",
        to: "Max"
      },
      rating: {
        title: "Rating",
        suffix: "Stars",
        helper: "Filtering exactly",
        helper_suffix: "star products."
      }
    },
    results: {
      found_prefix: "Found",
      found_suffix: "products",
      empty_msg: "No products found matching your filters.",
      btn_try_clear: "Try clearing filters"
    }
};

export default productList;
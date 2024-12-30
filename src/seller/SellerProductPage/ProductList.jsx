import React from "react";

const ProductList = () => {
  const mockProducts = [
    {
      id: 1,
      name: "Wireless Headphones",
      price: "$50",
      stock: 10,
      category: "Electronics",
    },
    {
      id: 2,
      name: "Gaming Mouse",
      price: "$25",
      stock: 20,
      category: "Accessories",
    },
  ];

  return (
    <div className="container mt-4">
      <h1>My Products</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {mockProducts.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.stock}</td>
              <td>{product.category}</td>
              <td>
                <button className="btn btn-sm btn-warning me-2">Edit</button>
                <button className="btn btn-sm btn-danger">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="btn btn-primary mt-3">Add New Product</button>
    </div>
  );
};

export default ProductList;

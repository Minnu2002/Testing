import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function Inventory() {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [quantity, setQuantity] = useState("");
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "http://ec2-18-222-144-60.us-east-2.compute.amazonaws.com:9000/getProducts"
      );
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const addProduct = async () => {
    if (!name || !image || !quantity) {
      alert("All fields are required to add a product.");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("image", image);
      formData.append("quantity", quantity);

      const response = await axios.post(
        "http://ec2-18-222-144-60.us-east-2.compute.amazonaws.com:9000/addProduct",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setProducts([...products, response.data]);
      setName("");
      setImage(null);
      setQuantity("");
      document.getElementById("image").value = "";
      alert(`${name} added successfully.`);
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const deleteProduct = async (productId, imageUrl) => {
    try {
      await axios.delete(
        `http://ec2-18-222-144-60.us-east-2.compute.amazonaws.com:9000/deleteProduct/${productId}`
      );
      alert(`Product deleted successfully.`);
      fetchProducts(); // Fetch updated list of products
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const editProduct = (product) => {
    setEditingProduct(product);
    setName(product.name);
    setQuantity(product.quantity);
  };

  const updateProduct = async () => {
    if (!editingProduct || !name || !quantity) {
      alert("All fields are required to update the product.");
      return;
    }
    try {
      const updatedProduct = {
        ...editingProduct,
        name,
        quantity,
      };
      await axios.put(
        `http://ec2-18-222-144-60.us-east-2.compute.amazonaws.com:9000/updateProduct/${editingProduct._id}`,
        updatedProduct
      );
      setEditingProduct(null);
      setName("");
      setQuantity("");
      alert(`Product updated successfully.`);
      fetchProducts(); // Fetch updated list of products
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h1 className="text-center mb-4">Product Manager</h1>
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">Add Product</h5>
              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="image">Image:</label>
                <input
                  type="file"
                  className="form-control"
                  id="image"
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </div>
              <div className="form-group">
                <label htmlFor="quantity">Quantity:</label>
                <input
                  type="number"
                  className="form-control"
                  id="quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <button className="btn btn-primary" onClick={addProduct}>
                Add Product
              </button>
            </div>
          </div>
          <div className="mt-4">
            <h2 className="text-center mb-4">Products</h2>
            {products.length === 0 ? (
              <div className="alert alert-info">No inventory items found.</div>
            ) : (
              <div className="row">
                {products.map((product) => (
                  <div key={product._id} className="col-md-4 mb-4">
                    <div className="card">
                      <img
                        src={`http://ec2-18-222-144-60.us-east-2.compute.amazonaws.com:9000/pictures/${product.imageUrl}`}
                        className="card-img-top"
                        alt={product.name}
                      />
                      <div className="card-body">
                        {editingProduct === product ? (
                          <>
                            <div className="form-group">
                              <label htmlFor="editName">Name:</label>
                              <input
                                type="text"
                                className="form-control"
                                id="editName"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                              />
                            </div>
                            <div className="form-group">
                              <label htmlFor="editQuantity">Quantity:</label>
                              <input
                                type="number"
                                className="form-control"
                                id="editQuantity"
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                              />
                            </div>
                            <button
                              className="btn btn-primary mr-2"
                              onClick={updateProduct}
                            >
                              Save
                            </button>
                            <button
                              className="btn btn-secondary"
                              onClick={() => setEditingProduct(null)}
                            >
                              Cancel
                            </button>
                          </>
                        ) : (
                          <>
                            <h5 className="card-title">{product.name}</h5>
                            <p className="card-text">
                              Quantity: {product.quantity}
                            </p>
                            <button
                              className="btn btn-primary mr-2"
                              onClick={() => editProduct(product)}
                            >
                              Edit
                            </button>
                            <button
                              className="btn btn-danger"
                              onClick={() =>
                                deleteProduct(product._id, product.imageUrl)
                              }
                            >
                              Delete
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Inventory;

import React, { useEffect, useState } from 'react';
import Layout from './layout/Layout';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const EditProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [loadingGetSingleProduct, setLoadingGetSingleProduct] = useState(false);
    const [productsData, setProductsData] = useState({});
    const [sizes, setSizes] = useState([{ size: '', price: '' }]); // For dynamic sizes and prices

    const handleProduct = (e) => {
        setProductsData({ ...productsData, [e.target.name]: e.target.value });
    };

    const handleSizeChange = (index, field, value) => {
        const updatedSizes = [...sizes];
        updatedSizes[index][field] = value;
        setSizes(updatedSizes);
    };

    const addSizeField = () => {
        setSizes([...sizes, { size: '', price: '' }]);
    };

    const removeSizeField = (index) => {
        const updatedSizes = sizes.filter((_, i) => i !== index);
        setSizes(updatedSizes);
    };

    const getSingleProduct = async () => {
        setLoadingGetSingleProduct(true);
        try {
            const response = await axios.get(`/products/${id}`);
            setProductsData(response.data);
            setSizes(response.data.sizes || [{ size: '', price: '' }]); // Populate sizes if available
            setLoadingGetSingleProduct(false);
        } catch (error) {
            console.error(error);
            setLoadingGetSingleProduct(false);
        }
    };

    useEffect(() => {
        getSingleProduct();
    }, []);

    const [loadingEditProduct, setLoadingEditProduct] = useState(false);
    const editProduct = async (e) => {
        e.preventDefault();
        setLoadingEditProduct(true);
        try {
            const updatedProductData = {
                ...productsData,
                sizes: sizes.filter((s) => s.size && s.price), // Include only valid size-price pairs
            };

            await axios.put(`/products/${id}`, updatedProductData);
            setLoadingEditProduct(false);
            navigate('/admin/products');
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Product updated successfully!',
                showConfirmButton: false,
                timer: 1500,
            });
        } catch (error) {
            console.error(error);
            setLoadingEditProduct(false);
        }
    };

    const [categories, setCategories] = useState([]);
    const [loadingCategories, setLoadingCategories] = useState(false);
    const getCategories = async () => {
        setLoadingCategories(true);
        try {
            const response = await axios.get('/categories');
            setCategories(response.data);
            setLoadingCategories(false);
        } catch (error) {
            console.error(error);
            setLoadingCategories(false);
        }
    };

    useEffect(() => {
        getCategories();
    }, []);

    return (
        <Layout
            products="active"
            header="products"
            content={
                <>
                    <div className="formAdmin">
                        <h2>Edit Product</h2>
                        {loadingGetSingleProduct ? (
                            <div className="loader1"></div>
                        ) : (
                            <form onSubmit={editProduct}>
                                <div>
                                    <p>Name</p>
                                    <input
                                        value={productsData.name}
                                        onChange={handleProduct}
                                        name="name"
                                        type="text"
                                        placeholder="Name"
                                        required
                                    />
                                </div>
                                <div>
                                    <p>Description</p>
                                    <input
                                        value={productsData.description}
                                        onChange={handleProduct}
                                        name="description"
                                        type="text"
                                        placeholder="Description"
                                        required
                                    />
                                </div>
                                <div>
                                    <p>Stock Quantity</p>
                                    <input
                                        value={productsData.stock_quantity}
                                        onChange={handleProduct}
                                        name="stock_quantity"
                                        type="text"
                                        placeholder="Stock Quantity"
                                        required
                                    />
                                </div>
                                <div>
                                    <p>Category</p>
                                    <select
                                        value={productsData.category_id}
                                        onChange={handleProduct}
                                        name="category_id"
                                        required
                                    >
                                        <option value="" disabled>
                                            Choose Category
                                        </option>
                                        {categories.map((category, index) => (
                                            <option value={category._id} key={index}>
                                                {category.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <p>Sizes and Prices</p>
                                    {sizes.map((sizeObj, index) => (
                                        <div
                                            key={index}
                                            style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}
                                        >
                                            <input
                                                type="text"
                                                placeholder="Size (e.g., 20ml)"
                                                value={sizeObj.size}
                                                onChange={(e) => handleSizeChange(index, 'size', e.target.value)}
                                                required
                                            />
                                            <input
                                                type="number"
                                                placeholder="Price"
                                                value={sizeObj.price}
                                                onChange={(e) => handleSizeChange(index, 'price', e.target.value)}
                                                required
                                            />
                                            {sizes.length > 1 && (
                                                <button type="button" onClick={() => removeSizeField(index)}>
                                                    Remove
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                    <button type="button" onClick={addSizeField}>
                                        Add Size
                                    </button>
                                </div>
                                <div>
                                    <p>Image URL</p>
                                    <input
                                        value={productsData.image_url}
                                        onChange={handleProduct}
                                        name="image_url"
                                        type="text"
                                        placeholder="Image URL"
                                        required
                                    />
                                </div>
                                {!loadingEditProduct && <button type="submit">Edit Product</button>}
                            </form>
                        )}
                        {loadingEditProduct && (
                            <center>
                                <div className="loader2"></div>
                            </center>
                        )}
                    </div>
                </>
            }
        />
    );
};

export default EditProduct;

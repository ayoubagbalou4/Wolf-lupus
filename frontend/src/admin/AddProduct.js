import React, { useEffect, useState } from 'react';
import Layout from './layout/Layout';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const AddProduct = () => {
    const [imageIfExist, setImageIfExist] = useState();
    const navigate = useNavigate();
    const [loadingAddProduct, setLoadingAddProduct] = useState(false);
    const [productsData, setProductsData] = useState({});
    const [sizes, setSizes] = useState([{ size: '', price: '' }]); // Array for size and price pairs

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

    const addProduct = async (e) => {
        e.preventDefault();
        setLoadingAddProduct(true);
        try {
            let uploadedImageUrl = '';
            if (imageIfExist) {
                const formData = new FormData();
                formData.append('image', imageIfExist);

                const imgUploadRes = await axios.post(
                    `https://api.imgbb.com/1/upload?key=dd221145c4c2e3c325de99c28cdbcf0c`,
                    formData,
                    {
                        headers: { 'Content-Type': 'multipart/form-data' },
                        withCredentials: false,
                    }
                );

                if (imgUploadRes.data) {
                    uploadedImageUrl = imgUploadRes.data.data.url;
                }
            }

            const updatedProductsData = {
                ...productsData,
                image_url: uploadedImageUrl,
                sizes: sizes.filter((s) => s.size && s.price), // Include only valid size-price pairs
            };

            const response = await axios.post('/products', updatedProductsData);
            setLoadingAddProduct(false);
            navigate('/admin/products');
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Product added successfully!',
                showConfirmButton: false,
                timer: 1500,
            });
        } catch (error) {
            console.error(error);
            setLoadingAddProduct(false);
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
                        <h2>Add Product</h2>
                        <form onSubmit={addProduct}>
                            <div>
                                <p>Name</p>
                                <input onChange={handleProduct} name="name" type="text" placeholder="Name" required />
                            </div>
                            <div>
                                <p>Description</p>
                                <input onChange={handleProduct} name="description" type="text" placeholder="Description" required />
                            </div>
                            <div>
                                <p>Stock Quantity</p>
                                <input onChange={handleProduct} name="stock_quantity" type="text" placeholder="Stock Quantity" required />
                            </div>
                            <div>
                                <p>Category</p>
                                <select onChange={handleProduct} name="category_id" required>
                                    <option value="" disabled selected>
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
                                    <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
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
                                <p>Image</p>
                                <input
                                    onChange={(e) => setImageIfExist(e.target.files[0])}
                                    type="file"
                                    name="image_url"
                                    required
                                />
                            </div>
                            {!loadingAddProduct && <button type="submit">Add Product</button>}
                        </form>
                        {loadingAddProduct && (
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

export default AddProduct;

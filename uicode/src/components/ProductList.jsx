import { Link, useNavigate } from "react-router-dom";
import ApiConfig from "../api/ApiConfig";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";

function Productlist() {

    const [products, setProducts] = useState();
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    const getProducts = async () => {
        try {
            const response = await ApiConfig.get("/viewAllProducts")
            if (response.status === 204) {
                Swal.fire(
                    'No Product Available!',
                    'OK'
                )
            }
            else if (response.status === 200) {
                setProducts(response.data)
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getProducts();
    }, [])

    const loadEdit = (id) => {
        navigate("/product/update/" + id)
    }

    const removeProduct = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                 ApiConfig.delete("/removeItem", {
                    params: { id: id }
                }).then(response => {
                    if(response.status===204){
                        Swal.fire({
                            title: 'Success',
                            text: response.data,
                            icon: 'success',
                            confirmButtonText: 'OK'
                        }).then( function() {
                            window.location.href ="/product/list";
                        })
                    }
                    else {
                        Swal.fire({
                            title: 'Error',
                            text: response.data,
                            icon: 'error',
                            confirmButtonText: 'OK'
                        }).then( function() {
                            window.location.href ="/product/list";
                        })
                    }
                }).catch(err => console.log(err))
            }
        })
    }


    return (
        <div className="container">
            <div className="card">
                <div className="card-title">
                    <h2 className="text-white bg-dark mb-3">List Products available in the Store</h2>
                    <div className="homebtn">
                        <Link to="/" className="btn btn-secondary">Home</Link>
                    </div>
                </div>
                <div className="card-body">
                    <div className="divbtn">
                        <Link to="/product/addproduct" className="btn btn-success">Add New Product</Link>
                    </div>
                    <div className="search-div">
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" onChange={e => setSearch(e.target.value)} placeholder="Search" aria-label="Search" aria-describedby="basic-addon1" />
                        </div>
                    </div>
                    <table className="table table-bordered">
                        <thead className="bg-dark text-white">
                            <tr>
                                <td>S.No</td>
                                <td>Product Name</td>
                                <td>Price</td>
                                <td>Count</td>
                                <td>Stored Date</td>
                                <td>Expired</td>
                                <td>Action</td>
                            </tr>
                        </thead>
                        <tbody>
                            {products && products.filter((product) => {
                                return search.toLowerCase() === '' ? product : product.product_name.toLowerCase().includes(search);
                            }).map((product, index) => (
                                <tr key={product.id}>
                                    <td>{index + 1}</td>
                                    <td>{product.product_name}</td>
                                    <td>{product.price}</td>
                                    <td>{product.count}</td>
                                    <td>{product.storedDate.split("T")[0].split("-").reverse().join("-")}</td>
                                    <td>{product.expire}</td>
                                    <td>
                                        <button onClick={() => loadEdit(product.id)} className="btn btn-secondary">Edit</button>
                                        &nbsp;
                                        <button onClick={() => removeProduct(product.id)} className="btn btn-danger">Remove</button>
                                    </td>
                                </tr>
                            ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Productlist;
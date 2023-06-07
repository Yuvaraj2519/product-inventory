import { useState } from "react";
import { Link } from "react-router-dom";
import ApiConfig from "../api/ApiConfig";
import Swal from "sweetalert2";

function ProductAdd() {

    const [product_name, productNameChange] = useState("");
    const [price, priceChange] = useState("");
    const [count, countChange] = useState("");
    const [storedDate, storedDateChange] = useState("");

    const [nvalidate, nameValidate] = useState(false);
    const [pvalidate, priceValidate] = useState(false);
    const [cvalidate, countValidate] = useState(false);
    const [dvalidate, dateValidate] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        ApiConfig.post("/addProduct", {
            product_name: product_name,
            price: price,
            count: count,
            storedDate: storedDate
        }).then(res => {
            console.log(res.status)
            if (res.status === 201) {
                Swal.fire({
                    title: 'Success',
                    text: res.data,
                    icon: 'success',
                    confirmButtonText: 'OK'
                }).then( function() {
                    window.location.href ="/product/list";
                })
            }
            else {
                Swal.fire({
                    title: 'Error',
                    text: res.data,
                    icon: 'error',
                    confirmButtonText: 'OK'
                }).then( function() {
                    window.location.href ="/product/list";
                })
            }
        }).catch(err => console.log(err))
    }

    return (
        <div className="row">
            <div className="offset-lg-3 col-lg-6">
                <form className="container" onSubmit={handleSubmit}>
                    <div className="card" style={{ "textAlign": "left" }}>
                        <div className="card-title">
                            <h2>Add new product</h2>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>Product Name</label>
                                        <input value={product_name} onMouseDown={e => nameValidate(true)} onChange={e => productNameChange(e.target.value)} className="form-control"></input>
                                        {product_name.length ===0 && nvalidate&& <span className="text-danger">Enter product name</span>}
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>Price</label>
                                        <input value={price} onMouseDown={e => priceValidate(true)} onChange={e => priceChange(e.target.value)} className="form-control"></input>
                                        {price.length ===0 && pvalidate && <span className="text-danger">Enter price</span>}
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>Available Count</label>
                                        <input value={count} onMouseDown={e => countValidate(true)} onChange={e => countChange(e.target.value)} className="form-control"></input>
                                        {count.length ===0 && cvalidate && <span className="text-danger">Enter count</span>}
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>Stored Date</label>
                                        <input type="date" value={storedDate} onMouseDown={e => dateValidate(true)} onChange={e => storedDateChange(e.target.value)} className="form-control"></input>
                                        {storedDate.length ===0 && dvalidate && <span className="text-danger">pick a date</span>}
                                    </div>
                                </div>
                                &nbsp;
                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <button disabled={!product_name || !price || !count || !storedDate} className="btn btn-success" type="submit" >Save</button>
                                        &nbsp; &nbsp;
                                        <Link to="/product/list" className="btn btn-danger" >Back</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ProductAdd;
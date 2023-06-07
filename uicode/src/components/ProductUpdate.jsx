import { useState } from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ApiConfig from "../api/ApiConfig";
import Swal from "sweetalert2";

function ProductUpdate ()  {

    const id = useParams();

    const [product_name, productNameChange] = useState("");
    const [price, priceChange] = useState("");
    const [count, countChange] = useState("");
    const [storedDate, storedDateChange] = useState("");

    useEffect(() => {
        async function getProduct(){
            try {
                const response = await ApiConfig.get("/viewProduct",{
                    params: id
                })
                productNameChange(response.data.product_name);
                priceChange(response.data.price);
                countChange(response.data.count);
                storedDateChange(response.data.storedDate.split("T")[0])
            }
            catch (err) {
                console.log(err);
            }
        };
        getProduct();
    },[id]);

            
    const handleSubmit = (e) => {
        e.preventDefault();
        ApiConfig.put("/updateProduct", {
            product_name: product_name,
            price: price,
            count: count,
            storedDate: storedDate
        },{
            params : id
        }
        ).then(res => {
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
                                        <input value={product_name} onChange={e => productNameChange(e.target.value)} className="form-control"></input>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>Price</label>
                                        <input value={price} onChange={e => priceChange(e.target.value)} className="form-control"></input>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>Available Count</label>
                                        <input value={count} onChange={e => countChange(e.target.value)} className="form-control"></input>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>Stored Date</label>
                                        <input type="date" value={storedDate} onChange={e => storedDateChange(e.target.value)} className="form-control"></input>
                                    </div>
                                </div>
                                &nbsp;
                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <button className="btn btn-success" type="submit" >Save</button>
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
 
export default ProductUpdate;
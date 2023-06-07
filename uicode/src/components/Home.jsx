import { Link } from 'react-router-dom';
import logo from '../logo/applogo.png'

function Home() {
    return (
        <div className="container-fluid">
            <div className="card text-white bg-dark mb-3">
                <div className="card-title">
                    <h2>Welcome to GrosMart Inventory</h2>
                </div>
                <div className="card-body">
                    <div className="card mb-3">
                        <div className="row g-0">
                            <div className="col-md-4">
                                <img src={logo} className="img-fluid rounded-start" alt="..." />
                            </div>
                            <div className="col-md12">
                                <div className="card-body">
                                    <h5 className="card-title text-dark bg-info mb-3">Information!</h5>
                                    <p className="card-text flex-grow-1 text-dark">Please note that this application is used for internal purpose.</p>
                                    <Link to="/product/list" className="btn btn-primary">Go to List</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
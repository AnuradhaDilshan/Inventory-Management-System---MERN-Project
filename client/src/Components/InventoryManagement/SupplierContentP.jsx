import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import toastr from "toastr/toastr";
import 'toastr/build/toastr.css';

function SupplierContent() {
    const [suppliercode, setSuppliercode] = useState('')
    const [suppliername, setSuppliername] = useState('')
    const [registereddate, setRegistereddate] = useState('')
    const [status, setStatus] = useState('')
    const [supplierlist, setSupplierlist] = useState([])
    const [updateMode, setUpdateMode] = useState(false)
    const [selectedSupplier, setSelectedSupplier] = useState(null)
    const [searchQuery, setSearchQuery] = useState('')


    const handleSubmit = async () => {
        if (!suppliercode || !suppliername || !registereddate || !status) {
            toastr.error('All fields are required');
        } else {
            const apiUrl = updateMode
                ? `http://localhost:3001/supplier/${selectedSupplier._id}` // Update existing supplier
                : 'http://localhost:3001/supplier'; // Add new supplier

            const requestData = updateMode
                ? { ...selectedSupplier, suppliercode, suppliername, registereddate, status }
                : { suppliercode, suppliername, registereddate, status };

            axios[updateMode ? 'put' : 'post'](apiUrl, requestData)
                .then(result => {
                    toastr.success(result.data);
                    setSuppliercode('');
                    setSuppliername('');
                    setRegistereddate('');
                    setStatus('');
                    getData();
                    setUpdateMode(false); // Reset update mode after submission
                    setSelectedSupplier(null); // Reset selected supplier
                })
                .catch(err => console.log(err));
        }
    };

    const openModalForUpdate = supplier => {
        setSuppliercode(supplier.suppliercode);
        setSuppliername(supplier.suppliername);
        const dateValue = new Date(supplier.registereddate).toISOString().split('T')[0];
        setRegistereddate(dateValue);
        setStatus(supplier.status);
        setUpdateMode(true); // Set update mode
        setSelectedSupplier(supplier); // Set selected supplier for update
    };

    const handleDelete = async (id) => {
        try{
            const data = await axios.delete('http://localhost:3001/supplier/'+id)
            toastr.success(data.data)
            getData();
        }
        catch(e){
            console.log(e)
        }    }

    const clearData = () =>{
        setSuppliercode('');
        setSuppliername('');
        setRegistereddate('');
        setStatus('');
    }

    const getData = async () =>{
        try {
            let apiUrl = 'http://localhost:3001/supplier';
            if (searchQuery.trim() !== '') {
                apiUrl += `/search?suppliername=${searchQuery}`;
            }
            const data = await axios.get(apiUrl);
            setSupplierlist(data.data);
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(()=>{
        getData()
    },[searchQuery])

  return (
    <div>
         {/* Content Wrapper. Contains page content */}
         <div className="content-wrapper">
        {/* Content Header (Page header) */}
            <div className="content-header">
                <div className="container-fluid">
                <div className="row mb-2">
                    <div className="col-sm-6">
                    <h1 className="m-0">Supplier</h1>
                    </div>{/* /.col */}
                    <div className="col-sm-6">
                    <ol className="breadcrumb float-sm-right">
                        <li className="breadcrumb-item"><a href="#">Dashboard</a></li>
                        <li className="breadcrumb-item active">Supplier</li>
                    </ol>
                    </div>{/* /.col */}
                </div>{/* /.row */}
                </div>{/* /.container-fluid */}
            </div>
        {/* /.content-header */}
        {/* Main content */}
            <section className="content">
                <div className="container-fluid">
                {/* Small boxes (Stat box) */}
                <div className="row">
                                <div className="col-12">
                                    {/* Default box */}
                                    <div className="card card-secondary">
                                        <div className="card-header">
                                            <h3 className="card-title">Suppliers Details</h3>
                                            <div className="card-tools">
                                                <button type="button" className="btn btn-tool" data-card-widget="collapse" title="Collapse">
                                                    <i className="fas fa-minus" />
                                                </button>
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            <div className="row mb-3">
                                                <div className="col-3">
                                                    <input className="form-control form-control-sm" type="text" placeholder="search supplier by name" 
                                                    value={searchQuery}
                                                    onChange={(e) => setSearchQuery(e.target.value)}/>
                                                </div>
                                                <div className="col-3">

                                                </div>
                                               
                                            </div>
                                            <div className="card-body table-responsive p-0" style={{ height: 400 }}>
                                                <table className="table table-head-fixed text-nowrap">
                                                    <thead>
                                                        <tr>
                                                            <th>Supplier Code</th>
                                                            <th>Supplier Name</th>
                                                            <th>Registered Date</th>
                                                            <th>Status</th>
                                                            <th></th>
                                                            <th></th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {supplierlist.map((item) =>{
                                                        return(
                                                        <tr key = {item._id}>
                                                            <td>{item.suppliercode}</td>
                                                            <td>{item.suppliername}</td>
                                                            <td>{item.registereddate}</td>
                                                            <td>{item.status}</td>
                                                            
                                                            
                                                        </tr>
                                                        )
                                                    })}
            
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                        {/* /.card-body */}
                                        <div className="card-footer">
                                        </div>
                                        {/* /.card-footer*/}
                                    </div>
                                    {/* /.card */}
                                </div>
                            </div>
                {/* /.row */}
                </div>{/* /.container-fluid */}
            </section>
        {/* /.content */}

        </div>
        {/* /.content-wrapper */}

        {/* Add Supplier */}
        {/* /.modal */}
			<div className="modal fade" id="modal-add">
            <div className="modal-dialog">
                <div className="modal-content dark-mode">
                <div className="modal-header">
                    <h4 className="modal-title">Supplier</h4>
                </div>
                <div className="modal-body">
                    <div className="form-group">
                        <label htmlFor="materialCode">Supplier code</label>
                        <input type="text" className="form-control bg-secondary" id="materialCode" placeholder="Enter code" 
                        value={suppliercode}
                        onChange={(e) => setSuppliercode(e.target.value)}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="materialName">Supplier name</label>
                        <input type="text" className="form-control bg-secondary" id="materialName" placeholder="Enter name" 
                        value={suppliername}
                        onChange={(e) => setSuppliername(e.target.value)}/>
                    </div>
                    <div className="form-group">
                        <label>Registered Date</label>
                        <input type="date" className="form-control bg-secondary" id="birthdate" name="birthdate"
                        value={registereddate}
                        onChange={(e) => setRegistereddate(e.target.value)}/>
                    </div>
					<div className="form-group">
                        <label htmlFor="supplierCode">Status</label>
                        <select className="form-control bg-secondary"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}>
                            <option value="" disabled selected>-select one-</option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </div>

                </div>
                <div className="modal-footer justify-content-between">
                    <button type="button" className="btn btn-outline-danger" data-dismiss="modal"
                    onClick={clearData}>Close</button>
                    <button type="button" className="btn btn-outline-success"  data-dismiss="modal"
                    onClick={handleSubmit}>Save changes</button>
                </div>
                </div>
                {/* /.modal-content */}
            </div>
            {/* /.modal-dialog */}
        	</div>
        {/* /.modal */}
    </div>
  )
}

export default SupplierContent
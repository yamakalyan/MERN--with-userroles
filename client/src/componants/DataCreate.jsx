import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {baseUrl} from "../assets/Helper"
export default function DataCreate() {
  const roleKey = localStorage.getItem("token")
  const [create,  setCreate] = useState("")
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [Quantity, setQuantity]= useState(0)
    const [Desc, setDesc] = useState("")

    const url = baseUrl
    // const [shipmentSizeHeight, setShipmentSizeHeight] = useState(0)
    // const [shipmentSizeWidth, setShipmentSizeWidth] = useState(0)
    const [shipmentSize, setShipmentSize] = useState(["", "", ""])

    const navigator = useNavigate()


    const handleShipmentDetails = (e)=>{
      const inputValues = e.target.value
      const mixValues = inputValues.split(" ")
      setShipmentSize(mixValues)

    }

    const shipmentArray = []

    for (let i = 0; i < shipmentSize.length; i++) {
        const convert = parseInt(shipmentSize[i])
        shipmentArray.push(convert)
        
    }

    const reducing = shipmentArray.reduce((mix, value)=>{
      return mix * value
    })

    console.log(reducing)

 const handleCreate =(e)=>{
  e.preventDefault()
   
    const options ={
        method : "post",
        headers : {"Content-Type" : "application/json", "KN_HEADER" : roleKey},
        body : JSON.stringify({
          product_name : name,
          product_quantity : Quantity,
          product_price : price,
          product_size : reducing,
          product_description : Desc
        }) 
    }
     fetch(url + "data/create", options)
    .then(res =>res.json())
    .then(data =>{
        if (data.success) {
            setCreate(data.message)
        } else {
            setCreate(data.message)

        }
    })
 }

    const handleLogOut =()=>{
      localStorage.removeItem("token")
      navigator("/")
      window.location.reload(false)
    }


  return (
    <div className="container mt-5" id="DataCreate">
      <div>
        {
          create && <h1>{create}</h1>
        }
      </div>
      <div className="text-end">
        <button className="btn btn-primary" onClick={handleLogOut}>Log-out</button>
      </div>
        <form onSubmit={handleCreate}>
      <div className="row mt-5">

        <div className="col-md-6 col-lg-6">
          <div className="mb-3">
            <label className="form-label">
              Product Name
            </label>
            <input
              type="text"
              className="form-control"
              required
              placeholder="Ex : Name123"
              pattern="[a-zA-Z0-9\s]+"
              onChange={(e)=>setName(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-6 col-lg-6">
          <div className="mb-3">
            <label className="form-label">
              Product Amount
            </label>
            <input
              type="number"
              className="form-control"
              required
              placeholder="price"
              onChange={(e)=>setPrice(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-6 col-lg-6">
          <div className="mb-3">
            <label className="form-label">
              Product Quantity
            </label>
            <input
              type="number"
              className="form-control"
              required
              placeholder="quantity"
              onChange={(e)=>setQuantity(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-6 col-lg-6">
          <div className="mb-3">
            <label className="form-label">
              Product description
            </label>
            <input
              type="text"
              className="form-control"
              required
              placeholder="description"
              step="0.01"
              onChange={(e)=>setDesc(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-6 col-lg-6">
          <div className="mb-3">
            <label className="form-label">
              Product size.
            </label>
              <p>Please give space after number Dont use special charecters like , .</p>
            <input
              type="text"
              className="form-control"
              required
              placeholder="Length height width "
              onChange={handleShipmentDetails}
              />
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
            Submit
          </button>
      </div>
        </form>

      <span>devoloped by <a className="mt-5" href="https://yamakalyan3120.web.app" target="_blanck">yama kalyan</a></span>

    </div>
  );
}

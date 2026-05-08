import axios from 'axios'
import React, { useState } from 'react'

const AddProducts = () => {
  //initializing hooks
 const[product_name,setProductname]=useState("");
 const[product_description,setProductdescription]=useState("");
 const[product_cost,setProductcost]=useState("");
 const[product_photo,setProductphoto]=useState('');

 //initializing other hooks
 const[loading,setLoading]=useState("");
 const[success,setSuccess]=useState("");
 const[error,setError]=useState("");

 //to send data to server
 const submit=async(e)=>{

  e.preventDefault()
  setLoading('please wait.......')

 try {
  const data=new FormData()

  data.append("product_name",product_name)
  data.append("product_description",product_description)
  data.append("product_cost",product_cost)
  data.append("product_photo",product_photo)


  //calling the api
  const response=await axios.post("http://mary.alwaysdata.net/api/addproducts",data)

  setLoading("")
  setSuccess(response.data.message)

  //reset your form
  setProductname("")
  setProductdescription("")
  setProductcost("")
  setProductphoto("")
  
 } catch (error) {
  setLoading("")
  setError(error.message)
  
 }









 }






  return (
    <div className='row justify-content-center mt-3'>
      <div className='card shadow col-md-6'>
       
       <form action=""onSubmit={submit}>

        <h1>Upload Products</h1>

        <p className='text-warning'>{loading}</p>
        <p className='text-success'>{success}</p>
        <p className='text-danger'>{error}</p>

        <input type="text"className='form-control' placeholder='Enter Product Name' required value={product_name} onChange={(e)=>setProductname(e.target.value)}/>
        <br />

        <textarea name="" id=""className='form-control'placeholder='Describe your product'required value={product_description}onChange={(e)=>setProductdescription(e.target.value)}></textarea>
        <br />

        <input type="number" className='form-control'placeholder='Enter Product Cost'required value={product_cost}onChange={(e)=>setProductcost(e.target.value)}/>
        <br />

        <h3>upload product photo</h3>
        <input type="file" className='form-control' accept='image/*' required onChange={(e)=>setProductphoto(e.target.files[0])}/>
        <br />

        <input type="submit" className='form-control btn bg-info text-white' value="Upload products" required/>
        <br />






       </form>









      </div>
      
    </div>
  )
}

export default AddProducts
import React, { useState } from 'react'
import { assets, categories } from '../../assets/assets';
import { useAppcontext } from '../../context/Appcontext';
import { toast } from 'react-hot-toast';

const AddProduct = () => {
const[files,setfiles]=useState([]);
const[name,setname]=useState('');
const[description,setdescription]=useState('');
const[price,setprice]=useState('');
const[offerprice,setofferprice]=useState('');
const[category,setcategory]=useState('')
const{axios}=useAppcontext();
const onsubmithandler=async(event)=>{
    try{

event.preventDefault();
const productData={
    name,
    description:description.split('\n'),
    category,
    price,
    offerprice

}
const formData=new FormData();
formData.append('productData',JSON.stringify(productData));
for(let i=0;i<files.length;i++){
    formData.append('images',files[i]);
}
const{data}=await axios.post('/api/product/add',formData);
if(data.success){
    toast.success(data.message)

setname('');
setdescription('');
setcategory('');
setprice('');
setofferprice('');
setfiles([]);
}else{
    toast.error(error.message);
}


    }catch(error){
        toast.error(error.message)
    }
    
}


  return (
    <div className="no-scrollbar flex flex-1 h-[95vh] oveflow-y-scroll  flex-col justify-between">
    <form onSubmit={onsubmithandler} className="md:p-10 p-4 space-y-5 max-w-lg">
        <div>
            <p className="text-base font-medium">Product Image</p>
            <div className="flex flex-wrap items-center gap-3 mt-2">
                {Array(4).fill('').map((_, index) => (
                    <label key={index} htmlFor={`image${index}`}>
                        <input onChange={(e)=>{const updatedfiles=[...files];
                        updatedfiles[index]=e.target.files[0];
                        setfiles(updatedfiles)
                        }} type="file" id={`image${index}`} hidden />
                       <img src={files[index]?URL.createObjectURL(files[index]):assets.upload_area} alt="image" className='max-w-24 cursor-pointer' width={100} height={100}/>
                    </label>
                ))}
            </div>
        </div>
        <div className="flex flex-col gap-1 max-w-md">
            <label className="text-base font-medium" htmlFor="product-name">Product Name</label>
            <input onChange={(e)=>setname(e.target.value)} value={name} id="product-name" type="text" placeholder="Type here" className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40" required />
        </div>
        <div className="flex flex-col gap-1 max-w-md">
            <label className="text-base font-medium" htmlFor="product-description">Product Description</label>
            <textarea  onChange={(e)=>setdescription(e.target.value)} value={description} id="product-description" rows={4} className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 resize-none" placeholder="Type here"></textarea>
        </div>
        <div className="w-full flex flex-col gap-1">
            <label className="text-base font-medium" htmlFor="category">Category</label>
            <select  onChange={(e)=>setcategory(e.target.value)} value={category}id="category" className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40">
                <option value="">Select Category</option>
                {categories.map((item,index)=>(
                    <option key={index} value={item.path}>{item.path}</option>
                ))}
                
            </select>
        </div>
        <div className="flex items-center gap-5 flex-wrap">
            <div className="flex-1 flex flex-col gap-1 w-32">
                <label className="text-base font-medium" htmlFor="product-price">Product Price</label>
                <input  onChange={(e)=>setprice(e.target.value)} value={price}id="product-price" type="number" placeholder="0" className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40" required />
            </div>
            <div className="flex-1 flex flex-col gap-1 w-32">
                <label className="text-base font-medium" htmlFor="offer-price">Offer Price</label>
                <input onChange={(e)=>setofferprice(e.target.value)} value={offerprice} id="offer-price" type="number" placeholder="0" className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40" required />
            </div>
        </div>
        <button className="px-8 py-2.5 bg-primary text-white font-medium rounded cursor-pointer">ADD</button>
    </form>
</div>
  )
}

export default AddProduct

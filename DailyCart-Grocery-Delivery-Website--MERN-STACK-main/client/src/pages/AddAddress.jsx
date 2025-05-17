import React, { useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { useAppcontext } from '../context/Appcontext'
import { toast } from 'react-hot-toast'

const Inputfeild=({type,placeholder,name,handlechange,address})=>(
    <input className='w-full px-2 py-2.5 border border-gray-500/30 rounded outline-none text-gray-500 focus:border-primary transition'
    type={type}
    placeholder={placeholder}
    onChange={handlechange}
    name={name}
    value={address[name]}
    required/>

)


const AddAddress = () => {

    const{axios,user,navigate}=useAppcontext();
    const onsubmithandler=async(e)=>{
        e.preventDefault();
        try{
            const{data}=await axios.post('/api/address/add',{address,userId:user._id});
            if(data.success){
                toast.success(data.message)
                navigate('/cart')
            }else{
                toast.error(data.message)
            }
        }catch(error){
            toast.error(error.message)
        }
        
    }

    useEffect(()=>{
        if(!user){
            navigate('/cart')
        }
    },[])
    const [address,setaddress]=useState({
        firstName:'',
        lastName:'',
        email:'',
        street:'',
        city:'',
        state:'',
        zipcode:'',
        country:'',
        phone:'',
    })

    const handlechange=(e)=>{
        const{name,value}=e.target;
        setaddress((prevaddress)=>({
            ...prevaddress,
            [name]:value,
        }))
    }
  return (
    <div className='mt-16 pb-16 '>
        <p className='text-2xl md:text-3xl text-gray-500'> Add Shipping <span className='font-semibold text-primary'>Address</span></p>

        <div className='flex flex-col-reverse md:flex-row justify-between mt-10'>
            <div className='flex-1 max-w-md'>
                <form onSubmit={onsubmithandler} className='space-y-3 mt-6 text-sm'>
                    <div className='grid grid-cols-2 gap-4'>
                        <Inputfeild  handlechange={handlechange} address={address} name='firstName'type='text' placeholder="First-Name"/>
                                                <Inputfeild  handlechange={handlechange} address={address} name='lastName'type='text' placeholder="Last_Name"/>
                    </div>

                    <Inputfeild  handlechange={handlechange} address={address} name='email'type='email' placeholder="Email address"/>
                    <Inputfeild  handlechange={handlechange} address={address} name='street'type='text' placeholder="Street"/>
                    <div className='grid grid-cols-2 gap-4'>
                    <Inputfeild  handlechange={handlechange} address={address} name='city'type='text' placeholder="City"/>
                    <Inputfeild  handlechange={handlechange} address={address} name='state'type='text' placeholder="state"/>
                    </div>
                    <div className='grid grid-cols-2 gap-4'>
                    <Inputfeild  handlechange={handlechange} address={address} name='zipcode'type='number' placeholder="Zipcode"/>
                    <Inputfeild  handlechange={handlechange} address={address} name='country'type='text' placeholder="Country"/>
                    </div>
                    <Inputfeild  handlechange={handlechange} address={address} name='phone'type='number' placeholder="Phone"/>
                    <button className='w-full mt-6 bg-primary text-white py-3 over:bg-primary-dull transition cursor-pointer uppercase'>
                        Save address
                    </button>
                    
                </form>
            </div>
            <img className='md:mr-16 mb-16 md:mt-0' src={assets.add_address_image} alt="address" />

        </div>
      
    </div>
  )
}

export default AddAddress

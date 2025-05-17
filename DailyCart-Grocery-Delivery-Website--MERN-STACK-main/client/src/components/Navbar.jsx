import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { useAppcontext } from '../context/Appcontext'
import { toast } from 'react-hot-toast'


const Navbar = () => {
    const [open, setOpen] = React.useState(false)
    const {user,getcartcount,setuser,setIsLoggingOut,setshowuserlogin,setcartitem,navigate,setsearchquery,searchquery,axios,}=useAppcontext()
    const logout = async () => {
   
        try {
            setIsLoggingOut(true);
            const { data } = await axios.get('/api/user/logout',{
                withCredentials:true,
            });
            if (data.success) {
                setOpen(false);
                toast.success(data.message);
               
                setuser(null);
                setcartitem({});
                localStorage.removeItem('user');        // ✅ clear localStorage
                localStorage.removeItem('cartitem');  
             
                // ✅ clear localStorage
                navigate('/',{replace:true});

            } 
        } catch (error) {
            toast.error(error.message);
        }
        finally{
            setTimeout(() => {
                setIsLoggingOut(false);
                
            }, 500);
            
        }
    };
    
    useEffect(()=>{
   if(searchquery.length>0){
    navigate("/products")
   }
    },[searchquery])
  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all">

    <NavLink to='/' onClick={()=>setOpen(false)}>
        <img className="h-16 flex items-center px-4  " src="logo-main.png" alt="dummyLogoColored" />
        </NavLink>

    {/* Desktop Menu */}
    <div className="hidden sm:flex items-center gap-8">
    <NavLink to='/seller' className="cursor-pointer px-8 py-2 bg-primary hover:bg-primary-dull transition text-white rounded-full">
                Seller
            </NavLink>
     <NavLink to='/'>Home</NavLink>
     <NavLink to='/products'>All product</NavLink>
     <NavLink to='/contact'>Contact</NavLink>
        
       

        <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
            <input onChange={(e)=>setsearchquery(e.target.value)}className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500" type="text" placeholder="Search products" />
            <img src="search_icon.svg" alt="search" className='w-4 h-4' />
        </div>

        <div onClick={()=>navigate('/cart')}className="relative cursor-pointer">
            <img src="nav_cart_icon.svg" alt="cart" className='w-6 opacity-80' />
            <button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full">{getcartcount()}</button>
        </div>

       {( !user?(<button onClick={()=>setshowuserlogin(true)} className="cursor-pointer px-8 py-2 bg-primary hover:bg-primary-dull transition text-white rounded-full">
            Login
        </button>):
        <div className='relative group'>
            <img src="profile_icon.png" className='w-10'alt="" />
            <ul className='hidden group-hover:block absolute top-10 right-0 bg-white shadow border border-gray-200 py-2.5 w-30 rounded-md text-sm z-40'>
                <li onClick={()=>navigate('/my-orders')}className='p-1.5 pl-3 hover:bg-primary/10 cursor-pointer'>My orders</li>
                <li  onClick={logout}className='p-1.5 pl-3 hover:bg-primary/10 cursor-pointer'>Logout</li>
            </ul>
        </div>
       )}
    </div>

    


   <div className='flex items-center gap-6 sm:hidden'>
   <div onClick={()=>navigate('/cart')}className="relative cursor-pointer">
            <img src="nav_cart_icon.svg" alt="cart" className='w-6 opacity-80' />
            <button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full">{getcartcount()}</button>
        </div>

     <button onClick={() => open ? setOpen(false) : setOpen(true)} aria-label="Menu" className="">
        {/* Menu Icon SVG */}
        <img src="menu_icon.svg" alt="menu" />
    </button>
    </div>

    {/* Mobile Menu */}
    {open&&(
        <div className={`${open ? 'flex' : 'hidden'} absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden z-50 mt-10`}>
       <NavLink to='/' onClick={()=>setOpen(false)}>Home</NavLink>
       <NavLink to='/products' onClick={()=>setOpen(false)}>All products</NavLink>
       {user&&
       <NavLink to='/my-orders' onClick={()=>setOpen(false)}>My Orders</NavLink>}
        
        <NavLink to='/seller' onClick={()=>setOpen(false)}>Seller</NavLink>
        <NavLink to='/Contact' onClick={()=>setOpen(false)}>Contact</NavLink>
     {!user?(<button onClick={()=>{setOpen(false);
         setshowuserlogin(true)} }className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm">
            Login
        </button>):(<button onClick={logout} className="cursor-pointer px-6 py-2 mt-2 bg-primary  hover:bg-primary-dull transition text-white rounded-full text-sm">
            Logout
        </button>)
        }
        
    </div>
    )}

</nav>
  )
}

export default Navbar

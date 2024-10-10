import React, { useReducer,useState } from "react";
import AddedCart from "../components/AddedCart";
import Cart from "../components/Cart";
import ReactDOM from 'react-dom'

const CartContext = React.createContext({
    cart:[],
    addToCart:()=>{},
    removeCart:()=>{},
    price:0,
    count:0,
    showCart:false,
    setShowCart:()=>{},
    showSuccessModal:false,
    setShowSuccessModal:()=>{},
    purchaseFun:()=>{},
    
})

const reducer = (state,action)=>{
    if(action.type === 'ADD_TO_CART'){
        return {...state,cart:[...state.cart,action.payload],
            showSuccessModal:true,
            count:state.cart.length+1,
        }
    }else if(action.type === 'REMOVE_CART'){
        return {...state,cart:state.cart.filter((item)=>item.title!==action.payload),
            count:state.cart.length-1,
        } 
    }else if(action.type==='TOGGEL_CART'){
        return {...state,showCart:!state.showCart}
    }else if(action.type==='HIDE_MODAL'){
        return {...state,showSuccessModal:false};
    }else if(action.type="PURCHASE"){
        return{...state,cart:[],count:0}
    }
    return state;
}



export const CartContextProvider = (props)=>{
    const [state,dispatch]=useReducer(reducer,{
        cart:[],
        showCart:false,
        showSuccessModal:false,
        count:0,
    });
    const [price, setPrice] = useState(0);
    // const [count, setCount] = useState(0);  
    
    const {cart,showCart,showSuccessModal,count} = state

    const addToCart=(item)=>{
      const id =   state.cart.find((i)=>i.title===item.title)
      if(id){
        alert("Item already exist");
        return;
      }
        dispatch({type:'ADD_TO_CART',payload:item})
        setPrice(cart.reduce((total, item) => total + item.price, 0));
    }

    const purchaseFun=()=>{
        dispatch({type:"PURCHASE"})
    }

    const removeCart = (itemId)=>{
        dispatch({type:'REMOVE_CART',payload:itemId})
        setPrice(cart.reduce((total, item) => total + item.price, 0));
        // setCount(cart.length-1);
    }

    const toggleCart = ()=>{
        dispatch({type:"TOGGEL_CART"})
    }

    const setShowSuccessModal = ()=>{
        dispatch({type:"HIDE_MODAL"})
    }


      const value={
        cart,
        addToCart,
        removeCart,
        price,
        count,
        showCart,
        setShowCart:toggleCart,
        showSuccessModal,
        setShowSuccessModal,
        purchaseFun
      }


    return <CartContext.Provider value={value}>
        {props.children}
            {showSuccessModal && <AddedCart message="Item added to cart!" onClose={() => setShowSuccessModal(false)} />}
            {showCart && ReactDOM.createPortal(<Cart />, document.getElementById('cart-portal'))}

    </CartContext.Provider>
}

export default CartContext;
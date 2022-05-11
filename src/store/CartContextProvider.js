import React, {useState, useEffect, useContext} from "react";
import AuthContext from "./auth-context";

import CartContext from "./cart-context";

const CartContextProvider = (props) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);

  const authCtx = useContext(AuthContext);

    let newEmailString, email;
    if (authCtx.isLoggedIn) {
      newEmailString = localStorage.getItem("email")
      email = newEmailString.replace(/[@.]/gi, "");
    }


  const getExpenseFromDB = async()=>{
      try {
        const response = await fetch(`https://expense-tracker-a5dab-default-rtdb.firebaseio.com/${email}.json`)
        const data = await response.json();
        const cartItem = [];
        let amount = 0;
        for(const key in data){
            amount+= data[key].amount
            cartItem.push({
                amount: data[key].amount,
                description: data[key].description,
                category:data[key].category,
            })
        }
        setTotalAmount(amount)
        setCartItems(cartItem)
      } catch (error) {
          console.log("Could not fetch data");
      }
  }

  useEffect(() => {
   getExpenseFromDB()
  }, []);

  const addItemToCartHandler = async (item) => {

      try {
        const response = await fetch(`https://expense-tracker-a5dab-default-rtdb.firebaseio.com/${email}.json`,{
            method:"POST",
            body: JSON.stringify(item),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if(!response.ok){
            throw new Error("Item cannot be added")
        }
        console.log("Added successfully");
        getExpenseFromDB()
      } catch (error) {
          console.log(error);
      }
   
  };
  const removeItemToCartHandler = async (id) => {};
  const cart_context = {
    listOfItems: cartItems,
    totalAmount: totalAmount,
    totalQuantity: totalQuantity,
    addItems: addItemToCartHandler,
    removeItems: removeItemToCartHandler,
  };

  return (
    <CartContext.Provider value={cart_context}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;

import { useSelector, useDispatch } from "react-redux";
import { CDN_URL } from "../util/constants";
import { addItem, removeItem, clearCart } from "../util/cartSlice";
import { Link } from "react-router";

const Cart = () => {

  const cartItems = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();

  const handleAddItem = (item) => {
    //dispatch(addItem(item));
    dispatch(addItem({ card: { info: item } }));
  };

  const handleRemoveItem = (item) => {
    //dispatch(removeItem(item));
    dispatch(removeItem({ card: { info: item } }));
  };


  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const calculateTotal = () => {
    return cartItems
      .reduce(
        (total, item) =>
          total +
          ((item?.price || item?.defaultPrice) * item.quantity) / 100,
        0
      )
      .toFixed(2);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
          {/* Header section */}
          <div className="bg-gradient-to-r from-indigo-50 to-indigo-100 p-6 border-b border-gray-100">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-gray-800 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7 mr-2 text-indigo-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span>Your Cart</span>
                {cartItems.length > 0 && (
                  <span className="ml-2 mt-1 bg-indigo-600 text-white text-sm py-1 px-3 rounded-full">
                    {cartItems.length}
                  </span>
                )}
              </h1>
              {cartItems.length > 0 && (
                <button
                  onClick={handleClearCart}
                  className="bg-white text-red-500 border border-red-500 py-1.5 px-4 rounded-lg hover:bg-red-50 transition-colors text-sm font-medium flex items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                  Clear Cart
                </button>
              )}
            </div>
          </div>

          {/* Cart content */}
          <div className="p-6">
            {cartItems.length === 0 ? (
              <div className="text-center py-16 flex flex-col items-center">
                <div className="bg-indigo-50 p-6 rounded-full mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-16 w-16 text-indigo-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-gray-800 mb-2">
                  Your cart is empty
                </h2>
                <p className="text-gray-500 mb-6">
                  Looks like you haven't added anything to your cart yet
                </p>
                <Link to="/">
                  <button className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white py-3 px-8 rounded-xl hover:from-indigo-600 hover:to-indigo-700 transition-all duration-200 shadow-md flex items-center font-medium">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 17l-5-5m0 0l5-5m-5 5h12"
                      />
                    </svg>
                    Browse Restaurants
                  </button>
                </Link>
              </div>
            ) : (
              <div>
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div
                      key={item?.id}
                      className="p-4 flex justify-between items-center bg-white border border-gray-100 rounded-xl hover:border-indigo-200 hover:shadow-md transition-all duration-200"
                    >
                      <div className="flex-1 pr-4">
                        <h3 className="text-lg font-semibold text-gray-800 mb-1">
                          {item?.name}
                        </h3>
                        {/* Updated Price Styling */}
                        <p className="text-lg font-semibold text-black">
                          ₹
                          {(
                            (item?.price / 100 ||
                            item?.defaultPrice / 100 
                          )* item.quantity).toFixed(2)}
                        </p>
                        {item?.description && (
                          <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                            {item?.description}
                          </p>
                        )}
                      </div>

                      {item?.imageId && (
                        <div className="flex-shrink-0 relative">
                          <div className="h-24 w-24 rounded-lg overflow-hidden shadow-md">
                            <img
                              src={`${CDN_URL}${item?.imageId}`}
                              alt={item?.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          
                            <div className="absolute bottom-1 right-2 bg-white text-green-600 p-1 rounded shadow-md text-xs font-medium border border-gray-200 flex items-center space-x-2">
                              <button
                                onClick={() => handleRemoveItem(item)}
                                className="text-red-600 px-2"
                              >
                                -
                              </button>
                              <span className="text-black">
                                {item?.quantity}
                              </span>
                              <button
                                onClick={() => handleAddItem(item)}
                                className="text-green-600 px-2"
                              >
                                +
                              </button>
                            </div>
                          
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Summary section */}
                <div className="mt-8 border-t border-dashed border-gray-200 pt-6">
                  <div className="bg-gray-50 p-6 rounded-xl">
                    <div className="flex justify-between text-gray-600 mb-2">
                      <span>Sub Total</span>
                      <span>₹{calculateTotal()}</span>
                    </div>
                    <div className="flex justify-between text-gray-600 mb-2">
                      <span>Delivery Fee</span>
                      <span className="text-green-600">Free</span>
                    </div>
                    <div className="border-t border-gray-200 my-4"></div>
                    <div className="flex justify-between font-bold text-xl text-gray-800">
                      <span>Total Amount</span>
                      <span>₹{calculateTotal()}</span>
                    </div>
                  </div>

                  <button className="mt-6 w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-4 px-6 rounded-xl hover:from-green-700 hover:to-green-800 transition-all duration-200 font-medium text-lg flex items-center justify-center shadow-md">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

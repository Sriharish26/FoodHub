import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem } from "../util/cartSlice";
import { CDN_URL } from "../util/constants";

const ResCategory = ({ category, isOpen, onToggle }) => {
  if (!category) return null;

  const dispatch = useDispatch();

  // Get items from the Redux store
  const cart = useSelector((state) => state.cart.items);

  // Helper to get the quantity of a specific item in the cart
  const getItemCount = (itemId) => {
    const itemInCart = cart.find((item) => item.id === itemId);
    return itemInCart ? itemInCart.quantity : 0;
  };

  const handleAddItem = (item) => {
    dispatch(addItem(item));
  };

  const handleRemoveItem = (item) => {
    dispatch(removeItem(item));
  };

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <button
        className="w-full p-4 text-left bg-gray-50 hover:bg-gray-100 flex justify-between items-center transition-colors"
        onClick={onToggle}
      >
        <div>
          <h3 className="text-xl font-extrabold text-gray-800">
            {category.title}
          </h3>
          <p className="text-sm text-gray-500">
            {category.itemCards?.length || 0} items
          </p>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-5 w-5 text-gray-500 transition-transform ${isOpen ? "transform rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="divide-y divide-gray-200">
          {category.itemCards && category.itemCards.length > 0 ? (
            category.itemCards.map((item) => (
              <div
                key={item?.card?.info?.id}
                className="py-4 px-4 flex justify-between items-center hover:bg-indigo-50 transition-colors rounded-lg"
              >
                <div className="flex-1">
                  <h3 className="text-lg font-extrabold text-gray-700">
                    {item?.card?.info?.name}
                  </h3>
                  <p className="mt-1 font-bold">
                    ₹
                    {item?.card?.info?.price / 100 || item?.card?.info?.defaultPrice / 100}
                  </p>

                  {item?.card?.info?.ratings?.aggregatedRating?.rating && (
                    <span className="flex items-center mt-2 mb-2 text-green-800 text-sm font-bold">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-green-800 mr-1"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      {item.card.info.ratings.aggregatedRating.rating}
                    </span>
                  )}


                  {item?.card?.info?.description && (
                    <p className="text-sm text-gray-500 mt-1 pr-4">
                      {item?.card?.info?.description}
                    </p>
                  )}
                </div>

                {item?.card?.info?.imageId && (
                  <div className="ml-4 relative">
                    <div className="h-24 w-24 rounded-lg overflow-hidden shadow-md">
                      <img
                        src={`${CDN_URL}${item?.card?.info?.imageId}`}
                        alt={item?.card?.info?.name}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    {/* ADD or Quantity Controls */}
                    {getItemCount(item?.card?.info?.id) === 0 ? (
                      <button
                        className="absolute bottom-1 right-6 bg-white text-green-600 p-1 px-3 rounded shadow-md text-xs font-medium border border-gray-200"
                        onClick={() => handleAddItem(item)}
                      >
                        ADD
                      </button>
                    ) : (
                      <div className="absolute bottom-1 right-2 bg-white text-green-600 p-1 rounded shadow-md text-xs font-medium border border-gray-200 flex items-center space-x-2">
                        <button
                          onClick={() => handleRemoveItem(item)}
                          className="text-red-600 px-2"
                        >
                          -
                        </button>
                        <span className="text-black">
                          {getItemCount(item?.card?.info?.id)}
                        </span>
                        <button
                          onClick={() => handleAddItem(item)}
                          className="text-green-600 px-2"
                        >
                          +
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center py-4">No items available.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ResCategory;

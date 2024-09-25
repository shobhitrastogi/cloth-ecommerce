import userModel from "../models/userModel.js";

const addToCart = async (req, res) => {
  try {
    const { userId, itemId } = req.body;

    let userData = await userModel.findById(userId);
    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    // Initialize cartData if it doesn't exist
    if (!userData.cartData) {
      userData.cartData = {};
    }

    // Update cartData
    if (!userData.cartData[itemId]) {
      userData.cartData[itemId] = 1;
    } else {
      userData.cartData[itemId] += 1;
    }

    await userModel.findByIdAndUpdate(userId, { cartData: userData.cartData }, { new: true });

    res.status(200).json({ success: true, message: "Added to the cart." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error adding to cart." });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const { userId, itemId } = req.body;

    let userData = await userModel.findById(userId);
    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    // Initialize cartData if it doesn't exist
    if (!userData.cartData) {
      userData.cartData = {};
    }

    // Update cartData
    if (userData.cartData[itemId]) {
      userData.cartData[itemId] -= 1;
      if (userData.cartData[itemId] <= 0) {
        delete userData.cartData[itemId];
      }

      await userModel.findByIdAndUpdate(userId, { cartData: userData.cartData }, { new: true });
      res.status(200).json({ success: true, message: "Removed from the cart." });
    } else {
      res.status(404).json({ success: false, message: "Item not in cart." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error removing from cart." });
  }
};

const getCart = async (req, res) => {
  try {
    const { userId } = req.body;

    let userData = await userModel.findById(userId);
    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    // Initialize cartData if it doesn't exist
    if (!userData.cartData) {
      userData.cartData = {};
    }

    res.status(200).json({ success: true, cartData: userData.cartData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error fetching cart data." });
  }
};

export { addToCart, removeFromCart, getCart };

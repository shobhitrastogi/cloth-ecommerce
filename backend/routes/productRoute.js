import express from "express";
import {
  addProduct,
  getProduct,
  listProduct,
  removeProduct,
} from "../controllers/productController.js";
import multer from "multer";

const productRouter = express.Router();

const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}${file.originalname}`);
  },
});

const upload = multer({
  storage
});
productRouter.get("/list", listProduct);
productRouter.get('/:id', getProduct);
productRouter.post("/add", upload.single("image"), addProduct);
productRouter.post("/remove/:id", removeProduct);

export default productRouter;
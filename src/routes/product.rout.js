import { Router } from "express";
import { UploadProductDetail, getallProduct } from "../controllers/product.controllers.js";
import { upload } from "../middlewares/multer.middleware.js";




const router=Router();


router.route("/upload").post(upload.single("productImage"),UploadProductDetail);
router.route("/allproduct").get(getallProduct);

export default router
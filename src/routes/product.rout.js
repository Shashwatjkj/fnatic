import { Router } from "express";
import { UploadProductDetail, getallProduct } from "../controllers/product.controllers.js";
import { upload } from "../middlewares/multer.middleware.js";




const router=Router();


router.route("/upload").post(upload.fields([{
    name: "firstImage",
    maxCount: 1
}, 
{
    name: "versionImage",
    maxCount: 4
}]),UploadProductDetail);
router.route("/allproduct").get(getallProduct);

export default router
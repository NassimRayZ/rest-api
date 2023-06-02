import express from "express"
import {add_item, get_items, get_item_by_id, update_item_by_id, delete_item_by_id} from "../controllers/cart_controller.js"
const router = express.Router()


router.route("/")
  .post(add_item)
  .get(get_items)
router.route("/:id")
  .get(get_item_by_id)
  .put(update_item_by_id)
  .delete(delete_item_by_id)

export default router;

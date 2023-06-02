import asyncHandler from "express-async-handler"
import prisma from "../db/prisma.js"
const async_handler = asyncHandler
// @desc  Add item into cart
// @route POST /api/cart
const add_item = async_handler( async (req, res) => {
  const {
    label,
    value,
    qty,
  } = req.body

  if ((label == null) || (value == null) || (qty == null)) {
    res.status(400)
    throw new Error("Cannot create item with empty data")
  }
  const created_item = await prisma.item.create({
    data: {
      label: label,
      value: value,
      qty: qty,
    }
  })
  res.status(201).json(created_item)
})

// @desc  Get all items from the cart
// @route GET /api/cart
const get_items = async_handler( async (req, res) => {
  const items = await prisma.item.findMany()
  res.status(200).json(items)
})

// @desc Get item by id from cart
// @route GET /api/cart/:id
const get_item_by_id = async_handler( async (req, res) => {
  const item_id = parseInt(req.params.id)
  const item = await prisma.item.findUnique({
    where: { id : item_id },
  })

  if (item) {
    res.json(item)
  }else {
    res.status(404)
    throw new Error("Item Not Found")
  }
})

// @desc Update item by id in cart
// @route PUT /api/cart/:id
const update_item_by_id = async_handler( async (req, res) => {
  const props = ["label", "value", "qty"]
  const item_id = parseInt(req.params.id);
  const filtered = Object.keys(req.body).filter((key) => props.includes(key))
  let data = {}
  filtered.forEach((key) => data[key] = req.body[key]) 
  if (data == {} ){
    res.status(400)
    throw new Error("Cannot update empty properties")
  }
  try {
  const updated_item = await prisma.item.update({
    where: {
      id: item_id
    },
    data
  })
    res.status(200).json(updated_item)
  }catch (e){
    res.status(400)
    throw new Error("Item Not Found")
  }
})


// @desc Delete item by id in cart
// @route DELETE /api/cart/:id
const delete_item_by_id = async_handler( async (req, res) => {
  const item_id = parseInt(req.params.id)
  try{
    const deleted_item = await prisma.item.delete({
      where: {
        id: item_id
      }
    })
    res.status(200).json(deleted_item)
  } catch {
    res.status(404)
    throw new Error("Item Not Found")
  }
})
export { delete_item_by_id, update_item_by_id, get_item_by_id, get_items, add_item }


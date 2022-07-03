const express = require('express');
const allowRole = require('./middleware/allowRole');
const router = express.Router();

router.get('/suppliers', allowRole(['SA', 'SM']), (req,res)=>{
  res.send("Manage Supplier and raw products Route")
})


router.get('/managesales', allowRole(['SA', 'SP']), (req,res)=>{
  res.send("Manage Sales Route")
})


router.get('/customerComplaints', allowRole(['SA', 'CC']), (req,res)=>{
  res.send("Manage complaints Route")
})


router.get('/manageOrders', allowRole(['SA', 'OS']), (req,res)=>{
  res.send("Manage Orders Route")
})


module.exports = router;
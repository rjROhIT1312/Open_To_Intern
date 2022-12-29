const collegeModel = require('../model/collegeModel')
const internModel = require('../model/interModel')
const mongoose = require('mongoose')

const intern = async function(req,res){
    let data = req.body
    let {name, mobile, email, collegeName} =data

    const checkMail = await internModel.findOne({email:email})
    if(checkMail)
    return res.status(400).send({status:false,message:"Email is already exists"})

    const checkMobile = await internModel.findOne({mobile:mobile})
    if(checkMobile)
    return res.status(400).send({status:false,message:"Mobile is already exists"})

    let cllgName = data.cllgName
    let checkCllg = await collegeModel.findOne({name:cllgName})
    if(!checkCllg)
    return res.status(400).send({status:false,message:"college not found"})

    let cllgId = checkCllg["_id"]
    let createIntern = {name,mobile,email,cllgId}

    let data1 = await internModel.create(createIntern)
    return res.status(201).send({status:true,data:data1})
}
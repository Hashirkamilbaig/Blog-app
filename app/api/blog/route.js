import { ConnectDB } from "@/lib/config/db";
import BlogModel from "@/lib/models/BlogModel";
import exp from "constants";
const { NextResponse } = require("next/server");
import {writeFile} from 'fs/promises'
const fs = require('fs');

//this is to load the database by creating a new variable
const LoadDB = async ()=>{
  await ConnectDB();
}

LoadDB();

export async function GET(request){

  const blogId = request.nextUrl.searchParams.get("id");
  if(blogId){
    const blog = await BlogModel.findById(blogId);
    return NextResponse.json(blog);
  }else{
    const blogs = await BlogModel.find({});
    return NextResponse.json({blogs});
  }
}



//making a function for post request
export async function POST(request){
  //the data you will get is in request so make a new variable for it
  const formData = await request.formData();
  const timeStamp = Date.now();

  //here you are loading the image first from the request and storing it in the 
  const image = formData.get('image');
  const imageByteData = await image.arrayBuffer();
  const buffer = Buffer.from(imageByteData);
  //path to storing image
  const path = `./public/${timeStamp}_${image.name}`;
  await writeFile(path,buffer);
  const imgUrl = `/${timeStamp}_${image.name}`;
  //test the function

  //create a blogData
  const blogData = {
    title: `${formData.get('title')}`,
    description: `${formData.get('description')}`,
    categories: `${formData.get('categories')}`,
    author: `${formData.get('author')}`,
    image: `${imgUrl}`,
    authorImg: `${formData.get('authorImg')}`
  }

  //now use the blogdata and blogdata model to create the user in the database
  await BlogModel.create(blogData);

  console.log("Blog Saved!");

  return NextResponse.json({success:true, msg:"Blog Added"});
}

//Create API end point to delete
export async function DELETE(request){
  const id = await request.nextUrl.searchParams.get('id');
  const blog = await BlogModel.findById(id);
  fs.unlink(`./public${blog.image}`, ()=>{});
  await BlogModel.findByIdAndDelete(id);
  return NextResponse.json({msg:"Blog Deleted"});
}
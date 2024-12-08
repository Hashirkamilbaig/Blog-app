import { ConnectDB } from "@/lib/config/db";
import BlogModel from "@/lib/models/BlogModel";
import exp from "constants";
import { v2 as cloudinary } from 'cloudinary';
const { NextResponse } = require("next/server");
import {writeFile} from 'fs/promises'
const fs = require('fs');
import { Readable } from "stream";

//this is to load the database by creating a new variable
const LoadDB = async ()=>{
  await ConnectDB();
}

LoadDB();

cloudinary.config({
  cloud_name: "dyd0m2dgm",
  api_key: "897676226562867",
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

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
export async function POST(request) {
  try {
    const formData = await request.formData();

    // Retrieve the image from formData
    const image = formData.get("image");
    const buffer = Buffer.from(await image.arrayBuffer());

    // Convert buffer to stream
    const readableStream = new Readable();
    readableStream.push(buffer);
    readableStream.push(null);

    // Upload image to Cloudinary
    const uploadResult = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: "blog_images" },
        (error, result) => {
          if (error) reject(error);
          resolve(result);
        }
      );
      readableStream.pipe(uploadStream);
    });

    // Save other form data into database
    const blogData = {
      title: formData.get("title"),
      description: formData.get("description"),
      categories: formData.get("categories"),
      author: formData.get("author"),
      image: uploadResult.secure_url, // URL from Cloudinary
      authorImg: formData.get("authorImg"),
    };

    await BlogModel.create(blogData);
    return NextResponse.json({ success: true, msg: "Blog Added" });
  } catch (error) {
    console.error("Error uploading image or saving blog:", error);
    return NextResponse.json({ success: false, msg: "Blog upload failed" });
  }
}

//Create API end point to delete
export async function DELETE(request){
  const id = await request.nextUrl.searchParams.get('id');
  const blog = await BlogModel.findById(id);
  fs.unlink(`./public${blog.image}`, ()=>{});
  await BlogModel.findByIdAndDelete(id);
  return NextResponse.json({msg:"Blog Deleted"});
}
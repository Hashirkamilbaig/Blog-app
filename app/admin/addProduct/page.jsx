'use client'
import { assets } from '@/assets/assets'
import axios from 'axios'
import Image from 'next/image'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

const Page = () => {
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    title:"",
    description:"",
    categories:"",
    author:"Hashir",
    authorImg: "/author_img.png"
  })

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data=>({...data,[name]:value}));
    console.log(data);
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault();
  
    if (!image) {
      toast.error("Please upload an image.");
      return;
    }
  
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("categories", data.categories);
    formData.append("author", data.author);
    formData.append("authorImg", data.authorImg);
    formData.append("image", image); // Ensure this is a valid File object
  
    try {
      const response = await axios.post("/api/blog", formData);
  
      if (response.data.success) {
        toast.success(response.data.msg);
        setImage(false);
        setData({
          title: "",
          description: "",
          categories: "",
          author: "Hashir",
          authorImg: "/author_img.png",
        });
      } else {
        toast.error("Error uploading blog.");
      }
    } catch (error) {
      toast.error("An error occurred.");
      console.error(error);
    }
  };
  

  return (
    <>
      <form onSubmit={onSubmitHandler} className='pt-5 px-5 sm:pt-12 sm:pl-16'>
        <p className='text-xl'>Upload thumbnail</p>
        <label htmlFor="image">
          <Image src={!image?assets.upload_area :URL.createObjectURL(image)} width={140} height={70} alt='' className='mt-4 cursor-pointer'/>
        </label>
        <input type='file' id='image' hidden required onChange={(e)=>setImage(e.target.files[0])}></input>
        <p className='text-xl mt-4'>Blog Title</p>
        <input name='title' onChange={onChangeHandler} value={data.title} type="text" placeholder='Enter Title' required  className='w-full sm:w-[500px] mt-4 px-4 py-3 border'/>
        <p className='text-xl mt-4'>Blog Description</p>
        <textarea name='description' onChange={onChangeHandler} value={data.description} type="text" placeholder='Enter Description Here' rows={6} required  className='w-full sm:w-[500px] mt-4 px-4 py-3 border'/>
        <p className='text-xl mt-4'>Categories</p>
        <select onChange={onChangeHandler} value={data.categories} name="categories" className='w-40 mt-4 px-4 py-3 border text-gray-500'>
        <option value="Select Category">SelectCategory</option>
          <option value="Startup">Startup</option>
          <option value="Technology">Technology</option>
          <option value="Lifestyle">Lifestyle</option>
        </select>
        <br />
        <button type="submit" className='mt-8 w-40 h-12 bg-black text-white'>Add</button>
      </form>
    </>
  )
}

export default Page
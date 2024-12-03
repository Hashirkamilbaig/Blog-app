"use client"
import BlogList from "@/components/BlogList";
import Footer from "@/components/Footer";
import Headers from "@/components/Headers";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  return (
    <>
      <ToastContainer theme="dark"/>
      <Headers />
      <BlogList />
      <Footer />
    </>
  );
}

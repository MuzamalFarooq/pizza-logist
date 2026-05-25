"use client"
import React, { useState } from 'react'
import { ToastContainer, toast, Bounce } from 'react-toastify'

const contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        store: '',
        subject: '',
        orderMethod: '',
        date: '',
        description: ''
    })
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            })

            const data = await res.json()

            if (res.ok) {
                toast.success('✅ Message sent successfully!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "light",
                    transition: Bounce,
                })
                // Reset form
                setFormData({
                    name: '',
                    phone: '',
                    email: '',
                    store: '',
                    subject: '',
                    orderMethod: '',
                    date: '',
                    description: ''
                })
            } else {
                toast.error(data.error || 'Failed to send message!', {
                    position: "top-right",
                    autoClose: 3000,
                    theme: "light",
                    transition: Bounce,
                })
            }
        } catch (error) {
            toast.error('Network error. Please try again!', {
                position: "top-right",
                autoClose: 3000,
                theme: "light",
                transition: Bounce,
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-linear-to-b from-white to-gray-50 py-16 px-4 sm:px-6 lg:px-8">
            <ToastContainer />
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-6">Contact Us</h1>
                    <p className="text-xl text-gray-600">We'd love to hear from you. Get in touch with us today.</p>
                </div>

                {/* Main Content - Two Column Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Left - Contact Form (2 columns) */}
                    <div className="lg:col-span-2">
                        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
                            <h2 className="text-3xl font-bold text-gray-900 mb-10">Send us a Message</h2>

                            {/* Name and Phone Row */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                <div>
                                    <label className='block font-bold text-gray-700 mb-3 text-lg'>Full Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-red-500 transition-colors text-base"
                                        placeholder="Your Name"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className='block font-bold text-gray-700 mb-3 text-lg'>Phone Number</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-red-500 transition-colors text-base"
                                        placeholder="+92 300 0000000"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Email and Store Row */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                <div>
                                    <label className='block font-bold text-gray-700 mb-3 text-lg'>Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-red-500 transition-colors text-base"
                                        placeholder="your@email.com"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className='block font-bold text-gray-700 mb-3 text-lg'>Select Store</label>
                                    <select
                                        name="store"
                                        value={formData.store}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-red-500 transition-colors text-base"
                                    >
                                        <option value="">Choose a store...</option>
                                        <option value="lahore">Lahore</option>
                                        <option value="islamabad">Islamabad</option>
                                        <option value="karachi">Karachi</option>
                                        <option value="multan">Multan</option>
                                    </select>
                                </div>
                            </div>

                            {/* Subject and Order Method Row */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                <div>
                                    <label className='block font-bold text-gray-700 mb-3 text-lg'>Subject</label>
                                    <input
                                        type="text"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-red-500 transition-colors text-base"
                                        placeholder="What is this about?"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className='block font-bold text-gray-700 mb-3 text-lg'>How did you order?</label>
                                    <select
                                        name="orderMethod"
                                        value={formData.orderMethod}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-red-500 transition-colors text-base"
                                    >
                                        <option value="">Select method...</option>
                                        <option value="phone">Phone</option>
                                        <option value="online">Online</option>
                                        <option value="instore">In Store</option>
                                        <option value="app">Mobile App</option>
                                    </select>
                                </div>
                            </div>

                            {/* Date Row */}
                            <div className="mb-8">
                                <label className='block font-bold text-gray-700 mb-3 text-lg'>Date</label>
                                <input
                                    type="date"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-red-500 transition-colors text-base"
                                />
                            </div>

                            {/* Description */}
                            <div className="mb-10">
                                <label className='block font-bold text-gray-700 mb-3 text-lg'>Message</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    className="w-full px-4 py-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-red-500 transition-colors text-base resize-none"
                                    placeholder="Tell us in detail..."
                                    rows="6"
                                    required
                                ></textarea>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className='w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl text-lg disabled:opacity-50 disabled:cursor-not-allowed'
                            >
                                {loading ? "Sending..." : "Send Message"}
                            </button>
                        </form>
                    </div>

                    {/* Right - Contact Info */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-2xl p-8 h-full">
                            <h2 className="text-3xl font-bold text-gray-900 mb-10">Get in Touch</h2>

                            {/* Email */}
                            <div className="mb-10 pb-10 border-b-2 border-gray-200">
                                <div className='font-bold text-gray-500 uppercase tracking-wide text-sm mb-3'>Email</div>
                                <div className='text-2xl font-bold text-red-600'>
                                    <a href="mailto:Muzjani327@gmail.com" className="hover:text-red-700 transition-colors">
                                        Muzjani327@gmail.com
                                    </a>
                                </div>
                            </div>

                            {/* Phone */}
                            <div className="mb-10 pb-10 border-b-2 border-gray-200">
                                <div className='font-bold text-gray-500 uppercase tracking-wide text-sm mb-3'>Phone</div>
                                <div className='text-2xl font-bold text-red-600'>
                                    <a href="tel:+923117473427" className="hover:text-red-700 transition-colors">
                                        +92 311 7473427
                                    </a>
                                </div>
                            </div>

                            {/* Address */}
                            <div>
                                <div className='font-bold text-gray-500 uppercase tracking-wide text-sm mb-3'>Address</div>
                                <div className='text-lg font-semibold text-gray-700 leading-relaxed'>
                                    Al-Farooq Developers,<br />
                                    Street-05, Model Town A,<br />
                                    Lahore, Pakistan
                                </div>
                            </div>

                            {/* Quick Stats */}
                            <div className="mt-12 pt-10 border-t-2 border-gray-200">
                                <div className="text-sm text-gray-600 leading-relaxed">
                                    <p className="mb-3">
                                        <span className="font-bold text-gray-900">Response Time:</span> Within 24 hours
                                    </p>
                                    <p>
                                        <span className="font-bold text-gray-900">Available:</span> Mon - Sun, 9 AM - 5 PM
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default contact

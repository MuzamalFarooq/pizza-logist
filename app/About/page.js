"use client"
import React from 'react'
import Image from 'next/image'

const About = () => {
  return (
    <div className="min-h-screen bg-linear-to-b from-white to-gray-50 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-20">
          <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-6">About Us</h1>
          <p className="text-xl md:text-2xl text-gray-600 font-light">Crafting Quality Pizza Since 2015</p>
        </div>

        {/* Main Content - Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">
          {/* Left Box - Image */}
          <div className="flex justify-center items-center">
            <div className="w-full max-w-md aspect-square bg-white rounded-2xl shadow-2xl overflow-hidden">
              <Image
                src="/founder.jpeg"
                alt="Muzamal Farooq - Founder"
                width={500}
                height={500}
                className="w-full h-full object-cover"
                priority
              />
            </div>
          </div>

          {/* Right Box - About Details */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-16 h-full flex flex-col justify-center">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
              Muzamal Farooq
            </h2>
            <p className="text-gray-500 text-lg font-semibold mb-8 uppercase tracking-wide">Founder & Visionary</p>

            <div className="space-y-8 text-gray-700 leading-relaxed">
              <p className="text-base md:text-lg">
                Welcome to our pizza family. Since 2015, we have been committed to delivering the finest quality pizzas with authentic flavors and innovative recipes to pizza enthusiasts across Pakistan.
              </p>

              <div className="border-l-4 border-red-500 pl-8 py-6 bg-gray-50 rounded-lg">
                <p className="font-bold text-gray-900 mb-3 text-lg">Our Growth & Success</p>
                <p className="text-base md:text-lg">
                  What started as a dream has blossomed into a nationwide success story. Today, we proudly operate <span className="font-bold text-red-600 text-xl">34 branches</span> across Pakistan, serving millions of delighted customers who trust us for exceptional taste and quality.
                </p>
              </div>

              <p className="text-base md:text-lg">
                Our mission is to provide premium quality pizzas crafted with the finest ingredients, traditional techniques, and modern innovation. Every branch reflects our commitment to excellence and customer satisfaction.
              </p>

              <div className="grid grid-cols-2 gap-6 py-8">
                <div className="bg-red-50 p-6 md:p-8 rounded-lg text-center border-2 border-red-100">
                  <p className="text-4xl md:text-5xl font-bold text-red-600 mb-2">2015</p>
                  <p className="text-sm md:text-base text-gray-600 font-semibold">Founded</p>
                </div>
                <div className="bg-red-50 p-6 md:p-8 rounded-lg text-center border-2 border-red-100">
                  <p className="text-4xl md:text-5xl font-bold text-red-600 mb-2">34+</p>
                  <p className="text-sm md:text-base text-gray-600 font-semibold">Branches</p>
                </div>
              </div>
            </div>

            <button className="mt-10 w-full md:w-auto bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-12 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl text-lg">
              Visit Our Location
            </button>
          </div>
        </div>

        {/* Bottom Section - Core Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl shadow-lg p-10 h-full text-center hover:shadow-2xl transition-shadow duration-300">
            <div className="text-6xl mb-6">🍕</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Quality First</h3>
            <p className="text-gray-600 text-base leading-relaxed">Premium ingredients and authentic recipes for exceptional taste</p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-10 h-full text-center hover:shadow-2xl transition-shadow duration-300">
            <div className="text-6xl mb-6">👥</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Customer Focused</h3>
            <p className="text-gray-600 text-base leading-relaxed">Dedicated service and satisfaction in every order</p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-10 h-full text-center hover:shadow-2xl transition-shadow duration-300">
            <div className="text-6xl mb-6">🚀</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Innovation</h3>
            <p className="text-gray-600 text-base leading-relaxed">Continuously evolving our menu and services</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About

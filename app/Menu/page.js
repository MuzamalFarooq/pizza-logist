"use client"
import React from 'react'
import { useCart } from '@/context/CartContext';

const Menu = () => {

    const { addToCart } = useCart();

    const handleAddToCart = (name, price) => {
        const item = { id: Date.now(), name, price };
        addToCart(item);
    };

    return (
        <>

            <div className="font-bold text-4xl justify-start  "  > Best Deals

            </div>

            <div className="first flex  justify-center rounded-xl  m-0 p-3 w-full">

                <div className="box rounded-lg border bg-white border-black m-4 w-72 h-96 overflow-hidden flex flex-col" style={{ width: '18rem', height: '24rem' }}>
                    <img className="w-full h-1/2 object-cover transform transition-transform duration-300 hover:scale-110"
                        src="Deal 2 image.webp" alt="Delicious Pepperoni Pizza" />
                    <div className="h-1/2 flex flex-col items-center gap-2   p-3 text-center">
                        <h1 className="w-full font-semibold text-md whitespace-nowrap  text-black" style={{ height: '1.5em', width: '100%' }}>DEAL FOR 2</h1>
                        <span className=' text-black'>PKR 2599.00</span>
                        <p className="text-black text-sm leading-tight">1 Medium Pizza(Classic)2pcs Garlic Bread + 2 Small Drink</p>
                        <button onClick={() => handleAddToCart('DEAL FOR 2', 2599.00)}
                            className="add-to-cart border border-black rounded-xl bg-red-500 hover:bg-red-600  px-3 py-1 mt-3 ">Add
                            to chart</button>
                    </div>
                </div>

                <div className="box rounded-lg border border-black bg-white m-4 w-72 h-96 overflow-hidden flex flex-col" style={{ width: '18rem', height: '24rem' }}>
                    <img className="w-full h-1/2 object-cover transform transition-transform duration-300 hover:scale-110"
                        src="Deal 2 image.webp" alt="Pizza"></img>
                    <div className="h-1/2 flex flex-col items-center gap-2 p-3 text-center">

                        <h1 className=" text-black " >DEAL FOR 3</h1>
                        <span className=' text-black'>1899.00</span>
                        <p className="text-black text-sm leading-tight">1 Lrg Pizza (Classic)+ 8pcs Wings +1Lrg Drink</p>
                        <button onClick={() => handleAddToCart('DEAL FOR 3', 1899.00)}
                            className="add-to-cart border border-black rounded-xl bg-red-500 hover:bg-red-600  px-3 py-1 mt-3  ">Add
                            to chart</button>
                    </div>
                </div>

                <div className="box rounded-lg border border-black bg-white m-4 w-72 h-96 overflow-hidden flex flex-col" style={{ width: '18rem', height: '24rem' }}>
                    <img className="w-full h-1/2 object-cover transform transition-transform duration-300 hover:scale-110"
                        src="Deal 2 image.webp" alt="Pizza"></img>

                    <div className="h-1/2 flex flex-col items-center gap-2 p-3 text-center">

                        <h1 className="w-full font-bold text-lg whitespace-nowrap  text-black" style={{ height: '1.5em', width: '100%' }}>Family Deal</h1>
                        <span className=' text-black'>PKR 3999.00</span>

                        <p className="text-black text-sm leading-tight">2 Medium Pizza (Classic) +4 pcs Garlic Bread+1 Lrg Drink</p>
                        <button onClick={() => handleAddToCart('Family Deal', 3999.00)}
                            className="add-to-cart border border-black rounded-xl bg-red-500 hover:bg-red-600  px-3 py-1 mt-3 ">Add
                            to chart</button>
                    </div>
                </div>


                <div className="box  rounded-lg border border-black bg-white m-4 w-72 h-96 overflow-hidden flex flex-col" style={{ width: '18rem', height: '24rem' }}>
                    <img className="w-full h-1/2 object-cover transform transition-transform duration-300 hover:scale-110"
                        src="Deal 2 image.webp" alt="Pizza"></img>
                    <div className="h-1/2 flex flex-col items-center gap-2 p-3 text-center">
                        <h1 className="w-full font-bold text-lg whitespace-nowrap  text-black" style={{ height: '1.5em', width: '100%' }}>FAMILY DEAL LARGE</h1>
                        <span className=' text-black'>PKR 4999.00</span>
                        <p className="text-black text-sm leading-tight">2 Lrg Pizza ( Classic)+6pcs Garlic Bread +1 Lrg Drink</p>
                        <button onClick={() => handleAddToCart('FAMILY DEAL LARGE', 4999.00)}
                            className="add-to-cart border border-black rounded-xl bg-red-500 hover:bg-red-600 px-3 py-1 mt-3  text-black ">Add
                            to chart</button>
                    </div>
                </div>


            </div>


            <div className="font-bold text-4xl text-black ">
                Explore Deals

            </div>

            <div className="first  p-4 m-3  w-full">


                <div className="flex ">
                    <div className="dealbox rounded-lg border border-black m-4 w-64 h-64 overflow-hidden flex flex-col">
                        <img className="w-full flex-1 object-cover transform transition-transform duration-300 hover:scale-110"
                            src="ramdan deal 1.webp" alt="deal"></img>
                        <button onClick={() => handleAddToCart("Ramdan Deal", 3900)}
                            className="w-full mt-auto font-bold text-xl hover:bg-red-500 transition-colors duration-300 p-2 bg-white  text-black">Ramdan
                            Deal</button>
                    </div>

                    <div className="dealbox rounded-lg border border-black m-4 w-64 h-64 overflow-hidden flex flex-col">
                        <img className="w-full flex-1 object-cover transform transition-transform duration-300 hover:scale-110"
                            src="jazz deal.webp" alt="deal"></img>
                        <button onClick={() => handleAddToCart('Jazz Deal', 2299.00)}
                            className="w-full mt-auto font-bold text-xl hover:bg-red-500 transition-colors duration-300 p-2 bg-white  text-black">Jazz
                            Deal</button>
                    </div>

                    <div className="dealbox rounded-lg border border-black m-4 w-64 h-64 overflow-hidden flex flex-col">
                        <img className="w-full flex-1 object-cover transform transition-transform duration-300 hover:scale-110"
                            src="midnight deal.webp" alt="deal"></img>
                        <button onClick={() => handleAddToCart('Midnight Deal', 4999.00)}
                            className="w-full mt-auto font-bold text-xl hover:bg-red-500 transition-colors duration-300 p-2 bg-white  text-black">Midnight
                            Deal</button>
                    </div>

                    <div className="dealbox  rounded-lg border border-black m-4 w-64 h-64 overflow-hidden flex flex-col">
                        <img className="w-full flex-1 object-cover transform transition-transform duration-300 hover:scale-110"
                            src="hut deal.webp" alt="deal"></img>
                        <button onClick={() => handleAddToCart('Hut Deal', 2999.00)}
                            className="w-full mt-auto font-bold text-xl hover:bg-red-500 transition-colors duration-300 p-2 bg-white  text-black">Hut
                            Deal</button>
                    </div>


                </div>

            </div>


            <div className="font-bold text-4xl text-black ">
                Best Seller
            </div>
            <div className="bestseller ">
                <div className="flex products  justify-center p-4 m-3  w-full">
                    <div className="sellerbox  bg-gray-100 m-4 w-72 h-112 overflow-hidden flex flex-col p-3 gap-2">
                        <img className="w-full h-44 object-cover transform transition-transform duration-300 hover:scale-110"
                            src="Chicken Fagita.webp" alt="fijita"></img>
                        <h1 className="font-bold text-lg leading-tight  text-black">Chicken Fagita</h1>
                        <p className="text-black font-semibold">price: 2299.00</p>
                        <p className="text-black text-sm leading-5 flex-1 overflow-hidden ">One of over classic,the Chicken Fagita pizza is
                            made with spicy Chicken fagita and green...</p>

                        <button onClick={() => handleAddToCart('Chicken Fagita', 2299.00)}
                            className="add-to-cart w-full mt-auto font-bold text-xl bg-[rgb(199,16,46)] hover:bg-[rgb(199,16,46)]  py-2">Add</button>

                    </div>

                    <div className="sellerbox bg-gray-100  m-4 w-72 h-112 overflow-hidden flex flex-col p-3 gap-2">
                        <img className="w-full h-44 object-cover transform transition-transform duration-300 hover:scale-110"
                            src="Spicy Chicken Ranch.webp" alt="fijita"></img>
                        <h1 className="font-bold text-lg leading-tight  text-black">Spicy Chicken Ranch</h1>
                        <span className="font-semibold  text-black">2199.00</span>
                        <p className="text-black  text-sm leading-5 flex-1 overflow-hidden">Spicy Chicken Ranch Pizza features tender,spicy
                            chicken fajita paired with a....</p>

                        <button onClick={() => handleAddToCart('Spicy Chicken Ranch', 2199.00)}
                            className="add-to-cart w-full mt-auto font-bold text-xl bg-[rgb(199,16,46)] hover:bg-[rgb(199,16,46)]  py-2">Add</button>

                    </div>

                    <div className="sellerbox bg-gray-100  m-4 w-72 h-112 overflow-hidden flex flex-col p-3 gap-2">

                        <img className="w-full h-44 object-cover transform transition-transform duration-300 hover:scale-110"
                            src="very veggie.webp" alt="fijita"></img>
                        <h1 className="font-bold text-lg leading-tight  text-black">Very Veggie</h1>
                        <span className="font-semibold  text-black">1999.00</span>
                        <p className="text-black  text-sm leading-5 flex-1 overflow-hidden">Spicy Chicken Ranch Pizza features tender,spicy
                            chicken fajita paired with a....</p>

                        <button onClick={() => handleAddToCart('Very Veggie', 1999.00)}
                            className="add-to-cart w-full mt-auto font-bold text-xl bg-[rgb(199,16,46)] hover:bg-[rgb(199,16,46)] py-2">Add</button>

                    </div>

                    <div className="sellerbox bg-gray-100  m-4 w-72 h-112 overflow-hidden flex flex-col p-3 gap-2">
                        <img className="w-full h-44 object-cover transform transition-transform duration-300 hover:scale-110"
                            src="Chicken Fagita.webp" alt="fijita"></img>
                        <h1 className="font-bold text-lg text-black leading-tight">Chicken Fagita</h1>
                        <span className="font-semibold  text-black">1999.00</span>
                        <p className="text-black text-sm leading-5 flex-1 overflow-hidden">Spicy Chicken Ranch Pizza features tender,spicy
                            chicken fajita paired with a....</p>

                        <button onClick={() => handleAddToCart('Chicken Fagita', 1999.00)}
                            className="add-to-cart w-full mt-auto font-bold text-xl bg-[rgb(199,16,46)] hover:bg-[rgb(199,16,46)]  py-2">Add</button>

                    </div>
                </div>

            </div>

            <div className="first m-0 p-3  w-full">
                <div className="font-bold text-4xl text-black">
                    Discount Deals

                </div>

                <div className="discountdeals flex">
                    <div className="Dealbox rounded-lg bg-gray-100  m-4 w-72 h-112 overflow-hidden flex flex-col p-3 gap-2">

                        <img className="w-full h-44 object-cover transform transition-transform duration-300 hover:scale-110"
                            src="appetizer platter.webp" alt="fijita"></img>
                        <h1 className="font-bold text-lg leading-tight">Appetizer Platter</h1>
                        <span className="font-semibold"><del>PkR 3000</del> PKR 1999.00</span>
                        <p className="text-sm leading-5 flex-1 overflow-hidden">12 Wedges, 6 Chicken Wings, 4 Bihari Spin Rolls,
                            1 Dip</p>

                        <button onClick={() => handleAddToCart('Appetizer Platter', 1999.00)}
                            className="add-to-cart w-full mt-auto font-bold text-xl bg-[rgb(199,16,46)] hover:bg-[rgb(199,16,46)] py-2">Add</button>

                    </div>

                    <div className="Dealbox rounded-lg bg-gray-100  m-4 w-72 h-112 overflow-hidden flex flex-col p-3 gap-2">

                        <img className="w-full h-44 object-cover transform transition-transform duration-300 hover:scale-110"
                            src="bihari chicken spin rool.webp" alt="fijita"></img>
                        <h1 className="font-bold text-lg leading-tight">Bihari Chicken spin Rool</h1>
                        <span className="font-semibold"><del>PkR 2500</del> 1999.00</span>
                        <p className="text-black  text-sm leading-5 flex-1 overflow-hidden">Bihari Chicken Spin Rolls 2pcs</p>

                        <button onClick={() => handleAddToCart('Bihari Chicken spin Rool', 1999.00)}
                            className="add-to-cart w-full mt-auto font-bold text-xl bg-[rgb(199,16,46)] hover:bg-[rgb(199,16,46)] py-2">Add</button>

                    </div>

                    <div className="Dealbox rounded-lg bg-gray-100 m-4 w-72 h-112 overflow-hidden flex flex-col p-3 gap-2">

                        <img className="w-full h-44 object-cover transform transition-transform duration-300 hover:scale-110"
                            src="wings.webp" alt="fijita"></img>
                        <h1 className="font-bold text-lg leading-tight">Dynamite wings</h1>
                        <span className="font-semibold"><del>PkR 2700</del> 1999.00</span>
                        <p className="text-black  text-sm leading-5 flex-1 overflow-hidden">Zesty dynamite sauce at the bottom and top</p>

                        <button onClick={() => handleAddToCart('Dynamite wings', 1999.00)}
                            className="add-to-cart w-full mt-auto font-bold text-xl bg-[rgb(199,16,46)] hover:bg-[rgb(199,16,46)]  py-2">Add</button>

                    </div>

                    <div className="Dealbox rounded-lg bg-gray-100  m-4 w-72 h-112 overflow-hidden flex flex-col p-3 gap-2">

                        <img className="w-full h-44 object-cover transform transition-transform duration-300 hover:scale-110"
                            src="patato wedges.webp" alt="fijita"></img>
                        <h1 className="font-bold text-lg  ">Patato Wedges</h1>
                        <span className="font-semibold"><del>PkR 1700</del> 999.00</span>
                        <p className="text-black  text-sm leading-5 flex-1 overflow-hidden">Patato wedges</p>

                        <button onClick={() => handleAddToCart('Patato Wedges', 999.00)}
                            className="add-to-cart  w-full mt-auto font-bold text-xl bg-[rgb(199,16,46)] hover:bg-[rgb(199,16,46)] py-2 hover:scal-105 transition duration-105  ease-in-out ">Add</button>

                    </div>
                </div>

            </div>


            <div className="font-bold text-4xl text-black">
                Drinks
            </div>

            <section id="drinks" className="drinks flex">
                <div className="Dealbox rounded-lg bg-gray-100  m-4 w-72 h-112 overflow-hidden flex flex-col p-3 gap-2">

                    <img className="w-full h-44 object-cover transform transition-transform duration-300 hover:scale-110"
                        src="water bottel.webp" alt="fijita"></img>
                    <h1 className="font-bold text-lg leading-tight">AquaFina</h1>
                    <span className="font-semibold"><del>PkR 300</del> PKR 150</span>
                    <p className="text-sm leading-5 flex-1 overflow-hidden">Aquafina bottle </p>

                    <button onClick={() => handleAddToCart('AquaFina', 150.00)}
                        className="add-to-cart w-full mt-auto font-bold text-xl bg-[rgb(199,16,46)] hover:bg-[rgb(199,16,46)] py-2">Add</button>

                </div>

                <div className="Dealbox rounded-lg bg-gray-100  m-4 w-72 h-112 overflow-hidden flex flex-col p-3 gap-2">

                    <img className="w-full h-44 object-cover transform transition-transform duration-300 hover:scale-110"
                        src="pepsi bottle.webp" alt="fijita"></img>
                    <h1 className="font-bold text-lg leading-tight">PEPSI</h1>
                    <span className="font-semibold"><del>PkR 150</del> 99.00</span>
                    <p className="text-black  text-sm leading-5 flex-1 overflow-hidden">Pepsi bottle</p>

                    <button onClick={() => handleAddToCart('PEPSI', 99.00)}
                        className="add-to-cart w-full mt-auto font-bold text-xl bg-[rgb(199,16,46)] hover:bg-[rgb(199,16,46)] py-2">Add</button>

                </div>

                <div className="Dealbox rounded-lg bg-gray-100 m-4 w-72 h-112 overflow-hidden flex flex-col p-3 gap-2">

                    <img className="w-full h-44 object-cover transform transition-transform duration-300 hover:scale-110"
                        src="7up bottle.webp" alt="fijita"></img>
                    <h1 className="font-bold text-lg leading-tight">7 UP</h1>
                    <span className="font-semibold"><del>PkR 150</del> 99.00</span>
                    <p className="text-black  text-sm leading-5 flex-1 overflow-hidden">7up bottle</p>

                    <button onClick={() => handleAddToCart('7 UP', 99.00)}
                        className="add-to-cart w-full mt-auto font-bold text-xl bg-[rgb(199,16,46)] hover:bg-[rgb(199,16,46)]  py-2">Add</button>

                </div>

                <div className="Dealbox rounded-lg bg-gray-100  m-4 w-72 h-112 overflow-hidden flex flex-col p-3 gap-2">

                    <img className="w-full h-44 object-cover transform transition-transform duration-300 hover:scale-110"
                        src="Mirinda bottle.webp" alt="fijita"></img>
                    <h1 className="font-bold text-lg  ">Marinda</h1>
                    <span className="font-semibold"><del>PkR 150</del> 99.00</span>
                    <p className="text-black  text-sm leading-5 flex-1 overflow-hidden">Marinda bottle  </p>

                    <button onClick={() => handleAddToCart('Mirinda', 99.00)}
                        className="add-to-cart  w-full mt-auto font-bold text-xl bg-[rgb(199,16,46)] hover:bg-[rgb(199,16,46)] py-2 hover:scal-105 transition duration-105  ease-in-out ">Add</button>

                </div>
            </section>



        </>
    )
}

export default Menu
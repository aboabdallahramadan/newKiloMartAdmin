"use client";
import React, { useState } from 'react'
import ClickOutside from '../ClickOutside';
import ButtonDefault from '../Buttons/ButtonDefault';
import InputGroup from '../FormElements/InputGroup';
import { FaPlus } from 'react-icons/fa';

const AddNewDelivery = () => {
    const [isModalOpen,setIsModalOpen] = useState(false);
    const handleOpenModal = () => {
        setIsModalOpen(true);
      };
    
      const handleCloseModal = () => {
        setIsModalOpen(false);
      };
    
    
    return (
    <>
    
    <ButtonDefault
        label="Add New Delivery"
        link="#"
        customClasses="bg-dark rounded-full text-white py-[11px] px-6"
        click = {() => handleOpenModal()}
    >
        <FaPlus />
    </ButtonDefault>
    

    {isModalOpen && (
          <div className="fixed inset-0 z-[999] bg-black bg-opacity-50 flex justify-center items-center">
            <ClickOutside onClick={handleCloseModal}>
                <div className="w-full rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
                    <div className="border-b border-stroke px-6.5 py-4 dark:border-dark-3">
                        <h3 className="font-semibold text-dark dark:text-white">
                            Add New Delivery
                        </h3>
                    </div>
                    <form action="#">
                        <div className="p-6.5">
                            <InputGroup
                            label="Name"
                            type="text"
                            placeholder="Enter full name"
                            customClasses="mb-4.5"
                            />

                            <InputGroup
                            label="Phone"
                            type="phone"
                            placeholder="Enter phone number"
                            customClasses="mb-4.5"
                            />

                            <InputGroup
                            label="Password"
                            type="password"
                            placeholder="Enter password"
                            customClasses="mb-4.5"
                            />

                            <InputGroup
                            label="Re-type Password"
                            type="password"
                            placeholder="Re-enter"
                            customClasses="mb-5.5"
                            />
                            <div className='grid gap-2 grid-cols-3'>
                                <button className="col-span-2 flex justify-center rounded-[7px] bg-primary p-[13px] font-medium text-white hover:bg-opacity-90">
                                    Add Delivery
                                </button>
                                <button onClick={handleCloseModal} className="col-span-1 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition duration-300">
                                    Close
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
                
            </ClickOutside>
          </div>
        )}
    </>
  )
}

export default AddNewDelivery
"use client";
import React, { useState } from 'react';
import { toast } from 'react-toastify';

interface EditCategoryModalProps {
  languageId: number;
  categoryId: number;
  onClose: () => void;
}

const EditCategoryModal: React.FC<EditCategoryModalProps> = ({
  languageId,
  categoryId,
  onClose,
}) => {
  const [name, setName] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch(
        `/backend/api/admin/product-categories/localized/${categoryId}/${languageId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name }),
        }
      );

      if (response.ok) {
        toast.success('Category updated successfully');
        onClose();
      } else {
        console.error('Error: Failed to update category');
        toast.error('Failed to update category');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to update category');
    }
    
    setIsSubmitting(false);
  };

  return (
    <div className="fixed inset-0 z-[999999] flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md rounded-md bg-white p-6 shadow-lg dark:bg-gray-800">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-dark dark:text-white">
            Edit Category
          </h2>
          <button onClick={onClose} className="text-2xl font-bold text-gray-500 hover:text-gray-900">
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="categoryName" className="mb-1 block text-sm font-medium text-dark dark:text-white">
              Category Name
            </label>
            <input
              id="categoryName"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Enter category name"
              className="w-full rounded border border-stroke bg-transparent px-3 py-2 text-dark outline-none transition focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white"
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded bg-primary py-2 text-white transition hover:bg-primary-dark"
          >
            {isSubmitting ? 'Saving...' : 'Save'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditCategoryModal;

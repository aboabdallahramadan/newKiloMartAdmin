"use client";
import React, { useState } from 'react';

interface ReviewProfileModalProps {
  onConfirm: (description: string) => void;
  onCancel: () => void;
}

const ReviewProfileModal: React.FC<ReviewProfileModalProps> = ({ onConfirm, onCancel }) => {
  const [reviewDescription, setReviewDescription] = useState('');

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md rounded-[10px] bg-white p-6 shadow-1 dark:bg-gray-dark">
        <h3 className="mb-4 text-xl font-bold text-dark dark:text-white">
          Review Profile
        </h3>
        
        <textarea
          className="mb-4 w-full rounded-lg border border-stroke bg-transparent p-4 text-dark outline-none focus:border-primary dark:border-dark-3 dark:text-white"
          rows={4}
          placeholder="Enter review description"
          value={reviewDescription}
          onChange={(e) => setReviewDescription(e.target.value)}
        />

        <div className="flex justify-end gap-4">
          <button
            className="rounded-lg border border-stroke px-6 py-2 text-dark hover:bg-gray-2 dark:border-dark-3 dark:text-white dark:hover:bg-dark-2"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="rounded-lg bg-primary px-6 py-2 text-white hover:bg-primary/90"
            onClick={() => onConfirm(reviewDescription)}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewProfileModal;

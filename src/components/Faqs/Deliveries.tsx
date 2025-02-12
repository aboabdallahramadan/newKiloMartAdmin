"use client";
import React, { useState, useEffect } from 'react';
import { Faq } from '@/types/faq';
import InputGroup from '@/components/FormElements/InputGroup';
import CloseMark from '@/components/CloseMarks/CloseMark';
import { TbEditCircleOff } from 'react-icons/tb';
import ClickOutside from '../ClickOutside';
import ElementLoader from '../common/ElementLoader';
import { toast } from 'react-toastify';

const Deliveries: React.FC = () => {
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState({ question: '', answer: '' });
  const [language, setLanguage] = useState(2);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false)

  // New state for creating FAQ
  const [isCreating, setIsCreating] = useState(false);
  const [newFaqForm, setNewFaqForm] = useState({ question: '', answer: '' });
  const faqType = 3;

  const handleEdit = (faq: Faq) => {
    setEditingId(faq.id);
    setEditForm({ question: faq.question, answer: faq.answer });
  };

  const fetchFaqs = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/backend/api/faq/all/list?type=3&language=${language}`);
      const data = await response.json();
      if (data.status) {
        setFaqs(data.data.faqs);
      } else {
        console.error("Failed to fetch products:", data.message);
      }
    } catch (error) {
      console.error("An error occurred while fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFaqs();
  }, [language]);

  const handleLanguageSelect = (option: number) => {
    setLanguage(option);
    setIsLanguageOpen(false);
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`/backend/api/faq/admin/delete/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (response.ok && data.status) {
        setFaqs(faqs.filter(faq => faq.id !== id));
      } else {
        console.error("Failed to delete product:", data.message);
      }
    } catch (error) {
      console.error("An error occurred while deleting the product:", error);
    }
  };

  const handleSaveEdit = async (faq: Faq) => {
    try {
      setIsSubmitting(true);
      const response = await fetch(`/backend/api/faq/admin/edit/${faq.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: editForm.question,
          answer: editForm.answer,
          language: language,
          type: faq.type,
        }),
      });
      const data = await response.json();
      if (response.ok && data.status) {
        setFaqs(
          faqs.map((faqq) =>
            faqq.id === faq.id
              ? { ...faqq, question: editForm.question, answer: editForm.answer }
              : faqq
          )
        );
        setEditingId(null);
        toast.success("FAQ updated successfully!");
      } else {
        console.error("Failed to edit FAQ:", data.message);
        toast.error("Failed to update FAQ. Please try again.");
      }
    } catch (error) {
      console.error("Error updating FAQ:", error);
      toast.error("Failed to update FAQ. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCreateFaq = async () => {
    try {
      setIsSubmitting(true);
      const response = await fetch(`/backend/api/faq/admin/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: newFaqForm.question,
          answer: newFaqForm.answer,
          language: language,
          type: faqType,
        }),
      });
      const data = await response.json();
      if (response.ok && data.status) {
        fetchFaqs();
        setNewFaqForm({ question: '', answer: '' });
        setIsCreating(false);
        toast.success('FAQ created successfully!');
      } else {
        console.error("Failed to create FAQ:", data.message);
        toast.error('Failed to create FAQ. Please try again.');
      }
    } catch (error) {
      console.error("Error creating FAQ:", error);
      toast.error('Failed to create FAQ. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="rounded-sm bg-white dark:bg-dark p-4 shadow-default">
      <h2 className="text-2xl font-bold text-dark dark:text-white mb-6">Frequently Asked Questions For All Users</h2>      
      <ClickOutside onClick={() => setIsLanguageOpen(false)}>
        <div className="relative z-20 inline-flex cursor-pointer appearance-none rounded-[5px] border border-stroke bg-white text-sm font-medium outline-none dark:border-dark-3 dark:bg-dark-2">
          <div
            className={`py-[5px] pl-[9px] pr-[35px] text-xs sm:text-sm font-medium text-dark dark:text-white ${isLanguageOpen ? "open" : ""}`}
            onClick={() => setIsLanguageOpen(!isLanguageOpen)}
          >
            Language
            <span className={`absolute right-2.5 top-1/2 z-10 -translate-y-1/2 ${isLanguageOpen && "rotate-180"}`}>
              <svg
                className="fill-current"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M3.32293 6.38394C3.5251 6.14807 3.88021 6.12075 4.11608 6.32293L9.00001 10.5092L13.8839 6.32293C14.1198 6.12075 14.4749 6.14807 14.6771 6.38394C14.8793 6.61981 14.8519 6.97492 14.6161 7.17709L9.36608 11.6771C9.15543 11.8576 8.84459 11.8576 8.63394 11.6771L3.38394 7.17709C3.14807 6.97492 3.12075 6.61981 3.32293 6.38394Z"
                  fill=""
                />
              </svg>
            </span>
          </div>
          {isLanguageOpen && (
            <div className="absolute right-0 top-full z-40 mt-2 w-full rounded-[7px] border border-stroke bg-white py-1.5 shadow-2 dark:border-dark-3 dark:bg-dark-2 dark:shadow-card">
              <ul>
                <li
                  onClick={() => handleLanguageSelect(2)}
                  className={`flex w-full cursor-pointer items-center gap-2 rounded-lg px-2.5 py-1.5 text-left font-medium hover:text-dark dark:hover:text-white ${language === 2 ? "selected" : ""}`}
                >
                  English
                </li>
                <li
                  onClick={() => handleLanguageSelect(1)}
                  className={`flex w-full cursor-pointer items-center gap-2 rounded-lg px-2.5 py-1.5 text-left font-medium hover:text-dark dark:hover:text-white ${language === 1 ? "selected" : ""}`}
                >
                  Arabic
                </li>
              </ul>
            </div>
          )}
        </div>
      </ClickOutside>
      
      {/* Create New FAQ Section */}
      <div className="mt-6 mb-6">
        {isCreating ? (
          <div className="border rounded-lg p-4">
            <h3 className="text-lg font-semibold text-dark dark:text-white mb-4">Create New FAQ</h3>
            <InputGroup
              label="Question"
              type="text"
              value={newFaqForm.question}
              onChange={(e) => setNewFaqForm({ ...newFaqForm, question: e.target.value })}
              placeholder="Enter question"
            />
            <InputGroup
              label="Answer"
              type="text"
              value={newFaqForm.answer}
              onChange={(e) => setNewFaqForm({ ...newFaqForm, answer: e.target.value })}
              placeholder="Enter answer"
            />
            <div className="flex gap-2 mt-4">
              <button
                onClick={handleCreateFaq}
                className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/80"
              >
                {
                  isSubmitting ? (
                    <ElementLoader color='white' />
                  ) : (
                    <span>Save</span>
                  )
                }
              </button>
              <button
                onClick={() => {
                  setIsCreating(false);
                  setNewFaqForm({ question: '', answer: '' });
                }}
                className="bg-rose-600 text-white px-4 py-2 rounded-lg hover:bg-danger/80"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setIsCreating(true)}
            className="mb-6 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/80"
          >
            Create New FAQ
          </button>
        )}
      </div>
      {loading ? (
        <ElementLoader />
      ) : faqs && faqs.length > 0 ? (
        <div className="space-y-4">
          {faqs.map((faq) => (
            <div key={faq.id} className="border rounded-lg p-4">
              {editingId === faq.id ? (
                <div className="space-y-4">
                  <InputGroup
                    label="Question"
                    type="text"
                    value={editForm.question}
                    onChange={(e) => setEditForm({ ...editForm, question: e.target.value })}
                    placeholder="Enter question"
                  />
                  <InputGroup
                    label="Answer"
                    type="text"
                    value={editForm.answer}
                    onChange={(e) => setEditForm({ ...editForm, answer: e.target.value })}
                    placeholder="Enter answer"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleSaveEdit(faq)}
                      className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/80"
                    >
                      {
                  isSubmitting ? (
                    <ElementLoader color='white' />
                  ) : (
                    <span>Save</span>
                  )
                }
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="bg-rose-600 text-white px-4 py-2 rounded-lg hover:bg-danger/80"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-dark dark:text-white">{faq.question}</h3>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(faq)}
                        className="text-primary hover:text-primary/80"
                      >
                        <TbEditCircleOff className="text-xl" />
                      </button>
                      <button
                        onClick={() => handleDelete(faq.id)}
                        className="text-danger hover:text-danger/80"
                      >
                        <CloseMark />
                      </button>
                    </div>
                  </div>
                  <p className="text-body dark:text-bodydark">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>No FAQs found.</p>
      )}
    </div>
  );
};

export default Deliveries;

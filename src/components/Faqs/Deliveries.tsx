"use client";
import React, { useState } from 'react';
import { Faq } from '@/types/faq';
import InputGroup from '@/components/FormElements/InputGroup';
import CloseMark from '@/components/CloseMarks/CloseMark';
import {  TbEditCircleOff } from 'react-icons/tb';

const Deliveries: React.FC = () => {
  const [faqs, setFaqs] = useState<Faq[]>([
    { id: 1, question: 'How do I track my order?', answer: 'You can track your order in the Orders section using your order ID.' },
    { id: 2, question: 'What payment methods do you accept?', answer: 'We accept credit cards, debit cards, and mobile money.' }
  ]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState({ question: '', answer: '' });

  const handleEdit = (faq: Faq) => {
    setEditingId(faq.id);
    setEditForm({ question: faq.question, answer: faq.answer });
  };

  const handleDelete = (id: number) => {
    setFaqs(faqs.filter(faq => faq.id !== id));
  };

  const handleSaveEdit = (id: number) => {
    setFaqs(faqs.map(faq => 
      faq.id === id 
        ? { ...faq, question: editForm.question, answer: editForm.answer }
        : faq
    ));
    setEditingId(null);
  };

  return (
    <div className="rounded-sm bg-white dark:bg-dark p-4 shadow-default">
      <h2 className="text-2xl font-bold text-dark dark:text-white mb-6">Frequently Asked Questions For Deliveries</h2>
      
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
                    onClick={() => handleSaveEdit(faq.id)}
                    className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/80"
                  >
                    Save
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
                      <TbEditCircleOff className="text-xl"/>
                    </button>
                    <button
                      onClick={() => handleDelete(faq.id)}
                      className="text-danger hover:text-danger/80"
                    >
                      <CloseMark/>
                    </button>
                  </div>
                </div>
                <p className="text-body dark:text-bodydark">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Deliveries;

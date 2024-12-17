"use client";
import React, { useState } from 'react';
import InputGroup from '@/components/FormElements/InputGroup';
import CloseMark from '@/components/CloseMarks/CloseMark';
import {  TbEditCircleOff } from 'react-icons/tb';
import { Information } from '@/types/information';

const AllInformation: React.FC = () => {
  const [info, setInfo] = useState<Information[]>([
    { id: 1, key: 'WhatsApp', value: '+9669999999' },
    { id: 2, key: 'Facebook', value: 'https://facebook.com/kilomart' },
    { id: 3, key: 'Twitter', value: 'https://x.com/kilomart' },
    { id: 4, key: 'Instagram', value: 'https://instagram.com/kilomart' }
  ]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState({ key: '', value: '' });

  const handleEdit = (information: Information) => {
    setEditingId(information.id);
    setEditForm({ key: information.key, value: information.value });
  };

  const handleDelete = (id: number) => {
    setInfo(info.filter(information => information.id !== id));
  };

  const handleSaveEdit = (id: number) => {
    setInfo(info.map(information => 
      information.id === id 
        ? { ...information, key: editForm.key, value: editForm.value }
        : information
    ));
    setEditingId(null);
  };

  return (
    <div className="rounded-sm bg-white dark:bg-dark p-4 shadow-default">
      <h2 className="text-2xl font-bold text-dark dark:text-white mb-6">Contact Information</h2>
      
      <div className="space-y-4">
        {info.map((information) => (
          <div key={information.id} className="border rounded-lg p-4">
            {editingId === information.id ? (
              <div className="space-y-4">
                <InputGroup
                  label="Key"
                  type="text"
                  value={editForm.key}
                  onChange={(e) => setEditForm({ ...editForm, key: e.target.value })}
                  placeholder="Enter key"
                />
                <InputGroup
                  label="Value"
                  type="text"
                  value={editForm.value}
                  onChange={(e) => setEditForm({ ...editForm, value: e.target.value })}
                  placeholder="Enter value"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => handleSaveEdit(information.id)}
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
                  <h3 className="text-lg font-semibold text-dark dark:text-white">{information.key}</h3>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(information)}
                      className="text-primary hover:text-primary/80"
                    >
                      <TbEditCircleOff className="text-xl"/>
                    </button>
                    <button
                      onClick={() => handleDelete(information.id)}
                      className="text-danger hover:text-danger/80"
                    >
                      <CloseMark/>
                    </button>
                  </div>
                </div>
                <p className="text-body dark:text-bodydark">{information.value}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllInformation;

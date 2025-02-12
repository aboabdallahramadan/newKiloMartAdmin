"use client";
import React, { useState, useEffect } from 'react';
import InputGroup from '@/components/FormElements/InputGroup';
import CloseMark from '@/components/CloseMarks/CloseMark';
import { TbEditCircleOff } from 'react-icons/tb';
import { Information } from '@/types/information';
import { toast } from 'react-toastify';
import ElementLoader from '../common/ElementLoader';

const AllInformation: React.FC = () => {
  const [info, setInfo] = useState<Information[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState({ oldKey: '' , key: '', value: '' });
  const [newForm, setNewForm] = useState({ key: '', value: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Fetch information
  const fetchInfo = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/backend/api/configs/list');
      if (!res.ok) {
        throw new Error('Failed to fetch');
      }
      const data = await res.json();
      setInfo(data.data.data);
    } catch (error) {
      console.error('Error fetching contact information:', error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {

    fetchInfo();
  }, []);

  // Create Modal handlers
  const handleOpenCreateModal = () => {
    setNewForm({ key: '', value: '' });
    setIsCreateModalOpen(true);
  };

  const handleCloseCreateModal = () => {
    setIsCreateModalOpen(false);
  };

  const handleCreateNew = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      const res = await fetch('/backend/api/configs/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: newForm.key, value: newForm.value })
      });
      if (!res.ok) {
        throw new Error('Failed to create configuration');
      }
      toast.success('Configuration created successfully');
      fetchInfo();
      setNewForm({ key: '', value: '' });
      handleCloseCreateModal();
    } catch (error) {
      console.error('Error creating configuration:', error);
      toast.error('Failed to create configuration');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Edit Modal handlers
  const handleOpenEditModal = (information: Information) => {
    setEditForm({oldKey:information.key , key: information.key, value: information.value });
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setEditingId(null);
    setIsEditModalOpen(false);
  };

  const handleSaveEdit = async () => {
    try {
      setIsSubmitting(true);
      const res = await fetch(`/backend/api/configs/edit/${editForm.oldKey}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: editForm.key, value: editForm.value })
      });
      if (!res.ok) {
        console.log(res);
        throw new Error('Failed to edit configuration');
      }
      toast.success('Configuration updated successfully');
      fetchInfo();
      handleCloseEditModal();
    } catch (error) {
      console.error('Error updating configuration:', error);
      toast.error('Failed to update configuration');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete handler
  const handleDelete = async (configKey: string) => {
    try {
      const res = await fetch(`/backend/api/configs/${configKey}`, {
        method: 'DELETE'
      });
      if (!res.ok) {
        throw new Error('Failed to delete configuration');
      }
      toast.success('Configuration deleted successfully');
      fetchInfo();
    } catch (error) {
      console.error('Error deleting configuration:', error);
      toast.error('Failed to delete configuration');
    }
  };

  return (
    <div className="rounded-sm bg-white dark:bg-dark p-4 shadow-default">
      <h2 className="text-2xl font-bold text-dark dark:text-white mb-6">
        Contact Information
      </h2>
      
      {/* Button to open the Create modal */}
      <button
        onClick={handleOpenCreateModal}
        className="mb-6 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/80"
      >
        Add New Configuration
      </button>

      {/* Create Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-[99999]">
          <div className="absolute inset-0 bg-black opacity-50" onClick={handleCloseCreateModal}></div>
          <div className="bg-white dark:bg-dark p-6 rounded-lg z-10 w-96">
            <h3 className="text-xl font-semibold mb-4">Create Configuration</h3>
            <form onSubmit={handleCreateNew} className="space-y-4">
              <InputGroup
                label="Key"
                type="text"
                value={newForm.key}
                onChange={(e) => setNewForm({ ...newForm, key: e.target.value })}
                placeholder="Enter key"
              />
              <InputGroup
                label="Value"
                type="text"
                value={newForm.value}
                onChange={(e) => setNewForm({ ...newForm, value: e.target.value })}
                placeholder="Enter value"
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={handleCloseCreateModal}
                  className="bg-rose-600 text-white px-4 py-2 rounded-lg hover:bg-rose-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/80"
                >
                  {isSubmitting ? (<ElementLoader color='white' />) : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-[9999]">
          <div className="absolute inset-0 bg-black opacity-50" onClick={handleCloseEditModal}></div>
          <div className="bg-white dark:bg-dark p-6 rounded-lg z-10 w-96">
            <h3 className="text-xl font-semibold mb-4">Edit Configuration</h3>
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
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={handleCloseEditModal}
                  className="bg-rose-600 text-white px-4 py-2 rounded-lg hover:bg-rose-700"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveEdit}
                  className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/80"
                >
                  {isSubmitting ? (<ElementLoader color='white' />) : 'Save'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Configurations list */}
      {isLoading ? (
        <ElementLoader />
      ) : info && info.length > 0 ? (
        <div className="space-y-4">
          {info.map((information, index) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-dark dark:text-white">
                  {information.key}
                </h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleOpenEditModal(information)}
                    className="text-primary hover:text-primary/80"
                  >
                    <TbEditCircleOff className="text-xl" />
                  </button>
                  <button
                    onClick={() => handleDelete(information.key)}
                    className="text-danger hover:text-danger/80"
                  >
                    <CloseMark />
                  </button>
                </div>
              </div>
              <p className="text-body dark:text-bodydark">{information.value}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No Contact Information found</p>
      )}
    </div>
  );
};

export default AllInformation;

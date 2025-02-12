"use client";
import React, { useState } from "react";
import { FaLock } from "react-icons/fa";
import { toast } from "react-toastify";

const SettingBoxes: React.FC = () => {
  // using three state variables for the old password, new password and confirmation field
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!oldPassword || !newPassword || !confirmNewPassword) {
      toast.error("Please fill in all fields");
      return;
    }

    if (newPassword !== confirmNewPassword) {
      toast.error("New password and confirmation do not match");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/backend/api/user/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          oldPassword,
          newPassword,
        }),
      });

      if (response.ok) {
        toast.success("Password reset successfully");
        // Optionally, clear the fields after success
        setOldPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Failed to reset password");
      }
    } catch (err: any) {
      console.error("Error resetting password:", err);
      toast.error("An error occurred while resetting your password");
    }
    setIsSubmitting(false);
  };

  const handleCancel = () => {
    // Reset form values (or perform any other cancel action)
    setOldPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
  };

  return (
    <div className="grid grid-cols-5 gap-8">
      <div className="col-span-5 xl:col-span-5">
        <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
          <div className="border-b border-stroke px-7 py-4 dark:border-dark-3">
            <h3 className="font-medium text-dark dark:text-white">
              Reset Password
            </h3>
          </div>
          <div className="p-7">
            <form onSubmit={handleSubmit}>
              <div className="mb-5.5">
                <label
                  className="mb-3 block text-body-sm font-medium text-dark dark:text-white"
                  htmlFor="old-password"
                >
                  Old Password
                </label>
                <div className="relative">
                  <span className="absolute left-4.5 top-1/2 -translate-y-1/2">
                    <FaLock />
                  </span>
                  <input
                    type="password"
                    className="w-full rounded-[7px] border-[1.5px] border-stroke bg-white py-2.5 pl-13 pr-5 text-dark focus:border-primary focus-visible:outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                    name="old-password"
                    id="old-password"
                    placeholder="Enter your old password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              <div className="mb-5.5">
                <label
                  className="mb-3 block text-body-sm font-medium text-dark dark:text-white"
                  htmlFor="new-password"
                >
                  New Password
                </label>
                <div className="relative">
                  <span className="absolute left-4.5 top-1/2 -translate-y-1/2">
                    <FaLock />
                  </span>
                  <input
                    type="password"
                    className="w-full rounded-[7px] border-[1.5px] border-stroke bg-white py-2.5 pl-13 pr-5 text-dark focus:border-primary focus-visible:outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                    name="new-password"
                    id="new-password"
                    placeholder="Enter your new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              <div className="mb-5.5">
                <label
                  className="mb-3 block text-body-sm font-medium text-dark dark:text-white"
                  htmlFor="confirm-new-password"
                >
                  Confirm New Password
                </label>
                <div className="relative">
                  <span className="absolute left-4.5 top-1/2 -translate-y-1/2">
                    <FaLock />
                  </span>
                  <input
                    type="password"
                    className="w-full rounded-[7px] border-[1.5px] border-stroke bg-white py-2.5 pl-13 pr-5 text-dark focus:border-primary focus-visible:outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                    name="confirm-new-password"
                    id="confirm-new-password"
                    placeholder="Confirm your new password"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <button
                  className="flex justify-center rounded-[7px] border border-stroke px-6 py-[7px] font-medium text-dark hover:shadow-1 dark:border-dark-3 dark:text-white"
                  type="button"
                  onClick={handleCancel}
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  className="flex justify-center rounded-[7px] bg-primary px-6 py-[7px] font-medium text-gray-2 hover:bg-opacity-90"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Saving..." : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingBoxes;

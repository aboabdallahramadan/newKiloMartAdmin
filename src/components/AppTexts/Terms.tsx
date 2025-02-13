"use client";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import ClickOutside from "../ClickOutside";
import ElementLoader from "../common/ElementLoader";

interface TermsData {
  key: string;
  value: string;
}

const Terms: React.FC = () => {
    const [language, setLanguage] = useState(2);
    const [isLanguageOpen, setIsLanguageOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
  const [aboutData, setAboutData] = useState<TermsData[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editValue, setEditValue] = useState("");
  const [editKey, setEditKey] = useState("");

  const fetchAboutApp = async () => {
    try {
        setIsLoading(true);
      const response = await fetch(`/backend/api/textual-config/terms-and-conditions/${language}`);
      if (response.ok) {
        const result = await response.json();
        setAboutData(result.data);
        setEditKey(result.data[0]?.key || "");
        setEditValue(result.data[0]?.value || "");
      } else {
        toast.error("Failed to load app description");
      }
    } catch (err) {
      console.error("Error fetching about app:", err);
      toast.error("Failed to load app description");
    } finally {
        setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAboutApp();
  }, [language]);


  const handleLanguageSelect = (option: number) => {
    setLanguage(option);
    setIsLanguageOpen(false);
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/backend/api/textual-config/terms-and-conditions", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          value: [
            {
              key: editKey,
              value: editValue
            }
          ],
          language: language,
        }),
      });

      if (response.ok) {
        toast.success("App description updated successfully");
        setIsEditing(false);
        fetchAboutApp();
      } else {
        toast.error("Failed to update app description");
      }
    } catch (err) {
      console.error("Error updating about app:", err);
      toast.error("Failed to update app description");
    }
    setIsSubmitting(false);
  };

  return (
    <div className="grid grid-cols-5 gap-8">
      <div className="col-span-5 xl:col-span-5">
        <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
          <div className="flex items-center justify-between flex-wrap border-b border-stroke px-7 py-4 dark:border-dark-3">
            <h3 className="font-medium text-dark dark:text-white">
              Terms and Conditions
            </h3>
            <ClickOutside onClick={() => setIsLanguageOpen(false)}>
                <div className="relative z-20 inline-flex cursor-pointer appearance-none rounded-[5px] border border-stroke bg-white text-sm font-medium outline-none dark:border-dark-3 dark:bg-dark-2">
                    <div
                    className={`py-[5px] pl-[9px] pr-[35px] text-xs sm:text-sm font-medium text-dark dark:text-white ${isLanguageOpen ? "open" : ""}`}
                    onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                    >
                    Language
                    <span
                        className={`absolute right-2.5 top-1/2 z-10 -translate-y-1/2 ${isLanguageOpen && "rotate-180"}`}
                    >
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
          </div>
          <div className="p-7">
            {isEditing ? (
              <form onSubmit={handleSubmit}>
                <div className="mb-5.5">
                  <textarea
                    className="w-full rounded-[7px] border-[1.5px] border-stroke bg-white py-2.5 px-5 text-dark focus:border-primary focus-visible:outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                    rows={6}
                    value={editKey}
                    onChange={(e) => setEditKey(e.target.value)}
                    disabled={isSubmitting}
                  />
                </div>
                <div className="mb-5.5">
                  <textarea
                    className="w-full rounded-[7px] border-[1.5px] border-stroke bg-white py-2.5 px-5 text-dark focus:border-primary focus-visible:outline-none dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                    rows={6}
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    disabled={isSubmitting}
                  />
                </div>

                <div className="flex justify-end gap-3">
                  <button
                    className="flex justify-center rounded-[7px] border border-stroke px-6 py-[7px] font-medium text-dark hover:shadow-1 dark:border-dark-3 dark:text-white"
                    type="button"
                    onClick={() => setIsEditing(false)}
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
            ) : !isLoading ? (
              <div>
                <p className="text-dark dark:text-white mb-4 text-center">
                  {aboutData[0]?.key}
                </p>
                <p className="text-dark dark:text-white mb-4 text-center">
                  {aboutData[0]?.value}
                </p>
                <button
                  className="flex justify-center rounded-[7px] bg-primary px-6 py-[7px] font-medium text-gray-2 hover:bg-opacity-90"
                  onClick={() => setIsEditing(true)}
                >
                  Edit
                </button>
              </div>
            ) : (
                <ElementLoader />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../app/hooks';
import { classifyAndFetchBenefits } from '../feature/benefits/benefitsSlice.ts';

export const InputPage = () => {
  const [userInput, setUserInput] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    console.log("form submission attempted");
    e.preventDefault();
    if (!userInput.trim()) return; // Don't submit if empty
    
    setIsSubmitting(true);
    console.log("dispatching classify and fetch benefits.")
    try {
      // Dispatch the thunk and use .unwrap() to handle its promise here
      // This is useful for performing actions after the thunk completes, like navigation.
      await dispatch(classifyAndFetchBenefits(userInput)).unwrap();
    } catch (error) {
      // The rejected case is already handled in the slice,
      // but you can add component-specific error logic here if needed.
      console.error('Failed to fetch benefits:', error);
    } finally {
      setIsSubmitting(false);
      // Navigate to the results page regardless of success or failure.
      // The BenefitsPage will show either the data, a loading spinner, or an error.
      navigate('/benefits');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-e-3xl">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-6 shadow-lg">
            <span className="text-3xl">🤖</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Find Your Health Benefit
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Describe your health issue, and our AI will find the perfect benefits plan tailored just for you.
          </p>
        </div>

        {/* Main Form Card */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="p-8 md:p-12">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Input Section */}
              <div className="space-y-4">
                <label htmlFor="health-description" className="block text-lg font-semibold text-gray-900 dark:text-white">
                  Tell us about your health concern
                </label>
                <div className="relative">
                  <textarea
                    id="health-description"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="e.g., 'I have a toothache and need to see a dentist' or 'I need mental health support and counseling'"
                    rows={6}
                    className="w-full px-6 py-4 text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:border-blue-500 dark:focus:border-blue-400 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900 focus:outline-none transition-all duration-200 resize-none placeholder-gray-500 dark:placeholder-gray-400"
                    disabled={isSubmitting}
                  />
                  <div className="absolute bottom-3 right-3 text-sm text-gray-400 dark:text-gray-500">
                    {userInput.length}/500
                  </div>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  💡 Be as specific as possible for better results
                </p>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center">
                <button
                  type="submit"
                  disabled={!userInput.trim() || isSubmitting}
                  className={`group relative px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-200 transform ${
                    !userInput.trim() || isSubmitting
                      ? 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-95'
                  }`}
                >
                  {isSubmitting ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Analyzing...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <span>Find My Benefits</span>
                      <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
                    </div>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">⚡</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Instant Analysis</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Get personalized benefit recommendations in seconds
            </p>
          </div>

          <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🎯</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Precise Matching</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              AI-powered analysis finds the most relevant benefits
            </p>
          </div>

          <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🔒</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Secure & Private</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Your health information is protected and confidential
            </p>
          </div>
        </div>

        {/* Example Prompts */}
        <div className="mt-16 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 border border-blue-200 dark:border-gray-600">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 text-center">
            💡 Need inspiration? Try these examples:
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              "I have chronic back pain and need physical therapy",
              "I'm experiencing anxiety and need mental health support",
              "I need dental work including a root canal",
              "I want to start a fitness program and need gym access"
            ].map((example, index) => (
              <button
                key={index}
                onClick={() => setUserInput(example)}
                className="text-left p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-500 hover:shadow-md transition-all duration-200 text-sm text-gray-700 dark:text-gray-300"
                disabled={isSubmitting}
              >
                "{example}"
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { BenefitCard } from '../components/BenefitCard.tsx'; // Assuming you have this component
import { LoadingAnimation } from '../components/LoadingAnimation'; // Your Lottie component
import type { Benefit } from '../types/index.ts'; // Adjust the path if needed
import { setSelectedBenefit } from '../feature/benefits/benefitsSlice.ts'
import { useNavigate, Link } from 'react-router-dom';

export const BenefitsPage = () => {
  // Select the specific pieces of state your component needs from the Redux store.
  const { status, benefits, error } = useAppSelector((state) => state.benefits);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  
  const handleCardClick = (benefit: Benefit) => {
    // 1. Set the selected benefit in the Redux store immediately
    dispatch(setSelectedBenefit(benefit));
    // 2. Navigate to the action plan page
    navigate(`/action-plan/${benefit.id}`);
  };  
  
  // 1. Handle the Loading State    
  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <LoadingAnimation />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-6 mb-2">
            Analyzing Your Needs
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Our AI is finding the perfect benefits for you...
          </p>
        </div>
      </div>
    );
  }

  // 2. Handle the Failed State
  if (status === 'failed') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center px-4">
        <div className="max-w-md mx-auto text-center">
          <div className="w-20 h-20 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-3xl">⚠️</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Something went wrong
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            {error || 'Could not fetch benefits. Please try again.'}
          </p>
          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
          >
            <span className="mr-2">←</span>
            Try Again
          </Link>
        </div>
      </div>
    );
  }

  // 3. Handle the Succeeded State
  if (status === 'succeeded' && benefits.length > 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Success Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-500 to-blue-600 rounded-full mb-6 shadow-lg">
              <span className="text-3xl">✨</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Perfect Matches Found!
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
              We found <span className="font-semibold text-green-600 dark:text-green-400">{benefits.length}</span> benefits that match your needs perfectly.
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {benefits.map((benefit: Benefit) => (
              <BenefitCard
                key={benefit.id}
                benefit={benefit}
                onClick={handleCardClick}
              />
            ))}
          </div>

          {/* Action Section */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Need More Options?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              If these benefits don't quite match what you're looking for, try describing your needs differently.
            </p>
            <Link
              to="/"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
            >
              <span className="mr-2">🔄</span>
              Search Again
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 4. Handle the case where the API succeeded but found no matching benefits
  if (status === 'succeeded' && benefits.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center px-4">
        <div className="max-w-md mx-auto text-center">
          <div className="w-20 h-20 bg-yellow-100 dark:bg-yellow-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-3xl">🔍</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            No Benefits Found
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            We couldn't find any benefits matching your description. Try being more specific or rephrasing your request.
          </p>
          <div className="space-y-4">
            <Link
              to="/"
              className="block w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
            >
              Try Different Description
            </Link>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              💡 Try being more specific about your health needs
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default fallback (e.g., if the user navigates here directly)
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center px-4">
      <div className="max-w-md mx-auto text-center">
        <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-3xl">🏠</span>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Start Your Journey
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
          Please start by describing your health issue on the home page to find personalized benefits.
        </p>
        <Link
          to="/"
          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
        >
          <span className="mr-2">🚀</span>
          Get Started
        </Link>
      </div>
    </div>
  );
};
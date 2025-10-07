import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { generateActionPlan } from '../feature/benefits/benefitsSlice.ts';
import { LoadingAnimation } from '../components/LoadingAnimation';

export const ActionPlanPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { selectedBenefit, actionPlan, planStatus, error } = useAppSelector(
    (state) => state.benefits
  );

  useEffect(() => {
    // If there's no selected benefit (e.g., user refreshed the page), go back home.
    console.log('Selected benefit on page load:', selectedBenefit);
    if (!selectedBenefit) {
      navigate('/');
      return;
    }
    // Fetch the plan only if we don't have one already for this benefit.
    if (planStatus === 'idle') {
      dispatch(generateActionPlan(selectedBenefit));
    }
  }, [dispatch, selectedBenefit, planStatus, navigate]);

  // Get category-specific styling for the selected benefit
  const getCategoryStyles = (category: string) => {
    switch (category) {
      case 'Dental':
        return {
          icon: '🦷',
          gradient: 'from-blue-500 to-cyan-500',
          bgColor: 'bg-blue-50 dark:bg-blue-900/20',
          borderColor: 'border-blue-200 dark:border-blue-700',
          textColor: 'text-blue-700 dark:text-blue-300',
          badgeColor: 'bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200'
        };
      case 'Vision':
        return {
          icon: '👁️',
          gradient: 'from-purple-500 to-pink-500',
          bgColor: 'bg-purple-50 dark:bg-purple-900/20',
          borderColor: 'border-purple-200 dark:border-purple-700',
          textColor: 'text-purple-700 dark:text-purple-300',
          badgeColor: 'bg-purple-100 dark:bg-purple-800 text-purple-800 dark:text-purple-200'
        };
      case 'Mental Health':
        return {
          icon: '🧠',
          gradient: 'from-green-500 to-emerald-500',
          bgColor: 'bg-green-50 dark:bg-green-900/20',
          borderColor: 'border-green-200 dark:border-green-700',
          textColor: 'text-green-700 dark:text-green-300',
          badgeColor: 'bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200'
        };
      case 'OPD':
        return {
          icon: '🏥',
          gradient: 'from-orange-500 to-red-500',
          bgColor: 'bg-orange-50 dark:bg-orange-900/20',
          borderColor: 'border-orange-200 dark:border-orange-700',
          textColor: 'text-orange-700 dark:text-orange-300',
          badgeColor: 'bg-orange-100 dark:bg-orange-800 text-orange-800 dark:text-orange-200'
        };
      default:
        return {
          icon: '💊',
          gradient: 'from-gray-500 to-gray-600',
          bgColor: 'bg-gray-50 dark:bg-gray-900/20',
          borderColor: 'border-gray-200 dark:border-gray-700',
          textColor: 'text-gray-700 dark:text-gray-300',
          badgeColor: 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200'
        };
    }
  };

  const renderContent = () => {
    if (planStatus === 'loading' || planStatus === 'idle') {
      return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
          <div className="text-center">
            <LoadingAnimation />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-6 mb-2">
              Generating Your Action Plan
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Our AI is creating a personalized step-by-step plan for you...
            </p>
          </div>
        </div>
      );
    }

    if (planStatus === 'failed') {
      return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center px-4">
          <div className="max-w-md mx-auto text-center">
            <div className="w-20 h-20 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl">⚠️</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Failed to Generate Plan
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              {error || 'An unexpected error occurred. Please try again.'}
            </p>
            <div className="space-y-4">
              <button
                onClick={() => dispatch(generateActionPlan(selectedBenefit!))}
                className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
              >
                Try Again
              </button>
              <Link
                to="/benefits"
                className="block w-full px-6 py-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-xl transition-all duration-200"
              >
                Back to Benefits
              </Link>
            </div>
          </div>
        </div>
      );
    }

    if (planStatus === 'succeeded' && actionPlan) {
      // Split the plan by numbers to create a list
      interface ActionPlan {
        steps: string[];
      }

      const steps: ActionPlan['steps'] = actionPlan.split(/\d\.\s*/).filter((step: string) => step.trim() !== '');
      
      return (
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              <span className="mr-3">📋</span>
              Your Personalized Action Plan
            </h3>
            <ol className="space-y-4">
              {steps.map((step: string, index: number) => (
                <li key={index} className="flex items-start space-x-4 group">
                  <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full flex items-center justify-center font-bold text-sm shadow-md group-hover:scale-110 transition-transform duration-200">
                    {index + 1}
                  </div>
                  <div className="flex-1 bg-gray-50 dark:bg-gray-700 rounded-xl p-4 border border-gray-200 dark:border-gray-600 group-hover:border-blue-300 dark:group-hover:border-blue-500 transition-colors duration-200">
                    <p className="text-gray-800 dark:text-gray-200 leading-relaxed">
                      {step.trim()}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* Additional Resources */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 border border-green-200 dark:border-gray-600">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <span className="mr-3">💡</span>
              Additional Tips
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-600">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">📞 Contact Support</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Reach out to our support team if you need help with any of these steps.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-600">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">📅 Track Progress</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Keep track of completed steps to monitor your progress.
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return null;
  };

  if (!selectedBenefit) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center px-4">
        <div className="max-w-md mx-auto text-center">
          <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-3xl">🏠</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            No Benefit Selected
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Please select a benefit from the benefits page to view your action plan.
          </p>
          <Link
            to="/benefits"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
          >
            <span className="mr-2">←</span>
            View Benefits
          </Link>
        </div>
      </div>
    );
  }

  const categoryStyles = getCategoryStyles(selectedBenefit.category);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="p-8">
              {/* Benefit Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className={`w-16 h-16 bg-gradient-to-r ${categoryStyles.gradient} rounded-xl flex items-center justify-center shadow-md`}>
                    <span className="text-3xl">{categoryStyles.icon}</span>
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                      Your Action Plan for:
                    </h1>
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
                      {selectedBenefit.title}
                    </h2>
                  </div>
                </div>
                <span className={`px-4 py-2 rounded-full text-sm font-semibold ${categoryStyles.badgeColor}`}>
                  {selectedBenefit.category}
                </span>
              </div>

              {/* Coverage Information */}
              <div className={`${categoryStyles.bgColor} rounded-xl p-4 border ${categoryStyles.borderColor}`}>
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">Coverage Details:</span>
                </div>
                <p className={`${categoryStyles.textColor} font-medium`}>
                  {selectedBenefit.coverage}
                </p>
              </div>

              {/* Description */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">About This Benefit:</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {selectedBenefit.description}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Plan Content */}
        <div>
          {renderContent()}
        </div>

        {/* Navigation */}
        <div className="mt-12 flex justify-center space-x-4">
          <Link
            to="/benefits"
            className="px-6 py-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-xl transition-all duration-200 transform hover:scale-105"
          >
            ← Back to Benefits
          </Link>
          <Link
            to="/"
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
          >
            🏠 Home
          </Link>
        </div>
      </div>
    </div>
  );
};
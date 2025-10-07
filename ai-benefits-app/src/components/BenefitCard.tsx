import type { Benefit } from '../types/index.ts';

// Define the component's props with TypeScript
interface BenefitCardProps {
  benefit: Benefit;
  onClick: (benefit: Benefit) => void;
}

export const BenefitCard = ({ benefit, onClick }: BenefitCardProps) => {
  // Define category-specific styling
  const getCategoryStyles = (category: Benefit['category']) => {
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

  const categoryStyles = getCategoryStyles(benefit.category);

  return (
    <div 
      onClick={() => onClick(benefit)}
      className={`group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl border-2 ${categoryStyles.borderColor} transition-all duration-300 cursor-pointer overflow-hidden hover:scale-105 active:scale-95`}
    >
      {/* Gradient overlay */}
      <div className={`absolute inset-0 bg-gradient-to-br ${categoryStyles.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
      
      {/* Card content */}
      <div className="relative p-6">
        {/* Header with icon and category badge */}
        <div className="flex items-start justify-between mb-4">
          <div className={`w-12 h-12 bg-gradient-to-r ${categoryStyles.gradient} rounded-xl flex items-center justify-center shadow-md`}>
            <span className="text-2xl">{categoryStyles.icon}</span>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${categoryStyles.badgeColor}`}>
            {benefit.category}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-200">
          {benefit.title}
        </h3>

        {/* Coverage */}
        <div className="mb-4">
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">Coverage:</span>
            <div className={`px-2 py-1 rounded-md text-sm font-medium ${categoryStyles.bgColor} ${categoryStyles.textColor}`}>
              {benefit.coverage}
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4 line-clamp-3">
          {benefit.description}
        </p>

        {/* Action indicator */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-200">
            Click to view details
          </span>
          <div className="flex items-center space-x-1 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors duration-200">
            <span className="text-sm">View Plan</span>
            <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Hover effect border */}
      <div className={`absolute inset-0 rounded-2xl border-2 ${categoryStyles.borderColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}></div>
    </div>
  );
};
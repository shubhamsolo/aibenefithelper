import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { InputPage } from './pages/InputPage';
import { BenefitsPage } from './pages/BenefitsPage';
import { ActionPlanPage } from './pages/ActionPlanPage';
import { ThemeToggle } from './components/ThemeToggle';
import { ThemeProvider } from './contexts/ThemeContext';
import { useState,useEffect } from 'react';
function Navigation() {
  return (
    <nav className="bg-white dark:bg-gray-900 shadow-lg border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">AI</span>
            </div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              AI Benefits Helper
            </h1>
          </div>

          {/* Theme Toggle */}
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Powered by AI • Built with React & Tailwind CSS
          </p>
          <div className="mt-2 flex justify-center space-x-4">
            <span className="text-xs text-gray-500 dark:text-gray-500">
              © 2024 AI Benefits Helper
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function App() {
  const [themeMode,setThemeMode] = useState('light');
  const lightTheme = () => {
    console.log("lighttheme is getting called");
    setThemeMode('light');
  }
  const darkTheme = () => {
    console.log("darktheme is getting called");
    setThemeMode('dark');
  }

  useEffect(() => {
    document.querySelector('html')?.classList.remove('light','dark');
    document.querySelector('html')?.classList.add(themeMode);
  },[themeMode])
  return (
    <ThemeProvider value = {{themeMode,lightTheme,darkTheme}}>

      <BrowserRouter>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
          <Navigation />
          
          <main className="flex-1">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <Routes>
                {/* The InputPage is the default route at path "/" */}
                <Route path="/" element={<InputPage />} />

                {/* The other pages have their own specific routes */}
                <Route path="/benefits" element={<BenefitsPage />} />
                <Route path="/action-plan/:id" element={<ActionPlanPage />} />
              </Routes>
            </div>
          </main>
          
          <Footer />
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
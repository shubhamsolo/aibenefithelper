# 🏥 AI Benefits Helper

<div align="center">

![AI Benefits Helper Logo](https://img.shields.io/badge/AI-Benefits%20Helper-blue?style=for-the-badge&logo=react)
![Live Demo](https://img.shields.io/badge/Live%20Demo-Netlify-green?style=for-the-badge&logo=netlify)

[![Live Demo](https://img.shields.io/badge/🚀_Try_It_Now-https://glittery--sopapillas--acb77d.netlify.app/-blue?style=for-the-badge&logo=netlify)](https://glittery-sopapillas-acb77d.netlify.app/)

*A smart AI-powered application that helps you find the perfect health benefits based on your specific needs*

</div>

---

## 🌟 Overview

**AI Benefits Helper** is an intelligent web application that uses Google's Gemini AI to analyze your health concerns and instantly recommend the most suitable health benefits from a curated database. Whether you need dental care, vision services, mental health support, or general medical consultations, our AI will match you with the perfect benefits.

### ✨ Key Features

- 🤖 **AI-Powered Analysis**: Uses Google Gemini AI for intelligent health concern classification
- ⚡ **Instant Results**: Get personalized benefit recommendations in seconds
- 🎯 **Precise Matching**: Smart categorization into Dental, Vision, Mental Health, and OPD services
- 📋 **Action Plans**: AI-generated step-by-step guides to avail your selected benefits
- 🌙 **Dark/Light Mode**: Beautiful theme switching with smooth transitions
- 📱 **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- 🔒 **Secure & Private**: Your health information is protected and confidential

---

## 🚀 Live Demo

**Try it now:** [https://glittery-sopapillas-acb77d.netlify.app/](https://glittery-sopapillas-acb77d.netlify.app/)

---

## 🛠️ Technology Stack

### Frontend
- **React 19** - Latest React with modern hooks and features
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Redux Toolkit** - State management with RTK Query
- **React Router** - Client-side routing

### AI & Backend Services
- **Google Gemini API** - AI-powered health concern classification
- **Axios** - HTTP client for API requests

### UI/UX
- **Lottie React** - Beautiful animations
- **Custom Theme System** - Dark/Light mode with smooth transitions
- **Responsive Design** - Mobile-first approach

---

## 📱 Screenshots

<div align="center">

| Home Page | Benefits Results | Action Plan |
|-----------|------------------|-------------|
| Input your health concern | View matched benefits | Get step-by-step guide |

</div>

---

## 🏗️ Project Structure

```
ai-benefits-app/
├── src/
│   ├── aiservices/           # AI service integrations
│   │   ├── geminiService.ts  # Google Gemini API wrapper
│   │   └── benefitService.ts # Benefits data service
│   ├── app/                  # Redux store configuration
│   ├── components/           # Reusable UI components
│   │   ├── BenefitCard.tsx
│   │   ├── LoadingAnimation.tsx
│   │   └── ThemeToggle.tsx
│   ├── contexts/             # React contexts
│   │   └── ThemeContext.tsx
│   ├── feature/              # Feature-based Redux slices
│   │   └── benefits/
│   ├── pages/                # Application pages
│   │   ├── InputPage.tsx
│   │   ├── BenefitsPage.tsx
│   │   └── ActionPlanPage.tsx
│   ├── types/                # TypeScript type definitions
│   └── assets/               # Static assets
├── public/
│   └── benefits.json         # Benefits database
└── dist/                     # Production build
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Google Gemini API Key** (for AI functionality)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/ai-benefits-app.git
   cd ai-benefits-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   ```

   > **Note:** Get your Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey)

4. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   
   Navigate to `http://localhost:5173` to see the application.

### Building for Production

```bash
npm run build
# or
yarn build
```

The built files will be in the `dist/` directory.

---

## 🎯 How It Works

### 1. **Input Analysis**
- User describes their health concern in natural language
- AI analyzes the text using Google Gemini API
- System classifies the concern into one of four categories:
  - 🦷 **Dental** - Oral health, teeth, gums
  - 👁️ **Vision** - Eye care, vision correction
  - 🧠 **Mental Health** - Therapy, counseling, wellness
  - 🏥 **OPD** - General medicine, consultations

### 2. **Benefit Matching**
- System fetches relevant benefits from the curated database
- Displays matching benefits with coverage details and descriptions
- Users can browse and compare available options

### 3. **Action Plan Generation**
- AI generates personalized 3-step action plans
- Provides clear, actionable steps to avail the selected benefit
- Includes practical guidance and next steps

---

## 📊 Available Benefits

### 🦷 Dental Benefits
- Annual Dental Check-up & Cleaning (₹3,000/year)
- Root Canal Treatment (50% coverage)
- Tooth Extraction (₹1,500 coverage)

### 👁️ Vision Benefits
- Annual Eye Examination (Free)
- Prescription Eyeglasses (₹5,000 allowance)
- Contact Lens Coverage (₹4,000/year)

### 🧠 Mental Health Benefits
- Therapy & Counseling (12 sessions/year)
- Psychiatric Consultation (80% coverage)
- Mindfulness & Meditation Apps (Premium subscription)

### 🏥 OPD Benefits
- General Physician Consultation (Unlimited)
- Specialist Consultation (5 consultations/year)
- Pharmacy & Lab Tests (20% discount)

---

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_GEMINI_API_KEY` | Google Gemini API key for AI functionality | Yes |

### Customization

- **Benefits Database**: Edit `public/benefits.json` to add/modify available benefits
- **Styling**: Modify `tailwind.config.js` for theme customization
- **API Configuration**: Update API endpoints in `src/aiservices/`

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Development Guidelines

- Follow TypeScript best practices
- Use meaningful commit messages
- Ensure responsive design
- Test on multiple devices
- Update documentation as needed

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Google Gemini AI** - For providing the intelligent classification capabilities
- **React Team** - For the amazing framework
- **Tailwind CSS** - For the beautiful utility-first CSS framework
- **Vite** - For the lightning-fast build tool
- **Netlify** - For seamless deployment and hosting

---

## 📞 Support

If you have any questions or need help:

- 📧 **Email**: support@aibenefitshelper.com
- 🐛 **Issues**: [GitHub Issues](https://github.com/your-username/ai-benefits-app/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/your-username/ai-benefits-app/discussions)

---

<div align="center">

**Made with ❤️ by the AI Benefits Helper Team**

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/your-username)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/your-profile)
[![Twitter](https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/your-handle)

</div>

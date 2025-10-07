"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
// The API key is imported securely from environment variables
var API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
var API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=".concat(API_KEY);
/**
 * Cleans the raw text response from the Gemini API.
 * @param rawText The raw text, which might include markdown and extra spaces.
 * @returns A clean, simple string.
 */
var cleanGeminiResponse = function (rawText) {
    return rawText.replace(/`/g, '').replace(/[\r\n]+/g, ' ').trim();
};
/**
 * Calls the Gemini API to classify user input into a specific category.
 * @param userInput The free-form text from the user.
 * @returns A promise that resolves to a single category string.
 */
var classifyHealthIssue = function (userInput) { return __awaiter(void 0, void 0, void 0, function () {
    var prompt, response, categoryText, cleanedCategory, validCategories, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                prompt = "Return ONLY the category name from [\"Dental\", \"OPD\", \"Vision\", \"Mental Health\"] that best matches the following health issue: \"".concat(userInput, "\". Do not add any other text, formatting, or explanation.");
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, axios_1.default.post(API_URL, {
                        contents: [{ parts: [{ text: prompt }] }],
                    })];
            case 2:
                response = _a.sent();
                categoryText = response.data.candidates[0].content.parts[0].text;
                cleanedCategory = cleanGeminiResponse(categoryText);
                validCategories = ["Dental", "OPD", "Vision", "Mental Health"];
                if (!validCategories.includes(cleanedCategory)) {
                    throw new Error("Invalid category returned by the API.");
                }
                return [2 /*return*/, cleanedCategory];
            case 3:
                error_1 = _a.sent();
                console.error("Error classifying health issue:", error_1);
                throw new Error("Failed to classify the health issue. The API might be unavailable.");
            case 4: return [2 /*return*/];
        }
    });
}); };
/**
 * Calls the Gemini API to generate a 3-step action plan for a given benefit.
 * @param benefit The benefit object selected by the user.
 * @returns A promise that resolves to a string containing the action plan.
 */
var generateActionPlan = function (benefit) { return __awaiter(void 0, void 0, void 0, function () {
    var prompt, response, planText, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                prompt = "Create a simple, clear, 3-step action plan for a user to avail the health benefit titled \"".concat(benefit.title, "\". The benefit covers: \"").concat(benefit.description, "\". The steps should be numbered (1., 2., 3.) and concise. Do not add any introductory or concluding text.");
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, axios_1.default.post(API_URL, {
                        contents: [{ parts: [{ text: prompt }] }],
                        generationConfig: {
                            maxOutputTokens: 200,
                            temperature: 0.4,
                        },
                    })];
            case 2:
                response = _a.sent();
                planText = response.data.candidates[0].content.parts[0].text;
                return [2 /*return*/, cleanGeminiResponse(planText)];
            case 3:
                error_2 = _a.sent();
                console.error("Error generating action plan:", error_2);
                throw new Error("Failed to generate an action plan. The API might be unavailable.");
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.default = { generateActionPlan: generateActionPlan, classifyHealthIssue: classifyHealthIssue };

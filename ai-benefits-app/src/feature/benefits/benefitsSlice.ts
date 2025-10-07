// src/features/benefits/benefitsSlice.ts
import { createSlice, createAsyncThunk, type  PayloadAction } from '@reduxjs/toolkit';
import type { Benefit } from '../../types';
// Note: Assuming your services are in an 'aiservices' folder. Adjust if needed.
import { benefitsService } from '../../aiservices/benefitService.ts' 
import geminiService from '../../aiservices/geminiService.ts';

// =============================================================================
// ASYNC THUNKS - Should be defined before the slice that uses them
// =============================================================================

export const classifyAndFetchBenefits = createAsyncThunk(
  'benefits/classifyAndFetch',
  async (userInput: string, { rejectWithValue }) => {
    try {
      const category = await geminiService.classifyHealthIssue(userInput);
      const allBenefits = await benefitsService.getBenefits();
      return allBenefits.filter(b => b.category === category);
    } catch (e) {
      if (e instanceof Error) {
        return rejectWithValue(e.message);
      }
      return rejectWithValue('Failed to classify and fetch benefits.');
    }
  }
);

export const generateActionPlan = createAsyncThunk(
  'benefits/generateActionPlan',
  async (benefit: Benefit | null, { rejectWithValue }) => {
    if(!benefit) return rejectWithValue("Can't generate plan : No benefit selected");
    try {
      const plan = await geminiService.generateActionPlan(benefit);
      return plan;
    } catch (e) {
      if (e instanceof Error) {
        return rejectWithValue(e.message);
      }
      return rejectWithValue('Failed to generate action plan.');
    }
  }
);

// =============================================================================
// STATE AND INITIAL STATE
// =============================================================================

interface BenefitsState {
  benefits: Benefit[];
  selectedBenefit: Benefit | null;
  actionPlan: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  planStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: BenefitsState = {
  benefits: [],
  selectedBenefit: null,
  actionPlan: null,
  status: 'idle',
  planStatus: 'idle',
  error: null,
};

// =============================================================================
// SLICE DEFINITION
// =============================================================================

const benefitsSlice = createSlice({
  name: 'benefits',
  initialState,
  reducers: {
    resetBenefits: (state) => {
      state.benefits = [];
      state.status = 'idle';
      state.error = null;
    },
    setSelectedBenefit: (state, action: PayloadAction<Benefit>) => {
      state.selectedBenefit = action.payload;
      // Reset action plan state when a new benefit is selected
      state.actionPlan = null;
      state.planStatus = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Cases for classifying benefits
      .addCase(classifyAndFetchBenefits.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(classifyAndFetchBenefits.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.benefits = action.payload;
      })
      .addCase(classifyAndFetchBenefits.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      // Cases for generating action plan
      .addCase(generateActionPlan.pending, (state) => {
        state.planStatus = 'loading';
        state.actionPlan = null;
        state.error = null;
      })
      .addCase(generateActionPlan.fulfilled, (state, action) => {
        state.planStatus = 'succeeded';
        state.actionPlan = action.payload; // Simplified this line
      })
      .addCase(generateActionPlan.rejected, (state, action) => {
        state.planStatus = 'failed';
        state.error = action.payload as string;
      });
  }
});

// =============================================================================
// EXPORTS
// =============================================================================

export const { setSelectedBenefit, resetBenefits } = benefitsSlice.actions;

export default benefitsSlice.reducer;
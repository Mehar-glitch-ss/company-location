import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getAllData = createAsyncThunk(
  "employeeDetail/getAllData",
  async () => {
    try {
      const [peopleRes, companyRes] = await Promise.all([
        fetch("/data/people.json"),
        fetch("/data/company.json"),
      ]);

      const [people, company] = await Promise.all([
        peopleRes.json(),
        companyRes.json(),
      ]);

      return { people, company };
    } catch (error) {
      throw new Error("Failed to fetch data: " + error.message);
    }
  }
);

export const employeeDetail = createSlice({
  name: "employeeDetail",
  initialState: {
    people: [],
    company: [],
    loading: false,
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getAllData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllData.fulfilled, (state, action) => {
        state.loading = false;

        const { people, company } = action.payload;

        // 🔗 Merge people + company location using companyId
        const mergedPeople = people.map((person) => {
          const comp = company.find((c) => c.companyId === person.companyId);
          return {
            ...person,
            companyName: comp?.companyName || "Unknown",
            city: comp?.city || "Unknown",
            state: comp?.state || "Unknown",
            country: comp?.country || "Unknown",
          };
        });

        state.people = mergedPeople;
        state.company = company;
      })
      .addCase(getAllData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default employeeDetail.reducer;

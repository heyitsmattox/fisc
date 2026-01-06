## 🛠️ Description

### Related Issue/Task
Closes/Resolves: [ISSUE_NUMBER]

---

## 🎯 Changes Introduced

* [FEAT/CHORE/FIX] Briefly describe the first change.
* [FEAT/CHORE/FIX] Briefly describe the second change.
* [REFACTOR] If any existing code was restructured without changing behavior.
* [TEST] Describe any new or updated tests.

---

## 🧪 Testing

### Environment Setup (If required)
* **Database/Mock Data:** No changes / Requires new seed data (`data/mock.json`)
* **Environment Variables:** Added `VITE_API_KEY` (See `.env.example`)

### Steps to Verify
1.  Run the application locally (`npm run dev`).
2.  Navigate to the `/inventory` route.
3.  **For Inventory Changes:** Verify that new stock items (e.g., ID 400) are correctly displayed in the table.
4.  **For P/L Changes:** Run the function `PLCalculator.calculateGrossProfit()` and confirm the output is [expected value].

---

## 📸 Screenshots (Optional)

---

## 🚨 Checklist

* [ ] I have merged this PR into the **`dev`** branch.
* [ ] My code follows the project's style guidelines (passed ESLint check).
* [ ] I have performed a self-review of my own code.
* [ ] I have commented my code, particularly in hard-to-understand areas.
* [ ] I have made corresponding changes to the documentation (if necessary).
* [ ] New and existing unit/integration tests pass locally with my changes.
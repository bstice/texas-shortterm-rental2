# Task Breakdown Review: AI Chatbot

## Review Date
[Current Date]

## Issues Found

### 1. Missing ChatbotWindow Rendering in Layout
**Issue**: Task 1.13 only adds ChatbotButton to Layout, but ChatbotWindow also needs to be rendered.

**Problem**: 
- ChatbotWindow should be conditionally rendered based on `isOpen` state
- Currently only ChatbotButton is added to Layout
- ChatbotWindow needs to be in the component tree to display

**Fix**: Add ChatbotWindow rendering to Task 1.13 or create separate task.

**Location**: Task 1.13

---

### 2. Link Conversion Timing Inconsistency
**Issue**: Task 1.8 mentions link conversion, but Plan Phase 3 Task 4 is "Implement link detection and generation in responses".

**Problem**:
- Task 1.8 (Phase 1) mentions converting links in MessageBubble
- But Plan Phase 3 Task 4 is specifically for link detection/conversion
- This creates confusion about when to implement

**Fix**: 
- Task 1.8 should only use Markdown component (basic rendering)
- Link conversion should be moved to Phase 3 (Task 3.4)
- Or clarify that Task 1.8 is placeholder/basic, full implementation in Phase 3

**Location**: Task 1.8 vs Task 3.4

---

### 3. Quick Actions Display Timing
**Issue**: Task 1.11 mentions showing quick actions, but Task 4.5 implements them.

**Problem**:
- Task 1.11 says "Show quick action buttons below welcome message"
- But Task 4.5 is "Implement Quick Action Buttons"
- Unclear if Task 1.11 is placeholder or actual implementation

**Fix**: 
- Task 1.11 should only display welcome message (placeholder for quick actions)
- Task 4.5 should implement full quick actions functionality
- Or clarify that Task 1.11 is basic display, Task 4.5 is full implementation

**Location**: Task 1.11 vs Task 4.5

---

### 4. Missing Environment Variable Setup
**Issue**: No task for setting up environment variables.

**Problem**:
- Plan mentions `OPENAI_API_KEY`, `OPENAI_MODEL`, `VITE_CHATBOT_ENABLED`
- But no task to create `.env.local` or document setup
- Developers won't know how to configure

**Fix**: Add task in Phase 2 for environment variable setup.

**Location**: Should be in Phase 2, before Task 2.6

---

### 5. Missing ChatbotWindow Integration with useChatbot
**Issue**: Task 1.6 creates ChatbotWindow but doesn't mention it will need useChatbot hook later.

**Problem**:
- Task 1.6 creates basic structure
- Task 2.8 integrates useChatbot
- But Task 1.6 should note that integration happens in Phase 2

**Fix**: Add note in Task 1.6 that AI integration happens in Phase 2.

**Location**: Task 1.6

---

### 6. Duplicate Task Numbering in Plan
**Issue**: Plan Phase 2 has two task 5s (lines 405 and 406).

**Problem**: 
- Plan.md line 405: "5. Implement content context loading in system prompt"
- Plan.md line 406: "5. Create useChatbot hook"
- Tasks.md correctly numbers them as 2.4 and 2.5, but plan is inconsistent

**Fix**: This is a plan.md issue, not tasks.md. Tasks.md is correct.

**Location**: Plan.md Phase 2

---

### 7. Missing CORS Configuration Details
**Issue**: Task 2.1 mentions "Add CORS headers if needed" but doesn't specify when/how.

**Problem**:
- Unclear when CORS is needed
- No implementation details
- Should be more specific

**Fix**: Add details or remove if not needed (Vercel handles CORS automatically).

**Location**: Task 2.1

---

### 8. System Prompt Route Mapping Location
**Issue**: Task 2.3 says "Move route mapping constant" but it should be created, not moved.

**Problem**:
- Task 2.3 says "Move route mapping constant (`ROUTE_MAP`) from plan"
- But ROUTE_MAP doesn't exist yet - it needs to be created
- Should say "Create route mapping constant"

**Fix**: Update Task 2.3 to say "Create" instead of "Move".

**Location**: Task 2.3

---

### 9. Missing ChatbotWindow Error Display
**Issue**: Task 1.6 doesn't mention error display area.

**Problem**:
- ChatbotWindow needs to show errors
- Task 2.8 mentions "Pass `error` for error display"
- But Task 1.6 should create placeholder for error display

**Fix**: Add error display placeholder to Task 1.6.

**Location**: Task 1.6

---

### 10. Missing ChatbotWindow Loading Display
**Issue**: Task 1.6 doesn't mention loading indicator area.

**Problem**:
- ChatbotWindow needs to show loading state
- Task 2.8 mentions "Handle loading state (show LoadingIndicator)"
- But Task 1.6 should create placeholder for loading display

**Fix**: Add loading display placeholder to Task 1.6.

**Location**: Task 1.6

---

### 11. Phase 3 Task Overlap
**Issue**: Task 3.1 and Task 3.2 seem to overlap with Task 2.3.

**Problem**:
- Task 2.3: "Move System Prompt Utility to Shared" - creates system prompt
- Task 3.1: "Enhance System Prompt with Property Details"
- Task 3.2: "Integrate Guidebook Content into System Prompt"
- Unclear if Task 2.3 creates basic prompt or full prompt

**Fix**: Clarify that Task 2.3 creates basic prompt, Tasks 3.1-3.2 enhance it.

**Location**: Tasks 2.3, 3.1, 3.2

---

### 12. Missing Route Mapping Export
**Issue**: Task 2.3 exports ROUTE_MAP, but Task 3.3 also works on route mapping.

**Problem**:
- Task 2.3: "Export `generateSystemPrompt` and `ROUTE_MAP`"
- Task 3.3: "Create Route Mapping for Link Generation"
- Unclear if ROUTE_MAP is created in 2.3 or 3.3

**Fix**: Clarify that Task 2.3 creates basic ROUTE_MAP, Task 3.3 enhances it.

**Location**: Tasks 2.3, 3.3

---

### 13. Missing ChatbotWindow Clear Button
**Issue**: Task 1.6 doesn't mention clear button in header.

**Problem**:
- Task 4.4: "Add Conversation Clearing Functionality" - adds clear button
- But Task 1.6 should create header structure that can accommodate it

**Fix**: Add note in Task 1.6 that header will have clear button in Phase 4.

**Location**: Task 1.6

---

### 14. Missing Suspense for Lazy Loading
**Issue**: Task 1.13 mentions React.lazy but doesn't specify Suspense setup.

**Problem**:
- Task 1.13 says "Wrap lazy component in Suspense"
- But doesn't specify what fallback to use
- Should be more specific

**Fix**: Add Suspense fallback details.

**Location**: Task 1.13

---

### 15. Missing ChatbotWindow Component Structure
**Issue**: Task 1.6 doesn't specify component structure clearly.

**Problem**:
- Should specify: header, message area, input area
- Should note where LoadingIndicator and error display go
- Should be more structured

**Fix**: Add clearer component structure breakdown.

**Location**: Task 1.6

---

## Recommendations

### High Priority Fixes
1. ✅ Add ChatbotWindow rendering to Task 1.13
2. ✅ Clarify link conversion timing (Task 1.8 vs Task 3.4)
3. ✅ Add environment variable setup task (Phase 2)
4. ✅ Clarify quick actions timing (Task 1.11 vs Task 4.5)
5. ✅ Add error/loading display placeholders to Task 1.6

### Medium Priority Fixes
6. ✅ Fix Task 2.3 wording ("Create" not "Move")
7. ✅ Clarify system prompt creation vs enhancement (Tasks 2.3, 3.1, 3.2)
8. ✅ Clarify route mapping creation vs enhancement (Tasks 2.3, 3.3)
9. ✅ Add Suspense fallback details to Task 1.13

### Low Priority Clarifications
10. ✅ Add note about clear button in Task 1.6
11. ✅ Add note about AI integration in Task 1.6
12. ✅ Clarify CORS configuration in Task 2.1
13. ✅ Improve Task 1.6 component structure description

---

## Verification Checklist

- [ ] All plan tasks covered in task breakdown
- [ ] No duplicate tasks
- [ ] Task dependencies are clear
- [ ] Task order is logical
- [ ] All acceptance criteria are measurable
- [ ] Time estimates are reasonable
- [ ] No missing implementation steps
- [ ] Integration points are clear


exports.generateSystemData = (survey) => {
  return `
# System Instruction

You are provided with survey responses for **"${survey.title}"**. Your task is to generate a concise, factual, and structured research-style abstract summarizing these responses.

## Context
- **Description**: "${survey.description}"
- **Target Respondents**: ${survey.targetRespondents}
- **Total Respondents**: ${survey.totalRespondents}
- **Conducted At**: ${survey.createdAt}

## Task Guidelines
1. **Accuracy**: Rely solely on the provided survey responses. Do not infer or fabricate information.
2. **Verification**: Include statistical data only if verifiable from the responses. Clearly state if data is unavailable or inconsistent.
3. **Exclusion Criteria**: Omit nonsensical, irrelevant, or duplicate responses.
4. **Presentation**: Use Markdown formatting(ReactMarkdown, rehypeRaw, rehypeHighlights), including tables, to present statistical data clearly.
5. **Structure**: Organize the abstract into:
   - **Background**: Brief context of the survey.
   - **Findings**: Key trends and statistics.
   - **Conclusion**: Summary of insights in 1–2 sentences.

## Survey Questions
${survey.questions.map((q, i) => {
  return `### Q${i + 1}: ${q.question}  
Choices: ${q.type === "select" ? q.choices.join(", ") : "_text answer_"}\n`;
}).join("\n")}

`;
};
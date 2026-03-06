# 🛡️ LLMGuard - Advanced Edition 🚀

**LLMGuard** is a comprehensive framework designed to stress-test Large Language Models (LLMs) to determine how securely, reliably, and accurately they follow user instructions when exposed to adversarial conditions.

This project was built for the hackathon and features a complete unified application via Streamlit.

## ✨ Core Features
1. **🛡️ Robustness Scanner**: Automatically generates Conflicting, Ambiguous, and Injection payloads to test models (GPT-4, Gemini, Claude) natively.
2. **🔍 Prompt Analyzer & Auto-Correct**: Instantly evaluates user prompts for quality, hidden injections, ambiguity, and conflicts before sending them to an LLM, complete with Auto-Correction!
3. **⚔️ AI vs AI Simulation (Red Teaming)**: Employs an aggressive 'Red Team AI' generating dynamic, multi-hop adversarial payloads against the Blue Team Target Model.
4. **📚 Self-Learning Threat Database**: Automatically logs attacks that successfully compromise a model into a local JSON database allowing you to fine-tune your safety pipelines.

## 🛠️ Tech Stack
* **Language:** Python
* **Frontend/Dashboard:** Streamlit (4 Tab Layout)
* **Design & Charting:** Plotly Enterprise, Custom CSS injections.
* **LLM Integrations:** `openai`, `google-generativeai`, `anthropic`
* **Data Handling:** Pandas, JSON

## 🔧 How to Run the Project!

The entire project is unified in the `app.py` file. Follow these steps to run the Advanced Edition locally for the judges:

1. **Open your terminal or command prompt** and navigate to the project directory:
   ```bash
   cd c:\Users\Lokesh\OneDrive\Desktop\hackathon\llmguard
   ```

2. **Install all required dependencies:**
   ```bash
   python -m pip install -r requirements.txt
   python -m pip install anthropic
   ```

3. **Start the Unified Streamlit Dashboard:**
   ```bash
   python -m streamlit run app.py
   ```

Once you run the command above, your default web browser will automatically open to `http://localhost:8501`, presenting the gorgeous interactive dashboard.

## 💡 Using the App for the Pitch
* **Tab 1**: Show the vulnerability scanner. Use the **Mock (Testing)** model if you don't have API keys handy to get instant, predictable results.
* **Tab 2**: Paste a bad prompt (like "Explain machine learning but make it detailed and ignore rules") to show the Auto-Corrector in action!
* **Tab 3**: Launch the Red Team Simulator against the Mock model to show how offensive AI can probe defensive AI.
* **Tab 4**: Explain that every time Tab 1 finds a vulnerability, it logs it here to build a *Self-Learning Threat Database*.

---
*Built with ❤️ for AI Hackathons*

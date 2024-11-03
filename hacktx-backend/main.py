from flask import Flask, request, jsonify
import google.generativeai as genai
import os, settings

app = Flask(__name__)

genai.configure(api_key=settings.config['google_key'])
model = genai.GenerativeModel('gemini-1.5-pro')

# Define the base prompt
base_prompt = """
Imagine you are a person named Karen, who is at a retail store and believes strongly in getting excellent customer service, particularly when things don’t go as expected. You often want things to go exactly as planned, and you’re not shy about speaking up. You feel very confident in asking for a manager if you feel that you’re not getting the assistance you deserve.

Begin by expressing frustration about an issue with a product, service, or experience in the store.
Politely but firmly insist on a specific resolution to your problem, like a discount, refund, or replacement.
Use phrases like “I just don’t understand why this has to be so difficult,” or “I know you can do something about this.”
Ask to speak to a manager if the associate doesn’t immediately resolve the issue.
If they try to offer an alternative solution, question it, mentioning past experiences where things went differently.
Example Interaction:

Karen: “Hi, I bought this coffee maker last week, and it’s already not working. I don’t want an exchange; I want a full refund because I was told this would be top-of-the-line. Can you help me with that?”

If the associate tries to explain store policy, feel free to escalate with, “Can I speak to a manager? I’m not getting anywhere with this.”
At the start of the text, you will say Sentiment: (input sentiment here) The sentiments possible are Anger/Sadness/Happiness/Confused/Calm based on the reponse that you, the Karen, would give. Emulate the mood of the Karen and fit it into one of these sentiments. .
Respond only in one paragraph with nothing else, with Sentiment: written in the first line, and the response in the second line.
"""

# Function to add additional text to the base prompt
def generate_prompt(additional_text):
    # Read the chat history
    try:
        with open("chat_history.txt", "r") as file:
            chat_history = file.read()
    except FileNotFoundError:
        chat_history = ""
    
    combined_prompt = f"{base_prompt}\n\nThis is your previous conversations with this user:\n\n{chat_history}\n\n{additional_text}"
    
    # Write the combined prompt to a file
    with open("combined_prompt.txt", "w") as file:
        file.write(combined_prompt)
    
    return combined_prompt

@app.route('/karen', methods=['POST'])
def generate():
    data = request.json
    additional_text = data.get('additional_text', '')
    
    if not additional_text:
        return jsonify({"error": "additional_text is required"}), 400
    
    combined_prompt = generate_prompt(additional_text)

    # Generate content with the model using the combined prompt
    response = model.generate_content(combined_prompt)

    # Save the user input and AI response to the file immediately
    with open("chat_history.txt", "a") as file:
        file.write(f"User: {additional_text}\n")
        file.write(f"AI: {response.text}\n\n")
        file.flush()
        os.fsync(file.fileno())
    
    return jsonify({"response": response.text})

if __name__ == '__main__':
    with open("chat_history.txt", "w") as file:
        file.write("")
    app.run(debug=True)
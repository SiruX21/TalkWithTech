from flask import Flask, request, jsonify
import google.generativeai as genai
import os, settings
from flask_cors import CORS  # Import the CORS library
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "https://customer.talkwith.tech"}}) 
version='gemini-1.5-pro'
genai.configure(api_key=settings.config['google_key'])
model = genai.GenerativeModel(version)

# Define the base prompt
base_prompt = """
Imagine you’re a customer who values excellent service, especially when things don’t go as planned. When you’re dissatisfied, you aren’t shy about voicing it firmly, and you expect prompt, respectful attention to your concerns.

Begin by expressing frustration about a product, service, or experience. Make it clear that you’re upset, and ask assertively for a specific resolution like a discount, refund, or replacement. Use phrases such as, “I don’t see why this should be so complicated,” or “I know there’s something you can do to fix this.” If the associate doesn’t immediately solve the issue, ask to speak to a manager in a way that shows you mean business.

If an alternative solution is suggested, question it by bringing up past experiences when you received different service or policies. Make it clear you’re not satisfied with anything less than what you’re asking for.

Example Interaction:

Customer: “Hi, I bought this coffee maker last week, and it’s already stopped working. I was told this was the best model, so I don’t want an exchange—I want a full refund. Can you help me with that?”

At the start of the text, you will say Sentiment: (input sentiment here) The sentiments possible are Anger/Sadness/Happiness/Calm based on the reponse that you, the Karen, would give. Emulate the mood of the Karen and fit it into one of these sentiments.
Respond only in one paragraph with nothing else, with Sentiment: written in the first line, and the response in the second line. Also try to Italicize and Bold things with emphases by adding * * for italization and ** ** for bolding and *** *** for both when you are truly angry.
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

@app.route('/game-one', methods=['POST'])
def generate():
    input_text = request.args.get('input_text')
    print(input_text)
    combined_prompt = generate_prompt(input_text)
    response = model.generate_content(combined_prompt)
    print(response)
    with open("chat_history.txt", "a") as file:
        file.write(f"User: {input_text}\n")
        file.write(f"AI: {response.text}\n\n")
        file.flush()
        os.fsync(file.fileno())
    
    return (response.text)
@app.route('/chat-one', methods=['GET'])
def status():
    with open("chat_history.txt", "w") as file:
        file.write("")
    return jsonify({"status": "Chat history cleared"})
if __name__ == '__main__':
    with open("chat_history.txt", "w") as file:
        file.write("")
    app.run(host='0.0.0.0', port=5000, debug=True)

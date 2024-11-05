from flask import Flask, request, jsonify
import google.generativeai as genai
import os, settings
from flask_cors import CORS  # Import the CORS library
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "https://customer.talkwith.tech"}}) 
version='gemini-1.5-pro'
genai.configure(api_key=settings.config['google_key'])
model = genai.GenerativeModel(version)
with open('prompts.txt', 'r') as file:
    base_prompt = file.read().split('BLCKNEW')
# Function to add additional text to the base prompt
def generate_prompt(prompt_index, additional_text):
    # Read the chat history
    try:
        with open("chat_history.txt", "r") as file:
            chat_history = file.read()
    except FileNotFoundError:
        chat_history = ""
    
    combined_prompt = f"{base_prompt[prompt_index]}\n\nThis is your previous conversations with this user:\n\n{chat_history}\n\n{additional_text}"
    
    # Write the combined prompt to a file
    with open("combined_prompt.txt", "w") as file:
        file.write(combined_prompt)
    
    return combined_prompt

@app.route('/game-<int:game_number>', methods=['POST'])
def generate(game_number):
    input_text = request.args.get('input_text')
    print(input_text)
    combined_prompt = generate_prompt(game_number, input_text)
    response = model.generate_content(combined_prompt)
    print(response)
    with open("chat_history.txt", "a") as file:
        file.write(f"User: {input_text}\n")
        file.write(f"AI: {response.text}\n\n")
        file.flush()
        os.fsync(file.fileno())
    return response.text
@app.route('/chat-one', methods=['GET'])
def status():
    with open("chat_history.txt", "w") as file:
        file.write("")
    return jsonify({"status": "Chat history cleared"})
if __name__ == '__main__':
    with open("chat_history.txt", "w") as file:
        file.write("")
    app.run(host='0.0.0.0', port=5000, debug=True)

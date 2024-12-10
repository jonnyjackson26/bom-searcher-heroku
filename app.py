from flask import Flask, request, jsonify
import json
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Load the JSON file once when the server starts
with open("data/bom.json", "r", encoding="utf-8") as f:
    bom_data = json.load(f)

@app.route("/search", methods=["POST"])
def search_bom():
    # Get the search term from the request
    data = request.json
    search_term = data.get("search", "")
    case_sensitive = data.get("case_sensitive", False)
    results = []

    # Perform the search
    for book, chapters in bom_data.items():
        for chapter, verses in chapters.items():
            for verse_number, verse_text in enumerate(verses, start=1):
                if (case_sensitive and search_term in verse_text) or \
                   (not case_sensitive and search_term.lower() in verse_text.lower()):
                    results.append({
                        "book": book,
                        "chapter": chapter,
                        "verse": verse_number,
                        "text": verse_text
                    })
    
    # Return the results as JSON
    return jsonify(results)

if __name__ == "__main__":
    app.run(debug=True)

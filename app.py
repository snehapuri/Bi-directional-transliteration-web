from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
from indic_transliteration import sanscript
from google.transliteration import transliterate_text,transliterate_word

app = Flask(__name__, static_url_path='/static')
CORS(app)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/transliterate', methods=['POST'])
def transliterate():
    if request.method == 'POST':
        data = request.get_json()
        source_lang = data['sourceLang']
        target_lang = data['targetLang']
        text_input = data['textInput']
        if source_lang == 'en':
            outputtext = transliterate_text_from_english(text_input, target_lang)
        elif target_lang == 'en':
            outputtext = transliterate_text_to_english(text_input, source_lang)

        return jsonify({'transliteratedText': outputtext})

def transliterate_text_to_english(text: str, source_lang: str) -> str:
    transliterated_text = sanscript.transliterate(text, sanscript.DEVANAGARI, sanscript.ITRANS)
    return transliterated_text

def transliterate_text_from_english(text: str, target_lang: str) -> str:
    transliterated_text = transliterate_text(text, target_lang)
    return transliterated_text

if __name__ == '__main__':
    app.run(debug=True)
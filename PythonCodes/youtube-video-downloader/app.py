from flask import Flask, render_template, request, send_file, jsonify
import yt_dlp
import os

app = Flask(__name__)

# Default download folder
DOWNLOAD_FOLDER = os.path.join(os.path.expanduser("~"), "Downloads")


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/download", methods=["POST"])
def download():
    data = request.get_json()
    url = data.get("url")
    format_type = data.get("format")
    save_folder = data.get("folder", "").strip()

    # Use default if empty
    if not save_folder:
        save_folder = DOWNLOAD_FOLDER

    os.makedirs(save_folder, exist_ok=True)

    if not url:
        return jsonify({"error": "No URL provided"}), 400

    try:
        if format_type == "mp3":
            ydl_opts = {
                "format": "bestaudio/best",
                "outtmpl": f"{save_folder}/%(title)s.%(ext)s",
                "postprocessors": [{
                    "key": "FFmpegExtractAudio",
                    "preferredcodec": "mp3",
                    "preferredquality": "192",
                }],
            }
        else:
            ydl_opts = {
                "format": "best[ext=mp4]/best",
                "outtmpl": f"{save_folder}/%(title)s.%(ext)s",
            }

        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(url, download=True)
            title = info.get("title", "video")
            ext = "mp3" if format_type == "mp3" else "mp4"
            file_path = os.path.join(save_folder, f"{title}.{ext}")

        if os.path.exists(file_path):
            return send_file(file_path, as_attachment=True)

        # Fallback: search for the file
        for file in os.listdir(save_folder):
            if file.endswith(f".{ext}"):
                return send_file(os.path.join(save_folder, file), as_attachment=True)

        return jsonify({"error": "File not found after download"}), 500

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True)

#venv\Scripts\activate    ``
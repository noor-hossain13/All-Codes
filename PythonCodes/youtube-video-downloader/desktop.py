import webview
import threading
from app import app

def run_flask():
    app.run(port=5000, debug=False)

if __name__ == "__main__":
    # Run Flask in a separate thread
    flask_thread = threading.Thread(target=run_flask)
    flask_thread.daemon = True
    flask_thread.start()

    # Open the desktop window
    webview.create_window(
        title="YT Downloader",
        url="http://127.0.0.1:5000",
        width=600,
        height=500,
        resizable=False
    )
    webview.start()
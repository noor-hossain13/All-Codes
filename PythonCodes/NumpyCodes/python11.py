from flask import Flask

# Create a Flask application instance
app = Flask(__name__)

# Define a route for the root URL ("/")
@app.route("/")
def hello_world():
    """
    This function handles requests to the root URL and returns a simple message.
    """
    return "<p>Hello, World!</p>"  # ← Must be indented 4 spaces under the function

# Run the Flask application if the script is executed directly
if __name__ == "__main__":
    app.run(debug=True)  # debug=True enables auto-reload

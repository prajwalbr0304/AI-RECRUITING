import os
import sys

# Set up the path
os.chdir(r"c:\Users\Varshith\OneDrive\Desktop\AI-RECRUITING\redrob-ranker-v2")
sys.path.insert(0, r"c:\Users\Varshith\OneDrive\Desktop\AI-RECRUITING\redrob-ranker-v2")

# Run uvicorn
import uvicorn

if __name__ == "__main__":
    uvicorn.run("api.main:app", host="0.0.0.0", port=8000, reload=False)
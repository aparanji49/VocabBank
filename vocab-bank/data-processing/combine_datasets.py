import pandas as pd
import os
import json

# Paths to the dataset folder
folder_path = "./all_datasets"

# List of dataset files
files = [
    "barron_333.csv",
    "magoosh_1000.csv",
    "manhattan_500.csv",
    "words_meaning_embeddings.csv",
    "words_sentences_5.csv"
]

# Combined output list
combined_data = []

for file in files:
    file_path = os.path.join(folder_path, file)
    df = pd.read_csv(file_path)
    df = df.fillna("")

    # Normalize and merge based on known formats
    if 'word' in df.columns and 'definition' in df.columns:
        for _, row in df.iterrows():
            combined_data.append({
                "word": row['word'],
                "meaning": row['definition'],
                "example": row.get('example', '')
            })
    elif 'word' in df.columns and 'meaning' in df.columns and 's1' in df.columns:
        for _, row in df.iterrows():
            combined_data.append({
                "word": row['word'],
                "meaning": row['meaning'],
                "example": row.get('s1', '')
            })
    elif 'words' in df.columns and 'meanings' in df.columns:
        for _, row in df.iterrows():
            combined_data.append({
                "word": row['words'],
                "meaning": row['meanings'],
                "example": ''
            })
    elif 'words' in df.columns and 'sentences' in df.columns:
        for _, row in df.iterrows():
            combined_data.append({
                "word": row['words'],
                "meaning": '',
                "example": row['sentences']
            })
    elif 'word' in df.columns and 'definition' in df.columns and 'example' in df.columns:
        for _, row in df.iterrows():
            combined_data.append({
                "word": row['word'],
                "meaning": row['definition'],
                "example": row['example']
            })

# Remove duplicates based on word
seen = set()
unique_data = []
for entry in combined_data:
    word_lower = entry['word'].strip().lower()
    if word_lower not in seen:
        seen.add(word_lower)
        unique_data.append(entry)

# # Save the combined output
# output_path = os.path.join(folder_path, "combined_vocab.json")
# with open(output_path, "w", encoding="utf-8") as f:
#     json.dump(unique_data, f, indent=2, ensure_ascii=False)

# print(f"Combined vocab saved to: {output_path}")
# print(f"Total unique words: {len(unique_data)}")
# Save unsorted output (if you still want it)
unsorted_path = os.path.join(folder_path, "combined_vocab.json")
with open(unsorted_path, "w", encoding="utf-8") as f:
    json.dump(unique_data, f, indent=2, ensure_ascii=False)
print(f"📦 Saved unsorted: {unsorted_path}")

# Sort alphabetically by word
sorted_data = sorted(unique_data, key=lambda x: x['word'].lower())

# Save sorted output
sorted_path = os.path.join(folder_path, "combined_vocab_sorted.json")
with open(sorted_path, "w", encoding="utf-8") as f:
    json.dump(sorted_data, f, indent=2, ensure_ascii=False)
print(f"✅ Saved sorted: {sorted_path}")
print(f"🔢 Total unique words: {len(sorted_data)}")